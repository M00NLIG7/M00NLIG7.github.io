"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

interface OutputLine {
  id: number;
  type: "input" | "output" | "error" | "success" | "info" | "blank";
  content: React.ReactNode;
}

interface Props {
  posts: BlogPost[];
}

// All completable commands/tokens for fish-style ghost text
const COMPLETIONS = [
  "help",
  "whoami",
  "uname -a",
  "date",
  "clear",
  "skills",
  "certs",
  "ls posts/",
  "ls skills/",
  "ls projects/",
  "search ",
  "grep ",
  "cat ",
  "cd home",
  "cd resume",
  "cd blog",
  "cd contact",
];

const HELP_OUTPUT = [
  { cmd: "whoami",        desc: "display operator profile" },
  { cmd: "ls posts/",     desc: "list all blog posts" },
  { cmd: "cat <slug>",    desc: "read a post by slug" },
  { cmd: "search <q>",    desc: "search posts by title, tag, or content" },
  { cmd: "grep <q>",      desc: "filter posts by tag / keyword" },
  { cmd: "skills",        desc: "list technical skills" },
  { cmd: "certs",         desc: "show certifications & achievements" },
  { cmd: "cd <page>",     desc: "navigate — home | resume | blog | contact" },
  { cmd: "date",          desc: "current timestamp" },
  { cmd: "uname -a",      desc: "system information" },
  { cmd: "clear",         desc: "clear terminal" },
];

const WELCOME: OutputLine[] = [
  { id: 0, type: "success", content: "M00NLIG7 Terminal v1.0.0 — Interactive Shell" },
  { id: 1, type: "info",    content: 'Type "help" for available commands. Tab or → to accept suggestion.' },
  { id: 2, type: "blank",   content: "" },
];

let lineCounter = 100;
const nextId = () => ++lineCounter;

export default function InteractiveTerminal({ posts }: Props) {
  const [output, setOutput]         = useState<OutputLine[]>(WELCOME);
  const [input, setInput]           = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [history, setHistory]       = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [focused, setFocused]       = useState(false);

  const router    = useRouter();
  const outputRef = useRef<HTMLDivElement>(null);  // the scrollable output div
  const inputRef  = useRef<HTMLInputElement>(null);

  // Scroll terminal output — NOT the page
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [output]);

  // Fish-style ghost text: find first completion that starts with current input
  useEffect(() => {
    if (!input) { setSuggestion(""); return; }

    // Check static completions
    const staticMatch = COMPLETIONS.find(
      (c) => c.toLowerCase().startsWith(input.toLowerCase()) && c !== input
    );
    if (staticMatch) {
      setSuggestion(staticMatch.slice(input.length));
      return;
    }

    // Complete "cat <partial-slug>"
    if (input.startsWith("cat ")) {
      const partial = input.slice(4);
      const slugMatch = posts.find((p) => p.slug.startsWith(partial) && p.slug !== partial);
      if (slugMatch) { setSuggestion(slugMatch.slug.slice(partial.length)); return; }
    }

    setSuggestion("");
  }, [input, posts]);

  const addLines = useCallback((lines: OutputLine[]) => {
    setOutput((prev) => [...prev, ...lines]);
  }, []);

  const processCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      const inputLine: OutputLine = { id: nextId(), type: "input", content: cmd };
      const parts = cmd.split(/\s+/);
      const base  = parts[0].toLowerCase();
      const args  = parts.slice(1).join(" ");

      let newLines: OutputLine[] = [inputLine];

      // ── clear ────────────────────────────────────────────────────────────
      if (base === "clear") {
        setOutput(WELCOME);
        setInput("");
        setSuggestion("");
        return;
      }

      // ── help ─────────────────────────────────────────────────────────────
      else if (base === "help" || base === "?") {
        newLines.push({ id: nextId(), type: "blank", content: "" });
        newLines.push({ id: nextId(), type: "output", content: <span style={{ color: "#00ff41" }}>Available commands:</span> });
        HELP_OUTPUT.forEach((h) =>
          newLines.push({
            id: nextId(), type: "output",
            content: (
              <span>
                <span style={{ color: "#00d4ff", display: "inline-block", minWidth: "140px" }}>{h.cmd}</span>
                <span style={{ color: "#4a5568" }}> — {h.desc}</span>
              </span>
            ),
          })
        );
        newLines.push({ id: nextId(), type: "blank", content: "" });
      }

      // ── whoami ───────────────────────────────────────────────────────────
      else if (base === "whoami") {
        newLines.push(
          { id: nextId(), type: "blank", content: "" },
          {
            id: nextId(), type: "output", content: (
              <span>
                <span style={{ color: "#00ff41" }}>uid=</span><span style={{ color: "#e2e8f0" }}>1337(M00NLIG7)</span>
                <span style={{ color: "#00ff41" }}> gid=</span><span style={{ color: "#e2e8f0" }}>1337(cyberdef)</span>
                <span style={{ color: "#00ff41" }}> groups=</span><span style={{ color: "#e2e8f0" }}>mitre,TS/SCI,cyberops</span>
              </span>
            ),
          },
          { id: nextId(), type: "blank", content: "" },
          { id: nextId(), type: "output", content: <span style={{ color: "#e2e8f0" }}>Christian J. Magana · Cybersecurity Engineer @ MITRE</span> },
          { id: nextId(), type: "output", content: <span style={{ color: "#4a5568" }}>TS/SCI w/ FS Poly · CyberCorps® SFS · CSUSB Cum Laude 2025</span> },
          { id: nextId(), type: "output", content: <span style={{ color: "#4a5568" }}>EDR/XDR developer · CCDC competitor · Post-quantum crypto researcher</span> },
          { id: nextId(), type: "blank", content: "" },
        );
      }

      // ── uname ────────────────────────────────────────────────────────────
      else if (base === "uname") {
        newLines.push({ id: nextId(), type: "output", content: <span style={{ color: "#e2e8f0" }}>CyberOS 1.0.0-moonlig7 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux — clearance=TS/SCI</span> });
      }

      // ── date ─────────────────────────────────────────────────────────────
      else if (base === "date") {
        newLines.push({ id: nextId(), type: "output", content: <span style={{ color: "#e2e8f0" }}>{new Date().toString()}</span> });
      }

      // ── ls ───────────────────────────────────────────────────────────────
      else if (base === "ls") {
        const target = args.replace(/^-\w+\s*/, "").trim();
        if (!target || target === "posts/" || target === "posts") {
          newLines.push({ id: nextId(), type: "blank", content: "" });
          newLines.push({ id: nextId(), type: "output", content: <span style={{ color: "#00ff41" }}>total {posts.length}</span> });
          posts.forEach((p) =>
            newLines.push({
              id: nextId(), type: "output",
              content: (
                <span>
                  <span style={{ color: "#4a5568" }}>{p.date}  </span>
                  <span style={{ color: "#ff6b35" }}>{p.readingTime.padEnd(12)}  </span>
                  <Link href={`/blog/${p.slug}`} style={{ color: "#e2e8f0", textDecoration: "none" }}
                    className="hover:text-[#00ff41] transition-colors">{p.slug}.md</Link>
                </span>
              ),
            })
          );
          newLines.push({ id: nextId(), type: "blank", content: "" });
        } else {
          const dirs: Record<string, string[]> = {
            "skills/":   ["go/", "python/", "rust/", "c_cpp/", "edr_xdr/", "mitre_attack/", "forensics/", "cloud/"],
            "projects/": ["serial_scripter/", "gomemento/", "chop_chop_go/", "pandoras_box/"],
          };
          const key = target.endsWith("/") ? target : target + "/";
          if (dirs[key]) {
            newLines.push({ id: nextId(), type: "blank", content: "" });
            dirs[key].forEach((item) =>
              newLines.push({ id: nextId(), type: "output", content: <span style={{ color: "#00d4ff" }}>{item}</span> })
            );
            newLines.push({ id: nextId(), type: "blank", content: "" });
          } else {
            newLines.push({ id: nextId(), type: "error", content: `ls: cannot access '${target}': No such file or directory` });
          }
        }
      }

      // ── cat ──────────────────────────────────────────────────────────────
      else if (base === "cat") {
        const slug = args.replace(/\.md$/, "").trim();
        const post = posts.find((p) => p.slug === slug);
        if (post) {
          newLines.push(
            { id: nextId(), type: "blank", content: "" },
            { id: nextId(), type: "output", content: <span style={{ color: "#00ff41", fontWeight: "bold" }}>{post.title}</span> },
            { id: nextId(), type: "output", content: <span style={{ color: "#4a5568" }}>{post.date} · {post.readingTime}</span> },
            { id: nextId(), type: "blank", content: "" },
            { id: nextId(), type: "output", content: <span style={{ color: "#e2e8f0" }}>{post.excerpt}</span> },
            { id: nextId(), type: "blank", content: "" },
            {
              id: nextId(), type: "output",
              content: (
                <span>
                  <span style={{ color: "#4a5568" }}>tags: </span>
                  {post.tags.map((t) => <span key={t} style={{ color: "#00d4ff", marginRight: "8px" }}>#{t}</span>)}
                </span>
              ),
            },
            {
              id: nextId(), type: "success",
              content: <Link href={`/blog/${post.slug}`} style={{ color: "#00ff41", textDecoration: "none" }}>→ ./read-full-post</Link>,
            },
            { id: nextId(), type: "blank", content: "" },
          );
        } else if (slug) {
          newLines.push({ id: nextId(), type: "error", content: `cat: ${slug}.md: No such file. Try 'ls posts/' to list available posts.` });
        } else {
          newLines.push({ id: nextId(), type: "error", content: "Usage: cat <post-slug>" });
        }
      }

      // ── search / grep ────────────────────────────────────────────────────
      else if (base === "search" || base === "grep") {
        const query = (base === "grep" ? parts.slice(1, -1).join(" ") : args).replace(/^["']|["']$/g, "");
        if (!query) {
          newLines.push({ id: nextId(), type: "error", content: `Usage: ${base} <query>` });
        } else {
          const q = query.toLowerCase();
          const results = posts.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.tags.some((t) => t.toLowerCase().includes(q)) ||
              p.excerpt.toLowerCase().includes(q) ||
              p.content.toLowerCase().includes(q)
          );
          newLines.push({ id: nextId(), type: "blank", content: "" });
          if (results.length === 0) {
            newLines.push({ id: nextId(), type: "error", content: `grep: no matches found for "${query}"` });
          } else {
            newLines.push({
              id: nextId(), type: "info",
              content: <span style={{ color: "#00d4ff" }}>{results.length} match{results.length !== 1 ? "es" : ""} for &quot;{query}&quot;</span>,
            });
            newLines.push({ id: nextId(), type: "blank", content: "" });
            results.forEach((p) => {
              const matchedTags = p.tags.filter((t) => t.toLowerCase().includes(q));
              newLines.push({
                id: nextId(), type: "output",
                content: (
                  <span>
                    <span style={{ color: "#00ff41" }}>posts/</span>
                    <Link href={`/blog/${p.slug}`} style={{ color: "#e2e8f0", textDecoration: "none" }}
                      className="hover:text-[#00ff41] transition-colors">{p.slug}.md</Link>
                    {matchedTags.length > 0 && (
                      <span style={{ color: "#4a5568" }}> [{matchedTags.map((t) => `#${t}`).join(", ")}]</span>
                    )}
                  </span>
                ),
              });
            });
          }
          newLines.push({ id: nextId(), type: "blank", content: "" });
        }
      }

      // ── skills ───────────────────────────────────────────────────────────
      else if (base === "skills") {
        const groups = [
          { label: "Languages", color: "#00ff41", items: ["Go", "Python", "Rust", "C/C++", "PowerShell", "Bash", "JavaScript"] },
          { label: "Security",  color: "#ff6b35", items: ["EDR/XDR Dev", "MITRE ATT&CK", "Pentest", "Purple Team", "IR", "Threat Intel"] },
          { label: "Tools",     color: "#00d4ff", items: ["Tenable/Qualys", "Metasploit", "Burp Suite", "Ghidra", "FTK", "Docker", "vSphere"] },
          { label: "Research",  color: "#00ff41", items: ["Post-Quantum Crypto", "Forensics", "OSINT", "Sigma Rules", "FedRAMP"] },
        ];
        newLines.push({ id: nextId(), type: "blank", content: "" });
        groups.forEach((g) =>
          newLines.push({
            id: nextId(), type: "output",
            content: (
              <span>
                <span style={{ color: g.color, display: "inline-block", minWidth: "90px" }}>[{g.label}]</span>
                <span style={{ color: "#e2e8f0" }}>{g.items.join("  ")}</span>
              </span>
            ),
          })
        );
        newLines.push({ id: nextId(), type: "blank", content: "" });
      }

      // ── certs ────────────────────────────────────────────────────────────
      else if (base === "certs" || base === "certifications") {
        newLines.push(
          { id: nextId(), type: "blank", content: "" },
          { id: nextId(), type: "output", content: <span style={{ color: "#00ff41" }}>── Certifications ──</span> },
          { id: nextId(), type: "output", content: <span><span style={{ color: "#00d4ff", display: "inline-block", minWidth: "130px" }}>Security+ SY0-601</span><span style={{ color: "#4a5568" }}>CompTIA · Dec 2023</span></span> },
          { id: nextId(), type: "output", content: <span><span style={{ color: "#00d4ff", display: "inline-block", minWidth: "130px" }}>MCFE</span><span style={{ color: "#4a5568" }}>Magnet Forensics · Aug 2022</span></span> },
          { id: nextId(), type: "output", content: <span><span style={{ color: "#00d4ff", display: "inline-block", minWidth: "130px" }}>ACE for FTK</span><span style={{ color: "#4a5568" }}>Exterro · Aug 2022</span></span> },
          { id: nextId(), type: "output", content: <span><span style={{ color: "#00d4ff", display: "inline-block", minWidth: "130px" }}>VMCA</span><span style={{ color: "#4a5568" }}>VMware · Aug 2023</span></span> },
          { id: nextId(), type: "blank", content: "" },
          { id: nextId(), type: "output", content: <span style={{ color: "#ff6b35" }}>── Achievements ──</span> },
          { id: nextId(), type: "output", content: <span><span style={{ color: "#ff6b35", display: "inline-block", minWidth: "130px" }}>SkillsUSA Cyber</span><span style={{ color: "#4a5568" }}>1st Place, State · 2021</span></span> },
          { id: nextId(), type: "output", content: <span><span style={{ color: "#ff6b35", display: "inline-block", minWidth: "130px" }}>CCDC Western</span><span style={{ color: "#4a5568" }}>6th & 2nd Place · 2021–2023</span></span> },
          { id: nextId(), type: "output", content: <span><span style={{ color: "#ff6b35", display: "inline-block", minWidth: "130px" }}>CCDC National</span><span style={{ color: "#4a5568" }}>Competitor · 2023</span></span> },
          { id: nextId(), type: "blank", content: "" },
        );
      }

      // ── cd / goto ────────────────────────────────────────────────────────
      else if (base === "cd" || base === "goto" || base === "open") {
        const dest = args.replace(/^\.?\//, "").toLowerCase();
        const routes: Record<string, string> = {
          home: "/", "~": "/", ".": "/",
          resume: "/resume", cv: "/resume",
          blog: "/blog", posts: "/blog",
          contact: "/contact",
        };
        if (routes[dest] !== undefined) {
          newLines.push({ id: nextId(), type: "success", content: <span style={{ color: "#00ff41" }}>navigating to {routes[dest]}…</span> });
          addLines(newLines);
          setTimeout(() => router.push(routes[dest]), 350);
          setInput("");
          setSuggestion("");
          return;
        } else {
          newLines.push({ id: nextId(), type: "error", content: `cd: ${dest}: No such directory. Options: home | resume | blog | contact` });
        }
      }

      // ── unknown ──────────────────────────────────────────────────────────
      else {
        newLines.push({
          id: nextId(), type: "error",
          content: <span>command not found: <span style={{ color: "#ff6b35" }}>{base}</span>. Type <span style={{ color: "#00ff41" }}>help</span> for commands.</span>,
        });
      }

      addLines(newLines);
      setHistory((prev) => [cmd, ...prev]);
      setHistoryIdx(-1);
      setInput("");
      setSuggestion("");
    },
    [posts, addLines, router]
  );

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      processCommand(input);
    } else if (e.key === "Tab" || (e.key === "ArrowRight" && e.currentTarget.selectionStart === input.length)) {
      // Accept fish suggestion
      if (suggestion) {
        e.preventDefault();
        setInput(input + suggestion);
        setSuggestion("");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
      setSuggestion("");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : (history[next] ?? ""));
      setSuggestion("");
    } else if (e.key === "Escape") {
      setSuggestion("");
    }
  }

  const lineColor = (type: OutputLine["type"]) => {
    switch (type) {
      case "error":   return "#ff6b35";
      case "success": return "#00ff41";
      case "info":    return "#00d4ff";
      default:        return "#e2e8f0";
    }
  };

  return (
    <div
      className="terminal-window flex flex-col"
      style={{ height: "340px" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="terminal-titlebar shrink-0">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-3 text-xs font-mono flex-1 text-center" style={{ color: "#4a5568" }}>
          bash — M00NLIG7@cyberdef ~ — 80×24
        </span>
      </div>

      {/* Scrollable output — ref here, NOT scrollIntoView */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs"
        style={{ overscrollBehavior: "contain" }}
      >
        <div className="space-y-0.5">
          {output.map((line) => (
            <div key={line.id} style={{ color: lineColor(line.type), minHeight: "1.2em" }}>
              {line.type === "input" ? (
                <span>
                  <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$ </span>
                  <span style={{ color: "#e2e8f0" }}>{line.content}</span>
                </span>
              ) : (
                line.content
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input row — fish-style ghost text using `ch` units for monospace alignment */}
      <div
        className="shrink-0 flex items-center px-4 py-2 border-t font-mono text-xs"
        style={{ borderColor: "#2d3748", backgroundColor: "#0a0a0a" }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Prompt */}
        <span style={{ color: "#00ff41", whiteSpace: "nowrap", userSelect: "none" }}>
          [M00NLIG7@cyberdef ~]$&nbsp;
        </span>

        {/* Input + ghost suggestion + block cursor overlay */}
        <div className="relative flex-1 overflow-hidden" style={{ height: "1.2em" }}>
          {/* Ghost suggestion */}
          {suggestion && (
            <span
              className="pointer-events-none absolute top-0 font-mono text-xs"
              style={{ left: `${input.length}ch`, color: "#4a5568", whiteSpace: "pre" }}
              aria-hidden
            >
              {suggestion}
            </span>
          )}

          {/* Block cursor — sits at caret position, blinks only when focused */}
          <span
            className="pointer-events-none absolute top-0"
            style={{
              left: `${input.length}ch`,
              width: "1ch",
              height: "1.15em",
              backgroundColor: "#00ff41",
              boxShadow: "0 0 6px rgba(0,255,65,0.8)",
              animation: focused ? "blink-cursor 1s infinite" : "none",
              opacity: focused ? undefined : 0.35,
            }}
            aria-hidden
          />

          {/* Real input — transparent caret so the block cursor shows instead */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="absolute inset-0 w-full bg-transparent outline-none font-mono text-xs"
            style={{ color: "#e2e8f0", caretColor: "transparent" }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
