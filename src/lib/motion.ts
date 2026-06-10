import type { Variants } from "motion/react";

/** House easing — same curve the CSS animations use. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Parent container that staggers its variant children. */
export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Standard scroll-reveal item: fade + rise. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Reveal once, slightly before the element fully enters the viewport. */
export const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;
