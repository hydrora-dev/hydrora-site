"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.06
}: PropsWithChildren<{ className?: string; delay?: number; stagger?: number }>) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: delay, staggerChildren: stagger } }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.99 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      }}
    >
      {children}
    </motion.div>
  );
}
