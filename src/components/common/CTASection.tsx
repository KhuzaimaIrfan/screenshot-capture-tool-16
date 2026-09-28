import { motion } from "motion/react";
import { img } from "@/data/images";
import { ActionLink } from "./Action";
import { fadeUp, revealProps, staggerContainer } from "@/utils/motion";

interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function CTASection({
  eyebrow = "Speak with a specialist",
  title = "Let's find your next property.",
  description = "Talk to our consultants about buying, renting or investing in Qatar. We will come back to you the same working day.",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src={img.ctaAerial}
        alt="Aerial view of the Doha waterfront at golden hour"
        loading="lazy"
        width={1920}
        height={1008}
        className="absolute inset-0 size-full object-cover opacity-35"
      />
      <div className="relative container-page section-y">
        <motion.div
          variants={staggerContainer}
          {...revealProps}
          className="max-w-3xl text-primary-foreground"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            {eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} className="display-section mt-5">
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70"
          >
            {description}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <ActionLink to="/properties" variant="accent">
              Explore properties
            </ActionLink>
            <ActionLink to="/contact" variant="light">
              Contact us
            </ActionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
