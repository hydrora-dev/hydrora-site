import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/components/utils";
import { AnimatedText } from "@/components/AnimatedText";

type Cta = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
  className?: string;
  animated?: boolean;
};

/**
 * Premium section header.
 * - Accepts JSX titles (for gradient words) while preserving optional type-safe animation for string titles.
 * - Supports optional CTA buttons.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  className,
  animated = true
}: Props) {
  const canAnimateTitle = animated && typeof title === "string";

  return (
    <header className={cn("space-y-3", className)}>
      {eyebrow ? (
        <div className="text-xs font-semibold tracking-[0.22em] text-white/60">{eyebrow}</div>
      ) : null}

      <h2 className="font-display text-2xl tracking-tight text-white sm:text-3xl md:text-4xl">
        {canAnimateTitle ? <AnimatedText text={title as string} /> : title}
      </h2>

      {subtitle ? (
        <p className="max-w-2xl text-sm leading-relaxed text-white/72 md:text-[15px]">{subtitle}</p>
      ) : null}

      {ctaPrimary || ctaSecondary ? (
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {ctaPrimary ? (
            <Link
              href={ctaPrimary.href}
              aria-label={ctaPrimary.ariaLabel ?? ctaPrimary.label}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-navy shadow-soft transition hover:-translate-y-0.5 hover:bg-white/95 focus-visible:focus-ring"
            >
              {ctaPrimary.label}
            </Link>
          ) : null}

          {ctaSecondary ? (
            <Link
              href={ctaSecondary.href}
              aria-label={ctaSecondary.ariaLabel ?? ctaSecondary.label}
              className="inline-flex items-center justify-center rounded-2xl border border-white/18 bg-white/6 px-5 py-3 text-sm font-semibold text-white/88 transition hover:bg-white/10 hover:-translate-y-0.5 focus-visible:focus-ring"
            >
              {ctaSecondary.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
