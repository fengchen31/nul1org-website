import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nul1.org",
  description: "nul1.org - Fashion & Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
