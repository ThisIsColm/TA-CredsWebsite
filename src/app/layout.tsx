import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tiny Ark — Creative Studio",
  description:
    "Tiny Ark is a creative studio specializing in strategy, design, motion, and digital experiences for brands that demand more.",
  openGraph: {
    title: "Tiny Ark — Creative Studio",
    description:
      "Strategy. Design. Motion. Web. Video. We build brands that move.",
    type: "website",
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
        {/* Adobe Fonts — replace kit ID with your actual Typekit that includes "tenon" */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/xxxxxxx.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
