import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { publicPath } from "@/lib/site-path";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yobb-bit.github.io/portYob";

export const metadata: Metadata = {
  title: "John Kent Blancaflor | Developer Portfolio",
  description:
    "Personal developer portfolio of John Kent Blancaflor — 3rd year BSIT student, building for the web with JavaScript, React, and Next.js.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "John Kent Blancaflor | Developer Portfolio",
    description:
      "Personal developer portfolio of John Kent Blancaflor — 3rd year BSIT student, building for the web.",
    url: siteUrl,
    siteName: "John Kent's Portfolio",
    locale: "en_US",
    type: "website",
    images: [publicPath("/profile.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Kent Blancaflor | Developer Portfolio",
    description: "Personal developer portfolio of John Kent Blancaflor, 3rd year BSIT student.",
    images: [publicPath("/profile.jpg")],
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
      suppressHydrationWarning
    >
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="lg:pl-[14rem]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
