import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RESDA - Skill Empowerment for the Nation's",
    template: "%s | RESDA",
  },
  description:
    "RESDA provides world-class IT training (online & offline) and comprehensive IT services including web development, software solutions, mobile apps, and digital marketing. Empowering skills for the nation.",
  keywords: [
    "IT training",
    "online courses",
    "web development",
    "software development",
    "IT services",
    "RESDA",
    "skill empowerment",
    "digital marketing",
    "mobile app development",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
