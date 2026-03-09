"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "./home" },
  { href: "/resume", label: "./resume" },
  { href: "/blog", label: "./blog" },
  { href: "/contact", label: "./contact" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 font-mono"
      style={{
        backgroundColor: "rgba(10, 10, 10, 0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #2d3748",
        boxShadow: "0 2px 20px rgba(0, 255, 65, 0.05)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Terminal prompt */}
        <Link
          href="/"
          className="text-sm font-bold tracking-tight hover:opacity-90 transition-opacity"
          style={{ textDecoration: "none" }}
          suppressHydrationWarning
        >
          <span style={{ color: "#4a5568" }}>[</span>
          <span
            style={{
              color: "#00ff41",
              textShadow: "0 0 10px rgba(0, 255, 65, 0.5)",
            }}
          >
            M00NLIG7
          </span>
          <span style={{ color: "#4a5568" }}>@</span>
          <span style={{ color: "#00d4ff" }}>cyberdef</span>
          <span style={{ color: "#e2e8f0" }}> ~</span>
          <span style={{ color: "#4a5568" }}>]</span>
          <span
            style={{
              color: "#00ff41",
              textShadow: "0 0 8px rgba(0, 255, 65, 0.6)",
            }}
          >
            $
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-xs md:text-sm ${
                  isActive ? "nav-link-active" : ""
                }`}
                style={{
                  color: isActive ? "#00ff41" : "#4a5568",
                  textShadow: isActive
                    ? "0 0 8px rgba(0, 255, 65, 0.6)"
                    : "none",
                }}
                suppressHydrationWarning
              >
                {isActive && (
                  <span style={{ color: "#00ff41", marginRight: "2px" }}>
                    &gt;
                  </span>
                )}
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
