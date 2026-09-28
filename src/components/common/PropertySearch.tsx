import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { locations, priceBands, rentBands } from "@/data/site";
import { propertyTypeOptions } from "@/lib/propertySearch";
import type { Purpose, PropertyType } from "@/types/property";
import { cn } from "@/lib/utils";

const bedOptions = [
  { value: "", label: "Any beds" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col justify-center px-5 py-3.5 text-left", className)}>
      <span className="meta-label">{label}</span>
      <span className="mt-1.5">{children}</span>
    </label>
  );
}

const selectClass =
  "w-full cursor-pointer appearance-none bg-transparent text-sm text-foreground outline-none";

export function PropertySearch({ tone = "light" }: { tone?: "light" | "plain" }) {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState<Purpose>("buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [band, setBand] = useState("");
  const [beds, setBeds] = useState("");

  const bands = purpose === "rent" ? rentBands : priceBands;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const selected = bands[Number(band) || 0];
    navigate({
      to: "/properties",
      search: {
        purpose,
        location: location || undefined,
        type: (type || undefined) as PropertyType | undefined,
        minPrice: selected?.min,
        maxPrice: selected?.max,
        beds: beds ? Number(beds) : undefined,
      },
    });
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex" role="tablist" aria-label="Search purpose">
        {(["buy", "rent"] as Purpose[]).map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={purpose === p}
            onClick={() => {
              setPurpose(p);
              setBand("");
            }}
            className={cn(
              "h-12 min-w-28 text-[0.6875rem] uppercase tracking-[0.18em] transition-colors",
              purpose === p
                ? "bg-background text-foreground"
                : tone === "light"
                  ? "bg-ink/45 text-primary-foreground/80 backdrop-blur-sm hover:bg-ink/60"
                  : "bg-secondary text-muted-foreground hover:bg-muted",
            )}
          >
            {p === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 divide-y divide-border bg-background md:grid-cols-[1.2fr_1fr_1.2fr_0.9fr_auto] md:divide-x md:divide-y-0">
        <Field label="Location">
          <select
            className={selectClass}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Location"
          >
            <option value="">All of Qatar</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Property type">
          <select
            className={selectClass}
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Property type"
          >
            <option value="">Any type</option>
            {propertyTypeOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={purpose === "rent" ? "Monthly rent" : "Price"}>
          <select
            className={selectClass}
            value={band}
            onChange={(e) => setBand(e.target.value)}
            aria-label="Price range"
          >
            {bands.map((b, i) => (
              <option key={b.label} value={String(i)}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Bedrooms">
          <select
            className={selectClass}
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            aria-label="Bedrooms"
          >
            {bedOptions.map((b) => (
              <option key={b.label} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>

        <button
          type="submit"
          className="flex h-14 items-center justify-center gap-2.5 bg-foreground px-8 text-[0.6875rem] uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent hover:text-accent-foreground md:h-auto"
        >
          <Search className="size-4" strokeWidth={1.5} />
          Search
        </button>
      </div>
    </form>
  );
}
