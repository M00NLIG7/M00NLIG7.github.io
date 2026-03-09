interface SkillBadgeProps {
  skill: string;
  category: "offensive" | "defensive" | "tools" | "languages";
}

const categoryStyles: Record<
  SkillBadgeProps["category"],
  { color: string; bg: string; border: string; glow: string }
> = {
  offensive: {
    color: "#00ff41",
    bg: "rgba(0, 255, 65, 0.08)",
    border: "rgba(0, 255, 65, 0.4)",
    glow: "0 0 8px rgba(0, 255, 65, 0.3)",
  },
  defensive: {
    color: "#00d4ff",
    bg: "rgba(0, 212, 255, 0.08)",
    border: "rgba(0, 212, 255, 0.4)",
    glow: "0 0 8px rgba(0, 212, 255, 0.3)",
  },
  tools: {
    color: "#ff6b35",
    bg: "rgba(255, 107, 53, 0.08)",
    border: "rgba(255, 107, 53, 0.4)",
    glow: "0 0 8px rgba(255, 107, 53, 0.3)",
  },
  languages: {
    color: "#e2e8f0",
    bg: "rgba(226, 232, 240, 0.06)",
    border: "rgba(226, 232, 240, 0.2)",
    glow: "none",
  },
};

export default function SkillBadge({ skill, category }: SkillBadgeProps) {
  const styles = categoryStyles[category];

  return (
    <span
      className="inline-block text-xs font-mono px-2 py-1 rounded transition-all duration-200 cursor-default select-none"
      style={{
        color: styles.color,
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
        textShadow: `0 0 6px ${styles.color}40`,
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.boxShadow = styles.glow;
        (e.target as HTMLElement).style.backgroundColor = styles.bg.replace(
          "0.08",
          "0.15"
        );
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.boxShadow = "none";
        (e.target as HTMLElement).style.backgroundColor = styles.bg;
      }}
    >
      {skill}
    </span>
  );
}
