import Terminal from "@/components/Terminal";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | M00NLIG7",
  description:
    "Christian Magana — Cybersecurity Engineer at MITRE. TS/SCI w/ FS Poly. EDR/XDR development, penetration testing, infrastructure security, MITRE ATT&CK.",
};

const experience = [
  {
    title: "Cybersecurity Engineer",
    company: "MITRE",
    period: "February 2026 – Present",
    location: "Remote / McLean, VA",
    current: true,
    highlights: [
      "Apply MITRE ATT&CK framework to real-world adversary simulation and detection engineering",
      "Support national security mission areas with active TS/SCI w/ FS Poly clearance",
    ],
  },
  {
    title: "Systems Engineer",
    company: "Cutler Engineering & Technology Services",
    period: "September 2021 – February 2026",
    location: "Remote",
    current: false,
    highlights: [
      "Configured and deployed multi-server GCCS-M GL v4.1.2.1 installations on Windows Server 2008/2016 with PostgreSQL databases and Apache Tomcat application servers in CANES and COMPOSE network environments",
      "Administered Active Directory integrations including OU/GPO management, Kerberos authentication, PKI certificate deployments, and LDAP user configurations across GCCS-M domains",
    ],
  },
  {
    title: "Cybersecurity Intern",
    company: "US Federal Government",
    period: "May 2024 – August 2024",
    location: "McLean, VA",
    current: false,
    highlights: [
      "Utilized Infrastructure as Code (IaC) to automate infrastructure provisioning, streamlining deployment processes by 30% and enhancing mission enablement capabilities while reducing configuration errors",
      "Developed comprehensive incident response runbooks that reduced MTTR by 35%, strengthened system availability, enhanced resilience, and improved overall security posture across critical infrastructure",
      "Automated security tasks using PowerShell and Python, including Active Directory user management, DNS configuration, security log analysis, and report generation, improving team efficiency by 40%",
    ],
  },
  {
    title: "Cybersecurity Engineer Intern",
    company: "Pacific Northwest National Laboratory",
    period: "June 2023 – May 2024",
    location: "Richland, WA (Remote)",
    current: false,
    highlights: [
      "Spearheaded $200,000+ DoD training simulation project for Army DCS G-9 using React/Next.js, designing and implementing interactive scenarios that gamified educational content and enhanced learning experiences",
      "Conducted Tenable/Qualys data analytics querying 200+ critical vulnerabilities and developed web scrapers for CISA research, delivering actionable insights that strengthened federal infrastructure protection",
      "Demonstrated full-stack deployment skills with Docker including web server, database, and REST APIs",
    ],
  },
  {
    title: "VMware vSphere Administrator",
    company: "California State University, San Bernardino",
    period: "February 2022 – May 2024",
    location: "San Bernardino, CA",
    current: false,
    highlights: [
      "Managed vSphere infrastructure with vCenter across 3 nodes and 1,500+ VMs, maintaining 99% uptime through proactive monitoring, performance tuning, and capacity planning for critical university operations",
      "Developed PowerShell automation scripts that reduced manual intervention by 50% on routine tasks including Active Directory management, DNS configuration, and report generation, saving 20+ hours weekly",
      "Maintained comprehensive infrastructure documentation, managed SAN storage, coordinated hardware installations, and performed system updates while supporting curriculum-integrated lab activities",
    ],
  },
  {
    title: "Cybersecurity Instructor",
    company: "California State University, San Bernardino",
    period: "March 2022 – June 2024",
    location: "San Bernardino, CA",
    current: false,
    highlights: [
      "Delivered blue team cybersecurity fundamentals to classes of 17–30 students in grades 6–12",
      "Designed Python programming curriculum focused on automation, scripting, and cybersecurity tools",
      "Coordinated drone swarm simulations using Tello-EDU drones and the Python djitellopy library for STEM learning",
    ],
  },
];

const skills = {
  "Languages": [
    "Go",
    "Python",
    "C / C++",
    "Rust",
    "PowerShell",
    "Bash",
    "JavaScript / React",
    "Assembly (x86/x64)",
  ],
  "Security Engineering": [
    "EDR / XDR Development",
    "MITRE ATT&CK",
    "Penetration Testing",
    "Purple Team Ops",
    "Vulnerability Management",
    "Incident Response",
    "Threat Intelligence",
    "Sigma Rules",
  ],
  "Tools & Platforms": [
    "Tenable / Qualys",
    "Metasploit",
    "Burp Suite",
    "Ghidra / FTK",
    "VMware vSphere",
    "Docker / Runc",
    "Active Directory",
    "MISP",
  ],
  "Cloud & Infra": [
    "Infrastructure as Code",
    "FedRAMP Compliance",
    "AWS / GCP",
    "PKI / Kerberos",
    "Apache Tomcat",
    "PostgreSQL",
    "LDAP",
    "CI/CD Security",
  ],
  "Research": [
    "Post-Quantum Cryptography",
    "Forensic Analysis",
    "OSINT",
    "Network Monitoring",
    "File & Process Monitoring",
    "Cloud Security",
    "Log Analysis",
    "Cryptographic Algorithms",
  ],
  "Competitions": [
    "CCDC (National)",
    "Collegiate Pentest Comp.",
    "SkillsUSA Cyber (1st, State)",
    "CCDC Western Regionals",
    "CTF Competitor",
    "RCE / XSS Exploitation",
    "Blue Team Defense",
    "Purple Team",
  ],
};

const skillColors: Record<string, { color: string; bg: string; border: string }> = {
  "Languages": { color: "#00ff41", bg: "rgba(0,255,65,0.08)", border: "rgba(0,255,65,0.3)" },
  "Security Engineering": { color: "#ff6b35", bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.3)" },
  "Tools & Platforms": { color: "#00d4ff", bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.3)" },
  "Cloud & Infra": { color: "#00ff41", bg: "rgba(0,255,65,0.08)", border: "rgba(0,255,65,0.3)" },
  "Research": { color: "#00d4ff", bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.3)" },
  "Competitions": { color: "#ff6b35", bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.3)" },
};

const certifications = [
  { name: "Security+", full: "CompTIA Security+ SY0-601", issuer: "CompTIA", year: "Dec 2023", color: "#00ff41" },
  { name: "MCFE", full: "Magnet Certified Forensics Examiner", issuer: "Magnet Forensics", year: "Aug 2022", color: "#00d4ff" },
  { name: "ACE-FTK", full: "AccessData Exterro ACE for FTK", issuer: "Exterro", year: "Aug 2022", color: "#00d4ff" },
  { name: "VMCA", full: "VMware Certified Technical Associate", issuer: "VMware", year: "Aug 2023", color: "#ff6b35" },
];

const achievements = [
  { name: "SkillsUSA", full: "Cybersecurity Champion — 1st Place, State", context: "SkillsUSA", year: "2021", color: "#00ff41" },
  { name: "CCDC Western", full: "Western Regionals — 6th & 2nd Place", context: "CCDC 2021–2023", year: "2021–2023", color: "#00d4ff" },
  { name: "CCDC National", full: "National Collegiate Cyber Defense Competition", context: "Competitor", year: "2023", color: "#00d4ff" },
  { name: "CyberCorps® SFS", full: "Scholarship for Service Recipient", context: "NSF / CSUSB", year: "2021–2025", color: "#ff6b35" },
  { name: "Dean's List", full: "Academic Achievement Award — Cum Laude", context: "CSUSB", year: "2021–2025", color: "#ff6b35" },
];

const projects = [
  {
    name: "MITRE Cyberlayer",
    subtitle: "Cyber Simulation & Emulation Platform",
    color: "#00ff41",
    highlights: [
      "Contributing to MITRE Cyberlayer, an advanced cyber simulation and emulation platform supporting national security mission areas",
      "Applying MITRE ATT&CK framework expertise to develop realistic adversary emulation scenarios and detection capabilities",
    ],
  },
  {
    name: "Serial Scripter",
    subtitle: "Extended Detection & Response (XDR) System",
    color: "#00ff41",
    highlights: [
      "Architected Linux/Unix EDR/XDR system in Go implementing MITRE ATT&CK framework for threat detection and automated response",
      "Leveraged Python, Go, React, and C to implement automated response capabilities, significantly reducing incident response time",
      "Analyzed data using self-made tools to identify patterns and anomalies, providing actionable insights to security teams",
    ],
  },
  {
    name: "Gomemento",
    subtitle: "Endpoint Detection & Response System",
    color: "#00d4ff",
    highlights: [
      "Developed EDR system for Linux/Unix platforms in Go with file watch, process, and network monitoring",
      "Implemented real-time alerts and automated actions against potential security breaches",
    ],
  },
  {
    name: "Chop Chop Go",
    subtitle: "Forensic Analysis Tool (Linux Chainsaw Equivalent)",
    color: "#00d4ff",
    highlights: [
      "Built Go-based forensics tool utilizing Sigma rules for rapid artifact recovery and log analysis",
      "Enables identification of security incidents and threats through comprehensive artifact analysis",
    ],
  },
  {
    name: "Pandora's Box",
    subtitle: "Purple Team Malware Framework",
    color: "#ff6b35",
    highlights: [
      "Crafted purple teaming tool scanning and connecting to network devices, integrating Runc as low-level container runtime for cross-compatibility",
      "Implemented strategic defenses and deception modules to proactively prevent red team intrusions",
    ],
  },
];

const research = [
  {
    title: "Post-Quantum Cryptography on Constrained Networks",
    collab: "In collaboration with NSA",
    color: "#00ff41",
    points: [
      "Led pioneering research at CSUSB on quantum-resistant cryptographic algorithms in constrained network environments",
      "Designed Docker-based virtual environment for simulating network degradation and assessing cryptographic algorithm performance",
      "Conducted data analysis evaluating packet loss impact on post-quantum algorithms, establishing performance benchmarks",
    ],
  },
  {
    title: "Federal Energy Management Program Cloud Paper",
    collab: "FEMP Research",
    color: "#00d4ff",
    points: [
      "Collaborated on cloud security research analyzing FedRAMP compliance guidelines and implementation",
      "Analyzed hypervisor security vulnerabilities and mitigation strategies for virtualized cloud environments",
      "Evaluated storage security technologies including Fiber over Ethernet, NAS, and SAN for federal clouds",
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">

        {/* Header */}
        <Terminal title="whoami — Christian J. Magana">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1 space-y-3">
              <div>
                <div className="text-xs font-mono mb-1" style={{ color: "#4a5568" }}>
                  <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> whoami
                </div>
                <h1 className="text-3xl font-bold font-mono" style={{ color: "#00ff41", textShadow: "0 0 15px rgba(0,255,65,0.4)" }}>
                  Christian J. Magana
                </h1>
                <p className="text-base font-mono mt-1" style={{ color: "#00d4ff" }}>
                  Cybersecurity Engineer · MITRE
                </p>
              </div>

              <div className="space-y-1 text-xs font-mono" style={{ color: "#4a5568" }}>
                <div><span style={{ color: "#00ff41" }}>›</span> location: <span style={{ color: "#e2e8f0" }}>San Diego, CA</span></div>
                <div><span style={{ color: "#00ff41" }}>›</span> email: <span style={{ color: "#00d4ff" }}>christian.j.magana@proton.me</span></div>
                <div><span style={{ color: "#00ff41" }}>›</span> github: <span style={{ color: "#00d4ff" }}>github.com/M00NLIG7</span></div>
                <div>
                  <span style={{ color: "#00ff41" }}>›</span> clearance:{" "}
                  <span className="font-bold" style={{ color: "#00ff41", textShadow: "0 0 8px rgba(0,255,65,0.5)" }}>
                    TS/SCI w/ FS Poly
                  </span>
                </div>
                <div><span style={{ color: "#00ff41" }}>›</span> citizenship: <span style={{ color: "#e2e8f0" }}>US Citizen</span></div>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-[190px]">
              {[
                { label: "Security Clearance", value: "TS/SCI FS Poly", color: "#00ff41" },
                { label: "CCDC Placements", value: "Regional", color: "#00d4ff" },
                { label: "Experience", value: "4+ Years", color: "#ff6b35" },
                { label: "Certifications", value: "4 Active", color: "#00ff41" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between px-3 py-2 rounded text-xs font-mono"
                  style={{ border: `1px solid ${stat.color}30`, backgroundColor: `${stat.color}08` }}
                >
                  <span style={{ color: "#4a5568" }}>{stat.label}</span>
                  <span className="font-bold" style={{ color: stat.color, textShadow: `0 0 8px ${stat.color}60` }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t text-sm font-mono leading-relaxed" style={{ borderColor: "#2d3748", color: "#e2e8f0" }}>
            <span style={{ color: "#4a5568" }}># summary </span>
            <br />
            Cybersecurity professional with active TS/SCI w/ FS Poly clearance and hands-on experience in security
            engineering, EDR/XDR development, and infrastructure automation. CyberCorps® SFS graduate (May 2025) with
            a proven track record building DoD training systems, implementing federal security solutions, and developing
            custom detection tools using the MITRE ATT&CK framework. Proficient in Go, Rust, Python, C/C++, and
            Docker containerization.
          </div>
        </Terminal>

        {/* Experience */}
        <div>
          <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> cat experience.txt
          </div>
          <div className="space-y-4">
            {experience.map((job, i) => (
              <Terminal key={i} title={`${job.company.toLowerCase().replace(/[\s,./&]+/g, "_")}.log`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold font-mono" style={{ color: "#00ff41" }}>
                        {job.title}
                      </h3>
                      {job.current && (
                        <span
                          className="text-xs font-mono px-1.5 py-0.5 rounded animate-pulse"
                          style={{ color: "#0a0a0a", backgroundColor: "#00ff41", fontSize: "0.65rem" }}
                        >
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-mono" style={{ color: "#00d4ff" }}>
                      {job.company}
                    </p>
                  </div>
                  <div className="text-right text-xs font-mono" style={{ color: "#4a5568" }}>
                    <div>{job.period}</div>
                    <div>{job.location}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((h, idx) => (
                    <li key={idx} className="text-sm font-mono flex gap-2" style={{ color: "#e2e8f0" }}>
                      <span style={{ color: "#00ff41", flexShrink: 0 }}>›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Terminal>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> ls -la ~/projects/
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj, i) => (
              <Terminal key={i} title={`${proj.name.toLowerCase().replace(/\s+/g, "_")}.go`}>
                <div className="mb-3">
                  <h3 className="text-base font-bold font-mono" style={{ color: proj.color, textShadow: `0 0 8px ${proj.color}40` }}>
                    {proj.name}
                  </h3>
                  <p className="text-xs font-mono" style={{ color: "#4a5568" }}>
                    ~ {proj.subtitle}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {proj.highlights.map((h, idx) => (
                    <li key={idx} className="text-xs font-mono flex gap-2" style={{ color: "#e2e8f0" }}>
                      <span style={{ color: proj.color, flexShrink: 0 }}>›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Terminal>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> ls -la skills/
          </div>
          <Terminal title="skills/ — directory listing">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items]) => {
                const colors = skillColors[category];
                return (
                  <div key={category}>
                    <h4
                      className="text-xs font-bold font-mono mb-3 pb-2 border-b"
                      style={{ color: colors.color, borderColor: `${colors.color}30`, textShadow: `0 0 8px ${colors.color}40` }}
                    >
                      /{category}/
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{ color: colors.color, backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Terminal>
        </div>

        {/* Research */}
        <div>
          <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> cat research.txt
          </div>
          <div className="space-y-4">
            {research.map((r, i) => (
              <Terminal key={i} title={`research_${i + 1}.md`}>
                <div className="mb-3">
                  <h3 className="text-base font-bold font-mono" style={{ color: r.color }}>
                    {r.title}
                  </h3>
                  <p className="text-xs font-mono mt-0.5" style={{ color: "#4a5568" }}>{r.collab}</p>
                </div>
                <ul className="space-y-1.5">
                  {r.points.map((p, idx) => (
                    <li key={idx} className="text-sm font-mono flex gap-2" style={{ color: "#e2e8f0" }}>
                      <span style={{ color: r.color, flexShrink: 0 }}>›</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Terminal>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> cat education.txt
          </div>
          <Terminal title="education.txt">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h3 className="text-base font-bold font-mono" style={{ color: "#00ff41" }}>
                  B.S. Information Systems &amp; Technology
                </h3>
                <p className="text-sm font-mono mt-0.5" style={{ color: "#00d4ff" }}>
                  California State University, San Bernardino — <span style={{ color: "#00ff41" }}>Cum Laude</span>
                </p>
                <p className="text-xs font-mono mt-1" style={{ color: "#4a5568" }}>
                  Minor: Computer Science · Concentration: Cybersecurity
                </p>
                <ul className="mt-2 space-y-1">
                  {[
                    "CyberCorps® Scholarship for Service (SFS) Recipient",
                    "Dean's List Academic Achievement Award",
                    "CISO Vice President — presented to Deputy National Cyber Director, Federal Reserve, Space Force, Congress",
                  ].map((item, i) => (
                    <li key={i} className="text-xs font-mono flex gap-2" style={{ color: "#e2e8f0" }}>
                      <span style={{ color: "#00ff41" }}>›</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-xs font-mono text-right shrink-0" style={{ color: "#4a5568" }}>
                <div>August 2021 – May 2025</div>
                <div style={{ color: "#00ff41" }}>Cum Laude</div>
              </div>
            </div>
          </Terminal>
        </div>

        {/* Certifications */}
        <div>
          <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> cat certifications.txt
          </div>
          <Terminal title="certifications.txt">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-3 rounded"
                  style={{ border: `1px solid ${cert.color}30`, backgroundColor: `${cert.color}05` }}
                >
                  <div className="text-lg font-bold font-mono" style={{ color: cert.color, textShadow: `0 0 8px ${cert.color}50` }}>
                    {cert.name}
                  </div>
                  <div className="text-xs font-mono mt-1" style={{ color: "#e2e8f0" }}>{cert.full}</div>
                  <div className="text-xs font-mono mt-1 flex items-center justify-between" style={{ color: "#4a5568" }}>
                    <span>{cert.issuer}</span>
                    <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}>
                      {cert.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Terminal>
        </div>

        {/* Achievements */}
        <div>
          <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> cat achievements.txt
          </div>
          <Terminal title="achievements.txt">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.name}
                  className="p-3 rounded"
                  style={{ border: `1px solid ${a.color}30`, backgroundColor: `${a.color}05` }}
                >
                  <div className="text-base font-bold font-mono" style={{ color: a.color, textShadow: `0 0 8px ${a.color}50` }}>
                    {a.name}
                  </div>
                  <div className="text-xs font-mono mt-1" style={{ color: "#e2e8f0" }}>{a.full}</div>
                  <div className="text-xs font-mono mt-1 flex items-center justify-between" style={{ color: "#4a5568" }}>
                    <span>{a.context}</span>
                    <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: `${a.color}15`, color: a.color, border: `1px solid ${a.color}30` }}>
                      {a.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Terminal>
        </div>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded"
          style={{ border: "1px solid #2d3748", backgroundColor: "#111111" }}
        >
          <div className="text-xs font-mono" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span> wget cv.pdf
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <span className="btn-terminal text-xs opacity-60 cursor-not-allowed">
              <span style={{ color: "#00ff41" }}>$</span> ./download-cv.sh
            </span>
            <Link href="/contact" className="btn-terminal-cyan text-xs">
              <span style={{ color: "#00d4ff" }}>$</span> ./contact-me
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
