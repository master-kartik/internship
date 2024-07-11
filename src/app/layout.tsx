import type { Metadata } from "next";
import { Grand_Hotel } from "next/font/google";
import "./globals.css";

const inter = Grand_Hotel({weight: '400',
  preload: false,});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
