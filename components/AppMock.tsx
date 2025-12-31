"use client";

import { MotionDiv } from "@/components/motion";
import { CountUp } from "@/components/CountUp";

export function AppMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="glass gradient-border relative overflow-hidden rounded-[22px] p-6 shadow-soft lg:col-span-2">
        <MotionDiv
          className="absolute -inset-20 opacity-90"
          animate={{ rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "radial-gradient(700px 520px at 15% 20%, rgba(0,229,255,0.16), transparent 60%), radial-gradient(720px 520px at 75% 35%, rgba(124,255,0,0.12), transparent 62%), radial-gradient(760px 520px at 55% 85%, rgba(123,45,141,0.14), transparent 62%)"
          }}
        />
        <div className="relative">
          <div className="text-xs font-semibold tracking-[0.22em] text-white/60">APP PREVIEW</div>
          <div className="mt-2 font-display text-2xl tracking-tight text-white">Insights, without the noise.</div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
            UI frames are concept mockups: they demonstrate structure, not final design or features.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Frame title="Hydration goal" number={1.6} decimals={1} suffix=" L" sub="Goal for today" />
            <Frame title="Streak" number={6} suffix=" days" sub="Consistency trend" />
            <Frame title="Drink times (demo)" metric="09:20 • 11:05" sub="A simple rhythm snapshot" />
            <Frame title="Last pod (demo)" metric="Berry Burst" sub="Example flavour profile" />
          </div>
        </div>
      </div>

      <div className="glass gradient-border rounded-[22px] p-6 shadow-soft">
        <div className="text-xs font-semibold tracking-[0.22em] text-white/60">FEATURES</div>
        <ul className="mt-4 space-y-3 text-sm text-white/70">
          {[
            "Goals and gentle reminders",
            "Streaks and trend snapshots",
            "Pod tracking (concept)",
            "Dashboard-first design"
          ].map((x) => (
            <li key={x} className="tile hover-lift">
              <div className="tile-inner p-4">{x}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Frame({
  title,
  metric,
  sub,
  number,
  suffix = "",
  prefix = "",
  decimals = 0
}: {
  title: string;
  metric?: string;
  sub: string;
  number?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  return (
    <div className="rounded-[18px] bg-black/20 p-5 ring-1 ring-white/10 transition-transform duration-200 will-change-transform hover:-translate-y-1">
      <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{title}</div>
      <div className="mt-2 font-display text-xl text-white">
        {typeof number === "number" ? <CountUp to={number} decimals={decimals} prefix={prefix} suffix={suffix} /> : metric}
      </div>
      <div className="mt-1 text-xs text-white/55">{sub}</div>
    </div>
  );
}
