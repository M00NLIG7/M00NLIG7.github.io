import React from "react";

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function Terminal({
  title = "bash — 80x24",
  children,
  className = "",
  noPadding = false,
}: TerminalProps) {
  return (
    <div className={`terminal-window ${className}`}>
      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span
          className="ml-3 text-xs font-mono flex-1 text-center"
          style={{ color: "#4a5568" }}
        >
          {title}
        </span>
      </div>

      {/* Content */}
      <div className={noPadding ? "" : "p-4 md:p-6"}>
        {children}
      </div>
    </div>
  );
}
