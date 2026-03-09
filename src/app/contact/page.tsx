import Terminal from "@/components/Terminal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | M00NLIG7",
  description: "Get in touch with Christian Magana — cybersecurity engineer, CTF competitor, and security researcher.",
};

const contacts = [
  { label: "email",    value: "christian.j.magana@proton.me",  color: "#00ff41", href: "mailto:christian.j.magana@proton.me" },
  { label: "github",   value: "github.com/M00NLIG7",            color: "#00d4ff", href: "https://github.com/M00NLIG7" },
  { label: "linkedin", value: "linkedin.com/in/M00NL1G7",       color: "#ff6b35", href: "https://linkedin.com/in/M00NL1G7" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-mono mb-2" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
            ./contact-me --help
          </div>
          <h1
            className="text-2xl md:text-3xl font-bold font-mono"
            style={{ color: "#00ff41", textShadow: "0 0 15px rgba(0,255,65,0.4)" }}
          >
            // Get In Touch
          </h1>
          <p className="text-sm font-mono mt-2" style={{ color: "#4a5568" }}>
            Available for penetration testing engagements, security consulting, CTF team
            collaborations, and speaking opportunities.
          </p>
        </div>

        <div className="space-y-4">
          {/* Contact links */}
          <Terminal title="contact_info.txt">
            <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
              <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
              cat contact_info.txt
            </div>
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.label} className="text-sm font-mono">
                  <span style={{ color: "#4a5568" }}>{c.label}: </span>
                  <a
                    href={c.href}
                    style={{ color: c.color, textDecoration: "none", textShadow: `0 0 6px ${c.color}40` }}
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </Terminal>

          {/* Availability */}
          <Terminal title="availability.txt">
            <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
              <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
              cat availability.txt
            </div>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full inline-block animate-pulse"
                  style={{ backgroundColor: "#00ff41", boxShadow: "0 0 6px #00ff41" }}
                />
                <span style={{ color: "#00ff41" }}>ONLINE</span>
              </div>
              {[
                { label: "Engagements",   value: "Open",       color: "#00ff41" },
                { label: "Response Time", value: "< 24h",      color: "#00d4ff" },
                { label: "Timezone",      value: "UTC-8 (PST)", color: "#e2e8f0" },
                { label: "Languages",     value: "EN, ES",     color: "#e2e8f0" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span style={{ color: "#4a5568" }}>{item.label}:</span>
                  <span style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </Terminal>

          {/* PGP */}
          <Terminal title="pgp_key.asc">
            <div className="text-xs font-mono space-y-2">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span style={{ color: "#4a5568" }}>fingerprint:</span>
                <span style={{ color: "#00ff41", fontSize: "0.65rem", letterSpacing: "0.05em" }}>
                  B769 10EA 8C77 588C 99D3  7659 BCB1 D9F3 08D0 F704
                </span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span style={{ color: "#4a5568" }}>algorithm:</span>
                <span style={{ color: "#e2e8f0" }}>Ed25519 / cv25519</span>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span style={{ color: "#4a5568" }}>expires:</span>
                <span style={{ color: "#e2e8f0" }}>2028-03-08</span>
              </div>
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "#2d3748" }}>
                <div style={{ color: "#00ff41" }}>-----BEGIN PGP PUBLIC KEY BLOCK-----</div>
                <div
                  className="my-1 break-all select-all"
                  style={{ color: "#4a5568", fontSize: "0.6rem", lineHeight: "1.4" }}
                >
                  {`mDMEaa8AOBYJKwYBBAHaRw8BAQdA//b/KG5CYjSRmwisPL0IjRImVbK30kjoxkZi
DQYlSDW0PUNocmlzdGlhbiBKLiBNYWdhbmEgKE0wME5MSUc3KSA8Y2hyaXN0aWFu
LmoubWFnYW5hQHByb3Rvbi5tZT6ImQQTFgoAQRYhBLdpEOqMd1iMmdN2Wbyx2fMI
0PcEBQJprwA4AhsjBQkDwmcABQsJCAcCAiICBhUKCQgLAgQWAgMBAh4HAheAAAoJ
ELyx2fMI0PcEF2sA/jpue2gYevv6LyN1ZVY+4+7pt0zlDfE9d2Qx/3MkpxeOAP96
6JD7h7si9TiuEtDa3/fMDx5DsD6ODcUnkUP2WkCEALg4BGmvADgSCisGAQQBl1UB
BQEBB0AsI5OPKcopViS7QL62PD19UzrN9kAowEEcWLoSZ/unRgMBCAeIfQQYFgoA
JhYhBLdpEOqMd1iMmdN2Wbyx2fMI0PcEBQJprwA4AhsMBQkDwmcAAAoJELyx2fMI
0PcE06AA+MIrHa4OiXA5Z3zDWyM3L2o82biG1+9QdaOG9TRBa1UA/A1AA+XjRL9Q
L2VGzhaWXgdlvlU9Wkon07IQBRA1BfMK
=cwWb`}
                </div>
                <div style={{ color: "#00ff41" }}>-----END PGP PUBLIC KEY BLOCK-----</div>
              </div>
            </div>
          </Terminal>
        </div>

      </div>
    </div>
  );
}
