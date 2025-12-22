import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { InteractiveGlow } from "@/components/InteractiveGlow";
import { PodsGallery } from "@/components/PodsGallery";
import Link from "next/link";

export const metadata = {
  title: "Pods — HYDRORA",
  description:
    "Explore HYDRORA flavour pod families. Each pod remains unrevealed pre‑launch, with an aura‑first profile."
};

export default function PodsPage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-10">
          <SectionHeader
            eyebrow="PODS"
            title={
              <>
                Flavour, modular by design — <span className="text-gradient">aura first</span>.
              </>
            }
            subtitle="Each pod remains unrevealed pre‑launch. Browse flavour families and open a pod to view its profile."
            ctaPrimary={{ label: "Join waitlist", href: "/#waitlist" }}
            ctaSecondary={{ label: "Explore bottle", href: "/bottle" }}
          />

          {/* Intent/intro panel (full-width, not a sidebar widget) */}
          <InteractiveGlow className="glass gradient-border rounded-[24px] p-7 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div>
                <div className="text-xs font-semibold tracking-[0.22em] text-white/60">FLAVOUR BROWSER</div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl tracking-tight text-white">
                  Filter by family, then open a pod.
                </h2>
                <p className="mt-2 text-sm md:text-[15px] text-white/70 max-w-2xl">
                  Pods remain visually unrevealed pre‑launch. Each card carries a flavour aura — open to view the profile,
                  intended mood, and subscription preview mechanics.
                </p>
              </div>

              <div className="tile tile-pressable">
                <div className="tile-inner p-5">
                  <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Subscription preview</div>
                  <div className="mt-2 text-sm text-white/75">
                    Planned monthly delivery with flexible mixes. Pricing and cadence will be confirmed closer to launch.
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="chip">Mix &amp; match</span>
                    <span className="chip">Pause anytime (intent)</span>
                    <span className="chip">No hard claims</span>
                  </div>
                  <div className="mt-4 text-xs text-white/55">
                    Interested in flavours?{" "}
                    <Link href="/#waitlist" className="text-white underline underline-offset-4 hover:opacity-80">
                      Join the waitlist
                    </Link>
                    .
                  </div>
                </div>
              </div>
            </div>
          </InteractiveGlow>

          {/* Gallery: now full-width and breathable */}
          <div className="glass gradient-border rounded-[24px] p-6 md:p-8">
            <PodsGallery variant="full" showPicker />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                k: "Materials",
                v: "Food-safe pods designed for clean storage and consistent dosing (preview)."
              },
              {
                k: "Detection",
                v: "Pod tracking is a planned feature; final implementation to be confirmed."
              },
              {
                k: "Availability",
                v: "Initial families will be limited at launch — expanded range to follow."
              }
            ].map((x) => (
              <div key={x.k} className="tile hover-lift">
                <div className="tile-inner p-5">
                  <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{x.k}</div>
                  <div className="mt-2 text-sm text-white/75">{x.v}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageShell>
    </div>
  );
}
