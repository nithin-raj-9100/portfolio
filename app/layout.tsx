import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nithin Raj - Full Stack Developer",
  description:
    "Personal dashboard showcasing the portfolio, skills, and experience of Nithin Raj, a passionate full-stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Nithin Raj",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Nithin Raj", url: "https://github.com/nithin-raj-9100/" }],
  openGraph: {
    title: "Nithin Raj - Full Stack Developer",
    description:
      "Personal dashboard showcasing portfolio, skills, and experience",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}