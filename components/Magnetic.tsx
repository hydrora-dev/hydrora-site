"use client";

import { MotionButton } from "@/components/motion";
import { cn } from "@/components/utils";
import { useRef } from "react";

/**
 * Lightweight "magnetic" button with a subtle pointer-follow highlight.
 * Designed to be performant (transform-only motion, minimal paint).
 */
export function MagneticButton({
  children,
  className,
  onClick,
  type = "button",
  ariaLabel
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <MotionButton
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-5 py-3 text-sm font-medium tracking-wide",
        "transition-transform duration-200 will-change-transform focus-visible:focus-ring hover-lift",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200",
        "before:bg-[radial-gradient(260px_200px_at_var(--bx)_var(--by),rgba(255,255,255,0.22),transparent_60%)] group-hover:before:opacity-100",
        "after:pointer-events-none after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-200",
        "after:bg-[linear-gradient(90deg,transparent,rgba(0,229,255,0.22),rgba(124,255,0,0.18),transparent)]",
        "group-hover:after:opacity-100 group-hover:after:animate-[shine_1.2s_ease-out]",
        className
      )}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--bx", `${x}%`);
        el.style.setProperty("--by", `${y}%`);
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.removeProperty("--bx");
        el.style.removeProperty("--by");
      }}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      whileHover={{ y: -2 }}
    >
      <span className="relative z-10">{children}</span>
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-35%);
          }
          100% {
            transform: translateX(35%);
          }
        }
      `}</style>
    </MotionButton>
  );
}
