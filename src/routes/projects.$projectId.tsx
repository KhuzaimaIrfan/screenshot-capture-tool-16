import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, CalendarClock, Building2, Coins } from "lucide-react";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ImageGallery } from "@/components/properties/ImageGallery";
import { InquiryForm } from "@/components/common/InquiryForm";
import { PropertyCard } from "@/components/common/PropertyCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/States";
import { ActionLink } from "@/components/common/Action";
import { CTASection } from "@/components/common/CTASection";
import { getProjectById, getPropertiesByIds } from "@/data/repository";
import { formatPrice, statusLabels } from "@/lib/format";
import { EASE_EDITORIAL, fadeUp, revealProps, staggerContainer } from "@/utils/motion";

export const Route = createFileRoute("/projects/$projectId")({
  loader: async ({ params }) => {
    const project = await getProjectById(params.projectId);
    if (!project) throw notFound();
    const units = await getPropertiesByIds(project.availableUnitIds);
    return { project, units };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Development unavailable | Al Noor" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title}, ${project.location} | Al Noor`;
    return {
      meta: [
        { title },
        { name: "description", content: project.shortDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: project.shortDescription },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page section-y">
      <EmptyState
        title="This development is no longer available."
        description="It may have completed or been withdrawn from marketing."
        actions={
          <ActionLink to="/projects" variant="solid" size="sm">
            See current developments
          </ActionLink>
        }
      />
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project, units } = Route.useLoaderData();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.3, ease: EASE_EDITORIAL }}
          src={project.heroImage}
          alt={project.title}
          fetchPriority="high"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="overlay-ink absolute inset-0" />
        <div className="container-page relative py-24 md:py-32">
          <div className="[&_*]:text-primary-foreground/70">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Developments", to: "/projects" },
                { label: project.title },
              ]}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_EDITORIAL, delay: 0.1 }}
            className="mt-8 max-w-3xl"
          >
            <p className="eyebrow text-accent">{statusLabels[project.status]}</p>
            <h1 className="display-hero mt-5 text-primary-foreground">{project.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70">
              {project.shortDescription}
            </p>
            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { icon: Coins, label: "From", value: formatPrice(project.startingPrice) },
                { icon: CalendarClock, label: "Handover", value: project.handover },
                { icon: Building2, label: "Developer", value: project.developer },
                { icon: Building2, label: "Location", value: project.location },
              ].map((item) => (
                <div key={item.label} className="border-t border-primary-foreground/25 pt-4">
                  <dt className="meta-label text-primary-foreground/50">{item.label}</dt>
                  <dd className="mt-2 text-sm text-primary-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <motion.div variants={staggerContainer} {...revealProps}>
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-2xl">The development</h2>
              <p className="mt-5 whitespace-pre-line text-base leading-[1.85] text-muted-foreground">
                {project.description}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12">
              <h3 className="font-display text-2xl">Unit types</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.unitTypes.map((u) => (
                  <li key={u} className="border border-border px-4 py-2.5 text-[0.75rem]">
                    {u}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12">
              <h3 className="font-display text-2xl">Features</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12">
              <h3 className="font-display text-2xl">Amenities</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.amenities.map((a) => (
                  <li
                    key={a}
                    className="border border-border px-4 py-2.5 text-[0.75rem] text-muted-foreground"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <aside>
            <div className="sticky top-28 border border-border bg-card p-7">
              <p className="meta-label">Register interest</p>
              <h2 className="mt-3 font-display text-2xl">Request the brochure</h2>
              <div className="mt-6">
                <InquiryForm compact context={`${project.title} in ${project.location}`} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-y bg-secondary/60">
        <div className="container-page">
          <SectionHeading eyebrow="Gallery" title="Inside the development" />
          <div className="mt-12">
            <ImageGallery images={project.gallery} title={project.title} />
          </div>
        </div>
      </section>

      {units.length > 0 && (
        <section className="section-y">
          <div className="container-page">
            <SectionHeading eyebrow="Availability" title="Units currently released" />
            <motion.div
              variants={staggerContainer}
              {...revealProps}
              className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {units.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
