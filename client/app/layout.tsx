import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  title: "NexTrade — Premium Asset Management Marketplace",
  description:
    "Discover, analyze, and trade high-value assets across global markets. Real-time data, verified listings, and precision tools for modern traders.",
  keywords: [
    "asset management",
    "trading platform",
    "stocks",
    "crypto",
    "marketplace",
    "NexTrade",
  ],
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
      <body className="min-h-full flex flex-col bg-[#0B0C10] text-[#FFFFFF]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.03)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              borderRadius: "12px",
              fontSize: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            },
          }}
        />
      </body>
    </html>
  );
}
