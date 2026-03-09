import BlogCard from "@/components/BlogCard";
import Terminal from "@/components/Terminal";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | M00NLIG7",
  description:
    "Cybersecurity research, CTF writeups, penetration testing techniques, and threat intelligence articles by M00NLIG7.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <Terminal title="bash — ls -la posts/" noPadding>
            <div className="p-4 md:p-6">
              <div className="text-xs font-mono mb-4" style={{ color: "#4a5568" }}>
                <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
                ls -la posts/
              </div>
              <div className="text-xs font-mono space-y-1" style={{ color: "#4a5568" }}>
                <div>total {posts.length}</div>
                <div>
                  <span style={{ color: "#00d4ff" }}>drwxr-xr-x</span>
                  {"  2 moonlig7 moonlig7 4096 Nov 15 2024 "}
                  <span style={{ color: "#00ff41" }}>.</span>
                </div>
                <div>
                  <span style={{ color: "#00d4ff" }}>drwxr-xr-x</span>
                  {"  8 moonlig7 moonlig7 4096 Nov 15 2024 "}
                  <span style={{ color: "#00ff41" }}>..</span>
                </div>
                {posts.map((post) => (
                  <div key={post.slug}>
                    <span style={{ color: "#00ff41" }}>-rw-r--r--</span>
                    {"  1 moonlig7 moonlig7 "}
                    <span style={{ color: "#ff6b35" }}>
                      {(post.content.length / 1024).toFixed(0)}K
                    </span>
                    {` ${post.date} `}
                    <span style={{ color: "#e2e8f0" }}>{post.slug}.md</span>
                  </div>
                ))}
              </div>
            </div>
          </Terminal>

          <div className="mt-8">
            <div className="text-xs font-mono mb-2" style={{ color: "#4a5568" }}>
              <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef posts]$</span>{" "}
              grep -r &quot;.&quot; . --count
            </div>
            <h1
              className="text-2xl md:text-3xl font-bold font-mono"
              style={{
                color: "#00ff41",
                textShadow: "0 0 15px rgba(0,255,65,0.4)",
              }}
            >
              // Research &amp; Writeups
            </h1>
            <p className="text-sm font-mono mt-2" style={{ color: "#4a5568" }}>
              {posts.length} posts indexed &mdash; CVE research, CTF writeups, red team tactics,
              and security architecture
            </p>
          </div>
        </div>

        {/* Tag filter bar */}
        <div className="mb-8 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono" style={{ color: "#4a5568" }}>
            <span style={{ color: "#00ff41" }}>&gt;</span> filter by tag:
          </span>
          {Array.from(new Set(posts.flatMap((p) => p.tags))).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded cursor-default"
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

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
