"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/motion";
import { useMemo, useState } from "react";
import { cn } from "@/components/utils";

export function BottleReveal({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  const [reveal, setReveal] = useState(0);

  const glow = useMemo(() => {
    const a = 0.15 + reveal * 0.35;
    return `radial-gradient(420px 520px at 50% 25%, rgba(0,229,255,${a}), transparent 60%),
            radial-gradient(460px 520px at 65% 65%, rgba(124,255,0,${a * 0.7}), transparent 62%),
            radial-gradient(560px 520px at 35% 75%, rgba(123,45,141,${a * 0.7}), transparent 62%)`;
  }, [reveal]);

  return (
    <MotionDiv
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft",
        className
      )}
      onHoverStart={() => setReveal(1)}
      onHoverEnd={() => setReveal(0)}
      onTap={() => setReveal((v) => (v > 0.5 ? 0 : 1))}
      whileTap={{ scale: 0.99 }}
      role="button"
      tabIndex={0}
      aria-label="Mysterious bottle reveal"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setReveal((v) => (v > 0.5 ? 0 : 1));
      }}
    >
      <MotionDiv
        className="absolute inset-0 opacity-90"
        animate={{ opacity: 0.55 + reveal * 0.45 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundImage: glow }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
      <div className={cn("relative grid place-items-center px-6 py-10", compact ? "min-h-[340px]" : "min-h-[420px]")}>
        <MotionDiv
          animate={{ filter: `brightness(${0.75 + reveal * 0.35})`, opacity: 0.92 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Image
            src="/assets/bottle-silhouette.svg"
            alt="HYDRORA bottle silhouette"
            width={260}
            height={420}
            priority
            className="h-auto w-[220px] sm:w-[250px]"
          />
          <MotionDiv
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/40 ring-1 ring-white/15"
            animate={{ opacity: 0.85 - reveal * 0.35, scale: 1 - reveal * 0.08 }}
            transition={{ duration: 0.45 }}
          >
            <span className="font-display text-4xl text-white/90">?</span>
          </MotionDiv>
          <MotionDiv
            className="absolute inset-0 rounded-[44px]"
            animate={{ boxShadow: reveal ? "0 0 0 1px rgba(255,255,255,0.10), 0 18px 60px rgba(0,229,255,0.10)" : "0 0 0 1px rgba(255,255,255,0.08)" }}
            transition={{ duration: 0.5 }}
          />
        </MotionDiv>

        <div className="mt-6 text-center">
          <div className="text-xs font-semibold tracking-[0.22em] text-white/60">REVEAL SOON</div>
          <div className="mt-2 text-sm text-white/70">
            Hover or tap to catch the rim light. Full details land closer to launch.
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
