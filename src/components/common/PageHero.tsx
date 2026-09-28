import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_EDITORIAL } from "@/utils/motion";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, intro, image, imageAlt, crumbs, children }: Props) {
  const dark = Boolean(image);

  return (
    <section className={`relative isolate overflow-hidden ${dark ? "bg-ink" : "bg-secondary/60"}`}>
      {image && (
        <>
          <motion.img
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 1.2, ease: EASE_EDITORIAL }}
            src={image}
            alt={imageAlt ?? ""}
            width={1920}
            height={1000}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="overlay-ink absolute inset-0" />
        </>
      )}
      <div className="container-page relative py-20 md:py-28">
        {crumbs && (
          <div className={dark ? "[&_*]:text-primary-foreground/70" : ""}>
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_EDITORIAL, delay: 0.08 }}
          className="mt-8 max-w-3xl"
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1
            className={`display-section mt-5 ${dark ? "text-primary-foreground" : "text-foreground"}`}
          >
            {title}
          </h1>
          {intro && (
            <p
              className={`mt-6 max-w-xl text-base leading-relaxed ${
                dark ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
            >
              {intro}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
