import { z } from "zod";
import type { PropertyFilters } from "@/types/property";

export const propertySearchSchema = z.object({
  purpose: z.enum(["buy", "rent"]).optional(),
  type: z
    .enum(["apartment", "villa", "townhouse", "penthouse", "office", "shop", "land", "warehouse"])
    .optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  beds: z.coerce.number().optional(),
  baths: z.coerce.number().optional(),
  minArea: z.coerce.number().optional(),
  amenities: z.array(z.string()).optional(),
  sort: z
    .enum(["featured", "newest", "price-asc", "price-desc", "area-asc", "area-desc"])
    .optional(),
  q: z.string().optional(),
  page: z.coerce.number().optional(),
  favorites: z.boolean().optional(),
});

export type PropertySearchParams = z.infer<typeof propertySearchSchema>;

export function searchToFilters(s: PropertySearchParams): PropertyFilters {
  return {
    purpose: s.purpose,
    type: s.type,
    category: s.category,
    location: s.location,
    minPrice: s.minPrice,
    maxPrice: s.maxPrice,
    beds: s.beds,
    baths: s.baths,
    minArea: s.minArea,
    amenities: s.amenities,
    sort: s.sort ?? "featured",
    query: s.q,
  };
}

export function countActiveFilters(s: PropertySearchParams) {
  const keys: (keyof PropertySearchParams)[] = [
    "purpose",
    "type",
    "category",
    "location",
    "minPrice",
    "maxPrice",
    "beds",
    "baths",
    "minArea",
    "q",
  ];
  let n = keys.filter((k) => s[k] !== undefined && s[k] !== "").length;
  n += s.amenities?.length ?? 0;
  return n;
}

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "area-asc", label: "Area: small to large" },
  { value: "area-desc", label: "Area: large to small" },
] as const;

export const propertyTypeOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
  { value: "land", label: "Land" },
  { value: "warehouse", label: "Warehouse" },
] as const;
