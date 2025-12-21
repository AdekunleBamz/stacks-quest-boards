import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stacks Quest Boards - Learn Stacks Blockchain Development",
  description: "Comprehensive learning platform for Stacks blockchain development. Master smart contracts, DeFi protocols, NFTs, and frontend integration with hands-on tutorials and documentation.",
  keywords: ["Stacks", "Blockchain", "Smart Contracts", "Clarity", "DeFi", "NFT", "Web3", "Cryptocurrency"],
  authors: [{ name: "Stacks Community" }],
  openGraph: {
    title: "Stacks Quest Boards - Learn Stacks Blockchain Development",
    description: "Your comprehensive learning platform for Stacks blockchain development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
