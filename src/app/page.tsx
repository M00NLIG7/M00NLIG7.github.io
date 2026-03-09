import Link from "next/link";
import TypingAnimation from "@/components/TypingAnimation";
import BlogCard from "@/components/BlogCard";
import StatCards from "@/components/StatCards";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import { getRecentPosts, getAllPosts } from "@/lib/posts";


const stats = [
  { label: "Security Clearance", value: "TS/SCI", color: "#00ff41" },
  { label: "CCDC Placements", value: "Regional", color: "#00d4ff" },
  { label: "Years Experience", value: "4+", color: "#ff6b35" },
  { label: "Certifications", value: "4", color: "#00ff41" },
];

export default function Home() {
  const recentPosts = getRecentPosts(3);
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* ====================================================
          HERO SECTION
          ==================================================== */}
      <section
        className="circuit-pattern relative min-h-screen flex items-center"
        style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
      >
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(0,255,65,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.04) 0%, transparent 50%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: ASCII art + typing animation */}
            <div className="flex flex-col gap-6">
              {/* Hero SVG */}
              <svg
                viewBox="0 0 380 148"
                className="w-full"
                style={{ maxWidth: "500px" }}
                aria-label="Hello World"
                suppressHydrationWarning
              >
                <defs>
                  <filter id="hero-glow" x="-10%" y="-30%" width="120%" height="160%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <text
                  x="2"
                  y="64"
                  fontSize="72"
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', 'Courier New', monospace"
                  fill="#00ff41"
                  filter="url(#hero-glow)"
                >
                  HELLO
                </text>
                <text
                  x="2"
                  y="138"
                  fontSize="72"
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', 'Courier New', monospace"
                  fill="#00ff41"
                  filter="url(#hero-glow)"
                >
                  WORLD
                </text>
              </svg>

              {/* Name */}
              <div>
                <h1
                  className="text-3xl md:text-4xl font-bold font-mono tracking-tight"
                  style={{
                    color: "#00ff41",
                    textShadow:
                      "0 0 15px rgba(0,255,65,0.4), 0 0 30px rgba(0,255,65,0.2)",
                  }}
                >
                  M00NLIG7
                </h1>
                <div className="mt-2 text-base md:text-lg font-mono h-7">
                  <span style={{ color: "#4a5568" }}>$ </span>
                  <TypingAnimation
                    texts={[
                      "Cybersecurity Engineer @ MITRE.",
                      "EDR/XDR Developer.",
                      "CTF Competitor.",
                      "CyberCorps SFS Alumni.",
                      "TS/SCI w/ FS Poly.",
                    ]}
                    speed={55}
                    deleteSpeed={25}
                    pauseDuration={1800}
                    className="text-base md:text-lg font-mono"
                    style={{ color: "#e2e8f0" }}
                  />
                </div>
              </div>

              {/* Bio */}
              <p
                className="text-sm font-mono leading-relaxed max-w-md"
                style={{ color: "#4a5568" }}
              >
                <span style={{ color: "#00ff41" }}>[INFO]</span> Cybersecurity
                engineer at MITRE with TS/SCI w/ FS Poly clearance. CyberCorps®
                SFS graduate building EDR/XDR tooling, competing in CCDC, and
                researching post-quantum cryptography with the NSA.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mt-2">
                <Link href="/resume" className="btn-terminal text-sm">
                  <span style={{ color: "#00ff41" }}>$</span> ./view-resume
                </Link>
                <Link href="/blog" className="btn-terminal-cyan text-sm">
                  <span style={{ color: "#00d4ff" }}>$</span> ./read-blog
                </Link>
              </div>
            </div>

            {/* Right: Profile card + Boot sequence */}
            <div className="flex flex-col gap-6">
              {/* Profile image (CSS art) */}
              <div className="flex justify-center lg:justify-end">
                <div
                  className="relative w-48 h-48 rounded-sm overflow-hidden"
                  style={{
                    border: "2px solid #00ff41",
                    boxShadow:
                      "0 0 20px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.15), inset 0 0 20px rgba(0,255,65,0.05)",
                  }}
                >
                  {/* Circuit board pattern background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(rgba(0,255,65,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,65,0.06) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                      backgroundColor: "#0a0a0a",
                    }}
                  />
                  {/* Radial glow center */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(0,255,65,0.15) 0%, transparent 70%)",
                    }}
                  />
                  {/* M00NLIG7 text art */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div
                      className="text-4xl font-bold font-mono"
                      style={{
                        color: "#00ff41",
                        textShadow:
                          "0 0 15px rgba(0,255,65,0.8), 0 0 30px rgba(0,255,65,0.4)",
                      }}
                    >
                      ◈
                    </div>
                    <div
                      className="text-xs font-mono font-bold tracking-widest"
                      style={{
                        color: "#00ff41",
                        textShadow: "0 0 8px rgba(0,255,65,0.6)",
                      }}
                    >
                      M00NLIG7
                    </div>
                    <div
                      className="text-xs font-mono"
                      style={{ color: "#4a5568" }}
                    >
                      SEC_ENG
                    </div>
                  </div>
                  {/* Scanline overlay on image */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.03) 3px, rgba(0,255,65,0.03) 4px)",
                    }}
                  />
                  {/* Corner brackets */}
                  <div
                    className="absolute top-2 left-2 w-4 h-4"
                    style={{
                      borderTop: "1px solid #00ff41",
                      borderLeft: "1px solid #00ff41",
                    }}
                  />
                  <div
                    className="absolute top-2 right-2 w-4 h-4"
                    style={{
                      borderTop: "1px solid #00ff41",
                      borderRight: "1px solid #00ff41",
                    }}
                  />
                  <div
                    className="absolute bottom-2 left-2 w-4 h-4"
                    style={{
                      borderBottom: "1px solid #00ff41",
                      borderLeft: "1px solid #00ff41",
                    }}
                  />
                  <div
                    className="absolute bottom-2 right-2 w-4 h-4"
                    style={{
                      borderBottom: "1px solid #00ff41",
                      borderRight: "1px solid #00ff41",
                    }}
                  />
                </div>
              </div>

              {/* Interactive terminal */}
              <InteractiveTerminal posts={allPosts} />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          STATS SECTION
          ==================================================== */}
      <section
        className="py-12 border-y"
        style={{
          borderColor: "#2d3748",
          backgroundColor: "#111111",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="text-xs font-mono mb-6"
            style={{ color: "#4a5568" }}
          >
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
            cat /etc/stats
          </div>
          <StatCards stats={stats} />
        </div>
      </section>

      {/* ====================================================
          RECENT POSTS SECTION
          ==================================================== */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <div
            className="text-xs font-mono mb-2"
            style={{ color: "#4a5568" }}
          >
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
            ls -la posts/ | head -3
          </div>
          <h2
            className="text-xl font-bold font-mono"
            style={{
              color: "#00ff41",
              textShadow: "0 0 10px rgba(0,255,65,0.3)",
            }}
          >
            // Recent Posts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="btn-terminal text-sm">
            <span style={{ color: "#00ff41" }}>$</span> ./view-all-posts
          </Link>
        </div>
      </section>

      {/* ====================================================
          QUICK SKILLS SECTION
          ==================================================== */}
      <section
        className="py-12 border-t"
        style={{ borderColor: "#2d3748", backgroundColor: "#111111" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="text-xs font-mono mb-4"
            style={{ color: "#4a5568" }}
          >
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
            ls skills/
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Go",
              "Python",
              "Rust",
              "C / C++",
              "PowerShell",
              "EDR / XDR Development",
              "MITRE ATT&CK",
              "Post-Quantum Cryptography",
              "Incident Response",
              "Forensics (FTK / Magnet)",
              "VMware vSphere",
              "Docker / Runc",
              "Infrastructure as Code",
              "FedRAMP",
              "Active Directory",
              "Sigma Rules",
              "Penetration Testing",
              "Purple Team",
            ].map((skill, i) => (
              <span
                key={skill}
                className="text-xs font-mono px-2 py-1 rounded transition-all duration-200"
                style={{
                  color: i % 3 === 0 ? "#00ff41" : i % 3 === 1 ? "#00d4ff" : "#ff6b35",
                  backgroundColor:
                    i % 3 === 0
                      ? "rgba(0,255,65,0.08)"
                      : i % 3 === 1
                      ? "rgba(0,212,255,0.08)"
                      : "rgba(255,107,53,0.08)",
                  border:
                    i % 3 === 0
                      ? "1px solid rgba(0,255,65,0.3)"
                      : i % 3 === 1
                      ? "1px solid rgba(0,212,255,0.3)"
                      : "1px solid rgba(255,107,53,0.3)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/resume" className="btn-terminal-cyan text-sm">
              <span style={{ color: "#00d4ff" }}>$</span> ./view-full-resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
