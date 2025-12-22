import Link from "next/link";
import React from "react";

import { AnimatedText } from "@/components/AnimatedText";

type CTA = {
  label: string;
  href: string;
  /** If true, opens in a new tab */
  external?: boolean;
};

type Props = {
  eyebrow: string;
  /**
   * Heading content.
   * - If `animated` is true and this is a string, we use AnimatedText.
   * - Otherwise we render the node directly.
   */
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  animated?: boolean;
  className?: string;
  /** Optional call-to-action buttons (used on Pods page). */
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
};

function CtaLink({ cta, variant }: { cta: CTA; variant: "primary" | "secondary" }) {
  const external = !!cta.external;
  const commonProps = external
    ? { target: "_blank", rel: "noreferrer" }
    : ({} as Record<string, never>);

  if (variant === "primary") {
    return (
      <Link
        href={cta.href}
        {...commonProps}
        className="px-6 py-3 rounded-full bg-white text-navy font-semibold inline-flex items-center justify-center"
      >
        {cta.label}
      </Link>
    );
  }

  return (
    <Link
      href={cta.href}
      {...commonProps}
      className="px-6 py-3 rounded-full border border-white/25 text-white/90 hover:bg-white/5 transition"
    >
      {cta.label}
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  animated = false,
  className,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  const titleIsString = typeof title === "string";

  return (
    <header className={`flex flex-col gap-3 ${alignClasses} ${className ?? ""}`.trim()}>
      <p className="tracking-[0.25em] uppercase text-white/60 text-sm">{eyebrow}</p>

      <div className="max-w-[34ch]">
        {animated && titleIsString ? (
          <h2 className="text-5xl sm:text-6xl font-semibold leading-[0.95]">
            <AnimatedText text={title} />
          </h2>
        ) : (
          <h2 className="text-5xl sm:text-6xl font-semibold leading-[0.95]">{title}</h2>
        )}
      </div>

      {subtitle ? <p className="text-white/70 max-w-[60ch]">{subtitle}</p> : null}

      {ctaPrimary || ctaSecondary ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {ctaPrimary ? <CtaLink cta={ctaPrimary} variant="primary" /> : null}
          {ctaSecondary ? <CtaLink cta={ctaSecondary} variant="secondary" /> : null}
        </div>
      ) : null}
    </header>
  );
}
