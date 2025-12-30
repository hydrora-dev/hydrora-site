import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false }
};

export default function AdminRootPage() {
  return (
    <div className="bg-navy">
      <PageShell>
        <SectionHeader eyebrow="ADMIN" title="Restricted area" subtitle="This area is not publicly accessible." />
        <div className="mt-6 rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 text-sm text-white/70">
          If you are an administrator, use the correct admin URL and token.
        </div>
      </PageShell>
    </div>
  );
}
