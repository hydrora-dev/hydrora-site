import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { getAdminToken } from "@/lib/admin";
import { getStorageMode, listWaitlist, listOutbox } from "@/lib/db";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — Debug",
  robots: { index: false, follow: false }
};

export default async function AdminDebugPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = (searchParams?.token ?? "").trim();
  const required = getAdminToken();

  if (token !== required) {
    return (
      <div className="bg-navy">
        <PageShell>
          <SectionHeader
            eyebrow="ADMIN"
            title="Access denied."
            subtitle="You do not have permission to view this page."
          />
        </PageShell>
      </div>
    );
  }

  const storage = await getStorageMode();
  const sb = getSupabaseAdmin();

  let counts: { waitlist?: number; outbox?: number } = {};
  try {
    const [w, o] = await Promise.all([listWaitlist(1), listOutbox(1)]);
    counts.waitlist = w.length;
    counts.outbox = o.length;
  } catch {
    // ignore
  }

  return (
    <div className="bg-navy">
      <PageShell>
        <SectionHeader
          eyebrow="ADMIN DEBUG"
          title="Diagnostics"
          subtitle="Confirms storage mode and basic connectivity."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Storage</div>
            <div className="mt-2 text-sm text-white/80">
              Mode: <code className="text-white">{storage.mode}</code>
            </div>
            {storage.mode === "jsonl" ? (
              <div className="mt-2 text-sm text-white/80">
                Data dir: <code className="text-white">{storage.dataDir}</code>
              </div>
            ) : null}
          </div>

          <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Supabase</div>
            <div className="mt-2 text-sm text-white/80">
              Configured: <code className="text-white">{sb ? "yes" : "no"}</code>
            </div>
            <div className="mt-2 text-sm text-white/80">
              Waitlist read: <code className="text-white">{counts.waitlist !== undefined ? "ok" : "unknown"}</code>
            </div>
            <div className="mt-2 text-sm text-white/80">
              Outbox read: <code className="text-white">{counts.outbox !== undefined ? "ok" : "unknown"}</code>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 text-xs text-white/60">
          <div className="text-white/80">Admin routes</div>
          <div className="mt-2">
            Waitlist: <code className="text-white">/admin/waitlist?token=…</code>
          </div>
          <div className="mt-2">
            Outbox: <code className="text-white">/admin/outbox?token=…</code>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
