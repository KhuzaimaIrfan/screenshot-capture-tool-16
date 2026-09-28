import type { Property, Purpose } from "@/types/property";

const numberFormat = new Intl.NumberFormat("en-QA");

export function formatPrice(value: number, purpose?: Purpose) {
  const base = `QAR ${numberFormat.format(value)}`;
  return purpose === "rent" ? `${base}/mo` : base;
}

export function formatArea(value: number) {
  return `${numberFormat.format(value)} sq ft`;
}

export function formatNumber(value: number) {
  return numberFormat.format(value);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const purposeLabel: Record<Purpose, string> = {
  buy: "For sale",
  rent: "For rent",
};

export const typeLabels: Record<string, string> = {
  apartment: "Apartment",
  villa: "Villa",
  townhouse: "Townhouse",
  penthouse: "Penthouse",
  office: "Office",
  shop: "Shop",
  land: "Land",
  warehouse: "Warehouse",
};

export const statusLabels: Record<string, string> = {
  ready: "Ready",
  "off-plan": "Off-plan",
  "under-offer": "Under offer",
  "coming-soon": "Coming soon",
  "under-development": "Under development",
};

export const furnishingLabels: Record<string, string> = {
  furnished: "Furnished",
  "semi-furnished": "Semi-furnished",
  unfurnished: "Unfurnished",
};

export function propertyMetaLine(p: Property) {
  const parts: string[] = [];
  if (p.bedrooms > 0) parts.push(`${p.bedrooms} bed`);
  if (p.bathrooms > 0) parts.push(`${p.bathrooms} bath`);
  parts.push(formatArea(p.area));
  return parts.join(" · ");
}
