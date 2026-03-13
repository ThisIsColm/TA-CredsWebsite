import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tiny Ark — Creative Video Agency",
  description:
    "Tiny Ark is a creative video agency specializing in strategy, design, motion, and digital experiences for brands that demand more.",
  openGraph: {
    title: "Tiny Ark — Creative Video Agency",
    description:
      "Strategy. Design. Motion. Web. Video. We build brands that move.",
    type: "website",
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-32x32.png",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/*
          To use the Tenon typeface, replace the href below with your real Adobe Fonts/Typekit kit URL.
          Example: <link rel="stylesheet" href="https://use.typekit.net/YOUR_KIT_ID.css" />
          Until then, the font stack falls back to Inter (loaded via next/font) and system UI fonts.
        */}
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
