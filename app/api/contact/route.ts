export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { insertContact } from "@/lib/db";
import { sendContactEmail } from "@/lib/mailer";

const Schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (!xf) return null;
  // x-forwarded-for can be "client, proxy1, proxy2"
  return xf.split(",")[0]?.trim() || null;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Schema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please complete all fields with a valid email." },
        { status: 400 }
      );
    }

    const name = parsed.data.name.trim();
    const email = parsed.data.email.trim().toLowerCase();
    const message = parsed.data.message.trim();

    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || null;

    // 1) Always store in DB first (this is your source of truth)
    await insertContact(name, email, message, { ip, userAgent });

    // 2) Try to send email, but DO NOT fail the request if SMTP fails
    //    (prevents users seeing "something went wrong" when DB insert succeeded)
    try {
      await sendContactEmail({
        name,
        email,
        message,
        meta: { ip, userAgent },
      });
    } catch (err) {
      console.error("CONTACT_EMAIL_SEND_ERROR", err);
      // swallow
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err);
    const details =
      process.env.NODE_ENV === "development"
        ? String((err as any)?.message || err)
        : undefined;

    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again.", details },
      { status: 500 }
    );
  }
}
