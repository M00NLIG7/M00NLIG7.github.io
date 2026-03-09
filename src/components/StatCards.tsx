"use client";

interface Stat {
  label: string;
  value: string;
  color: string;
}

export default function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-4 rounded transition-all duration-300"
          style={{
            border: "1px solid #2d3748",
            backgroundColor: "#0a0a0a",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = stat.color;
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 10px ${stat.color}30`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "#2d3748";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <div
            className="text-3xl md:text-4xl font-bold font-mono"
            style={{
              color: stat.color,
              textShadow: `0 0 10px ${stat.color}60`,
            }}
          >
            {stat.value}
          </div>
          <div
            className="text-xs font-mono mt-1"
            style={{ color: "#4a5568" }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
