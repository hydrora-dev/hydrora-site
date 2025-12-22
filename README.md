# HYDRORA — Next.js (App Router) + TypeScript + Tailwind

Premium, interactive, multi-page pre-launch site for HYDRORA.

## Routes

- `/` Home
- `/bottle` Bottle
- `/pods` Pods
- `/app` App
- `/merch` Merch storefront
- `/merch/[slug]` Merch product detail pages
- `/about` About
- `/faq` FAQ
- `/contact` Contact
- `/legal/privacy` Privacy Policy (placeholder)
- `/legal/terms` Terms of Service (placeholder)
- `/legal/cookies` Cookie Policy (placeholder)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build (Node hosting)

```bash
npm run build
npm run start
```

## Deploy to IONOS (Option A — Node hosting)

1. Upload the project folder to your IONOS Node.js hosting environment.
2. Set the **Node.js version** to 18+.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build:
   ```bash
   npm run build
   ```
5. Start (IONOS typically sets `PORT` automatically):
   ```bash
   npm run start
   ```

### Environment variables (optional)

- `PORT` (usually set by host)
- Analytics placeholders are disabled by default.

## Deploy to IONOS (Option B — Static export)

This is compatible if you do not rely on server routes (`/api/*`).

1. Edit `next.config.mjs` to enable static export:
   ```js
   const nextConfig = {
     output: "export",
     images: { unoptimized: true }
   };
   export default nextConfig;
   ```
2. Replace the waitlist + contact forms to post to a third-party form endpoint (Formspree, Getform, etc.) because `app/api/*` will not work on static hosting.
3. Build:
   ```bash
   npm run build
   ```
4. Export output is created in `out/`. Upload the contents of `out/` to your IONOS static hosting.

## Placeholder assets

- `public/assets/logo.svg` (optional)
- `public/assets/bottle-silhouette.svg`
- `public/assets/pod-silhouette.svg`
- Merch illustrations in `public/assets/merch/*.svg`
- `public/og-hydrora.png` OpenGraph image (placeholder path)

## Integration notes (Merch)

Recommended approach:
- Shopify for storefront + checkout
- Printify for POD fulfilment
- Connect using Shopify Storefront API (Hydrogen or Next.js)

This repo includes a realistic UI and placeholder checkout buttons.

## QA checklist

- Mobile: hero layout, sticky nav, modals, forms
- Tablet: grid breakpoints, text scaling
- Desktop: hover interactions, faux 3D, modal focus
- Performance: Lighthouse (images are SVG; minimal JS; animations reduced-motion aware)
- SEO: metadata, OG/Twitter, JSON-LD on home
- Accessibility: skip link, focus rings, aria labels, keyboard modal close
## Waitlist database (free, file-based)

Waitlist and contact form submissions are stored in local JSON Lines files (no paid services, no external accounts).

- Waitlist file: `data/waitlist.jsonl`
- Contact file: `data/contact.jsonl`
- Admin viewer: `/admin/waitlist?token=YOUR_TOKEN`

### Admin protection

Set an environment variable (local or IONOS):

- `ADMIN_TOKEN=some-long-random-string`

Then open:

- `/admin/waitlist?token=some-long-random-string`

## Notes for IONOS filesystem

This approach requires Node hosting (so API routes run) and a persistent filesystem (most IONOS Node plans provide this).

## Admin access (default token)

If you do not set `ADMIN_TOKEN`, the site uses this default token for local testing:

- `hydrora-admin-2412`

Admin URL:
- `/admin/waitlist?token=hydrora-admin-2412`

Debug URL:
- `/admin/debug`

## SEO & indexing

- Canonical domain: `https://hydrora.co.uk`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Manifest: `/manifest.webmanifest`

### Setup
1. Add `hydrora.co.uk` to Google Search Console and Bing Webmaster Tools.
2. Submit the sitemap: `https://hydrora.co.uk/sitemap.xml`
3. Ensure all other domains 301-redirect to `hydrora.co.uk` (path-preserving).
## Contact form email delivery

The contact form always stores messages in `data/contact.jsonl`.
Email delivery works in two modes:

### Local/dev mode (no SMTP)
If SMTP env vars are not set, the server writes an email payload to:
- `data/outbox.jsonl`

View it here (default admin token):
- `/admin/outbox?token=hydrora-admin-2412`

### Production SMTP mode (recommended)
Set these environment variables on IONOS Node hosting (use your mailbox details):

- `SMTP_HOST` (e.g. smtp.ionos.co.uk)
- `SMTP_PORT` (usually 587, or 465 with secure)
- `SMTP_USER` (your mailbox username)
- `SMTP_PASS` (your mailbox password)
Optional:
- `SMTP_SECURE=true` (recommended for port 465)
- `CONTACT_TO=support@hydrora.co.uk` (default)
- `CONTACT_FROM=SMTP_USER` (default)

After setting, contact submissions will be emailed to `CONTACT_TO`.


## Security notes

- Admin pages do not reveal the admin token.
- Set `ADMIN_TOKEN` in production to override the default.
- For extra protection, consider adding Basic Auth or an IP allowlist at the hosting layer.


## Release

- Finalised v1
