export const DEFAULT_ADMIN_TOKEN = "hydrora-admin-2412";

/**
 * If ADMIN_TOKEN is not set, the app falls back to DEFAULT_ADMIN_TOKEN.
 * Change this before deploying publicly.
 */
export function getAdminToken() {
  return process.env.ADMIN_TOKEN?.trim() || DEFAULT_ADMIN_TOKEN;
}
