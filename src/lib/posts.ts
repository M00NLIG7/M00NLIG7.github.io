import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function parsePost(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    excerpt: data.excerpt as string,
    readingTime: data.readingTime as string,
    content: content.trim(),
  };
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(parsePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filename = `${slug}.md`;
  const filepath = path.join(POSTS_DIR, filename);
  if (!fs.existsSync(filepath)) return undefined;
  return parsePost(filename);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}
