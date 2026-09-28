import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { CTASection } from "@/components/common/CTASection";
import { TestimonialCarousel } from "@/components/common/TestimonialCarousel";
import { getTestimonials } from "@/data/repository";
import { site, stats, team, values } from "@/data/site";
import { fadeUp, revealProps, staggerContainer } from "@/utils/motion";
import { img } from "@/data/images";

export const Route = createFileRoute("/about")({
  loader: async () => ({ testimonials: await getTestimonials() }),
  head: () => ({
    meta: [
      { title: "About Al Noor Property Consultants | Doha, Qatar" },
      {
        name: "description",
        content:
          "A Doha property consultancy working West Bay, Lusail, The Pearl and Msheireb since 2014, with consultants assigned to each community.",
      },
      { property: "og:title", content: "About Al Noor Property Consultants | Doha, Qatar" },
      {
        property: "og:description",
        content: "Who we are, how we work, and the people you will deal with.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { testimonials } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A consultancy built around Doha's communities"
        intro="Since 2014 we have advised residents, investors and occupiers across Qatar — one consultant per community, accountable for what they recommend."
        image={img.aboutTeam}
        imageAlt="The Al Noor team in their West Bay office"
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <section className="bg-ink">
        <div className="container-page section-y">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <AnimatedCounter key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we work"
            title="Four commitments we hold to"
            intro="They are unremarkable on paper. Holding to them consistently is what clients notice."
          />
          <motion.div
            variants={staggerContainer}
            {...revealProps}
            className="mt-14 grid gap-px bg-border sm:grid-cols-2"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="bg-background p-8 md:p-10">
                <h3 className="font-display text-2xl">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-y bg-secondary/60">
        <div className="container-page">
          <SectionHeading eyebrow="The team" title="People you will actually deal with" />
          <motion.div
            variants={staggerContainer}
            {...revealProps}
            className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeUp} className="border-t border-border pt-6">
                <h3 className="font-display text-xl">{member.name}</h3>
                <p className="meta-label mt-2 text-accent">{member.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-16 max-w-xl text-xs leading-relaxed text-muted-foreground">
            {site.licence}. Registered office: {site.address}.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Clients" title="In their words" />
          <div className="mt-14">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
