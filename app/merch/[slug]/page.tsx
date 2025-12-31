import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/motion";
import { MERCH, type MerchItem } from "@/components/merch-data";
import { formatGBP } from "@/components/utils";
import { SectionHeader } from "@/components/SectionHeader";

export async function generateStaticParams() {
  return MERCH.map((m) => ({ slug: m.slug }));
}

function getItem(slug: string): MerchItem | undefined {
  return MERCH.find((m) => m.slug === slug);
}

export default function MerchDetailPage({ params }: { params: { slug: string } }) {
  const item = getItem(params.slug);
  if (!item) return notFound();

  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-8">
          <Reveal>
            <Link href="/merch" className="text-sm text-white/70 hover:text-white focus-visible:focus-ring">
              ← Back to merch
            </Link>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div className="glass gradient-border rounded-[26px] p-7 shadow-soft">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{item.category}</div>
                    <div className="mt-2 font-display text-3xl tracking-tight text-white">{item.name}</div>
                    <div className="mt-3 text-sm text-white/70">{item.description}</div>
                    <div className="mt-4 text-sm text-white/80">From {formatGBP(item.priceFrom)}</div>
                  </div>
                  <div className="shrink-0 rounded-2xl bg-black/20 p-3 ring-1 ring-white/10">
                    <Image src={item.image} alt={item.name} width={170} height={170} />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Info title="Sizes" body={item.sizes?.join(", ") ?? "TBC"} />
                  <Info title="Colours" body={item.colours?.join(", ") ?? "TBC"} />
                  <Info title="Fulfilment" body="Printify (recommended)" />
                  <Info title="Shipping" body="Rates shown at checkout (placeholder)" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-3">
                <div className="glass gradient-border rounded-[26px] p-7 shadow-soft">
                  <SectionHeader
                    eyebrow="BUY NOW"
                    title="Placeholder checkout flow."
                    subtitle="Connect this button to Shopify checkout, a Printify Pop-Up store, or your preferred commerce stack."
                  />
                  <div className="mt-6 grid gap-3">
                    <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-navy focus-visible:focus-ring">
                      Buy now (placeholder)
                    </button>
                    <button className="rounded-2xl bg-white/5 px-5 py-3 text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/8 focus-visible:focus-ring">
                      Add to basket (placeholder)
                    </button>
                  </div>
                  <div className="mt-4 text-xs text-white/55">
                    Integration note: for a true checkout, use Shopify Storefront API or redirect to a hosted checkout URL.
                  </div>
                </div>

                <SizeGuide />
              </div>
            </Reveal>
          </div>
        </section>
      </PageShell>
    </div>
  );
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{title}</div>
      <div className="mt-2 text-sm text-white/70">{body}</div>
    </div>
  );
}

function SizeGuide() {
  return (
    <div className="glass gradient-border rounded-[26px] p-7 shadow-soft">
      <div className="text-xs font-semibold tracking-[0.22em] text-white/60">SIZE GUIDE</div>
      <div className="mt-2 font-display text-2xl tracking-tight text-white">Simple reference (placeholder).</div>
      <p className="mt-2 text-sm text-white/70">
        Final sizing tables should be sourced from Printify’s selected blanks and synced to Shopify product variants.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 text-sm text-white/70">Chest: TBC</div>
        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 text-sm text-white/70">Length: TBC</div>
        <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 text-sm text-white/70">Fit: Regular</div>
      </div>
    </div>
  );
}
