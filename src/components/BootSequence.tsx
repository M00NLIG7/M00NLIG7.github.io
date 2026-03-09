"use client";

import { useState, useEffect } from "react";

const bootMessages = [
  { text: "BIOS v2.4.1 — Initializing hardware...", delay: 0, color: "#4a5568" },
  { text: "CPU: Intel Core i9-13900K @ 5.8GHz [OK]", delay: 150, color: "#00ff41" },
  { text: "RAM: 64GB DDR5-5600 [OK]", delay: 300, color: "#00ff41" },
  { text: "NVME0: Samsung 990 Pro 2TB [OK]", delay: 450, color: "#00ff41" },
  { text: "Loading kernel vmlinuz-6.5.0-kali3-amd64...", delay: 600, color: "#4a5568" },
  { text: "Mounting root filesystem [OK]", delay: 800, color: "#00ff41" },
  { text: "Starting network interfaces...", delay: 950, color: "#4a5568" },
  { text: "eth0: 192.168.1.100/24 [UP]", delay: 1100, color: "#00d4ff" },
  { text: "tun0: 10.10.14.23/23 [VPN ACTIVE]", delay: 1250, color: "#00d4ff" },
  { text: "Loading security modules...", delay: 1400, color: "#4a5568" },
  { text: "SELinux: Enforcing mode enabled [OK]", delay: 1550, color: "#00ff41" },
  { text: "AppArmor: 47 profiles loaded [OK]", delay: 1700, color: "#00ff41" },
  { text: "Starting SSH daemon... [OK]", delay: 1850, color: "#00ff41" },
  { text: "Tor relay initialized [ANONYMOUS]", delay: 2000, color: "#ff6b35" },
  { text: "All systems operational. Welcome back, M00NLIG7.", delay: 2200, color: "#00ff41" },
];

export default function BootSequence() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootMessages.forEach((msg, index) => {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index]);
      }, msg.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="font-mono text-xs leading-relaxed p-4 rounded"
      style={{
        backgroundColor: "#0a0a0a",
        border: "1px solid #2d3748",
        minHeight: "240px",
      }}
    >
      {bootMessages.map((msg, index) => (
        <div
          key={index}
          className="transition-all duration-300"
          style={{
            opacity: visibleMessages.includes(index) ? 1 : 0,
            transform: visibleMessages.includes(index)
              ? "translateY(0)"
              : "translateY(4px)",
            color: msg.color,
            marginBottom: "2px",
          }}
        >
          {msg.text}
        </div>
      ))}
      {visibleMessages.length === bootMessages.length && (
        <div
          className="mt-3 flex items-center gap-1"
          style={{ color: "#00ff41" }}
        >
          <span>[M00NLIG7@cyberdef ~]$</span>
          <span
            style={{
              animation: "blink-cursor 1s infinite",
              marginLeft: "4px",
            }}
          >
            _
          </span>
        </div>
      )}
    </div>
  );
}
