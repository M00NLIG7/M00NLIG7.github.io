import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group"
      style={{ textDecoration: "none" }}
    >
      <article
        className="terminal-window p-5 h-full flex flex-col gap-3 transition-all duration-300"
        style={{ cursor: "pointer" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-mono font-bold px-2 py-0.5 rounded"
            style={{
              color: "#0a0a0a",
              backgroundColor: "#00ff41",
              textShadow: "none",
            }}
          >
            [POST]
          </span>
          <span className="text-xs font-mono" style={{ color: "#4a5568" }}>
            {post.date}
          </span>
          <span className="text-xs font-mono ml-auto" style={{ color: "#4a5568" }}>
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-mono font-bold text-base leading-tight group-hover:text-[#00ff41] transition-colors duration-200"
          style={{
            color: "#e2e8f0",
          }}
        >
          <span style={{ color: "#4a5568" }}>$ </span>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="text-xs font-mono leading-relaxed flex-1"
          style={{ color: "#4a5568" }}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t" style={{ borderColor: "#2d3748" }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-1.5 py-0.5 rounded"
              style={{
                color: "#00d4ff",
                backgroundColor: "rgba(0, 212, 255, 0.08)",
                border: "1px solid rgba(0, 212, 255, 0.25)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read more indicator */}
        <div className="flex items-center gap-1 mt-1">
          <span
            className="text-xs font-mono group-hover:text-[#00ff41] transition-colors duration-200"
            style={{ color: "#4a5568" }}
          >
            <span
              className="group-hover:translate-x-1 transition-transform duration-200 inline-block"
              style={{ color: "#00ff41" }}
            >
              &gt;
            </span>{" "}
            ./read-more
          </span>
        </div>
      </article>
    </Link>
  );
}
