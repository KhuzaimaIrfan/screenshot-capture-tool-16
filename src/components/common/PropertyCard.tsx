import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Bath, BedDouble, Heart, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/types/property";
import { formatArea, formatPrice, purposeLabel } from "@/lib/format";
import { useFavorites } from "@/hooks/useFavorites";
import { fadeUp } from "@/utils/motion";
import { cn } from "@/lib/utils";

export function PropertyCard({ property }: { property: Property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(property.id);

  return (
    <motion.article variants={fadeUp} className="group relative flex flex-col">
      <div className="media-frame aspect-[4/3]">
        <img
          src={property.thumbnail}
          alt={property.title}
          loading="lazy"
          width={1600}
          height={1200}
          className="size-full object-cover group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="bg-background/92 px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-foreground backdrop-blur-sm">
            {purposeLabel[property.purpose]}
          </span>
          <button
            type="button"
            aria-label={saved ? "Remove from saved" : "Save property"}
            aria-pressed={saved}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
            className="flex size-11 items-center justify-center bg-background/92 backdrop-blur-sm transition-colors hover:text-accent"
          >
            <motion.span
              key={String(saved)}
              initial={{ scale: 0.72 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 16 }}
              className="flex"
            >
              <Heart
                className={cn("size-[1.0625rem]", saved && "fill-accent text-accent")}
                strokeWidth={1.5}
              />
            </motion.span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-x border-b border-border bg-card px-5 pb-5 pt-5 transition-shadow duration-500 group-hover:shadow-card">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display-card">
            <Link to="/properties/$propertyId" params={{ propertyId: property.slug }}>
              <span className="absolute inset-0" aria-hidden />
              {property.title}
            </Link>
          </h3>
          <ArrowUpRight className="mt-1 size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" strokeWidth={1.5} />
          {property.community}, {property.location}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-[0.8125rem] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-4" strokeWidth={1.25} />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="size-4" strokeWidth={1.25} />
              {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Maximize className="size-4" strokeWidth={1.25} />
            {formatArea(property.area)}
          </span>
        </div>

        <p className="mt-auto pt-5 font-display text-2xl">
          {formatPrice(property.price, property.purpose)}
        </p>
      </div>
    </motion.article>
  );
}
