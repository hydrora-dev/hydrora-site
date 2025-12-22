"use client";

import { MotionDiv } from "@/components/motion";
import { useMemo, useState } from "react";
import { cn } from "@/components/utils";

const steps = [
  { title: "Fill", body: "Start with water—still, chilled, or room temperature." },
  { title: "Pod", body: "Insert a flavour pod. The bottle remains the hero; flavour stays modular." },
  { title: "Sip", body: "Sensing tracks your rhythm—time, pace, and consistency." },
  { title: "Sync", body: "The app turns raw sips into a clear, calm dashboard." },
  { title: "Improve", body: "Set goals, nudge reminders, and build a hydration streak." }
];

export function HowItWorks() {
  const [active, setActive] = useState(0);

  const progress = useMemo(() => ((active + 1) / steps.length) * 100, [active]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        {steps.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(i)}
            className={cn(
              "w-full rounded-2xl p-5 text-left ring-1 ring-white/10 transition focus-visible:focus-ring",
              i === active ? "bg-white text-navy" : "bg-white/5 text-white/70 hover:bg-white/8"
            )}
            aria-label={`Select step ${i + 1}: ${s.title}`}
          >
            <div className="flex items-center justify-between">
              <div className="font-display text-lg tracking-tight">{s.title}</div>
              <div className={cn("text-xs font-semibold tracking-[0.22em]", i === active ? "text-navy/70" : "text-white/45")}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
            <div className={cn("mt-2 text-sm leading-relaxed", i === active ? "text-navy/70" : "text-white/65")}>
              {s.body}
            </div>
          </button>
        ))}
      </div>

      <div className="glass gradient-border relative overflow-hidden rounded-[22px] p-6 shadow-soft">
        <div className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(520px 380px at 20% 20%, rgba(0,229,255,0.16), transparent 60%), radial-gradient(520px 380px at 80% 40%, rgba(124,255,0,0.12), transparent 62%), radial-gradient(520px 380px at 55% 85%, rgba(123,45,141,0.14), transparent 62%)"
          }}
        />
        <div className="relative space-y-4">
          <div className="text-xs font-semibold tracking-[0.22em] text-white/60">INTERACTIVE FLOW</div>
          <div className="font-display text-2xl tracking-tight text-white">A calmer routine, step by step.</div>
          <p className="text-sm leading-relaxed text-white/70">
            HYDRORA is designed to feel premium and quiet: minimal friction, clear feedback, and a product ecosystem that respects your day.
          </p>

          <div className="mt-2 rounded-2xl bg-black/20 p-5 ring-1 ring-white/10">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold tracking-[0.22em] text-white/55">Progress</div>
              <div className="text-xs text-white/55">{active + 1}/{steps.length}</div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <MotionDiv
                className="h-full rounded-full bg-aqua"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="mt-4 text-sm text-white/80">
              <span className="font-semibold">{steps[active].title}:</span> {steps[active].body}
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setActive((v) => Math.max(0, v - 1))}
                className="rounded-2xl bg-white/8 px-4 py-2 text-xs text-white/80 ring-1 ring-white/10 hover:bg-white/10 focus-visible:focus-ring disabled:opacity-40"
                disabled={active === 0}
              >
                Back
              </button>
              <button
                onClick={() => setActive((v) => Math.min(steps.length - 1, v + 1))}
                className="rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-navy focus-visible:focus-ring disabled:opacity-40"
                disabled={active === steps.length - 1}
              >
                Next
              </button>
            </div>
          </div>

          <div className="text-xs text-white/50">
            Interaction is a concept preview; behaviours and capabilities may change pre-launch.
          </div>
        </div>
      </div>
    </div>
  );
}
