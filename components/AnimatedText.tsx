"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Lightweight letter-by-letter reveal for headings.
 * Uses opacity/transform only (no blur), and respects prefers-reduced-motion.
 */
export function AnimatedText({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.012
}: {
  text: string;
  as?: "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const Wrapper: any = motion[as];

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const letters = Array.from(text);

  return (
    <Wrapper
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger
          }
        }
      }}
      aria-label={text}
      role="text"
    >
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </Wrapper>
  );
}
