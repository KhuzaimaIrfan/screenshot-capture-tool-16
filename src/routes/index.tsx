import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Hero } from "@/components/home/Hero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PropertyCard } from "@/components/common/PropertyCard";
import { CategoryCard } from "@/components/common/CategoryCard";
import { BlogCard } from "@/components/common/BlogCard";
import { ProjectCarousel } from "@/components/common/ProjectCarousel";
import { TestimonialCarousel } from "@/components/common/TestimonialCarousel";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { CTASection } from "@/components/common/CTASection";
import { ActionLink } from "@/components/common/Action";
import { fadeUp, imageReveal, revealProps, staggerContainer } from "@/utils/motion";
import { popularSearches, processSteps, stats } from "@/data/site";
import {
  getBlogPosts,
  getCategories,
  getFeaturedProjects,
  getFeaturedProperties,
  getServices,
  getTestimonials,
} from "@/data/repository";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [featured, projects, categories, services, testimonials, posts] = await Promise.all([
      getFeaturedProperties(6),
      getFeaturedProjects(4),
      getCategories(),
      getServices(),
      getTestimonials(),
      getBlogPosts(),
    ]);
    return { featured, projects, categories, services, testimonials, posts: posts.slice(0, 3) };
  },
  head: () => ({
    meta: [
      { title: "Al Noor Property Consultants — Premium Qatar Real Estate" },
      {
        name: "description",
        content:
          "Find apartments, villas, offices and new developments across Doha, Lusail and The Pearl Qatar, advised by specialists who work these communities daily.",
      },
      { property: "og:title", content: "Al Noor Property Consultants — Premium Qatar Real Estate" },
      {
        property: "og:description",
        content:
          "Premium residential, commercial and investment property across Qatar, with consultants who know each community first-hand.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { featured, projects, categories, services, testimonials, posts } = Route.useLoaderData();

  return (
    <>
      <Hero />

      {/* Featured developments */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Developments"
            title="New addresses taking shape across Doha"
            intro="From completed island residences to the final off-plan release in the Lusail marina, these are the developments we currently represent."
            action={
              <ActionLink to="/projects" variant="ghost" size="bare" className="rule-link">
                All developments <ArrowRight className="size-4" />
              </ActionLink>
            }
          />
          <div className="mt-14">
            <ProjectCarousel projects={projects} />
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="section-y bg-secondary/60">
        <div className="container-page">
          <SectionHeading
            eyebrow="Selected listings"
            title="Properties we are currently advising on"
            action={
              <ActionLink to="/properties" variant="outline" size="sm">
                View all properties
              </ActionLink>
            }
          />
          <motion.div
            variants={staggerContainer}
            {...revealProps}
            className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Browse by type"
            title="Every asset class in the Qatar market"
            intro="Residential, commercial and industrial instructions, organised the way buyers and tenants actually search."
          />
          <motion.div
            variants={staggerContainer}
            {...revealProps}
            className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services — editorial */}
      <section className="section-y bg-secondary/60">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Four disciplines, one consultancy"
            intro="We work across the full life of a property — from the first viewing to the quarterly management statement."
          />
          <div className="mt-16 space-y-20 md:space-y-28">
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
                  <p className="font-display text-5xl text-bronze-soft">{service.number}</p>
                  <h3 className="mt-5 font-display text-[1.75rem] leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                  <Link
                    to="/services"
                    className="rule-link mt-7 inline-flex text-[0.75rem] uppercase tracking-[0.16em]"
                  >
                    Learn more <ArrowUpRight className="size-3.5" />
                  </Link>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="A process without surprises" />
          <motion.ol
            variants={staggerContainer}
            {...revealProps}
            className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step) => (
              <motion.li key={step.number} variants={fadeUp} className="group bg-background p-8">
                <span className="meta-label text-accent">{step.number}</span>
                <div className="mt-6 h-px w-full bg-border">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="block h-px origin-left bg-accent"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Market statistics */}
      <section className="bg-ink">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="The practice"
            title="Twelve years inside the Qatar market"
            tone="inverse"
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <AnimatedCounter key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Clients" title="What people say after working with us" />
          <div className="mt-14">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* Popular searches */}
      <section className="border-y border-border bg-secondary/60 py-14">
        <div className="container-page">
          <p className="meta-label">Popular searches</p>
          <motion.div
            variants={staggerContainer}
            {...revealProps}
            className="mt-6 flex flex-wrap gap-x-8 gap-y-3"
          >
            {popularSearches.map((s) => (
              <motion.span key={s.label} variants={fadeUp}>
                <Link
                  to={s.to}
                  search={s.search}
                  className="rule-link text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </Link>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Insights */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Insights"
            title="Reading the Qatar market"
            action={
              <ActionLink to="/blog" variant="ghost" size="bare" className="rule-link">
                All insights <ArrowRight className="size-4" />
              </ActionLink>
            }
          />
          <motion.div
            variants={staggerContainer}
            {...revealProps}
            className="mt-14 grid gap-x-7 gap-y-12 md:grid-cols-3"
          >
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
