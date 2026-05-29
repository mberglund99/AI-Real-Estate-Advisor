export type PropertyType =
  | "single-family"
  | "condo"
  | "townhouse"
  | "multi-family"
  | "land";

export type PropertyCondition = "excellent" | "good" | "fair" | "needs-work";

export interface PropertyDetails {
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize?: string;
  yearBuilt?: number;
  price: number;
  features: string;
  condition: PropertyCondition;
  neighborhoodNotes?: string;
  investmentFocus: boolean;
}

export interface SocialMediaContent {
  instagram: string;
  facebook: string;
  linkedin: string;
  x: string;
}

export interface BuyerPersona {
  name: string;
  description: string;
  motivations: string[];
  budgetRange: string;
}

export interface InvestmentInsights {
  summary: string;
  roiConsiderations: string[];
  marketOutlook: string;
  risks: string[];
}

export interface GeneratedContent {
  listingDescription: string;
  sellingPoints: string[];
  socialMedia: SocialMediaContent;
  buyerPersonas: BuyerPersona[];
  investmentInsights: InvestmentInsights;
}

export const defaultPropertyDetails: PropertyDetails = {
  address: "",
  city: "",
  state: "",
  zip: "",
  propertyType: "single-family",
  bedrooms: 3,
  bathrooms: 2,
  squareFeet: 1800,
  price: 450000,
  features: "",
  condition: "good",
  investmentFocus: false,
};
