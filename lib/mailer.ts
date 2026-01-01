import nodemailer from "nodemailer";

type SendContactArgs = {
  name: string;
  email: string;
  message: string;
  meta?: { ip?: string | null; userAgent?: string | null };
};

function required(name: string, v?: string) {
  const val = (v || "").trim();
  if (!val) throw new Error(`Missing env var: ${name}`);
  return val;
}

function parsePort(v: string) {
  const n = Number(v);
  if (!Number.isFinite(n) || n <= 0) throw new Error(`Invalid SMTP_PORT: ${v}`);
  return n;
}

function normalizeBool(v?: string) {
  return String(v || "").trim().toLowerCase() === "true";
}

export async function sendContactEmail(args: SendContactArgs) {
  const host = required("SMTP_HOST", process.env.SMTP_HOST);
  const port = parsePort(required("SMTP_PORT", process.env.SMTP_PORT));
  const secure = normalizeBool(process.env.SMTP_SECURE); // true usually only for 465
  const user = required("SMTP_USER", process.env.SMTP_USER);
  const pass = required("SMTP_PASS", process.env.SMTP_PASS);

  const to = required("CONTACT_TO_EMAIL", process.env.CONTACT_TO_EMAIL);
  const from = required("CONTACT_FROM_EMAIL", process.env.CONTACT_FROM_EMAIL);

  // Recommended for 587 (STARTTLS): secure=false + requireTLS=true
  // For 465: secure=true (implicit TLS)
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    requireTLS: !secure, // helps on 587
    tls: {
      // IONOS is generally fine; this avoids certain handshake edge cases.
      // Do NOT set rejectUnauthorized:false unless you absolutely must.
      minVersion: "TLSv1.2",
    },
  });

  const safeName = (args.name || "").trim() || "Website visitor";
  const subject = `HYDRORA Contact: ${safeName}`;

  const text = `New contact form message:

Name: ${args.name}
Email: ${args.email}

Message:
${args.message}

Meta:
IP: ${args.meta?.ip ?? "n/a"}
User-Agent: ${args.meta?.userAgent ?? "n/a"}
`;

  const html = `
<div style="font-family: Inter, Arial, sans-serif; line-height:1.5;">
  <h2 style="margin:0 0 12px 0;">New HYDRORA contact form message</h2>
  <p style="margin:0 0 6px 0;"><strong>Name:</strong> ${escapeHtml(args.name)}</p>
  <p style="margin:0 0 6px 0;"><strong>Email:</strong> ${escapeHtml(args.email)}</p>
  <p style="margin:12px 0 6px 0;"><strong>Message:</strong></p>
  <pre style="white-space:pre-wrap; background:#f6f6f6; padding:12px; border-radius:8px;">${escapeHtml(
    args.message
  )}</pre>
  <p style="margin:12px 0 0 0; color:#666; font-size:12px;">
    IP: ${escapeHtml(args.meta?.ip ?? "n/a")}<br/>
    UA: ${escapeHtml(args.meta?.userAgent ?? "n/a")}
  </p>
</div>`;

  // Make reply experience perfect:
  // - From: your IONOS mailbox (CONTACT_FROM_EMAIL)
  // - Reply-To: visitor email (so you can hit Reply)
  const info = await transporter.sendMail({
    to,
    from,
    subject,
    text,
    html,
    replyTo: args.email,
  });

  return { messageId: info.messageId };
}

function escapeHtml(v: string) {
  return String(v || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
