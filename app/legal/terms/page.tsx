import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "Terms & Conditions",
  description: "HYDRORA website terms and conditions.",
  alternates: { canonical: "/legal/terms" }
};

export default function Page() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-6">
          <Reveal>
            <SectionHeader eyebrow="LEGAL" title="Terms & Conditions" subtitle="These terms apply to your use of the HYDRORA website and waiting list." />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[18px] bg-white/5 p-6 ring-1 ring-white/10 text-sm text-white/75 space-y-5">
              <div className="text-xs text-white/50">Last updated: 2025-12-21</div>

              <div>
                <div className="font-semibold text-white">1. About HYDRORA</div>
                <p className="mt-2">
                  HYDRORA is a pre-launch wellness technology brand. Content on this website is provided for informational purposes and may change prior to launch.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">2. Eligibility</div>
                <p className="mt-2">
                  To join the HYDRORA waiting list you must be at least 16 years old and capable of forming a legally binding contract.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">3. Pre-launch status</div>
                <p className="mt-2">
                  Product visuals, specifications, features, pricing, subscription details, and timelines shown on this site are indicative only.
                  They do not constitute an offer, and they may be refined before release.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">4. Waiting list</div>
                <p className="mt-2">
                  Joining the waiting list does not guarantee availability, access, priority, or pricing. We may contact you with updates,
                  early access opportunities, and launch information.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">5. Acceptable use</div>
                <p className="mt-2">
                  You agree not to misuse the site, interfere with its operation, attempt unauthorised access, or use automated systems
                  to extract data without our permission.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">6. Intellectual property</div>
                <p className="mt-2">
                  All trademarks, branding, visuals, copy, and site content are owned by or licensed to HYDRORA. You may not reproduce,
                  distribute, or create derivative works without prior written permission.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">7. General disclaimer</div>
                <p className="mt-2">
                  HYDRORA does not provide medical advice. Any wellbeing-related content is general and not a substitute for professional guidance.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">8. Limitation of liability</div>
                <p className="mt-2">
                  To the fullest extent permitted by law, HYDRORA will not be liable for any loss arising from your use of, or reliance on,
                  pre-launch information on this site.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">9. Changes</div>
                <p className="mt-2">
                  We may update these terms from time to time. The latest version will be posted on this page with the updated date.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">10. Contact</div>
                <p className="mt-2">
                  Questions about these terms: <a className="underline hover:text-white" href="mailto:support@hydrora.co.uk">support@hydrora.co.uk</a>
                </p>
              </div>

            </div>
          </Reveal>
        </section>
      </PageShell>
    </div>
  );
}
