"use client";

import { useState, useEffect } from "react";
import { Heart, Eye, Share2, Check } from "lucide-react";

interface PostEngagementProps {
  slug: string;
  title: string;
}

export default function PostEngagement({ slug, title }: PostEngagementProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [views, setViews] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHasLiked(localStorage.getItem(`liked:${slug}`) === "1");

    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d) => setLikes(d.likes));

    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViews(d.views));
  }, [slug]);

  async function handleLike() {
    if (hasLiked) return;
    const data = await fetch(`/api/likes/${slug}`, { method: "POST" }).then((r) =>
      r.json()
    );
    setLikes(data.likes);
    setHasLiked(true);
    localStorage.setItem(`liked:${slug}`, "1");
  }

  function shareOn(platform: "twitter" | "linkedin") {
    const url = window.location.href;
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Views */}
      <div
        className="flex items-center gap-1.5 text-xs font-mono"
        style={{ color: "#4a5568" }}
      >
        <Eye size={13} />
        <span>{views === null ? "—" : views.toLocaleString()} views</span>
      </div>

      {/* Like button */}
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className="flex items-center gap-1.5 text-xs font-mono transition-colors"
        style={{
          color: hasLiked ? "#ff6b35" : "#4a5568",
          cursor: hasLiked ? "default" : "pointer",
          background: "none",
          border: "none",
          padding: 0,
        }}
      >
        <Heart size={13} fill={hasLiked ? "#ff6b35" : "none"} />
        <span>{likes === null ? "—" : likes.toLocaleString()} likes</span>
      </button>

      <span style={{ color: "#2d3748" }}>|</span>

      {/* Share buttons */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-mono flex items-center gap-1"
          style={{ color: "#4a5568" }}
        >
          <Share2 size={11} />
          share:
        </span>

        <button
          onClick={() => shareOn("twitter")}
          className="text-xs font-mono hover:opacity-80 transition-opacity"
          style={{
            color: "#00d4ff",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          [tw]
        </button>

        <button
          onClick={() => shareOn("linkedin")}
          className="text-xs font-mono hover:opacity-80 transition-opacity"
          style={{
            color: "#00d4ff",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          [li]
        </button>

        <button
          onClick={handleCopy}
          className="text-xs font-mono hover:opacity-80 transition-opacity flex items-center gap-1"
          style={{
            color: copied ? "#00ff41" : "#00d4ff",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {copied ? (
            <>
              <Check size={11} />
              [copied]
            </>
          ) : (
            "[copy link]"
          )}
        </button>
      </div>
    </div>
  );
}
