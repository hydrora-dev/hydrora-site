import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";
import { InteractiveList } from "@/components/InteractiveList";
import { MagneticButton } from "@/components/Magnetic";
import { AppMock } from "@/components/AppMock";

export const metadata = {

  title: "App",
  description: "A pre‑launch preview of the HYDRORA app: goals, reminders, streaks, pod tracking, and an insights dashboard.",
  alternates: { canonical: "/app" }
};

export default function AppPage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-8">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <div className="text-xs font-semibold tracking-[0.22em] text-white/60">APP</div>
                <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
                  A calm dashboard for a{" "}
                  <span className="bg-gradient-to-r from-aqua via-lime to-berry bg-clip-text text-transparent">
                    consistent routine.
                  </span>
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-white/70">
                  The app is built around clarity: goals, gentle reminders, streaks, and insight. UI frames shown are early mockups.
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
                    Browse pods
                  </Link>
                </div>
              </div>

              <div className="glass gradient-border rounded-[26px] p-7 shadow-soft">
                <SectionHeader
                  eyebrow="FEATURE SET"
                  title="Designed to be optional."
                  subtitle="The bottle remains the hero. The app adds insight when you want it."
                />
                <div className="mt-6">
  <InteractiveList
    items={[
      { title: "Goals and gentle reminders", description: "Set a target, then let the app nudge only when it matters." },
      { title: "Streaks and trend snapshots", description: "See consistency over time without turning your day into a spreadsheet." },
      { title: "Pod tracking", description: "Flavour recognition is shown as a preview and will be refined closer to launch." },
      { title: "Dashboard-first design", description: "A calm overview that stays readable at a glance." }
    ]}
  />
</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <AppMock />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass gradient-border rounded-[26px] p-7 shadow-soft">
              <SectionHeader
                eyebrow="NOTE"
                title="Pre-launch clarity."
                subtitle="The app is still in development. Final functionality, notifications, and integrations will be communicated during beta."
              />
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/#waitlist">
                  <MagneticButton className="bg-white text-navy shadow-soft hover:bg-white/95">
                    Join Waitlist
                  </MagneticButton>
                </Link>
                <Link href="/about" className="rounded-2xl px-5 py-3 text-sm text-white/80 ring-1 ring-white/12 hover:bg-white/5 focus-visible:focus-ring">
                  Read the vision
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </PageShell>
    </div>
  );
}
