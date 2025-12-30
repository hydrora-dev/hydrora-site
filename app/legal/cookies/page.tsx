import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "Cookie Policy",
  description: "How HYDRORA uses cookies.",
  alternates: { canonical: "/legal/cookies" }
};

export default function Page() {
  return (
    <div className="bg-navy">
      <PageShell>
        <section className="space-y-6">
          <Reveal>
            <SectionHeader eyebrow="LEGAL" title="Cookie Policy" subtitle="HYDRORA uses minimal cookies to keep the site running smoothly." />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[18px] bg-white/5 p-6 ring-1 ring-white/10 text-sm text-white/75 space-y-5">
              <div className="text-xs text-white/50">Last updated: 2025-12-21</div>

              <div>
                <div className="font-semibold text-white">1. What are cookies?</div>
                <p className="mt-2">
                  Cookies are small text files stored on your device to help websites function and remember preferences.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">2. Cookies we use</div>
                <p className="mt-2">
                  This site uses essential cookies only by default (for example, to support basic functionality and security).
                  If you enable analytics in the future, we will present a consent banner and allow you to opt in.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">3. Managing cookies</div>
                <p className="mt-2">
                  You can control cookies through your browser settings. Disabling some cookies may affect site functionality.
                </p>
              </div>

              <div>
                <div className="font-semibold text-white">4. Contact</div>
                <p className="mt-2">
                  Questions about cookies: <a className="underline hover:text-white" href="mailto:support@hydrora.co.uk">support@hydrora.co.uk</a>
                </p>
              </div>

            </div>
          </Reveal>
        </section>
      </PageShell>
    </div>
  );
}
