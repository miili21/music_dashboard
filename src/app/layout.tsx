import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Even Artist Dashboard",
  description: "Your next-generation music artist dashboard.",
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
