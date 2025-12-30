import { listWaitlist } from "@/lib/db";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { getAdminToken } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — Waitlist",
  robots: { index: false, follow: false }
};

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default async function WaitlistAdminPage({
  searchParams
}: {
  searchParams: { token?: string; limit?: string };
}) {
  const token = (searchParams?.token ?? "").trim();
  const expected = getAdminToken();
  const limit = Number(searchParams?.limit ?? 500) || 500;

  if (!token || token !== expected) {
    return (
      <div className="bg-navy">
        <PageShell>
          <SectionHeader
            eyebrow="ADMIN"
            title="Access denied."
            subtitle="You do not have permission to view this page."
          />
          <div className="mt-6 rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 text-sm text-white/70">
            If you believe this is an error, confirm you&apos;re using the correct admin token and try again.
          </div>
        </PageShell>
      </div>
    );
  }

  const rows = await listWaitlist(limit);

  return (
    <div className="bg-navy">
      <PageShell>
        <SectionHeader
          eyebrow="ADMIN"
          title="Waitlist"
          subtitle={`Latest ${rows.length} submissions. Export and CRM sync can be added later.`}
        />

        <div className="mt-6 grid gap-3">
          {rows.length === 0 ? (
            <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 text-sm text-white/70">
              No entries yet.
            </div>
          ) : (
            rows.map((r) => (
              <div
                key={r.id}
                className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 hover:bg-white/7 transition"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{r.email}</div>
                    <div className="mt-1 text-xs text-white/55">
                      Interests: {r.interests?.length ? r.interests.join(", ") : "—"}
                    </div>
                    <div className="mt-1 text-xs text-white/45">
                      Consent: {r.termsAccepted ? `Yes (v${String(r.termsVersion || "1").replace(/^v/i, "")})` : "—"}
                    </div>
                  </div>

                  <div className="text-xs text-white/55 sm:text-right">
                    <div>{formatDate(r.created_at)}</div>
                    <div className="mt-1 text-white/35">ID: {r.id}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 rounded-[18px] bg-white/4 p-5 ring-1 ring-white/10 text-xs text-white/55">
          Tip: bookmark this URL. You can add &quot;limit=2000&quot; to see more rows. Keep your admin token private.
        </div>
      </PageShell>
    </div>
  );
}
