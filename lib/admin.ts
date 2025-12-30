export const DEFAULT_ADMIN_TOKEN = "hydrora-admin-2412";

/**
 * Admin token (server-only).
 *
 * - In production (Vercel), ADMIN_TOKEN MUST be set.
 * - In local dev, we fall back to DEFAULT_ADMIN_TOKEN for convenience.
 */
export function getAdminToken() {
  const t = process.env.ADMIN_TOKEN?.trim();
  if (t) return t;

  // Never ship an implicit default token to production.
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_TOKEN is not set. Add it as an environment variable (Vercel: Project → Settings → Environment Variables)."
    );
  }

  return DEFAULT_ADMIN_TOKEN;
}
