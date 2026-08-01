import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/smooth-scroll";
import CustomCursor from "@/components/premium/custom-cursor";
import ThreeBgClient from "@/components/ui/three-bg-client";
import Navigation from "@/components/ui/nav";
import CommandPalette from "@/components/premium/command-palette";
import TerminalWidget from "@/components/premium/terminal";
import ThemeCustomizer from "@/components/premium/theme-customizer";
import Toasts from "@/components/ui/toasts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Srijan Kumar Goud | Full Stack Developer & AI Product Builder",
  description:
    "Portfolio of Budige Srijan Kumar Goud — Full Stack Developer, AI Product Builder, and SaaS UI Engineer. Building premium SaaS experiences, AI-powered applications, and modern interactive web systems.",
  keywords: [
    "Srijan Kumar Goud",
    "Full Stack Developer",
    "AI Product Builder",
    "SaaS UI Engineer",
    "React Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Budige Srijan Kumar Goud" }],
  metadataBase: new URL("https://srijan.dev"), // Update with actual domain if known, placeholder for now
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Srijan Kumar Goud | Full Stack Developer & AI Product Builder",
    description:
      "Building premium SaaS experiences, AI-powered applications, and modern interactive web systems.",
    type: "website",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Srijan Kumar Goud Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Srijan Kumar Goud | Full Stack Developer & AI Product Builder",
    description:
      "Building premium SaaS experiences, AI-powered applications, and modern interactive web systems.",
    images: ["/images/profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#020204] text-[#f5f5f7] antialiased overflow-x-hidden selection:bg-white/10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Budige Srijan Kumar Goud",
              url: "https://srijan.dev", // Update with actual URL
              jobTitle: "Full Stack Software Engineer",
              sameAs: [
                "https://github.com/srijansk13",
                "https://linkedin.com/in/srijansk13",
              ],
            }),
          }}
        />
        <SmoothScroll>
          {/* Custom micro-interactions & background layers */}
          <CustomCursor />
          <ThreeBgClient />
          <Toasts />

          {/* Floating UI Elements */}
          <Navigation />
          <CommandPalette />
          <TerminalWidget />
          <ThemeCustomizer />

          {/* Core Page Content */}
          <main className="flex flex-col flex-1">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
