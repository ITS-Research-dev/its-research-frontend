import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITS Research",
  description: "ITS Research Learning Platform",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
