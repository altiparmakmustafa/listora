export type PlatformType = 'Trendyol' | 'Hepsiburada' | 'N11' | 'Etsy';

export type ToneType = 'Profesyonel' | 'Samimi' | 'İkna edici' | 'Minimal';

export type LanguageType = 'tr' | 'en';

export interface ProductFormData {
  title: string;
  category: string;
  features: string;
  targetAudience: string;
  tone: ToneType;
  platform: PlatformType;
  language: LanguageType;
}

export interface GeneratedResult {
  title: string;
  titleCharLimit: number;
  description: string;
  bulletPoints: string[];
  tags: string[];
  platform: PlatformType;
  tone: ToneType;
  language: LanguageType;
  generatedAt: string;
}

export type ActiveScreen = 'landing' | 'results' | 'limit' | 'skeleton';

export interface PresetSample {
  id: string;
  label: string;
  category: string;
  data: ProductFormData;
}
