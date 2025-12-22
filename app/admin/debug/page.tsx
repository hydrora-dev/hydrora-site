import fs from "node:fs/promises";
import path from "node:path";
import { PageShell } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { getAdminToken } from "@/lib/admin";

export const metadata = {
  title: "Admin — Debug",
  robots: { index: false, follow: false }
};

const DATA_DIR = path.join(process.cwd(), "data");
const WAITLIST_PATH = path.join(DATA_DIR, "waitlist.jsonl");
const CONTACT_PATH = path.join(DATA_DIR, "contact.jsonl");
const OUTBOX_PATH = path.join(DATA_DIR, "outbox.jsonl");

async function fileStats(filePath: string) {
  try {
    const s = await fs.stat(filePath);
    return { ok: true as const, size: s.size, mtime: s.mtime.toISOString() };
  } catch (err: any) {
    return { ok: false as const, error: err?.code || "unknown" };
  }
}

export default async function AdminDebugPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = (searchParams?.token ?? "").trim();
  const required = getAdminToken();

  if (token !== required) {
    return (
      <div className="bg-navy">
        <PageShell>
          <SectionHeader eyebrow="ADMIN" title="Access denied." subtitle="You do not have permission to view this page." />
        </PageShell>
      </div>
    );
  }

  let writeTest: string = "not run";
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const testPath = path.join(DATA_DIR, ".write-test");
    await fs.writeFile(testPath, "ok", "utf-8");
    await fs.unlink(testPath);
    writeTest = "ok";
  } catch (err: any) {
    writeTest = `failed: ${err?.code || err?.message || "unknown"}`;
  }

  const waitlist = await fileStats(WAITLIST_PATH);
  const contact = await fileStats(CONTACT_PATH);
  const outbox = await fileStats(OUTBOX_PATH);

  return (
    <div className="bg-navy">
      <PageShell>
        <SectionHeader eyebrow="ADMIN DEBUG" title="Diagnostics" subtitle="Confirms filesystem access and the presence of data files." />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Filesystem</div>
            <div className="mt-2 text-sm text-white/80">
              Data dir: <code className="text-white">{DATA_DIR}</code>
            </div>
            <div className="mt-2 text-sm text-white/80">
              Write test: <code className="text-white">{writeTest}</code>
            </div>
          </div>

          <div className="rounded-[18px] bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-xs font-semibold tracking-[0.18em] text-white/55">Admin routes</div>
            <div className="mt-2 text-sm text-white/80">
              Waitlist: <code className="text-white">/admin/waitlist?token=…</code>
            </div>
            <div className="mt-2 text-sm text-white/80">
              Outbox: <code className="text-white">/admin/outbox?token=…</code>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[18px] ring-1 ring-white/10">
          <div className="bg-black/25 px-4 py-3 text-xs font-semibold tracking-[0.18em] text-white/70">Data files</div>
          <div className="grid gap-0 divide-y divide-white/10 bg-white/5">
            {[
              { name: "waitlist.jsonl", stat: waitlist },
              { name: "contact.jsonl", stat: contact },
              { name: "outbox.jsonl", stat: outbox }
            ].map((f) => (
              <div key={f.name} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-white/80">
                <div className="font-medium">{f.name}</div>
                {f.stat.ok ? (
                  <div className="text-white/70">
                    {Math.round(f.stat.size / 1024)} KB · updated {new Date(f.stat.mtime).toLocaleString("en-GB")}
                  </div>
                ) : (
                  <div className="text-white/60">not found ({f.stat.error})</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </div>
  );
}
