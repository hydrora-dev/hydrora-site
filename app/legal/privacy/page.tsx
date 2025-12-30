import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "Privacy Policy",
  description: "How HYDRORA collects and uses personal data for the waiting list and contact forms.",
  alternates: { canonical: "/legal/privacy" }
};

export default function Page() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-6">
          <Reveal>
            <SectionHeader eyebrow="LEGAL" title="Privacy Policy" subtitle="This policy explains what we collect, why we collect it, and your rights." />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[18px] bg-white/5 p-6 ring-1 ring-white/10 text-sm text-white/75 space-y-5">
              <div className="text-xs text-white/50">Last updated: 2025-12-21</div>

              <div>
                <div className="font-semibold text-white">1. Who we are</div>
                <p className="mt-2">
                  HYDRORA is a UK-based brand preparing for launch. This website collects limited personal data to operate the waiting list and respond to enquiries.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">2. Data we collect</div>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-white/75">
                  <li><span className="text-white">Waiting list:</span> email address and selected interests (bottle, pods, merch).</li>
                  <li><span className="text-white">Contact form:</span> name, email address, and message content.</li>
                </ul>
              </div>

              <div>
                <div className="font-semibold text-white">3. Why we use your data</div>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>To send product updates, launch information, and early access invitations.</li>
                  <li>To respond to support and general enquiries.</li>
                  <li>To tailor communications based on selected interests (optional preference signals).</li>
                </ul>
              </div>

              <div>
                <div className="font-semibold text-white">4. Legal basis</div>
                <p className="mt-2">
                  We process waiting list data on the basis of your consent (UK GDPR). You can withdraw consent at any time by contacting us or using unsubscribe options where provided.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">5. Sharing</div>
                <p className="mt-2">
                  We do not sell personal data. We may use service providers to operate the site (for example, email delivery). Where used, providers act under contract and appropriate safeguards.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">6. Retention</div>
                <p className="mt-2">
                  We retain waiting list and contact data until you unsubscribe or request deletion, or until it is no longer needed for the purpose it was collected.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">7. Your rights</div>
                <p className="mt-2">
                  You may request access, correction, deletion, restriction, or portability of your personal data. You may also object to processing in certain circumstances.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">8. Contact</div>
                <p className="mt-2">
                  Privacy questions and requests: <a className="underline hover:text-white" href="mailto:support@hydrora.co.uk">support@hydrora.co.uk</a>
                </p>
              </div>

            </div>
          </Reveal>
        </section>
      </PageShell>
    </div>
  );
}
