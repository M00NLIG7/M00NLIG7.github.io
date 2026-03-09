import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Analytics } from "@vercel/analytics/next";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "M00NLIG7 | Cybersecurity Engineer @ MITRE",
  description:
    "Christian Magana — Cybersecurity Engineer at MITRE. TS/SCI w/ FS Poly. EDR/XDR developer, CyberCorps SFS alumni, CCDC competitor, post-quantum cryptography researcher.",
  keywords: [
    "cybersecurity",
    "MITRE",
    "EDR",
    "XDR",
    "CyberCorps SFS",
    "TS/SCI",
    "CTF",
    "security engineer",
    "post-quantum cryptography",
    "Go security tools",
  ],
  authors: [{ name: "Christian Magana" }],
  openGraph: {
    title: "M00NLIG7 | Cybersecurity Engineer",
    description:
      "Cybersecurity Engineer, Penetration Tester, and CTF Player.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} antialiased scanline-overlay`}
        suppressHydrationWarning
        style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          backgroundColor: "#0a0a0a",
          color: "#e2e8f0",
          minHeight: "100vh",
        }}
      >
        <NavBar />
        <main className="min-h-screen">{children}</main>
        <Analytics />
        <footer
          className="border-t font-mono text-xs py-6 mt-12"
          style={{
            borderColor: "#2d3748",
            backgroundColor: "#0a0a0a",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span style={{ color: "#4a5568" }}>
              <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
              echo &quot;EOF&quot;
            </span>
            <span style={{ color: "#4a5568" }}>
              © 2026 M00NLIG7. All systems operational.{" "}
              <span style={{ color: "#00ff41" }}>■</span>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
