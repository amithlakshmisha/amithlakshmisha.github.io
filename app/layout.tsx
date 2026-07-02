import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Orbitron } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-led",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amith Lakshmisha - Full Stack Developer",
  description: "Full Stack Developer with expertise in React, Angular, Node.js, Python, and AI-powered solutions. Building scalable, user-friendly applications.",
  keywords: ["Full Stack Developer", "React", "Angular", "Node.js", "Python", "AI", "Web Development"],
  authors: [{ name: "Amith Lakshmisha" }],
  creator: "Amith Lakshmisha",
  metadataBase: new URL('https://amithlakshmisha.vercel.app'),
  openGraph: {
    title: "Amith Lakshmisha - Full Stack Developer",
    description: "Full Stack Developer with expertise in React, Angular, Node.js, Python, and AI-powered solutions.",
    url: 'https://amithlakshmisha.vercel.app',
    siteName: "Amith Lakshmisha Portfolio",
    images: [
      {
        url: '/amith.jpeg',
        width: 1200,
        height: 630,
        alt: 'Amith Lakshmisha - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amith Lakshmisha - Full Stack Developer",
    description: "Full Stack Developer with expertise in React, Angular, Node.js, Python, and AI-powered solutions.",
    images: ['/amith.jpeg'],
  },
  icons: {
    icon: [
      { url: '/amith.jpeg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/amith.jpeg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/amith.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/amith.jpeg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${barlow.variable} ${barlowCondensed.variable} ${orbitron.variable}`}>
      <body className={barlow.className}>{children} <Analytics /></body>
    </html>
  );
}
