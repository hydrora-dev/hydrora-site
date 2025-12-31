import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {

  title: "Contact",
  description: "Contact HYDRORA. Pre-launch enquiries, partnerships, and press.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="space-y-6">
              <SectionHeader
                eyebrow="CONTACT"
                title="Talk to HYDRORA."
                subtitle="For partnerships, press, or pre-launch enquiries. We respond as quickly as possible during build mode."
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <Info title="Email" body="hello@hydrora.example (placeholder)" />
                <Info title="Social" body="Instagram · LinkedIn · X (see footer)" />
                <Info title="Based in" body="United Kingdom" />
                <Info title="Availability" body="Pre-launch, limited support hours" />
              </div>

              <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 text-sm text-white/70">
                This site does not accept orders yet. If you want early access, join the waitlist on the Home page.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass gradient-border rounded-[26px] p-7 shadow-soft">
              <ContactForm />
            </div>
          </Reveal>
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
