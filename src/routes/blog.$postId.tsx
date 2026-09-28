import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BlogCard } from "@/components/common/BlogCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/States";
import { ActionLink } from "@/components/common/Action";
import { CTASection } from "@/components/common/CTASection";
import { getBlogPostById, getRelatedPosts } from "@/data/repository";
import { formatDate } from "@/lib/format";
import { EASE_EDITORIAL, revealProps, staggerContainer } from "@/utils/motion";

export const Route = createFileRoute("/blog/$postId")({
  loader: async ({ params }) => {
    const post = await getBlogPostById(params.postId);
    if (!post) throw notFound();
    const related = await getRelatedPosts(post.id, 3);
    return { post, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable | Al Noor" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Al Noor Insights` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page section-y">
      <EmptyState
        title="We couldn't find that article."
        description="It may have been renamed or removed."
        actions={
          <ActionLink to="/blog" variant="solid" size="sm">
            All insights
          </ActionLink>
        }
      />
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post, related } = Route.useLoaderData();

  return (
    <>
      <article>
        <div className="container-page pt-10">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Insights", to: "/blog" },
              { label: post.title },
            ]}
          />
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
            className="mx-auto mt-10 max-w-3xl"
          >
            <p className="eyebrow">{post.category}</p>
            <h1 className="display-section mt-5">{post.title}</h1>
            <p className="mt-6 text-sm text-muted-foreground">
              {post.author.name} · {post.author.role} · {formatDate(post.publishedAt)} ·{" "}
              {post.readingTime} min read
            </p>
          </motion.header>
        </div>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_EDITORIAL, delay: 0.1 }}
          className="container-page mt-12"
        >
          <div className="media-frame aspect-[16/9]">
            <img
              src={post.featuredImage}
              alt={post.title}
              fetchPriority="high"
              width={1920}
              height={1080}
              className="size-full object-cover"
            />
          </div>
        </motion.figure>

        <div className="container-page">
          <div className="mx-auto mt-14 max-w-3xl pb-20">
            <p className="font-display text-2xl leading-snug">{post.excerpt}</p>
            {post.content.map((section, i) => (
              <section key={i} className="mt-10">
                {section.heading && (
                  <h2 className="font-display text-[1.75rem] leading-tight">{section.heading}</h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mt-5 text-base leading-[1.9] text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-border pt-8">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="border border-border px-4 py-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-y bg-secondary/60">
          <div className="container-page">
            <SectionHeading eyebrow="Keep reading" title="Related insights" />
            <motion.div
              variants={staggerContainer}
              {...revealProps}
              className="mt-14 grid gap-x-7 gap-y-14 md:grid-cols-3"
            >
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
