import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const WAITLIST_PATH = path.join(DATA_DIR, "waitlist.jsonl");
const CONTACT_PATH = path.join(DATA_DIR, "contact.jsonl");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

type WaitlistRow = {
  id: string;
  email: string;
  interests: string[];
  created_at: string;
  termsAccepted?: boolean;
  termsVersion?: string;
  consent_at?: string;
};

type ContactRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

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

export async function insertWaitlist(email: string, interests: string[], consent: { termsAccepted: true; termsVersion: string }) {
  const now = new Date().toISOString();
  const row: WaitlistRow = {
    id: uid(),
    email,
    interests,
    created_at: now,
    termsAccepted: true,
    termsVersion: consent.termsVersion,
    consent_at: now
  };
  await appendJsonl(WAITLIST_PATH, row);
}

export async function insertContact(name: string, email: string, message: string) {
  const row: ContactRow = {
    id: uid(),
    name,
    email,
    message,
    created_at: new Date().toISOString()
  };
  await appendJsonl(CONTACT_PATH, row);
}

export async function listWaitlist(limit = 500) {
  const safeLimit = Math.max(1, Math.min(5000, Math.floor(Number(limit) || 500)));
  const rows = await readJsonl<WaitlistRow>(WAITLIST_PATH);
  rows.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return rows.slice(0, safeLimit);
}
