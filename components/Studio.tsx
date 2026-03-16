
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ViewState, Language, Landmark, Garment, Pose } from '../types';
import { I18N, ALL_GARMENTS, DEFAULT_LANDMARKS, POSES } from '../constants';
import { generateTryOn, validateFullBody } from '../services/geminiService';

interface StudioProps {
    lang: Language;
    initialGarment?: Garment | null;
}

const TARGET_WIDTH = 1440;
const TARGET_HEIGHT = 2048;

const normalizeImageToCanvas = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const MARGIN_FACTOR = 1.0;
            const scale = Math.min(
                TARGET_WIDTH / (img.width * MARGIN_FACTOR),
                TARGET_HEIGHT / (img.height * MARGIN_FACTOR)
            );
            const drawWidth = img.width * scale;
            const drawHeight = img.height * scale;

            const canvas = document.createElement('canvas');
            canvas.width = drawWidth;
            canvas.height = drawHeight;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(dataUrl);
                return;
            }

            // Dessiner sans décalage car le canvas fit parfaitement
            ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
    });
};

const Studio: React.FC<StudioProps> = ({ lang, initialGarment }) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [landmarks, setLandmarks] = useState<Landmark[]>(DEFAULT_LANDMARKS);

    // Validation State
    const [validationError, setValidationError] = useState<string | null>(null);
    const [pendingImage, setPendingImage] = useState<string | null>(null);

    // Camera State
    const [isCameraActive, setIsCameraActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Garment Selection State
    const [garmentMode, setGarmentMode] = useState<'collection' | 'upload'>('collection');
    const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
    const [customGarmentImage, setCustomGarmentImage] = useState<string | null>(null);
    const [isGarmentDragOver, setIsGarmentDragOver] = useState(false);

    // Pose Selection State
    const [selectedPose, setSelectedPose] = useState<Pose>(POSES[0]);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [downloadResultImage, setDownloadResultImage] = useState<string | null>(null);
    const [sliderPos, setSliderPos] = useState(50);

    // Dragging logic
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const garmentInputRef = useRef<HTMLInputElement>(null);

    const garmentListSidebarRef = useRef<HTMLDivElement>(null);

    // Shop Modal State
    const [isShopModalOpen, setIsShopModalOpen] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        size: 'M',
        quantity: 1,
        fullName: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (initialGarment) {
            setSelectedGarment(initialGarment);
            setGarmentMode('collection');
        }
    }, [initialGarment]);

    useEffect(() => {
        if (isCameraActive) {
            let stream: MediaStream | null = null;
            const startStream = async () => {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                    streamRef.current = stream;
                    setTimeout(() => {
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                            videoRef.current.play().catch(e => console.log("Play error", e));
                        }
                    }, 100);
                } catch (err) {
                    console.error("Camera access error:", err);
                    setIsCameraActive(false);
                }
            };
            startStream();
            return () => {
                if (stream) stream.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            };
        }
    }, [isCameraActive]);

    const capturePhoto = async () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(videoRef.current, 0, 0);
                const rawDataUrl = canvas.toDataURL('image/png');
                const dataUrl = await normalizeImageToCanvas(rawDataUrl);

                setValidationError(null);
                setPendingImage(dataUrl);
                setIsValidating(true);
                try {
                    const validation = await validateFullBody(dataUrl);
                    if (validation.isValid) {
                        setUserImage(dataUrl);
                        setIsCameraActive(false);
                        setPendingImage(null);
                    } else {
                        setValidationError(validation.reason || "Invalid photo");
                    }
                } catch (e) {
                    setValidationError("Technical validation error.");
                } finally {
                    setIsValidating(false);
                }
            }
        }
    };

    const forceUseImage = () => {
        if (pendingImage) {
            setUserImage(pendingImage);
            setIsCameraActive(false);
            setValidationError(null);
            setPendingImage(null);
        }
    };

    const processFile = (file: File, isUserImage: boolean) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const rawData = event.target?.result as string;
                const resultData = await normalizeImageToCanvas(rawData);

                if (isUserImage) {
                    setValidationError(null);
                    setPendingImage(resultData);
                    setIsValidating(true);
                    try {
                        const validation = await validateFullBody(resultData);
                        if (validation.isValid) {
                            setUserImage(resultData);
                            setIsCameraActive(false);
                            setPendingImage(null);
                        } else {
                            setValidationError(validation.reason || "Photo non conforme");
                        }
                    } catch (e) {
                        setValidationError("Technical validation error.");
                    } finally {
                        setIsValidating(false);
                    }
                } else {
                    setCustomGarmentImage(resultData);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) processFile(e.target.files[0], true);
    };

    const handleGarmentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) processFile(e.target.files[0], false);
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0], true);
    };

    const handleGarmentDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsGarmentDragOver(true); };
    const handleGarmentDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsGarmentDragOver(false); };
    const handleGarmentDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsGarmentDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0], false);
    };

    const handleCamera = () => {
        setValidationError(null);
        setPendingImage(null);
        setIsCameraActive(true);
        setUserImage(null);
    };

    const handleMouseMove = (_e: React.MouseEvent) => {
        // Ajustement manuel des points désactivé
    };

    const handleGenerate = async () => {
        if (!userImage) return;
        setIsProcessing(true);
        try {
            let result;
            const posePrompt = selectedPose ? selectedPose.prompt : undefined;
            if (garmentMode === 'collection' && selectedGarment) {
                let description = selectedGarment.description;
                if (selectedGarment.selectedColor) description += ` Color: ${selectedGarment.selectedColor}.`;
                result = await generateTryOn(userImage, description, landmarks, selectedGarment.image, posePrompt);
            } else if (garmentMode === 'upload' && customGarmentImage) {
                result = await generateTryOn(userImage, "Custom garment", landmarks, customGarmentImage, posePrompt);
            }
            if (result) {
                setResultImage(result);
                // Préparer une version normalisée 320x480 pour le téléchargement
                try {
                    const resized = await normalizeImageToCanvas(result);
                    setDownloadResultImage(resized);
                } catch {
                    setDownloadResultImage(result);
                }
            }
        } catch (error) {
            alert("Generation error. Please check your API key.");
        } finally {
            setIsProcessing(false);
        }
    };

    const dataURItoBlob = (dataURI: string) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const handleDownload = () => {
        const imageToDownload = downloadResultImage || resultImage;
        if (!imageToDownload) return;

        try {
            const blob = dataURItoBlob(imageToDownload);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `dz_fitting_${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (e) {
            console.error("Download error:", e);
            // Fallback for simple download if blob fails
            const link = document.createElement('a');
            link.href = imageToDownload;
            link.download = "dz_fitting_result.png";
            link.click();
        }
    };


    const handleReset = () => {
        setResultImage(null);
        setDownloadResultImage(null);
        setStep(1);
        setUserImage(null);
        setCustomGarmentImage(null);
        setSelectedGarment(null);
        setIsCameraActive(false);
        setValidationError(null);
        setPendingImage(null);
    };

    return (
        <div className="w-full h-full min-h-screen px-4 md:px-8 py-4 md:py-4 flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[calc(100vh-140px)]">
                <div className="lg:col-span-8 h-full flex flex-col gap-10">
                    <div
                        className={`
                  bg-white rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 h-full relative flex items-center justify-center
                  ${!userImage && !isCameraActive && isDragOver ? 'border-brand-500 bg-brand-50' : 'border-gray-100'}
                  ${isCameraActive ? 'bg-black' : ''}
              `}
                        onDragOver={!userImage && !isCameraActive ? handleDragOver : undefined}
                        onDragLeave={!userImage && !isCameraActive ? handleDragLeave : undefined}
                        onDrop={!userImage && !isCameraActive ? handleDrop : undefined}
                    >
                        {!userImage ? (
                            isCameraActive ? (
                                <div className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center bg-black">
                                    <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" />
                                    <div className="absolute bottom-6 flex items-center gap-8 z-20">
                                        <button onClick={() => !isValidating && setIsCameraActive(false)} disabled={isValidating} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20"><i className="fa-solid fa-xmark"></i></button>
                                        <button onClick={capturePhoto} disabled={isValidating} className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent transition-all shadow-lg active:scale-95 ${isValidating ? 'opacity-50 cursor-wait' : 'hover:bg-white/10'}`}>
                                            {isValidating ? <i className="fa-solid fa-spinner fa-spin text-white text-2xl"></i> : <div className="w-16 h-16 bg-brand-600 rounded-full border-2 border-white"></div>}
                                        </button>
                                        <div className="w-12 h-12"></div>
                                    </div>
                                    {isValidating && <div className="absolute inset-0 bg-black/50 z-30 flex flex-col items-center justify-center text-white"><i className="fa-solid fa-circle-notch fa-spin text-4xl mb-3 text-brand-500"></i><p className="font-serif tracking-wider">Analyzing posture...</p></div>}
                                </div>
                            ) : (
                                <div className={`text-center p-12 animate-fade-in ${isDragOver ? 'scale-105 transition-transform' : ''} relative`}>
                                    {isValidating && <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center rounded-3xl"><i className="fa-solid fa-circle-notch fa-spin text-4xl mb-3 text-brand-600"></i><p className="font-serif tracking-wider text-gray-900">Verifying photo...</p></div>}
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors ${isDragOver ? 'bg-white' : 'bg-brand-50'}`}><i className={`fa-solid fa-cloud-arrow-up text-3xl ${isDragOver ? 'text-brand-600' : 'text-brand-500'}`}></i></div>
                                    <h3 className="text-2xl font-serif text-gray-800 mb-2">{I18N.upload_photo[lang]}</h3>
                                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Upload your full-body photo to begin the fitting.</p>
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="flex justify-center gap-4">
                                            <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"><i className="fa-regular fa-folder-open mr-2"></i> Choose file</button>
                                            <button onClick={handleCamera} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"><i className="fa-solid fa-camera mr-2"></i> Camera</button>
                                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </div>

                                        {validationError && (
                                            <div className="animate-fade-in bg-white border border-brand-100 p-6 rounded-2xl shadow-xl max-w-md flex flex-col gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0"><i className="fa-solid fa-triangle-exclamation text-brand-600"></i></div>
                                                    <div className="text-left"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI insight</p><p className="text-sm font-medium text-gray-700">{validationError}</p></div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setValidationError(null); setPendingImage(null); }} className="flex-1 py-2 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">Retry</button>
                                                    <button onClick={forceUseImage} className="flex-1 py-2 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors flex items-center justify-center gap-2"><i className="fa-solid fa-check-double"></i> Use anyway</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        ) : resultImage ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="relative w-full max-w-[576px] aspect-[45/64] bg-gray-100 rounded-2xl overflow-hidden select-none">
                                    <img
                                        src={userImage}
                                        alt="Original"
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                    <div
                                        className="absolute inset-0 overflow-hidden"
                                        style={{ width: `${sliderPos}%` }}
                                    >
                                        <img
                                            src={resultImage}
                                            alt="Result"
                                            className="absolute inset-0 w-full h-full object-contain"
                                        />
                                    </div>
                                    <div
                                        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                        style={{ left: `${sliderPos}%` }}
                                    >
                                        <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center shadow-lg">
                                            <i className="fa-solid fa-arrows-left-right text-white text-xs"></i>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={sliderPos}
                                        onChange={(e) => setSliderPos(Number(e.target.value))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                                    />
                                    <div className="absolute bottom-4 right-4 z-30 flex gap-2">
                                        <button
                                            onClick={handleReset}
                                            className="bg-white/90 backdrop-blur text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold hover:bg-white"
                                        >
                                            Restart
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold hover:bg-black flex items-center gap-2"
                                        >
                                            <i className="fa-solid fa-download"></i>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="relative w-full max-w-[576px] aspect-[45/64] bg-gray-100 rounded-2xl overflow-hidden">
                                    <img
                                        src={userImage}
                                        alt="Aperçu"
                                        className="absolute inset-0 w-full h-full object-contain select-none"
                                    />
                                    <button
                                        onClick={() => setUserImage(null)}
                                        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-900 px-3 py-1 rounded-full text-xs shadow-md border border-gray-200"
                                    >
                                        Change photo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step Indicator under main image area */}
                    <div className="flex items-center justify-center">
                        <div className={`flex items-center ${step === 1 ? 'text-brand-600' : 'text-gray-400'}`}>
                            <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">1</div>
                            <span className="mx-2 font-serif">{I18N.upload_photo[lang]}</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-200 mx-4"></div>
                        <div className={`flex items-center ${step === 2 || resultImage ? 'text-brand-600' : 'text-gray-400'}`}>
                            <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">2</div>
                            <span className="mx-2 font-serif">{I18N.select_garment[lang]}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6 sticky top-8">
                    {!resultImage && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col max-h-[calc(100vh-140px)] overflow-hidden">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 shrink-0">
                                <h3 className="font-serif text-0.5xl text-gray-900">{I18N.select_garment[lang]}</h3>
                                <div className="flex bg-gray-100 p-0.5 rounded-lg">
                                    <button onClick={() => setGarmentMode('collection')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${garmentMode === 'collection' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Collection</button>
                                    <button onClick={() => setGarmentMode('upload')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${garmentMode === 'upload' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Upload</button>
                                </div>
                            </div>
                            {garmentMode === 'upload' && (
                                <div className="mb-6">
                                    <div className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all min-h-[200px] ${customGarmentImage ? 'border-brand-200 bg-brand-50/30' : 'border-gray-200 hover:border-gray-300'}`} onDragOver={handleGarmentDragOver} onDragLeave={handleGarmentDragLeave} onDrop={handleGarmentDrop}>
                                        {customGarmentImage ? (
                                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                                <div className="relative w-full h-40 mb-4"><img src={customGarmentImage} alt="Custom" className="w-full h-full object-contain rounded-lg shadow-sm" /><button onClick={() => setCustomGarmentImage(null)} className="absolute -top-2 -right-2 bg-white text-red-500 w-8 h-8 rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"><i className="fa-solid fa-trash"></i></button></div>
                                                <p className="text-sm font-medium text-brand-700">Garment loaded</p>
                                            </div>
                                        ) : (
                                            <><div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gray-100"><i className="fa-solid fa-shirt text-xl text-gray-400"></i></div><p className="text-sm font-medium text-gray-900 mb-1">Upload Garment</p><button onClick={() => garmentInputRef.current?.click()} className="px-4 py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800 transition-colors">Choose file</button><input type="file" ref={garmentInputRef} className="hidden" accept="image/*" onChange={handleGarmentFileChange} /></>
                                        )}
                                    </div>
                                </div>
                            )}
                            {garmentMode === 'collection' && (
                                <div className="flex-1 flex flex-col min-h-0 overflow-x-auto overflow-y-hidden">
                                    <div className="flex gap-3 pr-2">
                                        {ALL_GARMENTS.map(g => (
                                            <button
                                                key={g.id}
                                                onClick={() => setSelectedGarment(g)}
                                                className={`flex flex-col items-center w-28 flex-shrink-0 rounded-xl border-2 transition-all p-2 cursor-pointer ${selectedGarment?.id === g.id ? 'border-brand-500 bg-brand-50' : 'border-gray-50 hover:border-gray-200'
                                                    }`}
                                            >
                                                <img src={g.image} className="w-full h-28 rounded-lg object-cover bg-gray-100 mb-2" />
                                                <span className="text-[11px] font-semibold text-gray-900 text-center line-clamp-2">
                                                    {g.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {userImage && !resultImage && (
                        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden shrink-0">
                            <div className="mb-6">
                                <h4 className="font-serif text-sm mb-3 opacity-90 uppercase tracking-widest">Output Pose</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {POSES.map(pose => (
                                        <button key={pose.id} onClick={() => setSelectedPose(pose)} className={`flex flex-col items-center p-2 rounded-lg border transition-all ${selectedPose.id === pose.id ? 'bg-white text-brand-700 border-white' : 'bg-brand-700/50 border-transparent text-brand-100'}`}>
                                            <i className={`fa-solid ${pose.icon} mb-1`}></i><span className="text-[9px] font-bold">{pose.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleGenerate} disabled={isProcessing || (garmentMode === 'collection' && !selectedGarment) || (garmentMode === 'upload' && !customGarmentImage)} className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${isProcessing ? 'bg-gray-500/50' : 'bg-accent-500 hover:bg-accent-400 text-white shadow-lg'}`}>
                                {isProcessing ? <><i className="fa-solid fa-spinner fa-spin"></i>{I18N.generating[lang]}</> : <><i className="fa-solid fa-wand-magic-sparkles"></i>{I18N.generate[lang]}</>}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Studio;
