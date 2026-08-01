import type { ConceptRevisionContent } from "./types";

export const indexing: ConceptRevisionContent = {
  slug: "indexing",
  title: "Indexing",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Indexing", href: "/docs/databases/indexing" },
    { label: "SQL", href: "/docs/databases/sql" },
  ],

  summary: [
    "A database index is a separate data structure that lets the database find rows matching a value quickly, without scanning every row — trading extra storage and write overhead for dramatically faster reads on indexed columns.",
    "Without an index, a lookup requires a full table scan, which degrades linearly (or worse) with table size; indexing keeps lookup time close to logarithmic regardless of size.",
    "The default index type in most relational databases is a B-tree — a balanced, sorted tree structure supporting exact-match lookups, range queries, and sorted retrieval.",
    "Other index types exist for different needs: hash indexes (fast exact-match only, no ranges), composite indexes (multiple columns together), full-text indexes (text search).",
    "The core trade-off: every index must be updated on every insert/update/delete to that table, so more indexes mean faster reads but slower writes.",
    "An index only helps queries that can actually use it — matching the indexed column(s) to how the table is actually filtered, joined, or sorted; an unused index still costs write overhead for zero benefit.",
  ],

  whyAsked: [
    "It's a direct test of whether you understand the fundamental read/write trade-off in databases, not just that 'indexes make things faster.'",
    "\"This query is slow, what would you check first?\" is one of the most common practical database debugging questions, and indexing is almost always part of the answer.",
    "Composite index column order is a favorite follow-up because it reveals whether you understand how the index structure is actually used by the query planner, not just that an index exists.",
  ],

  thirtySecondAnswer:
    "A database index is a separate data structure — most commonly a B-tree — that lets the database find rows matching a value quickly, without scanning every row in the table. Without an index, a lookup requires a full table scan, and query time degrades linearly or worse as the table grows; an index keeps lookup time close to logarithmic regardless of table size, the same way a book's index lets you jump straight to a topic instead of reading cover to cover. The central trade-off is that every index must be kept in sync on every insert, update, and delete to that table, so more indexes mean faster reads but slower writes — the right number and choice of indexes depends entirely on a table's actual read/write ratio and query patterns. An index only helps queries that can actually use it: columns frequently filtered in WHERE clauses, joined on, or sorted by in ORDER BY are good candidates, while indexing a rarely-queried column just adds write overhead for no benefit. Composite indexes (across multiple columns) add a further wrinkle — column order matters, since an index on (a, b) helps a query filtering on a, or on a and b together, far more than one filtering on b alone.",

  detailedAnswer: [
    "Default structure: a B-tree — a balanced, sorted tree enabling exact-match lookups, range queries, and sorted retrieval in logarithmic time relative to table size.",
    "Other types: hash index (fastest for exact match, no range/sort support), composite index (multiple columns, column order matters), full-text index (optimized for text search rather than exact/range matches).",
    "Core cost: every index must be updated whenever a row is inserted, updated, or deleted — more indexes on a table directly means slower writes to that table.",
    "An index only benefits queries that actually match it — filtering, joining, or sorting on the indexed column(s); an index the query planner can't use (e.g. due to a function wrapping the column in WHERE) still costs write overhead with zero read benefit.",
    "Composite index column order matters: an index on (a, b) serves queries filtering on a alone, or a and b together, much better than queries filtering on b alone.",
    "Diagnosing whether an index is actually helping requires inspecting the query planner's execution plan (EXPLAIN/EXPLAIN ANALYZE) rather than assuming an index exists and is being used.",
  ],

  questions: [
    { id: "idx-q1", question: "What is a database index?", answer: "A separate data structure that lets the database find rows matching a value quickly, without scanning every row in the table.", topic: "Databases", difficulty: "Beginner" },
    { id: "idx-q2", question: "What happens without an index when looking up a specific row?", answer: "The database performs a full table scan, checking every row — fine for small tables, but prohibitively slow as tables grow large.", topic: "Databases", difficulty: "Beginner" },
    { id: "idx-q3", question: "What's the most common index structure in relational databases, and why?", answer: "A B-tree — a balanced, sorted tree that supports exact-match lookups, range queries, and sorted retrieval in logarithmic time relative to table size.", topic: "Databases", difficulty: "Beginner" },
    { id: "idx-q4", question: "What's the core trade-off of adding an index?", answer: "Faster reads on the indexed column(s), but slower writes, since every insert/update/delete must also update the index to keep it in sync with the table data.", topic: "Databases", difficulty: "Beginner" },
    { id: "idx-q5", question: "What is a hash index, and what's its main limitation?", answer: "An index optimized purely for extremely fast exact-match lookups — but it doesn't support range queries or sorted retrieval the way a B-tree does.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q6", question: "What is a composite index?", answer: "An index built across multiple columns together, useful for queries that filter on that specific combination of columns.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q7", question: "Why does column order matter in a composite index on (a, b)?", answer: "The index effectively sorts by a first, then b within each a — so it serves queries filtering on a alone, or on a and b together, far better than a query filtering only on b.", topic: "Databases", difficulty: "Advanced" },
    { id: "idx-q8", question: "What's a full-text index optimized for?", answer: "Searching within text content (matching words/phrases), rather than exact-value or range matches the way a standard B-tree index handles.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q9", question: "Why doesn't indexing every column make sense?", answer: "Every additional index adds write overhead and storage cost, and an index on a rarely-queried column provides essentially no read benefit while still paying that ongoing write cost.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q10", question: "A query on a large table is slow — what would you check first?", answer: "The query's execution plan (e.g. via EXPLAIN/EXPLAIN ANALYZE) to see whether it's doing a full table scan, then consider adding an index on the filtered/joined columns if so.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q11", question: "Why might an index exist on a column but not actually be used by a query?", answer: "A function or transformation applied to the column in the WHERE clause (e.g. LOWER(email) = ...) can prevent the query planner from using a standard index on that raw column, silently falling back to a full scan.", topic: "Databases", difficulty: "Advanced" },
    { id: "idx-q12", question: "Why should foreign key columns typically be indexed?", answer: "Foreign key columns are very commonly used in JOIN conditions, and without an index, each join has to scan the referenced table for matches, which becomes expensive at scale.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q13", question: "When would you NOT add an index to a column?", answer: "When it's rarely queried, on a table small enough that a full scan is already fast, or on a table with very high write volume and low read volume, where write overhead would outweigh any read benefit.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q14", question: "How would you decide the column order for a new composite index?", answer: "Base it on the actual query patterns — put the column(s) most commonly used alone or as the primary filter first, since the index serves queries on a leading-column prefix far better than queries on trailing columns alone.", topic: "Databases", difficulty: "Advanced" },
    { id: "idx-q15", question: "What's the relationship between an index and ORDER BY performance?", answer: "If an index already stores data sorted by the ORDER BY column(s), the database can return sorted results directly from the index without a separate, potentially expensive sort step.", topic: "Databases", difficulty: "Advanced" },
    { id: "idx-q16", question: "Why is a URL shortener's redirect lookup a strong case for indexing?", answer: "Every redirect needs to look up a short code against potentially billions of URLs — without an index on the short code column, this becomes a full table scan on every single redirect, catastrophically slow at scale.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q17", question: "What tool would you use in Postgres or MySQL to check whether a query is using an index?", answer: "EXPLAIN (or EXPLAIN ANALYZE for actual runtime statistics), which shows the query planner's chosen execution strategy, including whether it's using an index scan or falling back to a full table/sequential scan.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q18", question: "What's a common mistake teams make with indexing on a write-heavy table?", answer: "Adding many indexes 'just in case' without measuring actual query needs, noticeably degrading write throughput on a table that's dominated by inserts/updates rather than reads.", topic: "Databases", difficulty: "Intermediate" },
    { id: "idx-q19", question: "Does adding an index speed up every query on that table?", answer: "No — only queries that can actually use it, typically ones filtering, joining, or sorting on the indexed column(s); it does nothing for queries on unrelated columns.", topic: "Databases", difficulty: "Beginner" },
    { id: "idx-q20", question: "Summarize database indexing in one sentence.", answer: "A separate structure (typically a B-tree) that lets a database find rows quickly without a full table scan, trading write overhead and storage for dramatically faster reads on the specific columns it covers.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"This query is slow on a large table — what would you check first?\"",
    "\"What's the cost of adding an index, and why wouldn't you just index every column?\"",
    "\"How would you decide the column order for a composite index?\"",
  ],

  commonMistakes: [
    "Indexing every column 'just in case,' adding unnecessary write overhead for indexes queries never actually use.",
    "Not checking the query planner's execution plan, assuming an index is used when a function or transformation on the column prevents it.",
    "Forgetting composite index column order matters — an index on (a, b) doesn't help a query filtering only on b nearly as much as one filtering on a.",
    "Adding indexes on a heavily-written, rarely-read table where the write cost isn't justified by any real read benefit.",
  ],

  interviewTraps: [
    "\"Why not just index every column to be safe?\" is testing whether you understand the write-overhead cost, not just that indexes speed up reads.",
    "\"Is this index actually being used?\" is testing whether you'd check the execution plan rather than assume an index automatically helps.",
  ],

  tradeoffs: [
    "Faster reads on indexed columns vs. slower writes (every index must be updated on insert/update/delete).",
    "More indexes help more query patterns but increase storage and write cost — the right count depends on the table's actual read/write ratio.",
    "B-tree indexes support ranges and sorting; hash indexes are faster for pure exact-match but can't do ranges/sorting at all.",
  ],

  comparisonTable: {
    title: "B-tree vs Hash Index",
    columns: ["B-tree Index", "Hash Index"],
    rows: [
      { label: "Exact-match lookups", values: ["Fast (logarithmic)", "Fastest (near constant time)"] },
      { label: "Range queries", values: ["Supported", "Not supported"] },
      { label: "Sorted retrieval", values: ["Supported natively", "Not supported"] },
      { label: "Typical default", values: ["Yes, in most relational databases", "Used selectively for pure key lookups"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "idx-root",
    question: "What's the query pattern you're optimizing for on this column?",
    options: [
      {
        label: "Filtering by a range, or need sorted results (ORDER BY)",
        next: {
          kind: "result",
          id: "idx-btree",
          result: "Use a standard B-tree index.",
          rationale: "B-trees natively support range queries and sorted retrieval, in addition to fast exact-match lookups.",
        },
      },
      {
        label: "Pure exact-match key lookups only, no ranges or sorting",
        next: {
          kind: "result",
          id: "idx-hash",
          result: "A hash index may be a better fit.",
          rationale: "Hash indexes are optimized purely for exact-match speed, trading away range/sort support you don't need for this pattern.",
        },
      },
      {
        label: "Filtering on a specific combination of columns together",
        next: {
          kind: "result",
          id: "idx-composite",
          result: "Use a composite index, ordered by actual query patterns.",
          rationale: "Put the most commonly filtered-alone column first, since a composite index serves leading-column-prefix queries far better than trailing-column-only queries.",
        },
      },
    ],
  },

  memoryTrick:
    "\"An index is a book's index.\" You paid extra pages (storage) and effort to compile it (write overhead) so you never have to read the whole book to find one topic (read speed).",

  realWorldExamples: [
    "A URL shortener indexes its short_code column, since every redirect looks up that code — without the index, redirects would require scanning the entire URLs table as it grows to billions of rows.",
    "Postgres and MySQL both expose EXPLAIN/EXPLAIN ANALYZE specifically so engineers can verify whether a slow query is actually using an available index or silently falling back to a full table scan.",
  ],

  mermaidDiagram: `flowchart TD
    Root["Root node (50)"]
    Root --> L["< 50 (10, 25, 40)"]
    Root --> R[">= 50 (60, 75, 90)"]`,

  flashcards: [
    { id: "idx-fc1", front: "Database index — one-line definition", back: "A separate data structure letting the database find rows quickly without scanning every row in the table.", topic: "Databases", difficulty: "Beginner" },
    { id: "idx-fc2", front: "Most common index type", back: "B-tree — a balanced, sorted tree supporting fast exact-match, range, and sorted queries.", topic: "Databases", difficulty: "Beginner" },
    { id: "idx-fc3", front: "Core trade-off of indexing", back: "Faster reads on indexed columns, but every index adds write overhead to inserts/updates/deletes.", topic: "Databases", difficulty: "Beginner" },
    { id: "idx-fc4", front: "Composite index column order", back: "An index on (a, b) serves queries filtering on a, or on a and b, much better than queries filtering on b alone.", topic: "Databases", difficulty: "Advanced" },
    { id: "idx-fc5", front: "How to check if an index is actually being used", back: "Inspect the query planner's execution plan (EXPLAIN/EXPLAIN ANALYZE) rather than assume.", topic: "Databases", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Indexing",
    sections: [
      { heading: "Core idea", items: ["Separate structure for fast lookups", "Default: B-tree (sorted, balanced tree)", "Avoids full table scans"] },
      { heading: "Index types", items: ["B-tree: exact match + ranges + sort", "Hash: fastest exact match only", "Composite: multiple columns, order matters", "Full-text: text search"] },
      { heading: "Cost", items: ["Every write updates every index", "Unused index = write cost, no benefit", "More indexes = slower writes"] },
      { heading: "When to add", items: ["Frequent WHERE/JOIN/ORDER BY columns", "Foreign key columns", "Verify with EXPLAIN, don't guess"] },
    ],
  },

  speedNotes: [
    "Index = separate structure to avoid full table scans.",
    "Default: B-tree — supports exact match, ranges, sorting.",
    "Every index costs write overhead — trade-off, not free.",
    "Composite index column order matters — leading column first.",
    "Check EXPLAIN/EXPLAIN ANALYZE to confirm an index is actually used.",
  ],
};
