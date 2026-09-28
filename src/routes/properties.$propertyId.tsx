import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  BedDouble,
  Bath,
  Ruler,
  Car,
  CalendarDays,
  Sofa,
  MapPin,
  Check,
  Heart,
  Phone,
  Mail,
} from "lucide-react";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ImageGallery } from "@/components/properties/ImageGallery";
import { InquiryForm } from "@/components/common/InquiryForm";
import { PropertyCard } from "@/components/common/PropertyCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/States";
import { ActionLink } from "@/components/common/Action";
import { useFavorites } from "@/hooks/useFavorites";
import { getPropertyById, getSimilarProperties } from "@/data/repository";
import {
  formatArea,
  formatDate,
  formatPrice,
  furnishingLabels,
  purposeLabel,
  statusLabels,
  typeLabels,
} from "@/lib/format";
import { fadeUp, revealProps, staggerContainer } from "@/utils/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/properties/$propertyId")({
  loader: async ({ params }) => {
    const property = await getPropertyById(params.propertyId);
    if (!property) throw notFound();
    const similar = await getSimilarProperties(property.id, 3);
    return { property, similar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Property unavailable | Al Noor" }, { name: "robots", content: "noindex" }],
      };
    }
    const { property } = loaderData;
    const title = `${property.title}, ${property.location} | Al Noor`;
    const description = property.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: PropertyNotFound,
  component: PropertyDetail,
});

function PropertyNotFound() {
  return (
    <div className="container-page section-y">
      <EmptyState
        title="This property is no longer listed."
        description="It may have been sold, let, or withdrawn. Our current instructions are all here."
        actions={
          <ActionLink to="/properties" search={{}} variant="solid" size="sm">
            Browse all properties
          </ActionLink>
        }
      />
    </div>
  );
}

function PropertyDetail() {
  const { property, similar } = Route.useLoaderData();
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(property.id);

  const facts = [
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms || "—" },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms || "—" },
    { icon: Ruler, label: "Area", value: formatArea(property.area) },
    { icon: Car, label: "Parking", value: `${property.parking} spaces` },
    { icon: CalendarDays, label: "Year built", value: property.yearBuilt },
    { icon: Sofa, label: "Furnishing", value: furnishingLabels[property.furnished] },
  ];

  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Properties", to: "/properties" },
            { label: property.title },
          ]}
        />
      </div>

      <section className="container-page mt-8">
        <ImageGallery images={property.images} title={property.title} />
      </section>

      <section className="container-page mt-14 pb-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <motion.div variants={staggerContainer} {...revealProps}>
            <motion.div variants={fadeUp}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-foreground px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-background">
                  {purposeLabel[property.purpose]}
                </span>
                <span className="border border-border px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {statusLabels[property.status]}
                </span>
                <span className="text-xs text-muted-foreground">
                  Ref. {property.referenceNumber}
                </span>
              </div>

              <h1 className="display-section mt-6">{property.title}</h1>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {property.community}, {property.location}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-border py-6">
                <p className="font-display text-4xl">
                  {formatPrice(property.price, property.purpose)}
                </p>
                <button
                  type="button"
                  onClick={() => toggle(property.id)}
                  aria-pressed={saved}
                  className={cn(
                    "flex h-11 items-center gap-2.5 border px-5 text-[0.75rem] uppercase tracking-[0.14em] transition-colors",
                    saved
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border hover:border-foreground",
                  )}
                >
                  <Heart className={cn("size-4", saved && "fill-current")} />
                  {saved ? "Saved" : "Save property"}
                </button>
              </div>
            </motion.div>

            <motion.dl
              variants={fadeUp}
              className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-3"
            >
              {facts.map((f) => (
                <div key={f.label} className="bg-background p-5">
                  <f.icon className="size-4 text-accent" />
                  <dt className="meta-label mt-4">{f.label}</dt>
                  <dd className="mt-1.5 text-sm">{f.value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div variants={fadeUp} className="mt-14">
              <h2 className="font-display text-2xl">About this property</h2>
              <p className="mt-5 whitespace-pre-line text-base leading-[1.85] text-muted-foreground">
                {property.description}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14">
              <h2 className="font-display text-2xl">Features</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14">
              <h2 className="font-display text-2xl">Amenities</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <li
                    key={a}
                    className="border border-border px-4 py-2.5 text-[0.75rem] text-muted-foreground"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
              Listed {formatDate(property.createdAt)} · Updated {formatDate(property.updatedAt)} ·{" "}
              {typeLabels[property.type]} in {property.location}
            </motion.div>
          </motion.div>

          {/* Agent + enquiry */}
          <aside>
            <div className="sticky top-28 space-y-6">
              <div className="border border-border bg-card p-7">
                <p className="meta-label">Your consultant</p>
                <p className="mt-4 font-display text-2xl">{property.agent.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{property.agent.title}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Speaks {property.agent.languages.join(", ")}
                </p>
                <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                  <a
                    href={`tel:${property.agent.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone className="size-4 text-accent" />
                    {property.agent.phone}
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4 text-accent" />
                    {property.agent.email}
                  </a>
                </div>
              </div>

              <div className="border border-border bg-card p-7">
                <p className="meta-label">Register interest</p>
                <h2 className="mt-3 font-display text-2xl">Arrange a viewing</h2>
                <div className="mt-6">
                  <InquiryForm compact context={`${property.title} (${property.referenceNumber})`} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section-y bg-secondary/60">
          <div className="container-page">
            <SectionHeading eyebrow="Similar" title="You may also consider" />
            <motion.div
              variants={staggerContainer}
              {...revealProps}
              className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
