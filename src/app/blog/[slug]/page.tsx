import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Terminal from "@/components/Terminal";
import PostEngagement from "@/components/PostEngagement";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | M00NLIG7" };
  return {
    title: `${post.title} | M00NLIG7`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Render markdown-like content
  function renderContent(content: string) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let codeBlock = false;
    let codeLines: string[] = [];
    let key = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code block start
      if (line.startsWith("```")) {
        if (!codeBlock) {
          codeBlock = true;
          codeLines = [];
        } else {
          codeBlock = false;
          elements.push(
            <pre
              key={key++}
              className="my-4 p-4 overflow-x-auto text-xs font-mono rounded"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #2d3748",
                borderLeft: "3px solid #00ff41",
                color: "#e2e8f0",
              }}
            >
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
        }
        i++;
        continue;
      }

      if (codeBlock) {
        codeLines.push(line);
        i++;
        continue;
      }

      // H2
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={key++}
            className="text-lg font-bold font-mono mt-8 mb-3"
            style={{
              color: "#00ff41",
              textShadow: "0 0 10px rgba(0,255,65,0.3)",
            }}
          >
            <span style={{ color: "#4a5568" }}>## </span>
            {line.slice(3)}
          </h2>
        );
        i++;
        continue;
      }

      // H3
      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={key++}
            className="text-base font-bold font-mono mt-6 mb-2"
            style={{ color: "#00d4ff" }}
          >
            <span style={{ color: "#4a5568" }}>### </span>
            {line.slice(4)}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal rule table (markdown table)
      if (line.startsWith("|")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].startsWith("|")) {
          if (!lines[i].match(/^\|[-| ]+\|$/)) {
            tableLines.push(lines[i]);
          }
          i++;
        }
        const [header, ...rows] = tableLines;
        const headers = header.split("|").filter(Boolean).map((h) => h.trim());
        elements.push(
          <div key={key++} className="my-4 overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid #2d3748" }}>
                  {headers.map((h, idx) => (
                    <th
                      key={idx}
                      className="text-left py-2 px-3"
                      style={{ color: "#00ff41" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ridx) => {
                  const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                  return (
                    <tr
                      key={ridx}
                      style={{ borderBottom: "1px solid #1a1a1a" }}
                    >
                      {cells.map((cell, cidx) => (
                        <td
                          key={cidx}
                          className="py-2 px-3"
                          style={{ color: "#e2e8f0" }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Bullet list
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const items: string[] = [];
        while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
          items.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={key++} className="my-3 space-y-1">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="text-sm font-mono flex gap-2"
                style={{ color: "#e2e8f0" }}
              >
                <span style={{ color: "#00ff41" }}>›</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Numbered list
      if (/^\d+\. /.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^\d+\. /.test(lines[i])) {
          items.push(lines[i].replace(/^\d+\. /, ""));
          i++;
        }
        elements.push(
          <ol key={key++} className="my-3 space-y-1">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="text-sm font-mono flex gap-2"
                style={{ color: "#e2e8f0" }}
              >
                <span style={{ color: "#ff6b35" }}>{idx + 1}.</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Blockquote
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={key++}
            className="my-4 pl-4 text-sm font-mono italic"
            style={{
              borderLeft: "3px solid #00d4ff",
              color: "#4a5568",
            }}
          >
            {line.slice(2)}
          </blockquote>
        );
        i++;
        continue;
      }

      // Empty line
      if (line.trim() === "") {
        i++;
        continue;
      }

      // Regular paragraph
      elements.push(
        <p
          key={key++}
          className="text-sm font-mono leading-relaxed my-3"
          style={{ color: "#e2e8f0" }}
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
      i++;
    }

    return elements;
  }

  function formatInline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#00ff41">$1</strong>')
      .replace(/`(.+?)`/g, '<code style="background:#1a1a1a;color:#00d4ff;padding:1px 5px;border-radius:2px;border:1px solid #2d3748;font-size:0.85em">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#00d4ff;border-bottom:1px solid rgba(0,212,255,0.3)" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="nav-link text-xs"
          >
            <span style={{ color: "#00ff41" }}>$</span> cd ../blog
          </Link>
        </div>

        <Terminal title={`${post.slug}.md — vim`}>
          {/* Post header */}
          <div
            className="mb-6 pb-6 border-b"
            style={{ borderColor: "#2d3748" }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                style={{
                  color: "#0a0a0a",
                  backgroundColor: "#00ff41",
                }}
              >
                [POST]
              </span>
              <span className="text-xs font-mono" style={{ color: "#4a5568" }}>
                {post.date}
              </span>
              <span className="text-xs font-mono" style={{ color: "#4a5568" }}>
                ·
              </span>
              <span className="text-xs font-mono" style={{ color: "#ff6b35" }}>
                {post.readingTime}
              </span>
            </div>

            <h1
              className="text-xl md:text-2xl font-bold font-mono leading-tight mb-4"
              style={{
                color: "#e2e8f0",
              }}
            >
              <span style={{ color: "#4a5568" }}>$ </span>
              {post.title}
            </h1>

            <p
              className="text-sm font-mono leading-relaxed mb-4"
              style={{ color: "#4a5568" }}
            >
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded"
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
          </div>

          {/* Post content */}
          <div className="prose-terminal">
            {renderContent(post.content)}
          </div>

          {/* Footer */}
          <div
            className="mt-10 pt-6 border-t space-y-4"
            style={{ borderColor: "#2d3748" }}
          >
            <PostEngagement slug={post.slug} title={post.title} />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs font-mono" style={{ color: "#4a5568" }}>
                <span style={{ color: "#00ff41" }}>[M00NLIG7@cyberdef ~]$</span>{" "}
                echo &quot;EOF&quot;
              </div>
              <Link href="/blog" className="btn-terminal text-xs">
                <span style={{ color: "#00ff41" }}>$</span> ls ../posts
              </Link>
            </div>
          </div>
        </Terminal>
      </div>
    </div>
  );
}
