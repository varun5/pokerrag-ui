import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PokerRag - AI-Powered Poker Assistant",
  description: "Ask questions about poker rules, strategies, and terminology. Get accurate answers powered by AI and comprehensive poker knowledge.",
  keywords: ["poker", "AI", "assistant", "rules", "strategy", "terminology", "Texas Hold'em"],
  authors: [{ name: "PokerRag Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ed7c3f",
  openGraph: {
    title: "PokerRag - AI-Powered Poker Assistant",
    description: "Ask questions about poker rules, strategies, and terminology. Get accurate answers powered by AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokerRag - AI-Powered Poker Assistant",
    description: "Ask questions about poker rules, strategies, and terminology. Get accurate answers powered by AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-poker antialiased">
        {children}
      </body>
    </html>
  );
}
