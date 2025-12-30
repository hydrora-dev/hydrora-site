import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";
import { InteractiveGlow } from "@/components/InteractiveGlow";
import { MagneticButton } from "@/components/Magnetic";

export const metadata = {

  title: "About",
  description: "HYDRORA vision, mission, and brand story.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-12">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="ABOUT"
                  title="A premium hydration brand built with restraint."
                  subtitle="HYDRORA is building a hydration ecosystem designed for consistency—where flavour is modular and insights stay clear."
                />

                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/#waitlist">
                    <MagneticButton className="bg-white text-navy shadow-soft hover:bg-white/95">
                      Join Waitlist
                    </MagneticButton>
                  </Link>
                  <Link href="/bottle" className="rounded-2xl px-5 py-3 text-sm text-white/80 ring-1 ring-white/12 hover:bg-white/5 focus-visible:focus-ring hover-lift">
                    Explore the bottle
                  </Link>
                </div>

                <InteractiveGlow className="rounded-[22px] bg-white/5 p-6 ring-1 ring-white/10" intensity={1.1}>
                  <div className="text-xs font-semibold tracking-[0.18em] text-white/55">What “premium” means here</div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">
                    Premium is not maximal. It’s fewer decisions, cleaner feedback, and a product ecosystem that feels intentional across hardware,
                    consumables, and software.
                  </div>
                </InteractiveGlow>
              </div>

              <Reveal delay={0.08}>
                <div className="grid gap-4">
                  <Block title="Vision" body="Become the most trusted premium hydration ecosystem—where taste and design are supported by thoughtful data." />
                  <Block title="Mission" body="Build a modular system that encourages everyday consistency: bottle, pods, and an app designed to stay out of the way." />
                  <Block title="Principles" body="Minimalism, honest pre-launch communication, privacy-respectful analytics, and a calm interaction model." />
                </div>
              </Reveal>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <InteractiveGlow className="glass gradient-border rounded-[26px] p-7 shadow-soft md:p-10" intensity={1.25}>
              <SectionHeader
                eyebrow="STORY"
                title="Why HYDRORA."
                subtitle="Hydration products often force a choice between aesthetics and function. HYDRORA is built to make that choice unnecessary."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Paragraph title="Taste with intent" body="Flavour pods stay modular and premium—integrated without turning the bottle into a novelty object." />
                <Paragraph title="Data with restraint" body="Tracking should clarify patterns, not create pressure. Insight focuses on consistency and rhythm, not medical outcomes." />
                <Paragraph title="Designed for real routines" body="Micro-interactions are subtle and high-quality. The interface stays calm even when it’s interactive." />
                <Paragraph title="Pre-launch transparency" body="Specs, availability, and capabilities are clearly labelled as provisional where needed—so expectations stay accurate." />
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <Mini title="Privacy-first by default" body="Analytics placeholders exist, but remain off until you choose to enable them." />
                <Mini title="Built for scale" body="A clean Next.js architecture ready for commerce, CRM, and beta rollouts." />
                <Mini title="UK-first, global-ready" body="UK English copy now; localisation and region shipping can be added later." />
              </div>
            </InteractiveGlow>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 lg:grid-cols-2">
              <InteractiveGlow className="rounded-[22px] bg-white/5 p-6 ring-1 ring-white/10" intensity={1.15}>
                <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Pre-launch roadmap (high-level)</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li className="rounded-2xl bg-black/15 p-4 ring-1 ring-white/10">Industrial design refinement + materials validation</li>
                  <li className="rounded-2xl bg-black/15 p-4 ring-1 ring-white/10">Pilot production run + durability testing</li>
                  <li className="rounded-2xl bg-black/15 p-4 ring-1 ring-white/10">App beta for waitlist members</li>
                  <li className="rounded-2xl bg-black/15 p-4 ring-1 ring-white/10">Reveal + first limited drop</li>
                </ul>
              </InteractiveGlow>

              <InteractiveGlow className="rounded-[22px] bg-white/5 p-6 ring-1 ring-white/10" intensity={1.15}>
                <div className="text-xs font-semibold tracking-[0.18em] text-white/55">What we will not do</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li className="rounded-2xl bg-black/15 p-4 ring-1 ring-white/10">No medical promises or exaggerated outcomes</li>
                  <li className="rounded-2xl bg-black/15 p-4 ring-1 ring-white/10">No noisy UX designed to steal attention</li>
                  <li className="rounded-2xl bg-black/15 p-4 ring-1 ring-white/10">No unclear subscriptions or hidden tiers</li>
                  <li className="rounded-2xl bg-black/15 p-4 ring-1 ring-white/10">No selling data; privacy is a product feature</li>
                </ul>
              </InteractiveGlow>
            </div>
          </Reveal>
        </section>
      </PageShell>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <InteractiveGlow className="glass gradient-border rounded-[22px] p-6 shadow-soft hover-lift" intensity={1.2}>
      <div className="font-display text-xl tracking-tight text-white">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{body}</div>
    </InteractiveGlow>
  );
}

function Paragraph({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 hover-lift">
      <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{title}</div>
      <div className="mt-2 text-sm text-white/70">{body}</div>
    </div>
  );
}

function Mini({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[18px] bg-black/15 p-5 ring-1 ring-white/10 hover-lift">
      <div className="font-display text-lg tracking-tight text-white">{title}</div>
      <div className="mt-2 text-sm text-white/70">{body}</div>
    </div>
  );
}
