import { Variants } from 'framer-motion';

// ─── Shared Framer Motion animation variants ─────────────────────────────────
// Use these consistently across all sections for a cohesive feel.

/** Standard fade-up reveal. Pass custom `i` (index) for stagger. */
export const REVEAL: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/** Scale + fade reveal for cards and images. */
export const REVEAL_SCALE: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.09,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/** Slide in from left. */
export const REVEAL_LEFT: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/** Slide in from right. */
export const REVEAL_RIGHT: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/** Stagger children container. */
export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Common viewport options for whileInView */
export const VIEWPORT = { once: true, margin: '-80px' } as const;
