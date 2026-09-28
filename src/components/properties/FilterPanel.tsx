import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import type { PropertySearchParams } from "@/lib/propertySearch";
import { propertyTypeOptions } from "@/lib/propertySearch";
import { locations, priceBands, rentBands } from "@/data/site";
import { categories } from "@/data/categories";
import { getAmenityOptions } from "@/data/repository";
import { cn } from "@/lib/utils";

const amenityOptions = getAmenityOptions().slice(0, 10);

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border py-6 first:border-t-0 first:pt-0">
      <p className="meta-label">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-4 py-2.5 text-[0.75rem] transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

const selectClass =
  "h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-foreground";

export function FilterPanel({ search }: { search: PropertySearchParams }) {
  const navigate = useNavigate();

  const update = (patch: Partial<PropertySearchParams>) => {
    navigate({
      to: "/properties",
      search: { ...search, ...patch, page: undefined },
      resetScroll: false,
    });
  };

  const bands = search.purpose === "rent" ? rentBands : priceBands;
  const activeBandIndex = bands.findIndex(
    (b) => b.min === search.minPrice && b.max === search.maxPrice,
  );

  const toggleAmenity = (a: string) => {
    const current = search.amenities ?? [];
    const next = current.includes(a) ? current.filter((x) => x !== a) : [...current, a];
    update({ amenities: next.length ? next : undefined });
  };

  return (
    <div className="text-sm">
      <Group label="Purpose">
        <div className="flex gap-2">
          {(["buy", "rent"] as const).map((p) => (
            <Pill
              key={p}
              active={search.purpose === p}
              onClick={() =>
                update({
                  purpose: search.purpose === p ? undefined : p,
                  minPrice: undefined,
                  maxPrice: undefined,
                })
              }
            >
              {p === "buy" ? "Buy" : "Rent"}
            </Pill>
          ))}
        </div>
      </Group>

      <Group label="Property type">
        <select
          className={selectClass}
          value={search.type ?? ""}
          onChange={(e) =>
            update({ type: (e.target.value || undefined) as PropertySearchParams["type"] })
          }
          aria-label="Property type"
        >
          <option value="">Any type</option>
          {propertyTypeOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Group>

      <Group label="Category">
        <select
          className={selectClass}
          value={search.category ?? ""}
          onChange={(e) => update({ category: e.target.value || undefined })}
          aria-label="Category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </Group>

      <Group label="Location">
        <select
          className={selectClass}
          value={search.location ?? ""}
          onChange={(e) => update({ location: e.target.value || undefined })}
          aria-label="Location"
        >
          <option value="">All of Qatar</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </Group>

      <Group label={search.purpose === "rent" ? "Monthly rent" : "Price"}>
        <select
          className={selectClass}
          value={activeBandIndex > 0 ? String(activeBandIndex) : ""}
          onChange={(e) => {
            const b = bands[Number(e.target.value)];
            update({ minPrice: b?.min, maxPrice: b?.max });
          }}
          aria-label="Price range"
        >
          {bands.map((b, i) => (
            <option key={b.label} value={String(i)}>
              {b.label}
            </option>
          ))}
        </select>
      </Group>

      <Group label="Bedrooms">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <Pill
              key={n}
              active={search.beds === n}
              onClick={() => update({ beds: search.beds === n ? undefined : n })}
            >
              {n}+
            </Pill>
          ))}
        </div>
      </Group>

      <Group label="Bathrooms">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) => (
            <Pill
              key={n}
              active={search.baths === n}
              onClick={() => update({ baths: search.baths === n ? undefined : n })}
            >
              {n}+
            </Pill>
          ))}
        </div>
      </Group>

      <Group label="Minimum area">
        <select
          className={selectClass}
          value={search.minArea ?? ""}
          onChange={(e) => update({ minArea: e.target.value ? Number(e.target.value) : undefined })}
          aria-label="Minimum area"
        >
          <option value="">Any size</option>
          {[800, 1200, 2000, 3500, 6000].map((a) => (
            <option key={a} value={a}>
              {a.toLocaleString()} sq ft +
            </option>
          ))}
        </select>
      </Group>

      <Group label="Amenities">
        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((a) => (
            <Pill
              key={a}
              active={(search.amenities ?? []).includes(a)}
              onClick={() => toggleAmenity(a)}
            >
              {a}
            </Pill>
          ))}
        </div>
      </Group>

      <div className="border-t border-border pt-6">
        <button
          type="button"
          onClick={() =>
            navigate({ to: "/properties", search: { sort: search.sort }, resetScroll: false })
          }
          className="rule-link inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em]"
        >
          <X className="size-3.5" /> Clear all filters
        </button>
      </div>
    </div>
  );
}
