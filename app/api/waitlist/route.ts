export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { insertWaitlist } from "@/lib/db";

const Schema = z.object({
  email: z.string().email(),
  interests: z.array(z.string()).default([]),
  termsAccepted: z.literal(true),
  termsVersion: z.string().min(1).default("v1")
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Schema.safeParse(json);

    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => i.message).join(" | ");
      // Friendly user-facing errors
      if (issues.toLowerCase().includes("email")) {
        return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
      }
      if (issues.toLowerCase().includes("termsaccepted")) {
        return NextResponse.json(
          { ok: false, error: "Please confirm you agree to the Terms & Conditions and Privacy Policy." },
          { status: 400 }
        );
      }
      return NextResponse.json({ ok: false, error: "Please check your details and try again." }, { status: 400 });
    }

    const { email, interests, termsAccepted, termsVersion } = parsed.data;
    // termsAccepted is guaranteed true by schema
    await insertWaitlist(email.trim().toLowerCase(), interests, { termsAccepted, termsVersion });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("WAITLIST_API_ERROR", err);
    const details = process.env.NODE_ENV === "development" ? String((err as any)?.message || err) : undefined;
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again.", details }, { status: 500 });
  }
}
