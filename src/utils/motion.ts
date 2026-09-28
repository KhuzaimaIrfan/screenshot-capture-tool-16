import type { Variants, Transition } from "motion/react";

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = {
  duration: 0.6,
  ease: EASE_EDITORIAL,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: baseTransition },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EDITORIAL } },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: baseTransition },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE_EDITORIAL } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = fadeUp;

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_EDITORIAL } },
};

export const drawerTransition: Transition = { duration: 0.42, ease: EASE_EDITORIAL };
export const modalTransition: Transition = { duration: 0.3, ease: EASE_EDITORIAL };
export const counterTransition: Transition = { duration: 1.8, ease: "easeOut" };

/** Standard viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

export const revealProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: viewportOnce,
} as const;
