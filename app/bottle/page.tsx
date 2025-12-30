import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal, MotionDiv } from "@/components/motion";
import { MagneticButton } from "@/components/Magnetic";
import { BottleReveal } from "@/components/BottleReveal";
import { InteractiveGlow } from "@/components/InteractiveGlow";

export const metadata = {

  title: "Bottle",
  description: "HYDRORA bottle preview: premium materials, sensing, and calm reminders.",
  alternates: { canonical: "/bottle" }
};

export default function BottlePage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="space-y-6">
              <div className="text-xs font-semibold tracking-[0.22em] text-white/60">BOTTLE</div>
              <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
                A premium silhouette —{" "}
                <span className="bg-gradient-to-r from-aqua via-lime to-berry bg-clip-text text-transparent gradient-animated">
                  reveal pending.
                </span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-white/70">
                Designed as a calm object in your day. Final shape, materials, and sensing behaviour are still in development.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/#waitlist">
                  <MagneticButton className="bg-white text-navy shadow-soft hover:bg-white/95">
                    Join Waitlist
                  </MagneticButton>
                </Link>
                <Link
                  href="/pods"
                  className="rounded-2xl px-5 py-3 text-sm text-white/80 ring-1 ring-white/12 hover:bg-white/5 focus-visible:focus-ring"
                >
                  Explore pods
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Feature title="Hydration tracking" body="Tracks consistency and rhythm (preview)." />
                <Feature title="Reminders" body="Gentle nudges designed to be unobtrusive." />
                <Feature title="Pod system" body="Modular flavour pods integrate by design." />
                <Feature title="Premium build" body="Materials and finish to be finalised pre-launch." />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Faux3DRotate />
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section className="space-y-8">
          <Reveal>
            <SectionHeader
              eyebrow="TECH SPEC PREVIEW"
              title="Specifications shown are provisional and will be confirmed at launch."
              subtitle="Specs shown here are placeholders to communicate intent. Final numbers will be confirmed at launch."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Spec label="Capacity" value="~600–750 ml (to be confirmed)" />
              <Spec label="Materials" value="Stainless steel + soft-touch (to be confirmed)" />
              <Spec label="Sensing" value="Sip detection (preview)" />
              <Spec label="Connectivity" value="Bluetooth (to be confirmed)" />
              <Spec label="Charging" value="USB-C (to be confirmed)" />
              <Spec label="Ingress" value="Everyday use rating (to be confirmed)" />
            </div>
          </Reveal>
        </section>

        <div className="my-14 h-px bg-white/10" />

        <section className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeader
              eyebrow="LAUNCH TIMELINE"
              title="Pre-launch milestones."
              subtitle="A transparent view of expected milestones. Dates will be confirmed once tooling and validation are complete."
            />
            <ol className="mt-6 space-y-3">
              <TimelineItem step="Design freeze" body="Industrial design and pod ecosystem validation." />
              <TimelineItem step="Pilot run" body="Small-batch manufacturing for durability and UX testing." />
              <TimelineItem step="App beta" body="Early access for waitlist members to test the dashboard." />
              <TimelineItem step="Reveal + launch" body="Full product reveal followed by limited first drop." />
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              <SectionHeader
                eyebrow="INTEGRATION"
                title="Works with the app."
                subtitle="A connected experience that is optional. The bottle remains functional without the app; deeper insights live in the dashboard."
              />
              <div className="mt-6">
                <BottleReveal compact />
              </div>
            </div>
          </Reveal>
        </section>
      </PageShell>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <InteractiveGlow className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 hover-lift" intensity={1.1}>
      <div className="font-display text-lg tracking-tight text-white">{title}</div>
      <div className="mt-2 text-sm text-white/70">{body}</div>
    </InteractiveGlow>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass gradient-border rounded-[18px] p-5">
      <div className="text-xs font-semibold tracking-[0.18em] text-white/55">{label}</div>
      <div className="mt-2 font-display text-lg text-white">{value}</div>
    </div>
  );
}

function TimelineItem({ step, body }: { step: string; body: string }) {
  return (
    <li className="glass gradient-border rounded-[18px] p-5">
      <div className="flex items-center justify-between">
        <div className="font-display text-lg tracking-tight text-white">{step}</div>
        <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">Coming soon</span>
      </div>
      <div className="mt-2 text-sm text-white/70">{body}</div>
    </li>
  );
}

function Faux3DRotate() {
  return (
    <MotionDiv
      className="relative"
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{ rotateY: 10, rotateX: -8 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <MotionDiv
        className="absolute -inset-6 rounded-[34px] blur-2xl"
        style={{
          background:
            "radial-gradient(420px 420px at 30% 30%, rgba(0,229,255,0.18), transparent 60%), radial-gradient(460px 460px at 70% 60%, rgba(124,255,0,0.12), transparent 62%), radial-gradient(520px 520px at 55% 85%, rgba(123,45,141,0.14), transparent 62%)"
        }}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <BottleReveal className="relative" />
      <div className="mt-4 text-center text-xs text-white/55">
        Faux 3D interaction: hover/tilt. Final 3D model can be integrated later.
      </div>
    </MotionDiv>
  );
}
