import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SitaRam Library | Study Point Banthra, Kanpur Road, Lucknow",
  description: "A peaceful, fully air-conditioned study library in Banthra, Kanpur Road, Lucknow. High-speed Wi-Fi, ergonomic chairs, and 100% power backup. Call 70801 51101.",
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