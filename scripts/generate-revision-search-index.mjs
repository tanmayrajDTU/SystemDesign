// Builds /public/revision-search-index.json — the data source for
// components/revision/revision-search.tsx.
//
// Kept as a separate script/output file from
// scripts/generate-search-index.mjs (main docs) so a Revision Hub search
// can never surface a result from the main curriculum, and vice versa —
// they're intentionally different indexes over different content.
//
// Right now there's no authored Revision Hub content, so the index is
// built purely from data/revision-hub.ts's section metadata (title +
// description), which is enough for the search box to find its way to a
// section. Once real content exists — either as
// content/revision-hub/<slug>.mdx files, or as structured data (flashcards,
// questions, etc.) — extend `buildEntries()` below to also flatten that
// content in; everything else (the fetch, the Fuse index, the UI) already
// expects the same { slug, title, description, body } shape and needs no
// changes.
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_FILE = path.join(ROOT, "public", "revision-search-index.json");
const CONTENT_DIR = path.join(ROOT, "content", "revision-hub");

// Sections are authored in TypeScript (data/revision-hub.ts) so this script
// re-derives the same list with a tiny regex-free parse rather than adding
// a TS-execution dependency to the build step — this stays in sync with
// that file's REVISION_HUB_SECTIONS export by construction, since it reads
// the same source of truth as everything else.
function loadSections() {
  const src = fs.readFileSync(path.join(ROOT, "data", "revision-hub.ts"), "utf8");
  const entries = [];
  const blockRegex = /\{\s*slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"/g;
  let match;
  while ((match = blockRegex.exec(src)) !== null) {
    const [, slug, title, description] = match;
    entries.push({ slug, title, description });
  }
  return entries;
}

// If content/revision-hub/*.mdx files exist (future authored content),
// fold their frontmatter + body into the index too, keyed by the same
// slug so a page's own content and its section metadata merge into one
// entry rather than producing duplicate search results.
function loadMdxBodies() {
  if (!fs.existsSync(CONTENT_DIR)) return {};
  const bodies = {};
  for (const entry of fs.readdirSync(CONTENT_DIR, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;
    const slug = entry.name.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, entry.name), "utf8");
    bodies[slug] = raw
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/[#>*_`~-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000);
  }
  return bodies;
}

function main() {
  const sections = loadSections();
  const bodies = loadMdxBodies();

  const index = sections.map((section) => ({
    slug: section.slug,
    title: section.title,
    description: section.description,
    body: bodies[section.slug] ?? "",
  }));

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2));
  console.log(`[revision-search-index] wrote ${index.length} entries to ${OUT_FILE}`);
}

main();
