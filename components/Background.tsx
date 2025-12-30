"use client";

import { MotionDiv } from "@/components/motion";
import { useEffect, useMemo, useState } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function AmbientBackground() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = clamp(e.clientX / window.innerWidth, 0, 1);
      const y = clamp(e.clientY / window.innerHeight, 0, 1);
      setPos({ x, y });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const dots = useMemo(() => {
    // lightweight "particles" (DOM dots) to avoid canvas cost
    const count = 34;
    return Array.from({ length: count }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = 1 + Math.random() * 2.2;
      const opacity = 0.12 + Math.random() * 0.16;
      const drift = 10 + Math.random() * 26;
      const dur = 10 + Math.random() * 18;
      return { id: i, top, left, size, opacity, drift, dur };
    });
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <MotionDiv
        className="absolute -inset-20 opacity-90"
        animate={{
          backgroundPosition: `${pos.x * 60}% ${pos.y * 60}%`
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          backgroundImage:
            "radial-gradient(900px 600px at 20% 15%, rgba(0,229,255,0.16), transparent 60%), radial-gradient(700px 520px at 80% 30%, rgba(124,255,0,0.12), transparent 62%), radial-gradient(820px 620px at 55% 85%, rgba(123,45,141,0.14), transparent 62%)",
          backgroundSize: "120% 120%"
        }}
      />
      <div className="noise" />
      {dots.map((d) => (
        <MotionDiv
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity
          }}
          animate={{ y: [0, -d.drift, 0], opacity: [d.opacity, d.opacity + 0.08, d.opacity] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
