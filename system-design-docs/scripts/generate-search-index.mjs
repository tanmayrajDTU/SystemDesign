// Walks /content, strips MDX down to plain text, and writes
// /public/search-index.json for the client-side Fuse.js search.
// Runs automatically before `next build` (see package.json "build" script)
// and can be run manually with `npm run index` during development.
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUT_FILE = path.join(process.cwd(), "public", "search-index.json");

function walk(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full, prefix ? `${prefix}/${entry.name}` : entry.name));
    } else if (entry.name.endsWith(".mdx")) {
      const slug = prefix
        ? `${prefix}/${entry.name.replace(/\.mdx$/, "")}`
        : entry.name.replace(/\.mdx$/, "");
      files.push({ slug, full });
    }
  }
  return files;
}

function stripMdx(content) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.writeFileSync(OUT_FILE, "[]");
    return;
  }

  const files = walk(CONTENT_DIR);
  const index = files.map(({ slug, full }) => {
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const plain = stripMdx(content).slice(0, 4000);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      body: plain,
    };
  });

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2));
  console.log(`[search-index] wrote ${index.length} docs to ${OUT_FILE}`);
}

main();
