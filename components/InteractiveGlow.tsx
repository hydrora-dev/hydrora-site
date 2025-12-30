"use client";

import { cn } from "@/components/utils";
import { useRef } from "react";

export function InteractiveGlow({
  children,
  className,
  intensity = 1
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden transition-transform duration-200 will-change-transform",
        "[transform-style:preserve-3d]",
        className
      )}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
        el.style.setProperty("--mi", String(intensity));
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.removeProperty("--mx");
        el.style.removeProperty("--my");
        el.style.removeProperty("--mi");
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [--mx:50%] [--my:30%] [--mi:1]"
        style={{
          backgroundImage:
            "radial-gradient(800px 560px at var(--mx) var(--my), rgba(0,229,255,0.22), transparent 60%), radial-gradient(820px 580px at calc(var(--mx) + 12%) calc(var(--my) + 10%), rgba(124,255,0,0.18), transparent 62%), radial-gradient(860px 580px at calc(var(--mx) - 10%) calc(var(--my) + 18%), rgba(123,45,141,0.18), transparent 62%)"
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-300 [--mx:50%] [--my:30%] [--mi:1]"
        style={{
          backgroundImage:
            "conic-gradient(from 180deg at var(--mx) var(--my), rgba(0,229,255,0.0), rgba(0,229,255,0.22), rgba(124,255,0,0.18), rgba(123,45,141,0.18), rgba(0,229,255,0.0))",
          filter: "blur(26px)",
          mixBlendMode: "screen"
        }}
      />
      <div className="relative z-10">{children}</div>
      <style jsx>{`
        div.group:hover { transform: translateY(-3px); }
        div.group:hover > div[aria-hidden] { opacity: calc(0.85 * var(--mi)); }
      `}</style>
    </div>
  );
}
