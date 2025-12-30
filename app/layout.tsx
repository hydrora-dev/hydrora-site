import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, OG_IMAGE, absoluteUrl } from "@/lib/seo";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE } from "@/components/site-config";
import { Analytics } from "@/components/Analytics";
import { Providers } from "@/app/Providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400","500","600"],
  variable: "--font-inter",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500","600","700"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`
  },
  description:
    "HYDRORA is a premium smart hydration ecosystem: a connected bottle, modular flavour pods, and an app designed for calm, actionable insights. Pre-launch — join the waitlist.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Premium smart hydration ecosystem: bottle + pods + connected app. Pre-launch — join the waitlist.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} OpenGraph` }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Premium smart hydration ecosystem: bottle + pods + connected app. Pre-launch — join the waitlist.",
    images: [OG_IMAGE]
  },
  icons: { icon: [{ url: "/icons/icon.svg" }], apple: [{ url: "/icons/icon.svg" }] },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans text-white antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus-visible:focus-ring fixed left-4 top-4 z-[60] bg-navy px-4 py-2">
          Skip to content
        </a>
        <Nav />
        <main id="main"><Providers>{children}</Providers></main>
        <Footer />
        <script
  type="application/ld+json"
  // eslint-disable-next-line react/no-danger
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        slogan: SITE_TAGLINE,
        logo: absoluteUrl("/assets/logo.svg"),
        sameAs: []
      },
      { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL }
    ])
  }}
/>
<Analytics />

      </body>
    </html>
  );
}
