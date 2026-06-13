import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wildan Anwar — Software Engineer & Full-Stack Developer",
  description:
    "Portfolio of Wildan Anwar, a Software Engineer and Full-Stack Developer from Surabaya, Indonesia. Specializing in web apps, AI systems, cloud infrastructure, and IoT solutions.",
  keywords: [
    "Wildan Anwar",
    "Software Engineer",
    "Full-Stack Developer",
    "IoT Developer",
    "Laravel",
    "Python",
    "FastAPI",
    "Surabaya",
    "Indonesia",
    "Telkomsel",
    "PENS",
  ],
  authors: [{ name: "Wildan Anwar", url: "https://github.com/willynwr" }],
  creator: "Wildan Anwar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Wildan Anwar — Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Wildan Anwar — building scalable web apps, AI systems & IoT solutions from Surabaya, Indonesia.",
    siteName: "Wildan Anwar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wildan Anwar — Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Wildan Anwar — building scalable web apps, AI systems & IoT solutions.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#0d0d0d] text-[#f0f0f0] antialiased font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
