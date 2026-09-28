import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check } from "lucide-react";

import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { getServices } from "@/data/repository";
import { fadeUp, imageReveal, revealProps, staggerContainer } from "@/utils/motion";
import { img } from "@/data/images";

export const Route = createFileRoute("/services")({
  loader: async () => ({ services: await getServices() }),
  head: () => ({
    meta: [
      { title: "Brokerage, Leasing & Advisory Services | Al Noor" },
      {
        name: "description",
        content:
          "Sales and leasing brokerage, property marketing, management and investment advisory for owners and occupiers across Qatar.",
      },
      { property: "og:title", content: "Brokerage, Leasing & Advisory Services | Al Noor" },
      {
        property: "og:description",
        content: "Four property disciplines under one Doha consultancy.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Advice across the life of a property"
        intro="From the first viewing to the quarterly management statement, four disciplines handled by specialists."
        image={img.aboutTeam}
        imageAlt="Consultants reviewing plans in a Doha office"
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="section-y">
        <div className="container-page space-y-24 md:space-y-32">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              variants={staggerContainer}
              {...revealProps}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>figure]:order-2" : ""
              }`}
            >
              <motion.figure variants={imageReveal} className="media-frame aspect-[4/3]">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  width={1600}
                  height={1200}
                  className="size-full object-cover"
                />
              </motion.figure>
              <motion.div variants={fadeUp}>
                <p className="font-display text-5xl text-accent">{service.number}</p>
                <h2 className="mt-5 display-card">{service.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-7 space-y-3">
                  {service.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
