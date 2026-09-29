import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SitaRam Library | Premium Study Space Lucknow",
  description: "A focused, peaceful, air-conditioned study library in Lucknow. High-speed Wi-Fi, personal study carrels, and 24/7 power backup. Call 70801 51101.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}