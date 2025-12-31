import Link from "next/link";
import { SITE } from "@/components/site-config";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-navy">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-3">
          <div className="font-display text-sm tracking-[0.28em] text-white">HYDRORA</div>
          <p className="text-sm text-white/65">{SITE.tagline}</p>
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} HYDRORA. All rights reserved.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold tracking-wider text-white/80">Product</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link className="hover:text-white" href="/bottle">Bottle</Link></li>
            <li><Link className="hover:text-white" href="/pods">Pods</Link></li>
            <li><Link className="hover:text-white" href="/app">App</Link></li>
            <li><Link className="hover:text-white" href="/merch">Merch</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold tracking-wider text-white/80">Company</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold tracking-wider text-white/80">Legal</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link className="hover:text-white" href="/legal/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-white" href="/legal/terms">Terms of Service</Link></li>
            <li><Link className="hover:text-white" href="/legal/cookies">Cookie Policy</Link></li>
          </ul>
          <div className="pt-3 text-xs text-white/45">
            Socials:{" "}
            <a className="hover:text-white" href={SITE.socials.instagram} target="_blank" rel="noreferrer">Instagram</a>{" "}
            · <a className="hover:text-white" href={SITE.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>{" "}
            · <a className="hover:text-white" href={SITE.socials.x} target="_blank" rel="noreferrer">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
