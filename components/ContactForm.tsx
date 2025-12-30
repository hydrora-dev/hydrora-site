"use client";

import { useState } from "react";
import { MagneticButton } from "@/components/Magnetic";
import { MotionDiv } from "@/components/motion";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setNote("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setNote(data.error || "Please try again.");
        return;
      }

      setStatus("success");
      setNote("Message received. We’ll reply to your email as soon as possible.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setNote("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="Contact form">
      <div className="text-xs font-semibold tracking-[0.22em] text-white/60">SEND A MESSAGE</div>

      <label className="block">
        <span className="sr-only">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
          className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-white/35 focus-visible:focus-ring"
          aria-label="Name"
        />
      </label>

      <label className="block">
        <span className="sr-only">Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-white/35 focus-visible:focus-ring"
          aria-label="Email"
        />
      </label>

      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="How can we help?"
          rows={6}
          className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 placeholder:text-white/35 focus-visible:focus-ring"
          aria-label="Message"
        />
      </label>

      <div className="flex items-center gap-3">
        <MagneticButton type="submit" className="bg-white text-navy shadow-soft hover:bg-white/95">
          {status === "loading" ? "Sending…" : "Send"}
        </MagneticButton>
        <div className="text-xs text-white/55">No medical claims. No spam.</div>
      </div>

      {note ? (
        <MotionDiv
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl px-4 py-3 text-sm ring-1 ${
            status === "success" ? "bg-white/10 text-white ring-white/10" : "bg-berry/20 text-white ring-white/10"
          }`}
          role="status"
        >
          {note}
        </MotionDiv>
      ) : null}
    </form>
  );
}
