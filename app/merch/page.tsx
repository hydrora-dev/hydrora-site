import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";
import { CATEGORIES, MERCH } from "@/components/merch-data";
import { formatGBP } from "@/components/utils";
import { InteractiveGlow } from "@/components/InteractiveGlow";

export const metadata = {

  title: "Merch",
  description: "A pre‑launch merch storefront, structured for a future Shopify + Printify (or similar) integration.",
  alternates: { canonical: "/merch" }
};

export default function MerchPage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-10">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="MERCH"
                  title="Print-on-demand ready storefront UI."
                  subtitle="A realistic merch experience designed to connect later via Shopify + Printify or a Printify Pop-Up store."
                />

                <InteractiveGlow className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10" intensity={1.05}>
                  <div className="text-sm text-white/70">
                    “Buy now” is a placeholder flow. Integrate checkout via Shopify Storefront API or redirect to a Printify Pop-Up store.
                  </div>
                </InteractiveGlow>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Info title="Size guide" body="Built into product pages." />
                  <Info title="Shipping" body="Placeholder content; final rates at launch." />
                  <Info title="Returns" body="Handled via the final commerce platform." />
                  <Info title="Integration" body="Shopify + Printify recommended." />
                </div>
              </div>

              <InteractiveGlow className="glass gradient-border rounded-[26px] p-7 shadow-soft" intensity={1.25}>
                <div className="text-xs font-semibold tracking-[0.22em] text-white/60">CATEGORIES</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <span key={c} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-[18px] bg-black/20 p-5 ring-1 ring-white/10 text-sm text-white/70">
                  Recommended: Shopify products + Printify fulfilment, then embed storefront via Storefront API for a seamless UX.
                </div>
              </InteractiveGlow>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MERCH.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.03}>
                <Link
                  href={`/merch/${m.slug}`}
                  className="group focus-visible:focus-ring"
                  aria-label={`Open merch product: ${m.name}`}
                >
                  <InteractiveGlow className="glass gradient-border rounded-[18px] p-5 shadow-soft hover-lift" intensity={1.2}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{m.category}</div>
                        <div className="font-display text-lg tracking-tight text-white">{m.name}</div>
                        <div className="text-sm text-white/70">From {formatGBP(m.priceFrom)}</div>
                      </div>
                      <div className="shrink-0 rounded-2xl bg-black/20 p-2 ring-1 ring-white/10">
                        <Image src={m.image} alt={m.name} width={120} height={120} className="h-auto w-[120px]" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-white/65">{m.description}</div>
                    <div className="mt-4 text-xs text-white/55">Open product →</div>
                  </InteractiveGlow>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </PageShell>
    </div>
  );
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 hover-lift">
      <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{title}</div>
      <div className="mt-2 text-sm text-white/70">{body}</div>
    </div>
  );
}
