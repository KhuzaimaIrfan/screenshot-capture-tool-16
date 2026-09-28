import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/format";
import { fadeUp } from "@/utils/motion";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.article variants={fadeUp} className="group relative flex flex-col">
      <div className="media-frame aspect-[16/10]">
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="lazy"
          width={1600}
          height={1000}
          className="size-full object-cover group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.16em]">
          <span className="text-accent">{post.category}</span>
          <span className="text-muted-foreground">{post.readingTime} min read</span>
        </div>
        <h3 className="mt-3 font-display text-xl leading-snug">
          <Link to="/blog/$postId" params={{ postId: post.slug }}>
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
      </div>
    </motion.article>
  );
}
