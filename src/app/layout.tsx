import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { RoleProvider } from "@/components/providers/RoleProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { RoleSelectorModal } from "@/components/layout/RoleSelectorModal";
import { CursorSpotlight } from "@/components/background/CursorSpotlight";
import { NodePulse } from "@/components/background/NodePulse";
import { NoiseOverlay } from "@/components/background/NoiseOverlay";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/constants";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";
import type { Viewport } from "next";

const geist = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0D11" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TITLE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shivanshu Tiwari — AI Agent & Backend Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "7WNszbUUuZhAkzA3WgPqePbA0BGZR7OmFOaCvZFtUfQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning style={{ colorScheme: "dark light" }}>
      <body className="min-h-dvh flex flex-col bg-background text-foreground antialiased">
        <PersonSchema />
        <WebSiteSchema />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <NodePulse />
        <NoiseOverlay />
        <CursorSpotlight />
        <ThemeProvider>
          <RoleProvider>
            <Header />
            <RoleSelectorModal />
            <main id="main-content" className="flex flex-1 flex-col">{children}</main>
            <ScrollToTop />
            <Analytics />
            <Footer />
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
