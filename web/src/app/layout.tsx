import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "League of Bilkent",
  description: "campus events, pinned to the board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable}`}>
      <body
        className="min-h-screen text-[12px] font-light antialiased"
        style={{
          fontFamily: "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
          background: "var(--baby-bg)",
          color: "var(--dark)",
          padding: "40px 60px",
        }}
      >
        {children}
      </body>
    </html>
  );
}
