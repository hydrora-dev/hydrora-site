export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { insertContact } from "@/lib/db";
import { sendContactEmail } from "@/lib/mailer";

const Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Please complete all fields with a valid email." }, { status: 400 });
    }

    const { name, email, message } = parsed.data;
    const created_at = new Date().toISOString();
    await insertContact(name.trim(), email.trim().toLowerCase(), message.trim());
    await sendContactEmail({ name: name.trim(), email: email.trim().toLowerCase(), message: message.trim(), created_at, ip: req.headers.get('x-forwarded-for') || null, userAgent: req.headers.get('user-agent') || null });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('CONTACT_API_ERROR', err);

    const details = process.env.NODE_ENV === "development" ? String((err as any)?.message || err) : undefined;
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again.", details }, { status: 500 });
  }
}
