import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <div className="bg-navy">
      <PageShell>
        <div className="space-y-4">
          <div className="text-xs font-semibold tracking-[0.22em] text-white/60">404</div>
          <div className="font-display text-3xl tracking-tight text-white">Page not found.</div>
          <p className="text-sm text-white/70">The page you’re looking for doesn’t exist.</p>
          <Link href="/" className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-navy focus-visible:focus-ring">
            Back to Home
          </Link>
        </div>
      </PageShell>
    </div>
  );
}
