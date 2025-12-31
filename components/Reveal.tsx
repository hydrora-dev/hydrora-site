"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Lightweight scroll-triggered reveal wrapper.
 * Uses opacity + translate + slight scale only (Lighthouse-friendly).
 */
export function Reveal({
  children,
  className,
  delay = 0
}: PropsWithChildren<{ className?: string; delay?: number }>) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
