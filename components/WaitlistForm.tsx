"use client";

import { useMemo, useState } from "react";
import { MagneticButton } from "@/components/Magnetic";
import { MotionDiv } from "@/components/motion";

const OPTIONS = [
  { key: "bottle", label: "Bottle" },
  { key: "pods", label: "Pods" },
  { key: "merch", label: "Merch" }
] as const;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>(["bottle"]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState<string>("");

  const canSubmit = useMemo(() => status !== "loading", [status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!accepted) {
      setStatus("error");
      setMessage("Please confirm you agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interests, termsAccepted: accepted, termsVersion: "v1" })
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll share the reveal and launch timing by email.");
      setEmail("");
      setInterests(["bottle"]);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="Join waitlist form">
      <label className="block">
        <span className="sr-only">Email address</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
          placeholder="you@domain.com"
          className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-white/35 focus-visible:focus-ring"
          aria-label="Email address"
        />
      </label>

      <div className="flex flex-wrap gap-2" aria-label="Interests">
        {OPTIONS.map((o) => {
          const checked = interests.includes(o.key);
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => {
                setInterests((prev) => (checked ? prev.filter((x) => x !== o.key) : [...prev, o.key]));
              }}
              className={`rounded-2xl px-4 py-2 text-xs ring-1 ring-white/10 transition focus-visible:focus-ring ${
                checked ? "bg-white text-navy" : "bg-white/5 text-white/75 hover:bg-white/8"
              }`}
              aria-pressed={checked}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-white/4 p-4 ring-1 ring-white/10">
        <label className="flex items-start gap-3 text-sm text-white/75">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-navy accent-white"
            aria-label="Accept Terms & Conditions and Privacy Policy"
            required
          />
          <span>
            I agree to the{" "}
            <a className="underline decoration-white/35 underline-offset-4 hover:decoration-white/70" href="/legal/terms">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a className="underline decoration-white/35 underline-offset-4 hover:decoration-white/70" href="/legal/privacy">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <div className="mt-2 text-xs text-white/45">
          You can unsubscribe at any time. We do not sell personal data.
        </div>
      </div>


      <div className="flex flex-wrap items-center gap-3">
        <MagneticButton
          type="submit"
          className="bg-white text-navy shadow-soft hover:bg-white/95 disabled:opacity-60"
          ariaLabel="Submit waitlist form"
        >
          {status === "loading" ? "Joining…" : "Join Waitlist"}
        </MagneticButton>

        <div className="text-xs text-white/55">
          No spam. Pre-launch updates only.
        </div>
      </div>

      {message ? (
        <MotionDiv
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl px-4 py-3 text-sm ring-1 ${
            status === "success"
              ? "bg-white/10 text-white ring-white/10"
              : "bg-berry/20 text-white ring-white/10"
          }`}
          role="status"
        >
          {message}
        </MotionDiv>
      ) : null}
    </form>
  );
}
