import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/category";
import { fadeUp } from "@/utils/motion";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div variants={fadeUp} className="group relative">
      <Link
        to="/properties"
        search={{ category: category.slug }}
        className="media-frame block aspect-[3/4]"
      >
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          width={1200}
          height={1600}
          className="size-full object-cover group-hover:scale-[1.07]"
        />
        <div className="overlay-card absolute inset-0 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground transition-transform duration-500 group-hover:-translate-y-1.5">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display text-xl">{category.title}</h3>
              <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.16em] text-primary-foreground/60">
                {category.count} listings
              </p>
            </div>
            <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
