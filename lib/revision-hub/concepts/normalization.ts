import type { ConceptRevisionContent } from "./types";

export const normalization: ConceptRevisionContent = {
  slug: "normalization",
  title: "Normalization",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Normalization", href: "/docs/databases/normalization" },
    { label: "Denormalization", href: "/docs/databases/denormalization" },
    { label: "SQL", href: "/docs/databases/sql" },
  ],

  summary: [
    "Normalization is the process of organizing relational tables to reduce data redundancy and avoid update anomalies, typically by splitting data into related tables connected via foreign keys.",
    "The core motivation: if the same fact (a customer's address) is stored in multiple rows, an update must touch every copy correctly, or the data becomes contradictory — normalization stores each fact exactly once.",
    "Formalized as a series of normal forms — 1NF (atomic column values), 2NF (non-key columns depend on the whole key), 3NF (non-key columns depend only on the key, no transitive dependencies) — each addressing a specific class of redundancy/anomaly.",
    "3NF is a reasonable, common default for most transactional schemas; going further (4NF, 5NF) addresses increasingly rare edge cases most production systems never need.",
    "The cost is more tables, which means more joins are needed to reconstruct a full picture of related data — a real read-performance trade-off, especially at scale.",
    "It's the mirror-image trade-off to denormalization: normalization optimizes for write safety and integrity; denormalization optimizes for read speed by deliberately reintroducing redundancy.",
  ],

  whyAsked: [
    "It tests whether you understand normalization as solving a specific, nameable problem (update anomalies from redundant data) rather than as a vague 'good schema design' gesture.",
    "The normal forms (1NF/2NF/3NF) are a common way to probe precision — can you explain what specifically 2NF adds over 1NF, not just recite the acronyms.",
    "It sets up the natural follow-up about when to deliberately denormalize, testing whether you can reason about the trade-off both directions rather than treating normalization as an unconditional good.",
  ],

  thirtySecondAnswer:
    "Normalization is the process of organizing relational tables to reduce data redundancy and avoid update anomalies, typically by splitting data into multiple related tables connected via foreign keys rather than repeating the same fact across many rows. The classic motivating example: an unnormalized orders table repeating a customer's address on every order row means updating that address requires correctly updating every single order row — miss one, and the data now contradicts itself. This is formalized through a series of normal forms — First Normal Form requires atomic column values with no repeating groups, Second Normal Form requires every non-key column to depend on the entire primary key, and Third Normal Form requires non-key columns to depend only on the key, eliminating transitive dependencies between non-key columns. 3NF is a reasonable, common default for most transactional schemas, and going further to 4NF or 5NF addresses increasingly rare anomalies most systems never actually encounter. The real cost is that more tables means more joins are needed to reconstruct a full picture of related data, which can hurt read performance at scale — which is exactly the trade-off denormalization deliberately reverses for specific, measured read-heavy paths.",

  detailedAnswer: [
    "Core goal: store each fact exactly once, referenced via foreign keys wherever needed, instead of repeating it across rows/tables.",
    "1NF: each column holds a single atomic value — no lists or repeating groups crammed into one field.",
    "2NF: every non-key column depends on the entire primary key, not just part of it (relevant specifically for composite keys).",
    "3NF: every non-key column depends only on the primary key, not on other non-key columns — eliminating transitive dependencies.",
    "Prevents update, insert, and delete anomalies: redundant data going out of sync is the specific failure mode normalization eliminates, not just a storage-space concern.",
    "Real-world practice: normalize the primary write/source-of-truth schema to 3NF as a default, then selectively denormalize specific read paths once join-heavy queries become a measured performance bottleneck.",
  ],

  questions: [
    { id: "norm-q1", question: "What is normalization?", answer: "The process of organizing relational tables to reduce data redundancy and avoid update anomalies, typically by splitting data into related tables connected via foreign keys.", topic: "Databases", difficulty: "Beginner" },
    { id: "norm-q2", question: "What specific problem does normalization primarily solve?", answer: "Update anomalies — contradictory data resulting from redundant copies of the same fact not all being updated together when that fact changes.", topic: "Databases", difficulty: "Beginner" },
    { id: "norm-q3", question: "What does First Normal Form (1NF) require?", answer: "Each column holds a single, atomic value — no lists or repeating groups crammed into one field.", topic: "Databases", difficulty: "Beginner" },
    { id: "norm-q4", question: "What does Second Normal Form (2NF) add on top of 1NF?", answer: "Every non-key column must depend on the entire primary key, not just part of it — relevant specifically for tables with composite (multi-column) primary keys.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-q5", question: "What does Third Normal Form (3NF) require, conceptually?", answer: "Every non-key column depends only on the primary key, not on other non-key columns — eliminating 'transitive' dependencies between non-key columns.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-q6", question: "Why might storing a customer's name and address on every order row be a problem?", answer: "If the customer moves, updating their address requires finding and correctly updating every one of their order rows — miss one, and the data now has contradictory addresses for the same customer.", topic: "Databases", difficulty: "Beginner" },
    { id: "norm-q7", question: "How does normalization actually fix that problem?", answer: "By storing the customer's address once in a separate customers table, referenced by customer_id from the orders table — an address update now touches exactly one row.", topic: "Databases", difficulty: "Beginner" },
    { id: "norm-q8", question: "What's the main cost/disadvantage of normalization?", answer: "More tables means more joins are needed to reconstruct a full picture of related data, which can hurt read performance, especially at scale.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-q9", question: "Is normalization primarily a performance optimization?", answer: "No — it's primarily a data-integrity/correctness concern (preventing update anomalies); it can actually hurt raw read performance even as it helps write correctness, which is a common point of confusion.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-q10", question: "How far should most production systems normalize?", answer: "3NF (or Boyce-Codd Normal Form) is a reasonable, common default; going further to 4NF/5NF addresses increasingly rare and subtle anomalies most systems never practically need.", topic: "Databases", difficulty: "Advanced" },
    { id: "norm-q11", question: "When would you deliberately relax normalization?", answer: "For read-heavy systems (especially analytics/reporting) where join-heavy normalized queries become a measured performance bottleneck — this is the deliberate denormalization trade.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-q12", question: "What's an insert anomaly, conceptually?", answer: "A situation where you can't record a piece of information without also having unrelated data available, because it's improperly bundled into the same row — a consequence of insufficient normalization.", topic: "Databases", difficulty: "Advanced" },
    { id: "norm-q13", question: "What's a delete anomaly, conceptually?", answer: "A situation where deleting one row unintentionally loses other information that happened to be stored redundantly in that same row, because the data wasn't split into separate, properly normalized tables.", topic: "Databases", difficulty: "Advanced" },
    { id: "norm-q14", question: "Why is under-normalizing a risk specifically for frequently-updated shared data?", answer: "Data like customer info that's referenced (and potentially duplicated) across many rows is exactly where update anomalies bite hardest — every duplicate copy is a place the update can be missed.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-q15", question: "What's the typical real-world approach to normalization vs. denormalization?", answer: "Normalize the primary source-of-truth schema (often to 3NF) for write correctness, then selectively denormalize specific read paths — via caching, materialized views, or a separate read model — once measured performance actually demands it.", topic: "Databases", difficulty: "Advanced" },
    { id: "norm-q16", question: "What's a common mistake related to over-normalization?", answer: "Normalizing far beyond what's practically needed, resulting in an excessive number of tables and joins for simple, common queries that didn't need that level of decomposition.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-q17", question: "How do foreign keys relate to normalization?", answer: "Foreign keys are the mechanism that lets normalized tables stay connected — referencing a single source of truth in another table instead of duplicating that data, while the database enforces the relationship's validity.", topic: "Databases", difficulty: "Beginner" },
    { id: "norm-q18", question: "Why do analytics/reporting systems often prefer less-normalized (or fully denormalized/star-schema) structures?", answer: "Their workload is read-dominant and often involves broad aggregation across many entities, where join-heavy normalized structures become a genuine performance bottleneck compared to a flatter, purpose-built read structure.", topic: "Databases", difficulty: "Advanced" },
    { id: "norm-q19", question: "How would you explain the difference between 2NF and 3NF conceptually, in an interview?", answer: "2NF is about a non-key column depending on the whole (possibly composite) primary key, not just part of it; 3NF goes further, requiring non-key columns to depend only on the key and not on each other (no transitive dependency).", topic: "Databases", difficulty: "Advanced" },
    { id: "norm-q20", question: "Summarize normalization in one sentence.", answer: "Organizing relational data to store each fact exactly once via related tables and foreign keys, eliminating the redundancy that causes update anomalies, at the cost of needing more joins to reconstruct related data.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Why might storing a customer's address on every order row be a problem?\"",
    "\"What's the difference between 2NF and 3NF, conceptually?\"",
    "\"When would you deliberately denormalize a normalized schema, and why?\"",
  ],

  commonMistakes: [
    "Under-normalizing early, leading to repeated data and the update anomalies that come with it.",
    "Over-normalizing far beyond what's practically needed, resulting in excessive joins for simple, common queries.",
    "Confusing normalization (a correctness concern) with a performance optimization — it can hurt read performance even as it helps write correctness.",
    "Treating 3NF as insufficient without a specific, real anomaly that a higher normal form would actually prevent.",
  ],

  interviewTraps: [
    "\"Isn't normalization just about saving storage space?\" is testing whether you know its real purpose is preventing update anomalies, not storage efficiency.",
    "\"So more normalization is always better?\" is testing whether you'll recognize the read-performance cost and know when denormalization is the right call instead.",
  ],

  tradeoffs: [
    "Write safety and data integrity (each fact stored once) vs. more joins needed to reconstruct related data for reads.",
    "3NF is a solid default for transactional correctness; going further (4NF/5NF) addresses rare anomalies most systems don't need.",
    "The mirror-image trade-off to denormalization — real systems often normalize the source of truth, then selectively denormalize specific read paths.",
  ],

  comparisonTable: {
    title: "Normalization vs Denormalization",
    columns: ["Normalization", "Denormalization"],
    rows: [
      { label: "Goal", values: ["Eliminate redundancy, prevent update anomalies", "Reduce joins, speed up reads"] },
      { label: "Data redundancy", values: ["Minimized", "Deliberately reintroduced"] },
      { label: "Write complexity", values: ["Simple — update one row", "Complex — must sync all duplicated copies"] },
      { label: "Read complexity", values: ["More joins needed", "Fewer joins, often single-table reads"] },
      { label: "Best fit", values: ["Transactional, write-heavy, correctness-critical data", "Read-heavy workloads, analytics, reporting"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "norm-root",
    question: "Is this schema primarily write-heavy and correctness-critical, or read-heavy?",
    options: [
      {
        label: "Write-heavy, correctness-critical (orders, financial records)",
        next: {
          kind: "result",
          id: "norm-pick",
          result: "Normalize to at least 3NF as a solid default.",
          rationale: "Storing each fact once and enforcing relationships via foreign keys prevents update anomalies exactly where write correctness matters most.",
        },
      },
      {
        label: "Read-heavy, with the same joins repeated constantly (dashboards, feeds, reports)",
        next: {
          kind: "result",
          id: "norm-denorm",
          result: "Consider selectively denormalizing specific read paths.",
          rationale: "Once a specific join-heavy query is measured as a real bottleneck, deliberately reintroducing redundancy there trades some write complexity for meaningfully faster reads.",
        },
      },
    ],
  },

  memoryTrick:
    "\"One fact, one place.\" If you can imagine two rows disagreeing about the same fact after a partial update, it isn't normalized yet.",

  realWorldExamples: [
    "An e-commerce database normalizes customer information into a single customers table, referenced by customer_id from orders — updating a shipping address touches one row, not every historical order.",
    "Financial and order-management schemas at companies like Stripe are typically normalized to 3NF for core transactional data, specifically to avoid update anomalies where correctness is critical.",
  ],

  mermaidDiagram: `flowchart TD
    A["Unnormalized: customer address repeated across 50 order rows"] --> B["Customer moves"]
    B --> C{"Update all 50 rows correctly?"}
    C -->|Miss one| D["Data now contradicts itself - an update anomaly"]
    C -->|Normalized: address in 1 row| E["Update once - no anomaly possible"]`,

  flashcards: [
    { id: "norm-fc1", front: "Normalization — one-line definition", back: "Organizing relational tables to store each fact once, reducing redundancy and preventing update anomalies.", topic: "Databases", difficulty: "Beginner" },
    { id: "norm-fc2", front: "1NF / 2NF / 3NF in one line each", back: "1NF: atomic column values. 2NF: non-key columns depend on the whole key. 3NF: non-key columns depend only on the key.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-fc3", front: "What is an update anomaly?", back: "Contradictory data resulting from redundant copies of the same fact not all being updated together.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-fc4", front: "Main cost of normalization", back: "More tables means more joins needed to reconstruct related data — a real read-performance cost.", topic: "Databases", difficulty: "Intermediate" },
    { id: "norm-fc5", front: "How far should most systems normalize?", back: "3NF is a solid, common default; 4NF/5NF address rare edge cases most systems never need.", topic: "Databases", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Normalization",
    sections: [
      { heading: "Core idea", items: ["Store each fact exactly once", "Split data into related tables + foreign keys", "Prevents update/insert/delete anomalies"] },
      { heading: "Normal forms", items: ["1NF: atomic column values", "2NF: non-key col depends on whole key", "3NF: non-key col depends only on key"] },
      { heading: "Cost", items: ["More tables → more joins for reads", "Can hurt read performance at scale"] },
      { heading: "Practice", items: ["3NF is a solid default", "Normalize source of truth", "Denormalize specific read paths only when measured"] },
    ],
  },

  speedNotes: [
    "Normalization = store each fact once, prevent update anomalies.",
    "1NF: atomic values. 2NF: depend on whole key. 3NF: depend only on key.",
    "It's a correctness concern, not a performance optimization.",
    "Cost: more joins needed for reads as tables split further.",
    "3NF is the practical default; denormalize specific paths only when measured.",
  ],
};
