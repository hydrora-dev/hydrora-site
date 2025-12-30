"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({
  to,
  durationMs = 900,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  ariaLabel
}: {
  to: number;
  durationMs?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  const formatted = useMemo(() => {
    const v = Number.isFinite(value) ? value : 0;
    return `${prefix}${v.toFixed(decimals)}${suffix}`;
  }, [value, decimals, prefix, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    // Observe a real DOM box (inline spans can be inconsistent for IO thresholds in some layouts)
    el.style.display = "inline-block";

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started.current) return;

        started.current = true;
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = easeOutCubic(t);
          setValue(to * eased);
          if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} style={{ display: "inline-block" }} className={className} aria-label={ariaLabel}>
      {formatted}
    </span>
  );
}
