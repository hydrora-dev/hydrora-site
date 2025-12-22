import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";

export const metadata = {

  title: "FAQ",
  description: "HYDRORA FAQ: shipping, launch timeline, subscriptions, hygiene, returns.",
  alternates: { canonical: "/faq" }
};

const faqs = [
  { q: "When does HYDRORA launch?", a: "HYDRORA is pre-launch. Timing will be shared with waitlist members once pilot production and app beta milestones are confirmed." },
  { q: "Will HYDRORA ship across the UK?", a: "UK-wide shipping is the intent. Final courier options, pricing, and delivery windows will be published closer to launch." },
  { q: "Is there a pods subscription?", a: "A monthly delivery plan is in place. Details (pricing, flexibility, pause/cancel terms) will be finalised at launch." },
  { q: "Is App Premium required?", a: "No. Any premium tier would be optional and clearly separated from the core experience." },
  { q: "How is hygiene handled with pods?", a: "Pods are designed for a clean experience. Final cleaning instructions and materials guidance will be published with product documentation at launch." },
  { q: "What is your returns policy?", a: "Returns, warranty, and support policies will be published at launch. During pre-launch, HYDRORA does not accept orders through this site." }
];

export default function FAQPage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-8">
          <Reveal>
            <SectionHeader
              eyebrow="FAQ"
              title="Clear answers, pre-launch."
              subtitle="We keep claims realistic while the product is still being finalised."
            />
          </Reveal>

          <div className="grid gap-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.03}>
                <details className="group rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10">
                  <summary className="cursor-pointer list-none font-display text-lg tracking-tight text-white focus-visible:focus-ring">
                    {f.q}
                    <span className="float-right text-white/55 group-open:text-white">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10">
              <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Need something else?</div>
              <div className="mt-2 text-sm text-white/70">
                If you have a question not covered here, use the contact form and we’ll route it to the right team.
              </div>
            </div>
          </Reveal>
        </section>
      </PageShell>
    </div>
  );
}
