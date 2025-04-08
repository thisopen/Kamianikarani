export type Language = "ru" | "en";

export interface Product {
  id: string;
  image: string;
  title: string;
  material: string;
  size?: string;
  quantity?: number;
  price: string;
  images?: string[];
}

export interface BaseProduct {
  id: string;
  image: string;
  price: string;
  material: string;
  size?: string;
  images?: string[];
}

export interface Products {
  [key: string]: Product[];
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export interface ProductTranslations {
  [key: string]: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}

export interface TypedTextProps {
  text: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface EmailTemplateParams {
  name: string;
  from_name: string;
  order_details: string;
  message: string;
  [key: string]: string;
}

export interface BaseProducts {
  [key: string]: BaseProduct[];
}

export interface CategoryTranslations {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Network {
  name: string;
  id: string;
}

export interface TranslationKeys {
  viewCatalog: string;
  home: string;
  catalog: string;
  about: string;
  philosophy: string;
  philosophyText: string;
  jewelry: string;
  homeDecor: string;
  posters: string;
  aboutUs: string;
  aboutText1: string;
  aboutText2: string;
  quote: string;
  rights: string;
  tagline: string;
  prev: string;
  next: string;
  orderSuccess: string;
  orderError: string;
  sending: string;
}

export interface CategoryTranslationKeys {
  rings: string;
  earrings: string;
  pendants: string;
  tables: string;
  lamps: string;
  posters: string;
} 