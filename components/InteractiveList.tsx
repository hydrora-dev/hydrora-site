"use client";

import { useMemo, useState } from "react";
import { MotionButton, MotionDiv } from "@/components/motion";
import { cn } from "@/components/utils";

export type FeatureItem = { title: string; description?: string };

export function InteractiveList({
  items,
  defaultIndex = 0,
  className
}: {
  items: FeatureItem[];
  defaultIndex?: number;
  className?: string;
}) {
  const safe = useMemo(() => items.filter(Boolean), [items]);
  const [active, setActive] = useState(Math.min(defaultIndex, Math.max(0, safe.length - 1)));
  const activeItem = safe[active];

  return (
    <div className={cn("grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-start", className)}>
      <div className="space-y-3">
        {safe.map((it, idx) => {
          const isActive = idx === active;
          return (
            <MotionButton
              key={it.title}
              type="button"
              onClick={() => setActive(idx)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              className={cn(
                "tile tile-pressable w-full text-left",
                isActive ? "border-white/20 bg-white/6" : "border-white/10"
              )}
              aria-pressed={isActive}
            >
              <div className="tile-inner relative p-5">
                <div
                  className={cn(
                    "absolute left-0 top-3 bottom-3 w-[2px] rounded-full transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    background: "linear-gradient(180deg, rgba(0,229,255,0.9), rgba(124,255,0,0.8), rgba(123,45,141,0.9))"
                  }}
                />
                <div className="tile-title">{it.title}</div>
                {it.description ? <div className="mt-1 tile-sub">{it.description}</div> : null}
              </div>
            </MotionButton>
          );
        })}
      </div>

      <MotionDiv
        key={activeItem?.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="tile"
      >
        <div className="tile-inner p-6">
          <div className="text-xs font-semibold tracking-[0.22em] text-white/60">DETAIL</div>
          <div className="mt-2 font-display text-xl tracking-tight text-white">{activeItem?.title}</div>
          <div className="mt-2 text-sm text-white/70">
            {activeItem?.description ||
              "Concept preview. Copy and UI will be confirmed closer to launch."}
          </div>

          <div className="mt-5 h-px bg-white/10" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { k: "Interaction", v: "Tap to select" },
              { k: "Motion", v: "Stagger + micro-lift" },
              { k: "Style", v: "High contrast" },
              { k: "Status", v: "Pre-launch concept" }
            ].map((m) => (
              <div key={m.k} className="tile">
                <div className="tile-inner p-4">
                  <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{m.k}</div>
                  <div className="mt-2 text-sm text-white/80">{m.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionDiv>
    </div>
  );
}
