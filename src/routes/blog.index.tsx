import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { z } from "zod";

import { PageHero } from "@/components/common/PageHero";
import { BlogCard } from "@/components/common/BlogCard";
import { EmptyState } from "@/components/common/States";
import { CTASection } from "@/components/common/CTASection";
import { getBlogPosts } from "@/data/repository";
import { blogCategories } from "@/data/blog";
import { revealProps, staggerContainer } from "@/utils/motion";
import { img } from "@/data/images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  validateSearch: z.object({ category: z.string().optional() }),
  loaderDeps: ({ search }) => ({ category: search.category }),
  loader: async ({ deps }) => ({ posts: await getBlogPosts(deps.category) }),
  head: () => ({
    meta: [
      { title: "Qatar Property Insights & Market Guides | Al Noor" },
      {
        name: "description",
        content:
          "Market outlooks, buying guides and community profiles for Doha, Lusail, The Pearl Qatar and Msheireb.",
      },
      { property: "og:title", content: "Qatar Property Insights & Market Guides | Al Noor" },
      {
        property: "og:description",
        content: "Practical reading on buying, renting and investing in Qatar property.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { posts } = Route.useLoaderData();
  const { category } = Route.useSearch();
  const navigate = useNavigate();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Reading the Qatar market"
        intro="Guides, market notes and community profiles written by the consultants who work these areas."
        image={img.ctaAerial}
        imageAlt="Aerial view of Doha at dusk"
        crumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap gap-2 border-b border-border pb-6">
            {["All", ...blogCategories].map((c) => {
              const active = c === "All" ? !category : category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() =>
                    navigate({
                      to: "/blog",
                      search: c === "All" ? {} : { category: c },
                      resetScroll: false,
                    })
                  }
                  className={cn(
                    "border px-4 py-2.5 text-[0.75rem] uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {posts.length === 0 ? (
            <div className="mt-14">
              <EmptyState
                title="Nothing published in this category yet."
                description="Try another category — new pieces are added each month."
              />
            </div>
          ) : (
            <motion.div
              key={category ?? "all"}
              variants={staggerContainer}
              {...revealProps}
              className="mt-14 grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
