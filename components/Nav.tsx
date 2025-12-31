"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/utils";
import { MagneticButton } from "@/components/Magnetic";
import { MotionDiv } from "@/components/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/bottle", label: "Bottle" },
  { href: "/pods", label: "Pods" },
  { href: "/app", label: "App" },
  { href: "/merch", label: "Merch" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function Nav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50">
      <div className="absolute inset-0 bg-navy/65 backdrop-blur-xl" />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group inline-flex items-center gap-3 focus-visible:focus-ring" aria-label="HYDRORA home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <span className="h-2 w-2 rounded-full bg-aqua shadow-[0_0_24px_rgba(0,229,255,0.55)]" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-sm tracking-[0.28em] text-white">HYDRORA</div>
            <div className="text-[11px] text-white/60">Pre-launch</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-xs tracking-wide text-white/70 transition hover:text-white focus-visible:focus-ring",
                  active && "text-white"
                )}
              >
                <span className={cn(active && "relative")}>
                  {l.label}
                  {active && (
                    <MotionDiv
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-6 rounded-full bg-aqua/80"
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#waitlist" className="hidden md:block">
            <MagneticButton className="bg-white text-navy shadow-soft hover:bg-white/95">
              Join Waitlist
            </MagneticButton>
          </Link>
          <Link
            href="/#waitlist"
            className="md:hidden rounded-xl px-3 py-2 text-xs text-white/85 ring-1 ring-white/12 focus-visible:focus-ring"
          >
            Waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
