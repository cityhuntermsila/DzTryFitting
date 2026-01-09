
import { GoogleGenAI } from "@google/genai";
import { Landmark } from '../types';

const MODEL_NAME = 'gemini-2.5-flash-image';

/**
 * Redimensionne une image base64 pour éviter les erreurs RPC (payload trop large)
 * et optimiser la vitesse de traitement de l'IA.
 * Réduit à 800px pour une stabilité maximale.
 */
const resizeImage = (base64Str: string, maxWidth = 800, maxHeight = 800): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
    });
};

const cleanBase64 = (base64: string) => base64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
const getMimeType = (base64: string) => {
    const match = base64.match(/^data:(image\/\w+);base64,/);
    return match ? match[1] : 'image/jpeg';
};

export const validateFullBody = async (imageBase64: string): Promise<{ isValid: boolean; reason?: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const optimizedImage = await resizeImage(imageBase64);
  
  const prompt = `
    Analyze this image for a fashion app. Is it a high-quality full-body photo?
    ACCEPT: Street style, complex backgrounds, scarves, handbags.
    REJECT: Selfies, waist-up, blurry.
    Output: VALID or INVALID: [Reason]
  `;

  const parts = [
      {
          inlineData: {
              mimeType: getMimeType(optimizedImage),
              data: cleanBase64(optimizedImage),
          },
      },
      { text: prompt }
  ];

  try {
      const response = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: { parts },
      });
      const text = response.text?.trim() || "";
      if (text.toUpperCase().startsWith("VALID")) {
          return { isValid: true };
      }
      return { isValid: false, reason: text.replace("INVALID:", "").trim() };
  } catch (error) {
      return { isValid: false, reason: "Analyse impossible." };
  }
};

export const generateTryOn = async (
  userImageBase64: string,
  garmentDescription: string,
  landmarks: Landmark[],
  garmentImageBase64?: string,
  poseInstruction?: string
): Promise<string> => {
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Redimensionnement pour éviter l'erreur 500 RPC
  const optimizedUserImg = await resizeImage(userImageBase64);
  const optimizedGarmentImg = garmentImageBase64 ? await resizeImage(garmentImageBase64) : null;

  const landmarkDesc = landmarks.map(l => `${l.label} at ${Math.round(l.x)}%x, ${Math.round(l.y)}%y`).join(', ');
  
  const poseConstraint = poseInstruction 
      ? `POSE: Force the person to be ${poseInstruction}.`
      : `POSE: Maintain the exact same static posture as the original photo.`;

  let prompt = `
    ROLE: Elite Digital Pattern Maker.
    TASK: Transfer the garment from the second image onto the person in the first image.

    STRICT DESIGN INTEGRITY RULES:
    1. PIXEL-PERFECT FIDELITY: Transfer the garment exactly as it appears in the source.
    2. MOTIF PRESERVATION: Every embroidery, bead, and lace pattern must be a 1:1 replica of the garment source.
    3. TOTAL OVERLAY: The new garment must completely replace and hide any original clothing in the target area.
    4. IDENTITY: Keep the person's face, features, and hair exactly the same.
    
    LANDMARKS: ${landmarkDesc}.
    ${poseConstraint}
    GARMENT: ${garmentDescription}
  `;

  const parts: any[] = [
    {
        inlineData: {
            mimeType: getMimeType(optimizedUserImg),
            data: cleanBase64(optimizedUserImg),
        },
    }
  ];

  if (optimizedGarmentImg) {
      parts.push({
          inlineData: {
              mimeType: getMimeType(optimizedGarmentImg),
              data: cleanBase64(optimizedGarmentImg)
          }
      });
      prompt += " USE THE SECOND IMAGE AS THE DESIGN SOURCE. CLONE ALL MOTIFS EXACTLY.";
  }

  parts.push({ text: prompt });

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
      config: {
          temperature: 1, // Température à 1 comme demandé
          topP: 0.9,
      }
    });

    const responseParts = response.candidates?.[0]?.content?.parts;
    if (responseParts) {
      for (const part of responseParts) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Gemini Try-On Error:", error);
    throw error;
  }
};
