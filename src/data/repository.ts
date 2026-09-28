/**
 * Repository layer.
 *
 * Every read the UI performs goes through these functions. They are async and
 * shaped like network calls so that swapping the local arrays for a REST or
 * GraphQL client later requires no change above this file.
 */
import { properties } from "./properties";
import { projects } from "./projects";
import { categories } from "./categories";
import { services } from "./services";
import { testimonials } from "./testimonials";
import { blogPosts } from "./blog";
import type { Property, PropertyFilters, PropertySort } from "@/types/property";
import type { Project } from "@/types/project";
import type { BlogPost } from "@/types/blog";

const LATENCY = 220;

function resolve<T>(value: T, delay = LATENCY): Promise<T> {
  return new Promise((r) => setTimeout(() => r(value), delay));
}

/* ---------------- filtering ---------------- */

export function sortProperties(list: Property[], sort: PropertySort = "featured"): Property[] {
  const out = [...list];
  switch (sort) {
    case "newest":
      return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return out.sort((a, b) => a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => b.price - a.price);
    case "area-asc":
      return out.sort((a, b) => a.area - b.area);
    case "area-desc":
      return out.sort((a, b) => b.area - a.area);
    default:
      return out.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.createdAt.localeCompare(a.createdAt),
      );
  }
}

export function applyPropertyFilters(list: Property[], f: PropertyFilters): Property[] {
  const q = f.query?.trim().toLowerCase();
  const filtered = list.filter((p) => {
    if (f.purpose && p.purpose !== f.purpose) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.location && p.location !== f.location) return false;
    if (f.minPrice !== undefined && p.price < f.minPrice) return false;
    if (f.maxPrice !== undefined && p.price > f.maxPrice) return false;
    if (f.beds !== undefined && p.bedrooms < f.beds) return false;
    if (f.baths !== undefined && p.bathrooms < f.baths) return false;
    if (f.minArea !== undefined && p.area < f.minArea) return false;
    if (f.amenities?.length && !f.amenities.every((a) => p.amenities.includes(a))) return false;
    if (q) {
      const haystack = `${p.title} ${p.location} ${p.community} ${p.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
  return sortProperties(filtered, f.sort);
}

/* ---------------- properties ---------------- */

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  return resolve(applyPropertyFilters(properties, filters));
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return resolve(properties.find((p) => p.id === id || p.slug === id) ?? null);
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  return resolve(sortProperties(properties.filter((p) => p.featured)).slice(0, limit));
}

export async function getSimilarProperties(id: string, limit = 3): Promise<Property[]> {
  const base = properties.find((p) => p.id === id || p.slug === id);
  if (!base) return resolve([]);
  const scored = properties
    .filter((p) => p.id !== base.id)
    .map((p) => ({
      p,
      score:
        (p.location === base.location ? 3 : 0) +
        (p.type === base.type ? 2 : 0) +
        (p.purpose === base.purpose ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
  return resolve(scored);
}

export async function getPropertiesByIds(ids: string[]): Promise<Property[]> {
  return resolve(properties.filter((p) => ids.includes(p.id)));
}

export function getAmenityOptions(): string[] {
  return Array.from(new Set(properties.flatMap((p) => p.amenities))).sort();
}

/* ---------------- projects ---------------- */

export async function getProjects(): Promise<Project[]> {
  return resolve(
    [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)),
  );
}

export async function getProjectById(id: string): Promise<Project | null> {
  return resolve(projects.find((p) => p.id === id || p.slug === id) ?? null);
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  return resolve(projects.filter((p) => p.featured).slice(0, limit));
}

/* ---------------- content ---------------- */

export async function getCategories() {
  return resolve(categories);
}

export async function getServices() {
  return resolve(services);
}

export async function getTestimonials() {
  return resolve(testimonials);
}

export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  const list = category && category !== "All" ? blogPosts.filter((p) => p.category === category) : blogPosts;
  return resolve([...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)));
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return resolve(blogPosts.find((p) => p.id === id || p.slug === id) ?? null);
}

export async function getRelatedPosts(id: string, limit = 3): Promise<BlogPost[]> {
  const base = blogPosts.find((p) => p.id === id || p.slug === id);
  if (!base) return resolve([]);
  return resolve(
    blogPosts
      .filter((p) => p.id !== base.id)
      .sort((a, b) => Number(b.category === base.category) - Number(a.category === base.category))
      .slice(0, limit),
  );
}
