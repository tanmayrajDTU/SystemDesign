# System Design Documentation 

A documentation-quality, extensible learning site for System Design — Next.js App Router, TypeScript, Tailwind, MDX content, Mermaid diagrams, dark/light mode, ⌘K search, and interactive quizzes/flashcards.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

To build for production (also regenerates the search index):

```bash
npm run build
npm start
```

Deploy: push to a repo and import it in [Vercel](https://vercel.com/new) — no extra configuration needed.

## What's built right now

The full 14-section, 100+ topic curriculum (plus 25+ case studies) from the spec is wired into the sidebar (`data/navigation.ts`), so the entire scope of the course is always visible. Topics without a written `.mdx` file yet show as "coming soon" and are unclickable.

**Fully written, production-quality content right now:**
- `Fundamentals → What is System Design?`
- `Fundamentals → CAP Theorem`
- `Caching → Caching Strategies`
- `Case Studies → URL Shortener` (a complete case study walkthrough covering every required subsection: requirements, capacity estimation, API design, DB design, architecture, scaling, bottlenecks, failure scenarios, improvements)

These four pages are the quality bar / template for everything else — read them to see the full depth (definition → analogy → internal working → trade-offs → interview questions → quiz) that every future topic should hit.

**Framework features, all working:**
- Left sidebar nav with collapsible sections, "coming soon" locking
- Right-hand auto-generated table of contents with scroll-spy
- ⌘K / Ctrl+K fuzzy search (Fuse.js) over all written content
- Dark/light mode (persisted, respects system preference)
- Reading progress bar
- Prev/Next chapter navigation
- Syntax-highlighted code blocks with a copy button (Shiki via rehype-pretty-code)
- Mermaid diagrams (flowcharts, sequence diagrams, ER diagrams), theme-aware
- End-of-chapter interactive quizzes and flashcard decks
- Fully responsive, mobile nav drawer
- Animated hero on the homepage (a packet flowing through Client → LB → API → Cache/DB)

## Adding a new topic

1. Create `content/<section>/<topic-slug>.mdx` with frontmatter:

   ```mdx
   ---
   title: "Your Topic Title"
   description: "One sentence description."
   difficulty: "Beginner" | "Intermediate" | "Advanced"
   ---

   ## Definition
   ...
   ```

2. Add the slug to `READY_SLUGS` in `data/navigation.ts` (it should already be listed in `NAVIGATION` under the right section — just move it into the ready set). This unlocks it in the sidebar and includes it in prev/next ordering.

3. Run `npm run index` (or just `npm run build`) to refresh the search index.

That's it — no other code changes needed. The dynamic route at `app/docs/[...slug]/page.tsx` picks up any `.mdx` file under `content/` automatically.

### Available MDX components

Use these inside any `.mdx` file:

- ` ```mermaid ` fenced code blocks → rendered as interactive diagrams
- `<Callout type="note|tip|warning|danger" title="...">...</Callout>`
- `<Quiz questions={[{ q, options, answer, explanation }]} />`
- `<Flashcards cards={[{ front, back }]} />`

## Recommended content template (matches the spec's quality bar)

Every topic should cover, in order: Definition → Why it exists → Problem it solves → Real-world analogy → Simple explanation → Technical explanation → Internal working → Advantages → Disadvantages → Trade-offs → Complexity considerations → When to use → When NOT to use → Common mistakes → Interview questions → Practical example → Production example → Best practices → Summary → References → Quiz.

## Project structure

```
app/
  page.tsx                 → homepage
  docs/layout.tsx           → sidebar shell for all doc pages
  docs/[...slug]/page.tsx   → MDX compile + render + TOC + prev/next
content/                    → all .mdx source content, organized by section
components/
  layout/                   → sidebar, top nav, theme toggle, reading progress, prev/next
  mdx/                      → Callout, Mermaid, Quiz, Flashcards, code block
  search/                   → ⌘K search dialog (Fuse.js)
data/navigation.ts           → the entire curriculum + which topics are "ready"
lib/content.ts                → filesystem MDX reading + frontmatter parsing
lib/toc.ts                    → rehype plugin that extracts h2/h3 for the right-hand TOC
scripts/generate-search-index.mjs → builds public/search-index.json from all content
```

## Notes

- Search index is generated at build time (`npm run build` runs it automatically) and also available via `npm run index` during development — re-run it after adding content if you want it searchable before your next full build.
- Content is plain `.mdx` files on disk — no CMS or database required, so anyone can contribute via a pull request.
