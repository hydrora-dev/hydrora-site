"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { MotionDiv, MotionButton } from "@/components/motion";
import { cn } from "@/components/utils";
import { FAMILIES, PODS, type Pod } from "@/components/pods-data";

function PodSilhouette({ glow }: { glow: string }) {
  return (
    <div className="relative grid place-items-center">
      <MotionDiv
        className="absolute -inset-4 rounded-3xl blur-2xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${glow}, transparent 60%)` }}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative rounded-3xl bg-black/25 ring-1 ring-white/10">
        <Image
          src="/assets/pod-silhouette.svg"
          alt="Mystery pod silhouette"
          width={210}
          height={210}
          className="h-auto w-[160px] sm:w-[170px]"
        />
      </div>
    </div>
  );
}

export function PodsGallery({
  initialFamily = "all",
  showPicker = true,
  variant = "panel"
}: {
  initialFamily?: Pod["family"] | "all";
  showPicker?: boolean;
  variant?: "panel" | "full";
}) {
  const [family, setFamily] = useState<Pod["family"] | "all">(initialFamily);
  const [active, setActive] = useState<Pod | null>(null);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  const visible = useMemo(() => {
    if (family === "all") return PODS;
    return PODS.filter((p) => p.family === family);
  }, [family]);

  return (
    <div className="space-y-6">
      {showPicker ? (
        <div className="flex flex-wrap gap-2">
          {FAMILIES.map((f) => (
            <button
              key={f.key}
              onClick={() => setFamily(f.key)}
              className={cn(
                "rounded-2xl px-4 py-2 text-xs ring-1 ring-white/10 transition focus-visible:focus-ring",
                family === f.key ? "bg-white text-navy" : "bg-white/5 text-white/75 hover:bg-white/8"
              )}
              aria-label={`Filter pods: ${f.label}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      ) : null}

      {/*
        Responsive grid tuned for the right-hand panel on /pods.
        Use 2 columns for most breakpoints, 3 only when the panel is wide enough.
      */}
      <div className={cn(
        "grid gap-4",
        variant === "full"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2"
      )}>
        {visible.map((p) => (
          <MotionButton
            key={p.id}
            onClick={() => setActive(p)}
            className="group gradient-border glass relative isolate w-full min-w-0 overflow-hidden rounded-[18px] p-5 text-left focus-visible:focus-ring"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            aria-label={`Open ${p.name} details`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-[0.18em] text-white/55">FLAVOUR POD</div>
                <div className="mt-2 font-display text-lg tracking-tight text-white">{p.name}</div>
                <div className="mt-2 text-sm text-white/65">{p.profile}</div>
              </div>
              <div className="shrink-0">
                <PodSilhouette glow={p.glow} />
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/60">
              <span className="rounded-full bg-white/8 px-3 py-1 ring-1 ring-white/10">Mood: {p.mood}</span>
              <span className="rounded-full bg-white/8 px-3 py-1 ring-1 ring-white/10">Coming soon</span>
            </div>
          </MotionButton>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/65 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Pod details modal"
          onClick={() => setActive(null)}
        >
          <div
            className="glass gradient-border max-w-xl rounded-[22px] p-6 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold tracking-[0.18em] text-white/55">FLAVOUR POD</div>
                <div className="font-display text-2xl tracking-tight text-white">{active.name}</div>
                <div className="text-sm text-white/70">{active.profile}</div>
              </div>
              <div className="shrink-0">
                <PodSilhouette glow={active.glow} />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Taste profile</div>
                <div className="mt-2 text-sm text-white/70">
                  Balanced flavour architecture designed for a clean finish and consistent experience.
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Intended mood</div>
                <div className="mt-2 text-sm text-white/70">
                  <span className="capitalize">{active.mood}</span> — framed for everyday routines, not clinical claims.
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-white/55">
                Availability, flavours, and specifications may change prior to launch.
              </div>
              <button
                onClick={() => setActive(null)}
                className="rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-navy focus-visible:focus-ring"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}