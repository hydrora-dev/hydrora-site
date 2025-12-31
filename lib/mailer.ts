import nodemailer from "nodemailer";
import fs from "node:fs/promises";
import path from "node:path";
import { insertOutbox, listOutbox } from "@/lib/db";

export type ContactEmail = {
  name: string;
  email: string;
  message: string;
  created_at: string;
  ip?: string | null;
  userAgent?: string | null;
};

const DATA_DIR = path.join(process.cwd(), "data");
const OUTBOX_PATH = path.join(DATA_DIR, "outbox.jsonl");

async function appendOutbox(row: any) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(OUTBOX_PATH, JSON.stringify(row) + "\n", { encoding: "utf-8" });
}

/**
 * Contact email delivery:
 * - If SMTP is configured (recommended for production), sends via nodemailer.
 * - Otherwise (local/dev), writes to data/outbox.jsonl so you can verify the payload.
 *
 * Required env vars for SMTP:
 * - SMTP_HOST
 * - SMTP_PORT
 * - SMTP_USER
 * - SMTP_PASS
 * Optional:
 * - SMTP_SECURE ("true" for 465)
 * - CONTACT_TO (defaults to support@hydrora.co.uk)
 * - CONTACT_FROM (defaults to SMTP_USER)
 */
export async function sendContactEmail(payload: ContactEmail) {
  const to = (process.env.CONTACT_TO || "support@hydrora.co.uk").trim();
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || port === 465;
  const from = (process.env.CONTACT_FROM || user || "support@hydrora.co.uk").trim();

  const subject = `HYDRORA Contact — ${payload.name}`;

  // If SMTP not configured, persist an outbox row (Supabase in prod, JSONL in dev).
  if (!host || !user || !pass) {
    await insertOutbox({
      kind: "contact",
      mode: "outbox",
      to,
      from,
      subject,
      payload,
      status: "queued"
    });

    // Keep legacy local-outbox file for dev sanity checks (non-blocking).
    try {
      await appendOutbox({
        type: "contact",
        mode: "outbox",
        to,
        from,
        subject,
        payload,
        created_at: new Date().toISOString()
      });
    } catch {
      // ignore
    }

    return { mode: "outbox" as const };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });

  const text = [
    "New contact submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Time: ${payload.created_at}`,
    payload.ip ? `IP: ${payload.ip}` : null,
    payload.userAgent ? `User-Agent: ${payload.userAgent}` : null,
    "",
    "Message:",
    payload.message
  ]
    .filter(Boolean)
    .join("\n");

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    replyTo: payload.email
  });

  // Record a lightweight audit entry (helps support + tracing).
  try {
    await insertOutbox({
      kind: "contact",
      mode: "smtp",
      to,
      from,
      subject,
      payload,
      status: "sent"
    });
  } catch {
    // ignore
  }

  return { mode: "smtp" as const };
}

export async function getOutboxTail(lines = 25) {
  // Prefer Supabase if configured.
  try {
    const rows = await listOutbox(lines);
    if (rows.length) {
      return rows
        .slice(0, lines)
        .reverse()
        .map((r) => JSON.stringify({
          type: r.kind,
          mode: r.mode,
          to: r.to,
          from: r.from,
          subject: r.subject,
          payload: r.payload,
          created_at: r.created_at,
          status: r.status,
          error: r.error
        }));
    }
  } catch {
    // fall back to file
  }

  try {
    const raw = await fs.readFile(OUTBOX_PATH, "utf-8");
    const parts = raw.split(/\r?\n/).filter(Boolean);
    return parts.slice(-lines);
  } catch (err: any) {
    if (err?.code === "ENOENT") return [];
    throw err;
  }
}
