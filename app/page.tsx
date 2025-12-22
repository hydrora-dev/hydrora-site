import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { BottleReveal } from "@/components/BottleReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";
import { MagneticButton } from "@/components/Magnetic";
import { HowItWorks } from "@/components/HowItWorks";
import { PodsGallery } from "@/components/PodsGallery";
import { AppMock } from "@/components/AppMock";
import { StreakWidget } from "@/components/StreakWidget";
import { WaitlistForm } from "@/components/WaitlistForm";
import { InteractiveGlow } from "@/components/InteractiveGlow";
import { CountUp } from "@/components/CountUp";
import { Stagger, StaggerItem } from "@/components/Stagger";

export default function HomePage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/70 ring-1 ring-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
                Pre-launch reveal experience
              </div>

              <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
                Powered by flavour.{" "}
                <span className="bg-gradient-to-r from-aqua via-lime to-berry bg-clip-text text-transparent gradient-animated">
                  Driven by data.
                </span>
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-white/70">
                HYDRORA is a premium hydration ecosystem: a smart bottle, modular flavour pods, and a connected app—built for
                consistent routines and clearer insight.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/#waitlist">
                  <MagneticButton className="bg-white text-navy shadow-soft hover:bg-white/95">
                    Join Waitlist
                  </MagneticButton>
                </Link>

                <Link href="/#how-it-works" className="rounded-2xl px-5 py-3 text-sm text-white/80 ring-1 ring-white/12 hover:bg-white/5 focus-visible:focus-ring">
                  See how it works
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Metric title="Hydration %" number={82} suffix="%" />
                <Metric title="Streaks" number={6} suffix=" days" />
                <Metric title="Pod usage" number={2} suffix=" pods" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <BottleReveal />
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow="THE PROBLEM"
              title="Hydration is inconsistent, and water is often uninspiring."
              subtitle="Most people face the same friction: routines drift, flavour options feel artificial, and tracking is either absent or overwhelming."
            />
            <Stagger className="mt-6 space-y-3 text-sm text-white/70">
              <StaggerItem>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover-lift">Inconsistent intake across the day</div>
              </StaggerItem>
              <StaggerItem>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover-lift">Boring water leads to drop-off</div>
              </StaggerItem>
              <StaggerItem>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover-lift">Little insight into your real patterns</div>
              </StaggerItem>
            </Stagger>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeader
              eyebrow="THE SOLUTION"
              title="A single ecosystem: Bottle + Pods + App."
              subtitle="HYDRORA brings together a smart bottle, modular flavour pods, and a connected app—built to feel calm, not demanding."
            />
            <Stagger className="mt-6 grid gap-3 sm:grid-cols-3" delay={0.05}>
              <StaggerItem>
                <Card title="Bottle" body="Sensing + reminders, built into a premium silhouette." />
              </StaggerItem>
              <StaggerItem>
                <Card title="Pods" body="Flavour that stays modular—swap without replacing the bottle." />
              </StaggerItem>
              <StaggerItem>
                <Card title="App" body="A quiet dashboard: goals, streaks, and insights." />
              </StaggerItem>
            </Stagger>
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section id="how-it-works" className="space-y-8 scroll-mt-24">
          <Reveal>
            <SectionHeader
              eyebrow="HOW IT WORKS"
              title="Simple, modular, and designed to stay out of the way."
              subtitle="Explore the pre‑launch flow. UI and features shown here are indicative and will be refined before release."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <HowItWorks />
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section className="space-y-8">
          <Reveal>
            <SectionHeader
              eyebrow="FLAVOUR PODS"
              title="Mysterious now. Distinct by aura."
              subtitle="Pods are intentionally unrevealed pre-launch. Each flavour is represented by a premium silhouette with a signature glow."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <PodsGallery initialFamily="all" />
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section className="space-y-8">
          <Reveal>
            <SectionHeader
              eyebrow="APP PREVIEW"
              title="Built for clarity—goals, streaks, and insight."
              subtitle="A pre‑launch UI preview showing how your hydration pattern could appear in a calm dashboard."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <AppMock />
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow="DATA & INSIGHTS"
              title="Example metrics, presented with restraint."
              subtitle="Pre-launch visuals showing how HYDRORA could surface patterns without turning your day into a spreadsheet."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Stagger className="contents" stagger={0.07}>
                <StaggerItem>
                  <MetricCard label="Hydration %" number={82} suffix="%" sub="Target progress (demo)" />
                </StaggerItem>
                <StaggerItem>
                  <MetricCard label="Streak" number={6} suffix=" days" sub="Consistency (demo)" />
                </StaggerItem>
                <StaggerItem>
                  <MetricCard label="Sip timing" value="09:20" sub="First sip (demo)" />
                </StaggerItem>
                <StaggerItem>
                  <MetricCard label="Flavour usage" number={2} suffix=" pods" sub="This week (demo)" />
                </StaggerItem>
              </Stagger>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <StreakWidget />
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow="MEMBERSHIP"
              title="Optional subscriptions, clearly separated."
              subtitle="Pods and app features may offer optional subscription tiers. Details will be confirmed closer to launch."
            />
            <Stagger className="mt-6 space-y-3" stagger={0.08}>
              <StaggerItem>
                <Plan
                  title="Pods subscription"
                  body="Planned monthly deliveries with flexible mixes. No hard promises until pricing and cadence are confirmed."
                  badge="Optional"
                />
              </StaggerItem>
              <StaggerItem>
                <Plan
                  title="App premium"
                  body="Advanced dashboards and deeper insights, for those who want more. Core experience remains usable without upgrades."
                  badge="Optional"
                />
              </StaggerItem>
            </Stagger>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeader
              eyebrow="SOCIAL PROOF"
              title="Pre-launch, builder-led."
              subtitle="A simple signal of momentum—presented without overclaiming."
            />
            <Stagger className="mt-6 space-y-3" stagger={0.07}>
              <StaggerItem>
                <Quote name="Operator, UK" text="Feels like the rare wellness product that actually respects design." />
              </StaggerItem>
              <StaggerItem>
                <Quote name="Product lead" text="The approach is modular and thoughtful — exactly what the category needs." />
              </StaggerItem>
              <StaggerItem>
                <Quote name="Builder" text="Investor-grade execution with a clear narrative and restraint." />
              </StaggerItem>
            </Stagger>
            <div className="mt-4 text-xs text-white/50">
              Quotes are placeholders for pre-launch materials and may be replaced with verified statements post-launch.
            </div>
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section id="waitlist" className="scroll-mt-24">
          <Reveal>
            <div className="glass gradient-border rounded-[26px] p-7 shadow-soft md:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="space-y-3">
                  <div className="text-xs font-semibold tracking-[0.22em] text-white/60">WAITLIST</div>
                  <div className="font-display text-3xl tracking-tight text-white">Get the reveal, first.</div>
                  <p className="text-sm leading-relaxed text-white/70">
                    Join the pre-launch waitlist to receive product reveals, launch timing, and early access opportunities.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <MiniLink href="/bottle" label="Explore the bottle page" />
                    <MiniLink href="/pods" label="Browse pod flavours" />
                    <MiniLink href="/app" label="See the app preview" />
                    <MiniLink href="/merch" label="Merch preview store" />
                  </div>
                </div>

                <div>
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </PageShell>

      <ScriptLD />
    </div>
  );
}

function Metric({
  title,
  number,
  suffix = ""
}: {
  title: string;
  number: number;
  suffix?: string;
}) {
  return (
    <div className="tile hover-lift">
      <div className="tile-inner p-4">
        <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{title}</div>
        <div className="mt-2 font-display text-lg text-white">
          <CountUp to={number} durationMs={900} suffix={suffix} />
        </div>
      </div>
    </div>
  );
}
function Card({ title, body }: { title: string; body: string }) {
  return (
    <InteractiveGlow className="glass gradient-border rounded-[18px] p-5 hover-lift" intensity={1.15}>
      <div className="font-display text-lg tracking-tight text-white">{title}</div>
      <div className="mt-2 text-sm text-white/70">{body}</div>
    </InteractiveGlow>
  );
}

function MetricCard({
  label,
  value,
  sub,
  number,
  suffix = "",
  prefix = "",
  decimals = 0
}: {
  label: string;
  value?: string;
  sub: string;
  number?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  return (
    <InteractiveGlow className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 hover-lift" intensity={1.08}>
      <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{label}</div>
      <div className="mt-2 font-display text-2xl text-white">
        {typeof number === "number" ? (
          <CountUp to={number} prefix={prefix} suffix={suffix} decimals={decimals} />
        ) : (
          value
        )}
      </div>
      <div className="mt-1 text-xs text-white/55">{sub}</div>
    </InteractiveGlow>
  );
}

function Plan({ title, body, badge }: { title: string; body: string; badge: string }) {
  return (
    <InteractiveGlow className="glass gradient-border rounded-[18px] p-6 hover-lift" intensity={1.2}>
      <div className="flex items-center justify-between">
        <div className="font-display text-lg tracking-tight text-white">{title}</div>
        <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
          {badge}
        </span>
      </div>
      <div className="mt-2 text-sm text-white/70">{body}</div>
    </InteractiveGlow>
  );
}

function Quote({ name, text }: { name: string; text: string }) {
  return (
    <InteractiveGlow className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 hover-lift" intensity={1.05}>
      <div className="text-sm text-white/75">“{text}”</div>
      <div className="mt-2 text-xs font-semibold tracking-[0.18em] text-white/50">{name}</div>
    </InteractiveGlow>
  );
}

function MiniLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-black/15 px-4 py-3 text-sm text-white/75 ring-1 ring-white/10 hover:bg-white/5 focus-visible:focus-ring"
    >
      {label}
    </Link>
  );
}

function ScriptLD() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HYDRORA",
    "url": "https://hydrora.example",
    "description":
      "HYDRORA is a premium hydration ecosystem combining a smart bottle, flavour pods, and a connected app.",
    "sameAs": []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}