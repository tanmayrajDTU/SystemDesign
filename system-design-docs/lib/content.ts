import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Frontmatter = {
  title: string;
  description?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
};

export type DocFile = {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  readingTimeMinutes: number;
};

export function getDocSlugs(): string[] {
  const slugs: string[] = [];

  function walk(dir: string, prefix: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, prefix ? `${prefix}/${entry.name}` : entry.name);
      } else if (entry.name.endsWith(".mdx")) {
        const name = entry.name.replace(/\.mdx$/, "");
        slugs.push(prefix ? `${prefix}/${name}` : name);
      }
    }
  }

  if (fs.existsSync(CONTENT_DIR)) walk(CONTENT_DIR, "");
  return slugs;
}

export function getDocBySlug(slug: string): DocFile | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: data as Frontmatter,
    content,
    readingTimeMinutes: Math.ceil(stats.minutes),
  };
}

// ```mermaid fences are rewritten to <Mermaid chart={`...`}/> JSX before the
// MDX compiler ever sees them, so rehype-pretty-code (Shiki) never tries to
// syntax-highlight diagram syntax as a programming language.
export function transformMermaidFences(content: string): string {
  return content.replace(/```mermaid\n([\s\S]*?)```/g, (_match, chart: string) => {
    const escaped = chart
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");
    return `<Mermaid chart={\`${escaped.trim()}\`} />`;
  });
}

export function getAllDocs(): DocFile[] {
  return getDocSlugs()
    .map((slug) => getDocBySlug(slug))
    .filter((d): d is DocFile => d !== null);
}
