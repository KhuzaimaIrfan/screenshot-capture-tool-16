export type Purpose = "buy" | "rent";

export type PropertyType =
  | "apartment"
  | "villa"
  | "townhouse"
  | "penthouse"
  | "office"
  | "shop"
  | "land"
  | "warehouse";

export type PropertyStatus = "ready" | "off-plan" | "under-offer";

export type Furnishing = "furnished" | "semi-furnished" | "unfurnished";

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  languages: string[];
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  purpose: Purpose;
  type: PropertyType;
  category: string;
  location: string;
  community: string;
  price: number;
  currency: "QAR";
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: "sqft";
  images: string[];
  thumbnail: string;
  description: string;
  amenities: string[];
  features: string[];
  yearBuilt: number;
  parking: number;
  furnished: Furnishing;
  status: PropertyStatus;
  featured: boolean;
  projectId?: string;
  agent: Agent;
  createdAt: string;
  updatedAt: string;
  referenceNumber: string;
}

export interface PropertyFilters {
  purpose?: Purpose;
  type?: PropertyType;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  minArea?: number;
  amenities?: string[];
  sort?: PropertySort;
  query?: string;
}

export type PropertySort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "area-asc"
  | "area-desc";
