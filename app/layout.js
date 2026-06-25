import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Elite Hygiene | Premium Industrial Hygiene & Drainage Solutions",
  description: "Elite Hygiene provides world-class industrial hygiene, drainage, and sanitation equipment solutions. Trusted by leading enterprises across India.",
  keywords: "industrial hygiene, drain cleaning, pipe inspection, pest control, hygiene equipment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
