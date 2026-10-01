import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "John Kent Blancaflor | Developer Portfolio",
  description:
    "Personal developer portfolio of John Kent Blancaflor — 2nd year BSIT student, building for the web with JavaScript, React, and Next.js.",
  metadataBase: new URL("https://portyob.vercel.app"),
  openGraph: {
    title: "John Kent Blancaflor | Developer Portfolio",
    description:
      "Personal developer portfolio of John Kent Blancaflor — 2nd year BSIT student, building for the web.",
    url: "https://portyob.vercel.app",
    siteName: "John Kent's Portfolio",
    locale: "en_US",
    type: "website",
    images: ["/profile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Kent Blancaflor | Developer Portfolio",
    description: "Personal developer portfolio of John Kent Blancaflor.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}