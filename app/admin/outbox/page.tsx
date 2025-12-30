import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { getAdminToken } from "@/lib/admin";
import { listOutbox } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type OutboxRow = {
  id: string;
  kind?: string;
  mode?: string;
  to?: string;
  from?: string;
  subject?: string;
  created_at?: string;
  payload?: { name?: string; email?: string; message?: string; created_at?: string };
  status?: string;
  error?: string | null;
};

function preview(text?: string, n = 140) {
  if (!text) return "";
  const t = text.trim().replace(/\s+/g, " ");
  return t.length > n ? `${t.slice(0, n)}…` : t;
}

export const metadata = {
  title: "Admin — Outbox",
  robots: { index: false, follow: false }
};

export default async function OutboxAdminPage({ searchParams }: { searchParams: { token?: string } }) {
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
          <div className="mt-6 rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 text-sm text-white/70">
            If you believe this is an error, confirm you&apos;re using the correct admin token and try again.
          </div>
        </PageShell>
      </div>
    );
  }

  const rows = (await listOutbox(250)) as unknown as OutboxRow[];

  return (
    <div className="bg-navy">
      <PageShell>
        <SectionHeader
          eyebrow="ADMIN"
          title="Support inbox"
          subtitle="If SMTP is not configured, contact submissions are captured here. With SMTP, messages are delivered to support@hydrora.co.uk."
        />

        <div className="mt-6 overflow-hidden rounded-[18px] ring-1 ring-white/10">
          <div className="flex items-center justify-between gap-3 bg-black/25 px-4 py-3">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/70">INBOX</div>
            <div className="text-xs text-white/60">{rows.length} messages</div>
          </div>

          {rows.length === 0 ? (
            <div className="bg-white/5 p-6 text-sm text-white/70">No messages yet.</div>
          ) : (
            <div className="overflow-x-auto bg-white/5">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-black/20 text-xs text-white/60">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Sender</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const created = r.created_at || r.payload?.created_at || "";
                    const dt = created ? new Date(created) : null;
                    const senderName = r.payload?.name || "—";
                    const senderEmail = r.payload?.email || r.from || "—";
                    const subject = r.subject || `HYDRORA Contact — ${senderName}`;
                    const msg = r.payload?.message || "";
                    const mode = r.mode || "outbox";

                    return (
                      <tr key={i} className="border-t border-white/10 text-white/80 align-top">
                        <td className="px-4 py-3 whitespace-nowrap text-white/70">
                          {dt ? dt.toLocaleString("en-GB") : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{senderName}</div>
                          <div className="text-xs text-white/60">{senderEmail}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{subject}</div>
                          <div className="text-xs text-white/60">{r.to ? `To: ${r.to}` : ""}</div>
                        </td>
                        <td className="px-4 py-3 text-white/70">{preview(msg)}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-1 text-xs text-white/70 ring-1 ring-white/15">
                              {mode}
                            </span>
                            {r.status ? (
                              <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-1 text-xs text-white/70 ring-1 ring-white/15">
                                {r.status}
                              </span>
                            ) : null}
                            {r.error ? (
                              <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-1 text-xs text-white/70 ring-1 ring-white/15">
                                error
                              </span>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 text-xs text-white/60">
            <div className="text-white/80">Tip</div>
            <div className="mt-2">
              For a production inbox, configure SMTP so submissions send real emails and use your mailbox client.
              This page remains useful as a fallback + audit trail.
            </div>
          </div>

          <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10 text-xs text-white/60">
            <div className="text-white/80">File location</div>
            <div className="mt-2">
              Local/dev writes to <code className="text-white">data/outbox.jsonl</code>.
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
