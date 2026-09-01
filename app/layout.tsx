import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/site-config";
import { jsonLdScriptProps, organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

/**
 * Placeholder type pairing pending OnlyHuman's licensed typefaces (see
 * public/fonts/README.md). Plus Jakarta Sans stands in for the
 * heading/body face; Geist Mono (Vercel's open-source font) stands in for
 * the small-caps/label face. Swapping the real files in later is a
 * one-file change — every component consumes the CSS variables below via
 * app/globals.css, never these font objects directly.
 */
const sansPlaceholder = Plus_Jakarta_Sans({
  variable: "--font-sans-placeholder",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Prescription Weight Loss & Daily Wellness, 100% Online`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Prescription Weight Loss & Daily Wellness, 100% Online`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Prescription Weight Loss & Daily Wellness, 100% Online`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sansPlaceholder.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <script {...jsonLdScriptProps(organizationJsonLd())} />
        <script {...jsonLdScriptProps(websiteJsonLd())} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
