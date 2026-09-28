import type { Category } from "@/types/category";
import { img } from "./images";

export const categories: Category[] = [
  {
    id: "c1",
    slug: "apartments",
    title: "Apartments",
    description: "Tower and low-rise living across West Bay, Lusail and The Pearl.",
    image: img.propApartment,
    count: 186,
  },
  {
    id: "c2",
    slug: "villas",
    title: "Villas",
    description: "Standalone and compound villas in Al Waab, Al Sadd and Legtaifiya.",
    image: img.propVilla,
    count: 94,
  },
  {
    id: "c3",
    slug: "townhouses",
    title: "Townhouses",
    description: "Gated family communities with shared amenities and private parking.",
    image: img.propTownhouse,
    count: 41,
  },
  {
    id: "c4",
    slug: "penthouses",
    title: "Penthouses",
    description: "Top-floor residences with full skyline and Gulf frontage.",
    image: img.propPenthouse,
    count: 18,
  },
  {
    id: "c5",
    slug: "offices",
    title: "Offices",
    description: "Grade A commercial floors and fitted suites in the business district.",
    image: img.propOffice,
    count: 63,
  },
  {
    id: "c6",
    slug: "retail",
    title: "Shops & Retail",
    description: "Street-level and mall retail units in high-footfall locations.",
    image: img.projectMsheireb,
    count: 29,
  },
  {
    id: "c7",
    slug: "land",
    title: "Land",
    description: "Freehold and leasehold plots for residential and mixed-use development.",
    image: img.textureFacade,
    count: 22,
  },
  {
    id: "c8",
    slug: "warehouses",
    title: "Warehouses",
    description: "Logistics and light industrial space in Birkat Al Awamer and Al Wakrah.",
    image: img.projectLusail,
    count: 17,
  },
];
