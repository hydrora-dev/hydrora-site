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

export async function sendContactEmail(args: SendContactArgs) {
  const host = required("SMTP_HOST", process.env.SMTP_HOST);
  const port = Number(required("SMTP_PORT", process.env.SMTP_PORT));
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true"; // true only for 465
  const user = required("SMTP_USER", process.env.SMTP_USER);
  const pass = required("SMTP_PASS", process.env.SMTP_PASS);

  const to = required("CONTACT_TO_EMAIL", process.env.CONTACT_TO_EMAIL);
  const from = required("CONTACT_FROM_EMAIL", process.env.CONTACT_FROM_EMAIL);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject = `HYDRORA Contact: ${args.name || "Website visitor"}`;

  const text =
`New contact form message:

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
    <pre style="white-space:pre-wrap; background:#f6f6f6; padding:12px; border-radius:8px;">${escapeHtml(args.message)}</pre>
    <p style="margin:12px 0 0 0; color:#666; font-size:12px;">
      IP: ${escapeHtml(args.meta?.ip ?? "n/a")}<br/>
      UA: ${escapeHtml(args.meta?.userAgent ?? "n/a")}
    </p>
  </div>`;

  const info = await transporter.sendMail({
    to,
    from,
    subject,
    text,
    html,
    replyTo: args.email, // so you can hit Reply in IONOS
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
