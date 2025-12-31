import fs from "node:fs/promises";
import path from "node:path";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * HYDRORA storage layer
 *
 * Primary: Supabase (free tier) — recommended for production + Vercel.
 * Fallback: local JSONL files (development convenience).
 *
 * Supabase tables (see /supabase/schema.sql):
 * - waitlist
 * - contact_messages
 * - outbox
 */

const DATA_DIR = path.join(process.cwd(), "data");
const WAITLIST_PATH = path.join(DATA_DIR, "waitlist.jsonl");
const CONTACT_PATH = path.join(DATA_DIR, "contact.jsonl");
const OUTBOX_PATH = path.join(DATA_DIR, "outbox.jsonl");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function uid() {
  return (
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 10) +
    "-" +
    Math.random().toString(36).slice(2, 10)
  );
}

async function appendJsonl(filePath: string, obj: unknown) {
  await ensureDataDir();
  const line = JSON.stringify(obj) + "\n";
  await fs.appendFile(filePath, line, { encoding: "utf-8" });
}

async function readJsonl<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return raw
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line) as T);
  } catch (err: any) {
    if (err?.code === "ENOENT") return [];
    throw err;
  }
}

export type WaitlistRow = {
  id: string;
  email: string;
  interests: string[];
  created_at: string;
  termsAccepted?: boolean;
  termsVersion?: string;
  consent_at?: string;
};

export type ContactRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  ip?: string | null;
  userAgent?: string | null;
};

export type OutboxRow = {
  id: string;
  kind: "contact" | string;
  mode: "smtp" | "outbox" | string;
  to: string;
  from: string;
  subject: string;
  payload: any;
  created_at: string;
  status?: "sent" | "queued" | "failed";
  error?: string | null;
};
export type OutboxStatus = "sent" | "queued" | "failed";

function toOutboxStatus(v: unknown): OutboxStatus | undefined {
  return v === "sent" || v === "queued" || v === "failed" ? v : undefined;
}


function hasSupabase() {
  return Boolean(getSupabaseAdmin());
}

// ------------------------------
// Waitlist
// ------------------------------

export async function insertWaitlist(
  email: string,
  interests: string[],
  consent: { termsAccepted: true; termsVersion: string }
) {
  const now = new Date().toISOString();
  const normalizedEmail = email.trim().toLowerCase();

  const sb = getSupabaseAdmin();
  if (sb) {
    const { error } = await sb
      .from("waitlist")
      .upsert(
        {
          email: normalizedEmail,
          interests,
          terms_accepted: true,
          terms_version: consent.termsVersion,
          consent_at: now,
          source: "website"
        },
        { onConflict: "email" }
      );

    if (error) throw error;
    return;
  }

  // Local fallback
  const row: WaitlistRow = {
    id: uid(),
    email: normalizedEmail,
    interests,
    created_at: now,
    termsAccepted: true,
    termsVersion: consent.termsVersion,
    consent_at: now
  };
  await appendJsonl(WAITLIST_PATH, row);
}

export async function listWaitlist(limit = 500): Promise<WaitlistRow[]> {
  const safeLimit = Math.max(1, Math.min(5000, Math.floor(Number(limit) || 500)));

  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("waitlist")
      .select("id,email,interests,created_at,terms_accepted,terms_version,consent_at")
      .order("created_at", { ascending: false })
      .limit(safeLimit);
    if (error) throw error;

    return (data || []).map((r: any) => ({
      id: String(r.id),
      email: String(r.email),
      interests: Array.isArray(r.interests) ? r.interests : [],
      created_at: String(r.created_at),
      termsAccepted: Boolean(r.terms_accepted),
      termsVersion: r.terms_version ? String(r.terms_version) : undefined,
      consent_at: r.consent_at ? String(r.consent_at) : undefined
    }));
  }

  const rows = await readJsonl<WaitlistRow>(WAITLIST_PATH);
  rows.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return rows.slice(0, safeLimit);
}

// ------------------------------
// Contact
// ------------------------------

export async function insertContact(
  name: string,
  email: string,
  message: string,
  meta?: { ip?: string | null; userAgent?: string | null }
) {
  const now = new Date().toISOString();
  const normalizedEmail = email.trim().toLowerCase();
  const safeName = name.trim();
  const safeMessage = message.trim();

  const sb = getSupabaseAdmin();
  if (sb) {
    const { error } = await sb.from("contact_messages").insert({
      name: safeName,
      email: normalizedEmail,
      message: safeMessage,
      ip: meta?.ip || null,
      user_agent: meta?.userAgent || null
    });
    if (error) throw error;
    return;
  }

  const row: ContactRow = {
    id: uid(),
    name: safeName,
    email: normalizedEmail,
    message: safeMessage,
    created_at: now,
    ip: meta?.ip || null,
    userAgent: meta?.userAgent || null
  };
  await appendJsonl(CONTACT_PATH, row);
}

export async function listContacts(limit = 200): Promise<ContactRow[]> {
  const safeLimit = Math.max(1, Math.min(2000, Math.floor(Number(limit) || 200)));

  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("contact_messages")
      .select("id,name,email,message,created_at,ip,user_agent")
      .order("created_at", { ascending: false })
      .limit(safeLimit);
    if (error) throw error;
    return (data || []).map((r: any) => ({
      id: String(r.id),
      name: String(r.name),
      email: String(r.email),
      message: String(r.message),
      created_at: String(r.created_at),
      ip: r.ip ?? null,
      userAgent: r.user_agent ?? null
    }));
  }

  const rows = await readJsonl<ContactRow>(CONTACT_PATH);
  rows.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return rows.slice(0, safeLimit);
}

// ------------------------------
// Outbox
// ------------------------------

export async function insertOutbox(row: Omit<OutboxRow, "id" | "created_at"> & { created_at?: string }) {
  const now = row.created_at || new Date().toISOString();

  const sb = getSupabaseAdmin();
  if (sb) {
    const { error } = await sb.from("outbox").insert({
      kind: row.kind,
      mode: row.mode,
      to_email: row.to,
      from_email: row.from,
      subject: row.subject,
      payload: row.payload,
      status: row.status || "queued",
      error: row.error || null,
      created_at: now
    });
    if (error) throw error;
    return;
  }

  await appendJsonl(OUTBOX_PATH, {
    id: uid(),
    created_at: now,
    ...row
  });
}

export async function listOutbox(limit = 250): Promise<OutboxRow[]> {
  const safeLimit = Math.max(1, Math.min(2000, Math.floor(Number(limit) || 250)));

  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("outbox")
      .select("id,kind,mode,to_email,from_email,subject,payload,created_at,status,error")
      .order("created_at", { ascending: false })
      .limit(safeLimit);
    if (error) throw error;
    return (data || []).map((r: any) => ({
      id: String(r.id),
      kind: String(r.kind),
      mode: String(r.mode),
      to: String(r.to_email),
      from: String(r.from_email),
      subject: String(r.subject),
      payload: r.payload,
      created_at: String(r.created_at),
      status: toOutboxStatus(r.status),
      error: r.error ? String(r.error) : null
    }));
  }

  const rows = await readJsonl<OutboxRow>(OUTBOX_PATH);
  rows.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return rows.slice(0, safeLimit);
}

// ------------------------------
// Diagnostics
// ------------------------------

export async function getStorageMode() {
  if (hasSupabase()) return { mode: "supabase" as const };
  return { mode: "jsonl" as const, dataDir: DATA_DIR };
}
