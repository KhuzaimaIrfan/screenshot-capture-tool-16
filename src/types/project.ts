export type ProjectStatus = "coming-soon" | "under-development" | "ready";

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  developer: string;
  shortDescription: string;
  description: string;
  status: ProjectStatus;
  startingPrice: number;
  currency: "QAR";
  heroImage: string;
  gallery: string[];
  amenities: string[];
  features: string[];
  handover: string;
  unitTypes: string[];
  availableUnitIds: string[];
  featured: boolean;
  createdAt: string;
}
