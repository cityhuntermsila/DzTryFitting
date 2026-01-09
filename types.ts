export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  STUDIO = 'STUDIO',
  GALLERY = 'GALLERY',
  ABOUT = 'ABOUT',
  PARTNERS = 'PARTNERS',
  SUBSCRIPTION = 'SUBSCRIPTION',
  SECURITY = 'SECURITY',
}

export type Language = 'en' | 'ar';

export interface Garment {
  id: string;
  name: string;
  category: string;
  region: string;
  image: string;
  price: string;
  description: string;
  material: string;
  // Available options
  colors?: string[];
  sizes?: string[];
  // Optional selected attributes for Try-On context
  selectedSize?: string;
  selectedColor?: string;
}

export interface Pose {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}

export interface Landmark {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  label: string;
}

export interface TryOnResult {
  id: string;
  originalImage: string;
  resultImage: string;
  garmentId: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  partnerName: string;
  partnerLogo: string;
  image: string;
  secondaryImage: string; // 2nd photo
  category: string;
  date: string;
  likes: number;
  price: string;
  description: string;
  sizes: string[];
  colors: string[]; // Hex codes
}

export interface Translation {
  [key: string]: {
    en: string;
    ar: string;
  };
}