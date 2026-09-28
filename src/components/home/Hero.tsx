import { motion } from "motion/react";
import { img } from "@/data/images";
import { PropertySearch } from "@/components/common/PropertySearch";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { EASE_EDITORIAL } from "@/utils/motion";
import { cn } from "@/lib/utils";

const line = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EDITORIAL } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={img.heroDoha}
          alt="The Doha West Bay skyline at dusk seen across the Corniche"
          width={1920}
          height={1200}
          fetchPriority="high"
          className={cn("size-full object-cover", !reduced && "ken-burns")}
        />
        <div className="overlay-ink absolute inset-0" />
      </div>

      <div className="container-page pb-10 pt-32 md:pb-14">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.p variants={line} className="eyebrow text-accent">
            Qatar Real Estate
          </motion.p>
          <motion.h1
            variants={line}
            className="display-hero mt-6 text-primary-foreground"
          >
            Find a place that
            <br />
            feels like yours.
          </motion.h1>
          <motion.p
            variants={line}
            className="mt-7 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg"
          >
            Discover premium residential, commercial and investment property across Doha, Lusail
            and The Pearl — advised by consultants who work these communities every day.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72, ease: EASE_EDITORIAL }}
          className="mt-12 shadow-lift md:mt-16"
        >
          <PropertySearch />
        </motion.div>
      </div>
    </section>
  );
}
