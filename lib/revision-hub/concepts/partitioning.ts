import type { ConceptRevisionContent } from "./types";

export const partitioning: ConceptRevisionContent = {
  slug: "partitioning",
  title: "Partitioning",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Partitioning", href: "/docs/databases/partitioning" },
    { label: "Sharding", href: "/docs/databases/sharding" },
  ],

  summary: [
    "Partitioning is the general practice of splitting a large dataset into smaller, more manageable pieces (partitions), each holding a subset of the total data — sharding is its most common form, but partitioning can also happen within a single machine.",
    "It exists because very large tables become unwieldy: queries and maintenance operations (backups, index rebuilds) slow down, and a query that only needs a small slice still has to contend with the whole table's size unless scoped.",
    "The core mechanism is partition pruning: a query filtered on the partition key only needs to scan the relevant partition(s), skipping everything else entirely.",
    "Common strategies mirror sharding's: range (simple, natural for range queries, risk of uneven sizes), hash (even spread, loses range-query friendliness), and list (discrete categories like country).",
    "Old partitions can be archived or dropped as a single fast operation (e.g. dropping last year's log partition) instead of a slow row-by-row delete across an enormous table.",
    "It's meaningfully simpler than sharding: a standard, well-supported feature within a single database, without sharding's added routing layer and cross-machine network calls.",
  ],

  whyAsked: [
    "It tests whether a candidate distinguishes the general concept (partitioning) from its cross-machine special case (sharding) — a common point of imprecision.",
    "Partition pruning is a concrete, checkable detail that shows whether a candidate understands the actual performance mechanism, not just the term.",
    "It's a natural entry point into time-series and multi-tenant data design questions.",
  ],

  thirtySecondAnswer:
    "Partitioning is the general practice of splitting a large dataset into smaller, more manageable pieces called partitions, each holding a subset of the data based on a partition key — sharding (splitting across multiple machines) is the most commonly discussed form, but partitioning can also happen within a single machine. It exists because very large tables make queries and maintenance operations slower than they need to be when a query only actually needs a small slice of the data; the core benefit is partition pruning, where the database skips scanning any partition it can prove, from the query's filters and the partition key, couldn't contain relevant rows. It works best when actual query patterns align with the partition key — time-series data partitioned by date is the classic case, since recent-data queries (the overwhelming majority) touch only the current partition, and old partitions can be archived or dropped as one fast operation instead of a slow row-by-row delete. It's meaningfully simpler than sharding, since it's a standard, well-supported single-machine feature without a routing layer or cross-machine network calls.",

  detailedAnswer: [
    "Splits a large dataset into smaller partitions based on a partition key — a general concept that includes, but isn't limited to, cross-machine sharding.",
    "Partition pruning is the core benefit: queries filtered on the partition key skip irrelevant partitions entirely instead of scanning the whole table.",
    "Strategies mirror sharding's: range (simple, natural range queries, uneven-size risk), hash (even spread, loses range-query friendliness), list (discrete categories).",
    "Old partitions can be archived or dropped as a single fast operation — a major operational win for time-series data specifically.",
    "Queries spanning many partitions gain little from pruning and can even be somewhat slower than an equivalent unpartitioned table due to cross-partition coordination overhead.",
    "Simpler than sharding: a standard single-database feature, without sharding's routing layer or cross-machine network calls.",
  ],

  questions: [
    { id: "part-q1", question: "What is partitioning, in one sentence?", answer: "The general practice of splitting a large dataset into smaller, more manageable pieces (partitions), each holding a subset of the data based on a partition key.", topic: "Databases", difficulty: "Beginner" },
    { id: "part-q2", question: "What's the relationship between partitioning and sharding?", answer: "Sharding is partitioning specifically across multiple machines; partitioning is the more general concept and can also happen entirely within a single machine.", topic: "Databases", difficulty: "Beginner" },
    { id: "part-q3", question: "What is partition pruning?", answer: "The database's ability to skip scanning partitions that can't possibly contain rows relevant to a given query, based on the query's filters and the partition key.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q4", question: "Why does an enormous, unpartitioned table slow down routine operations?", answer: "Queries and maintenance operations (index rebuilds, backups) that only actually need a small slice of the data still have to contend with the whole table's size if it isn't scoped to a smaller partition.", topic: "Databases", difficulty: "Beginner" },
    { id: "part-q5", question: "What's the trade-off of range partitioning?", answer: "Simple and naturally supports range queries, but can create uneven partition sizes if the underlying data isn't evenly distributed across ranges.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q6", question: "What's the trade-off of hash partitioning?", answer: "Spreads data more evenly across partitions, at the cost of losing natural ordering and range-query friendliness.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q7", question: "What's list partitioning used for?", answer: "Partitioning based on a specific set of discrete values, such as country or category.", topic: "Databases", difficulty: "Beginner" },
    { id: "part-q8", question: "Why is time-series data a classic use case for partitioning?", answer: "It's naturally partitioned by time, and old partitions (e.g. logs older than a year) can be archived or dropped as a single fast operation rather than a slow row-by-row delete across a giant table.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q9", question: "What happens to a query that needs to span many partitions?", answer: "It gains little from partition pruning and can even be somewhat slower than an equivalent unpartitioned table, due to the overhead of coordinating across partitions.", topic: "Databases", difficulty: "Advanced" },
    { id: "part-q10", question: "Is partitioning within a single machine simpler than sharding across multiple machines?", answer: "Yes — it's a standard, well-supported feature in most relational databases, without sharding's added routing layer and cross-machine network calls.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q11", question: "What's a common mistake when choosing a partition key?", answer: "Choosing one that doesn't match actual query patterns, so most queries still need to scan many (or all) partitions anyway, gaining little benefit.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q12", question: "What's a common terminology mistake related to partitioning?", answer: "Conflating partitioning (which can happen within a single machine) with sharding (partitioning specifically across multiple machines) — related but not identical, and worth being precise about.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q13", question: "What database feature enables 'drop the whole partition' as a fast archival operation?", answer: "Because a partition is a physically separate structure, dropping it removes all its rows in one operation, rather than requiring a slow, row-by-row delete scanning a criterion across a giant unified table.", topic: "Databases", difficulty: "Advanced" },
    { id: "part-q14", question: "When is partitioning not worth adopting?", answer: "When tables are small enough that the added complexity isn't justified by any real performance benefit, or when query patterns routinely span most/all partitions anyway.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q15", question: "What's an example of a multi-tenant use case for partitioning?", answer: "Partitioning a shared table by tenant ID, so queries scoped to one tenant only scan that tenant's partition rather than the entire shared table.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q16", question: "What ongoing operational task does date-based partitioning require?", answer: "Automatically creating new partitions as time moves forward (e.g. a new monthly partition) and dropping/archiving ones past a retention period — this needs to be automated, not managed manually.", topic: "Databases", difficulty: "Advanced" },
    { id: "part-q17", question: "What kind of systems build partitioning into their core design by default?", answer: "Managed data warehouses (BigQuery, Redshift, Snowflake) and time-series databases, since analytics and time-series workloads so commonly query recent, bounded ranges of otherwise enormous datasets.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-q18", question: "How would you explain partitioning with a filing cabinet analogy?", answer: "An enormous single filing cabinet holding every record ever created makes finding last month's invoices slow; organizing it into drawers by month means finding them requires opening exactly one drawer instead of searching everything.", topic: "Databases", difficulty: "Beginner" },
    { id: "part-q19", question: "Does partitioning by itself solve write-throughput scaling past a single machine's limits?", answer: "Not on its own — partitioning within one machine still leaves all partitions on that same machine's hardware; scaling write throughput past a single machine requires sharding those partitions across multiple machines.", topic: "Databases", difficulty: "Advanced" },
    { id: "part-q20", question: "Why should the partition key be chosen based on query patterns rather than convenience?", answer: "Partition pruning only helps when queries actually filter on (or align with) the partition key — a mismatched key means most queries still scan broadly, losing the entire benefit.", topic: "Databases", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"What's the difference between partitioning and sharding?\"",
    "\"How would partitioning by date help this specific time-series logging system?\"",
    "\"What happens to a query that needs to span multiple partitions — does partitioning help or hurt?\"",
  ],

  commonMistakes: [
    "Choosing a partition key that doesn't match actual query patterns.",
    "Conflating partitioning (single-machine-capable) with sharding (specifically cross-machine).",
    "Not automating partition maintenance (creating new partitions, archiving old ones).",
  ],

  interviewTraps: [
    "\"Partitioning and sharding are the same thing\" is a trap — sharding is specifically the cross-machine case of the more general partitioning concept.",
    "Being asked about a cross-partition query is testing whether you know pruning doesn't help there and can even add coordination overhead.",
  ],

  tradeoffs: [
    "Speeds up queries/maintenance scoped to one partition, but adds schema/operational complexity and doesn't help (or can even hurt) queries spanning many partitions.",
    "Range partitioning keeps range queries natural but risks uneven partitions; hash partitioning spreads evenly but loses range-query friendliness.",
  ],

  comparisonTable: {
    title: "Partitioning vs Sharding",
    columns: ["Partitioning (general)", "Sharding"],
    rows: [
      { label: "Scope", values: ["Can be within a single machine", "Specifically across multiple machines"] },
      { label: "Primary goal", values: ["Query/maintenance efficiency (pruning)", "Scaling write throughput and storage"] },
      { label: "Routing layer needed?", values: ["No — handled natively by the DB", "Yes — a shard router/lookup"] },
      { label: "Complexity", values: ["Lower — standard DB feature", "Higher — cross-machine coordination"] },
    ],
  },

  memoryTrick:
    "\"Partitioning is drawers in one cabinet; sharding is separate cabinets in separate rooms.\" Same idea (organize by a key), different scope (one machine vs. many).",

  realWorldExamples: [
    "A logging system partitions its main table by month, so recent-log queries (the overwhelming majority) only scan the current month's partition, and old partitions are dropped as one fast operation.",
    "Managed data warehouses like BigQuery, Redshift, and Snowflake build date-based partitioning into their core design for exactly this reason.",
  ],

  mermaidDiagram: `flowchart TD
    Q["Query: logs from Jan 15, 2026"] --> R{"Partition pruning"}
    R -->|only relevant partition scanned| P1["logs_2026_01"]
    R -.skipped entirely.-> P2["logs_2025_12"]
    R -.skipped entirely.-> P3["logs_2026_02"]`,

  flashcards: [
    { id: "part-fc1", front: "Partitioning — one-line definition", back: "Splitting a large dataset into smaller partitions based on a partition key.", topic: "Databases", difficulty: "Beginner" },
    { id: "part-fc2", front: "Partitioning vs sharding", back: "Sharding is partitioning specifically across multiple machines; partitioning is the general concept.", topic: "Databases", difficulty: "Beginner" },
    { id: "part-fc3", front: "Partition pruning", back: "Skipping partitions that can't contain relevant rows, based on the query's filters and partition key.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-fc4", front: "Why is date-based partitioning great for logs?", back: "Recent-data queries hit one partition; old partitions can be dropped as one fast operation.", topic: "Databases", difficulty: "Intermediate" },
    { id: "part-fc5", front: "What happens to cross-partition queries?", back: "They gain little from pruning and can even be slower due to cross-partition coordination overhead.", topic: "Databases", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Partitioning",
    sections: [
      { heading: "Core idea", items: ["Split large dataset into partitions", "By a partition key (date, hash, category)"] },
      { heading: "Strategies", items: ["Range — simple, uneven-size risk", "Hash — even spread, loses range queries", "List — discrete categories"] },
      { heading: "Benefit", items: ["Partition pruning — skip irrelevant partitions", "Fast archive/drop of old partitions"] },
      { heading: "Vs sharding", items: ["Single-machine capable", "No routing layer needed"] },
    ],
  },

  speedNotes: [
    "Partitioning = split large dataset into smaller pieces by a key.",
    "Sharding = partitioning specifically across multiple machines.",
    "Partition pruning: skip partitions that can't match the query.",
    "Great for time-series — drop old partitions as one fast op.",
    "Cross-partition queries gain little (or can be slower).",
  ],
};
