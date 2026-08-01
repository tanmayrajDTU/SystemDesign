# Content & Section Authoring Prompts

Reusable prompts for extending this project. Copy the relevant template,
fill in the blanks, and hand it to Claude (or follow it yourself) — each
one encodes the exact file locations, schemas, and conventions already
established in this repo, so output stays consistent without having to
re-derive them from scratch every time.

There are four templates:

1. **New doc chapter** — a single concept page under `/docs/<topic>/`
2. **New case study** — a full system-design walkthrough under `/docs/case-studies/`
3. **New Revision Hub concept** — a revision sheet under `/revision-hub/topic-wise-revision-sheets/`
4. **New top-level section** — an entirely new area of the site (like Cloud, Security, or the Revision Hub itself were)

---

## 1. New doc chapter (`/docs/<topic>/<slug>.mdx`)

```
Add a new documentation chapter for "<CONCEPT NAME>" under the "<TOPIC
SECTION>" section (content/<topic-folder>/<slug>.mdx).

Follow the exact structure and depth already used by every existing
chapter in that folder — check 2-3 sibling files first for tone and
section headers. The standard shape is:

Frontmatter (title, description, difficulty: Beginner|Intermediate|Advanced)
## Definition
## Why it exists
## The problem it solves
## Real-world analogy
## Simple explanation
## Technical explanation (include a Mermaid diagram or table where it helps)
## Internal working — <specific mechanism>
## Advantages
## Disadvantages
## Trade-offs
## Complexity considerations
## When to use
## When NOT to use
## Common mistakes
## Interview questions (3+ bullet questions, no answers — this is the
   detailed doc, not the revision sheet)
## Practical example
## Production example
## Best practices
## Summary
## References
<Quiz questions={[...]} /> — 1-2 questions with 4 options, answer index,
   and an explanation

Use <Callout type="note|tip|warning|danger"> for at least one important
nuance (never type="info" — that's not a valid variant). Cross-link to
related existing chapters with [text](/docs/<topic>/<slug>) instead of
re-explaining concepts that already have their own page.

After writing, add the file to data/navigation.ts: the nav entry already
exists / needs adding under section "<N>. <Section Title>", and the slug
"<topic>/<slug>" needs to be added to READY_SLUGS or the page will show
as "coming soon".
```

---

## 2. New case study (`/docs/case-studies/<slug>.mdx`)

```
Add a new system design case study for "<SYSTEM NAME>" under
content/case-studies/<slug>.mdx.

Before writing, check for overlap with existing case studies — if this
system shares a core problem with one already written (e.g. fan-out,
seat-locking, ledger correctness), explicitly angle the new one at
whatever's genuinely different rather than repeating the same lesson.

Follow the standard case-study shape used by every existing file in that
folder:

## Requirements gathering (functional + non-functional, with a Callout
   flagging the one framing detail that matters most for this system)
## Capacity estimation (real numbers, worked out, with a stated key insight)
## API design (or High-level architecture, whichever fits first)
## <Core mechanism specific to this system> — the actual hard problem,
   with a Mermaid sequence/flow diagram
## Data model (a Mermaid erDiagram)
## High-level architecture (a Mermaid flowchart)
## Scaling strategy
## Bottlenecks
## Failure scenarios
## Improvements
## Summary
<Quiz questions={[...]} /> — 2 questions testing the core mechanism,
   not trivia

Cross-link to relevant concept docs (e.g. [Consistent Hashing]
(/docs/distributed-systems/consistent-hashing)) instead of re-explaining
them inline.

After writing, add "case-studies/<slug>" to READY_SLUGS in
data/navigation.ts (the nav entry likely already exists as a placeholder).
```

---

## 3. New Interview Revision Hub concept

```
Populate the Interview Revision Hub for: "<CONCEPT NAME>".

Create lib/revision-hub/concepts/<slug>.ts exporting a single
ConceptRevisionContent object (see lib/revision-hub/concepts/types.ts for
the exact shape) with every field filled in:

- slug, title, topic, difficulty, estimatedMinutes
- docLinks: cross-link to the existing detailed doc chapter(s) for this
  concept under /docs/... — check content/<topic>/ first for the actual
  slug(s). Do NOT re-explain what's already in the full chapter; this
  page is a revision aid, not a duplicate.
- summary: 5-10 lines
- whyAsked: 2-4 bullets on what an interviewer is actually listening for
- thirtySecondAnswer: one dense paragraph
- detailedAnswer: 4-6 concise bullets (NOT full long-form — link out for
  depth instead)
- questions: 20 InterviewQuestionItem objects ({id, question, answer,
  topic, difficulty}), ids formatted "<short-prefix>-q1" through "-q20",
  spanning Beginner/Intermediate/Advanced
- commonFollowUps: 3-4 bullets
- commonMistakes: 3-4 bullets
- interviewTraps: 2-3 bullets
- tradeoffs: 2-4 bullets, plus comparisonTable if this concept is
  naturally a head-to-head (X vs Y)
- decisionGuide: a DecisionNode tree ONLY if there's a genuine branching
  "which way do I go here" question for this concept — otherwise omit it
- memoryTrick: one mnemonic, one sentence
- realWorldExamples: 2 concrete bullets
- mermaidDiagram: one raw mermaid chart string
- flashcards: 5 FlashcardItem objects, ids "<prefix>-fc1" through "-fc5"
- cheatSheet: title + 3-4 sections of dense reference bullets
- speedNotes: 5 ultra-short bullets for a last-minute skim

Every id across the whole file must be globally unique (they're
localStorage keys for bookmarks/mark-as-revised) — prefix with a short
concept abbreviation to guarantee this.

Then register it: import and add to the ALL_CONCEPTS array in
lib/revision-hub/concepts/index.ts. Every hub page (Top Interview
Questions, Flashcards, Cheat Sheets, Comparison Tables, Common Interview
Mistakes, Real Interview Nuggets, Top 100 Concepts, Interview Speed
Notes, the dedicated /revision-hub/topic-wise-revision-sheets/<slug>
page) picks it up automatically from that one registration — nothing
else needs to change.

Do a quick duplicate-id sanity check across all concept files before
finishing (grep for `id: "` and confirm no collisions) rather than a
full build, unless asked to verify with a build.
```

---

## 4. New top-level section (entirely new area of the site)

Use this only for something genuinely new-shaped — not another chapter
or concept, but a new *kind* of page (like Cloud Concepts, Security, or
the Interview Revision Hub itself were).

```
Add a new top-level section called "<SECTION NAME>" to the docs site.

First, determine which existing system it's closer to:
- If it's more detailed reference chapters → extend the main docs system
  (content/<new-topic>/*.mdx + data/navigation.ts + READY_SLUGS), reusing
  components/mdx/* as-is.
- If it's a genuinely different interaction model (interactive tools,
  different data shape, different navigation needs) → build it as an
  independent top-level route under app/<section-slug>/, with its own:
  - data/<section-slug>.ts (or a concepts/ folder, mirroring
    lib/revision-hub/concepts/ if the content is structured data)
  - components/<section-slug>/ for anything genuinely new — but check
    components/revision/ and components/mdx/ first and reuse rather than
    rebuild (FilterBar, BookmarkButton, MarkRevisedButton, CheatSheet,
    ComparisonTable, FlashcardDeck, DecisionTree, QAAccordion, etc. are
    all generic enough to be reusable outside the Revision Hub too)
  - app/<section-slug>/layout.tsx + page.tsx (landing) + routes
  - a sidebar component if it needs its own nav, and a PrimaryNav tab in
    components/layout/top-nav.tsx to switch into it
  - a scoped search index script if it needs its own search
    (scripts/generate-<section-slug>-search-index.mjs, wired into
    package.json's build/index scripts) — keep it separate from other
    indexes rather than merging, so a search in one section never
    surfaces results from another

Do NOT modify existing content files or the existing docs
sidebar/navigation for sections that already work — build the new
section as additive infrastructure, the same way the Interview Revision
Hub was added alongside the existing docs without touching them.

Match the existing design language exactly: Tailwind classes using the
ink/ink-muted/border/surface-raised tokens (see app/globals.css),
font-display for headings, rounded-xl bordered cards, the Badge
component for tags — check an existing page (e.g. app/revision-hub/
page.tsx) for the concrete pattern rather than inventing new styling.

Verify with `npx tsc --noEmit` and, unless told to skip it, a full
`npm run build` before considering it done.
```

---

## Notes for whoever's using these

- Always peek at 2-3 sibling files in the target folder before writing —
  tone, depth, and terminology (e.g. "p99" not "99th percentile", "shard"
  not "partition" when the codebase already picked one) should match.
- `type="info"` is not a valid `<Callout>` variant — only
  `note | tip | warning | danger` exist. This broke a full production
  build once; double-check before shipping.
- Cross-linking is not optional politeness — it's what keeps the
  Revision Hub from turning into a second copy of the docs. If a
  paragraph is explaining something that already has its own chapter,
  it should be a link, not a re-explanation.
- IDs anywhere in Revision Hub content (`questions[].id`,
  `flashcards[].id`) are permanent once shipped — they're the
  localStorage keys behind bookmarks and mark-as-revised. Don't rename
  them casually later; a rename silently orphans anyone's existing
  bookmarks for that item.
```
