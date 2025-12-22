"use client";

import { MotionDiv } from "@/components/motion";
import { CountUp } from "@/components/CountUp";
import { useMemo, useState } from "react";

export function StreakWidget() {
  const [day, setDay] = useState(4);

  const data = useMemo(() => {
    // fake demo: 7 days
    const base = [58, 64, 72, 76, 82, 74, 88];
    return base.map((v, i) => {
      const adjust = (day - 4) * (i % 2 === 0 ? 1.4 : -1.2);
      return Math.max(40, Math.min(96, v + adjust));
    });
  }, [day]);

  const today = data[day];

  return (
    <div className="glass gradient-border rounded-[22px] p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-[0.22em] text-white/60">MINI DEMO</div>
          <div className="mt-2 font-display text-2xl tracking-tight text-white">Hydration streak</div>
          <div className="mt-2 text-sm text-white/70">
            A calm, preview-style widget showing how your consistency could be visualised.
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
          <div className="text-xs text-white/55">Today</div>
          <div className="mt-1"><CountUp to={today} suffix="%" className="font-display text-xl text-white" /></div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 items-end gap-2">
        {data.map((v, i) => (
          <button
            key={i}
            onClick={() => setDay(i)}
            className="group focus-visible:focus-ring rounded-xl p-1"
            aria-label={`Select day ${i + 1}`}
          >
            <MotionDiv
              className="w-full rounded-xl bg-white/10 ring-1 ring-white/10"
              initial={false}
              animate={{ height: `${v}%`, backgroundColor: i === day ? "rgba(0,229,255,0.35)" : "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ minHeight: 20 }}
            />
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
        <div>Example data only. Not a health measure.</div>
        <div className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">7-day view</div>
      </div>
    </div>
  );
}
