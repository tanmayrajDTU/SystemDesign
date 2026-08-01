import type { ConceptRevisionContent } from "./types";

export const acid: ConceptRevisionContent = {
  slug: "acid",
  title: "ACID",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "ACID", href: "/docs/databases/acid" },
    { label: "BASE", href: "/docs/databases/base" },
    { label: "SQL", href: "/docs/databases/sql" },
  ],

  summary: [
    "ACID (Atomicity, Consistency, Isolation, Durability) is the set of guarantees a database transaction provides so multi-step operations can't leave data in a corrupted, partially-applied state.",
    "Atomicity: all-or-nothing. Consistency: valid state to valid state (application-defined rules/constraints). Isolation: concurrent transactions behave as if run one at a time. Durability: once committed, survives a crash.",
    "Isolation is actually a spectrum, not one guarantee — Read Uncommitted through Serializable — because full isolation is expensive, so most production systems default to Read Committed and opt into stricter levels only where truly needed.",
    "Durability is typically achieved via a write-ahead log (WAL): changes are durably logged before being acknowledged as committed, so a crash can be recovered from by replaying the log.",
    "ACID transactions within a single database are mature, well-understood technology; ACID-like guarantees across multiple independently-owned databases (as in microservices) are a much harder distributed-systems problem, generally solved with different patterns (Saga, two-phase commit).",
    "A frequent point of confusion: 'Consistency' in ACID (respecting application-defined constraints) is a different concept from 'Consistency' in the CAP theorem (replicas agreeing on the latest value) — same word, different meaning.",
  ],

  whyAsked: [
    "It tests whether you can precisely explain each of the four letters and what specifically breaks when one is missing, not just recite the acronym.",
    "Isolation levels are a favorite follow-up because they reveal whether you understand the actual performance/correctness spectrum, not just 'isolation = good.'",
    "The ACID-across-microservices question tests whether you know single-database ACID doesn't automatically extend to distributed transactions, and that patterns like Saga exist specifically to address that gap.",
  ],

  thirtySecondAnswer:
    "ACID is an acronym for the four guarantees a database transaction provides: Atomicity, meaning a transaction's operations either all succeed or none do; Consistency, meaning a transaction takes the database from one valid state to another, respecting all defined rules and constraints; Isolation, meaning concurrent transactions behave as if they ran one at a time even though they may run simultaneously; and Durability, meaning once a transaction is confirmed committed, it survives a subsequent crash. Isolation in particular is a spectrum rather than one fixed guarantee — levels range from Read Uncommitted up to Serializable, because full isolation costs real concurrency, so most production systems default to Read Committed and reach for stronger levels only for operations that genuinely need them. Durability is typically implemented via a write-ahead log: changes are durably logged before being acknowledged, so a crash can be recovered from by replaying the log to reconstruct the correct state. The important caveat is that ACID guarantees are well-understood within a single database, but don't automatically extend across multiple independently-owned databases, as in a microservices architecture — that's a harder distributed problem usually solved with different patterns like the Saga pattern rather than a direct extension of single-database ACID.",

  detailedAnswer: [
    "Atomicity: all operations in a transaction succeed together or are fully rolled back — no partial completion, even across a crash mid-transaction.",
    "Consistency: a transaction moves the database from one valid state to another, respecting application-defined constraints (foreign keys, uniqueness) — distinct from CAP's use of 'consistency' (replica agreement).",
    "Isolation: a spectrum (Read Uncommitted → Read Committed → Repeatable Read → Serializable), trading concurrency/performance for stronger guarantees against concurrent-transaction anomalies.",
    "Durability: implemented via a write-ahead log — changes are durably persisted before commit is acknowledged, so recovery can replay the log after a crash.",
    "Real cost: stronger isolation/durability means more locking and logging, reducing raw throughput — the trade-off is tuned per operation, not applied uniformly at the strongest setting everywhere.",
    "Scope limit: ACID is a well-solved problem within a single database; achieving similar guarantees across multiple, separately-owned databases (microservices) requires different distributed-transaction patterns (Saga, two-phase commit), not a direct extension.",
  ],

  questions: [
    { id: "acid-q1", question: "What does each letter in ACID stand for?", answer: "Atomicity (all-or-nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't interfere), Durability (survives a crash once committed).", topic: "Databases", difficulty: "Beginner" },
    { id: "acid-q2", question: "What does Atomicity guarantee if a transaction fails halfway through?", answer: "The entire transaction is rolled back as if it never started — none of its partial changes are kept, even if a crash happens between two of its operations.", topic: "Databases", difficulty: "Beginner" },
    { id: "acid-q3", question: "What does 'Consistency' mean specifically in ACID?", answer: "A transaction takes the database from one valid state to another, respecting all application-defined rules and constraints (foreign keys, uniqueness) — not to be confused with CAP's 'consistency' (replicas agreeing on a value).", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-q4", question: "What does Isolation guarantee, and is it actually one fixed guarantee?", answer: "It guarantees concurrent transactions behave as if run one at a time — but it's actually a spectrum of levels (Read Uncommitted through Serializable), not a single fixed guarantee, because full isolation is expensive.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-q5", question: "List the four common isolation levels from weakest to strongest.", answer: "Read Uncommitted, Read Committed, Repeatable Read, Serializable.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-q6", question: "What is a 'dirty read', and which isolation level allows it?", answer: "Reading another transaction's uncommitted changes; Read Uncommitted allows this, and Read Committed and above prevent it.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-q7", question: "What is a 'non-repeatable read', and which isolation level prevents it?", answer: "A value changing between two reads within the same transaction because another transaction committed a change in between; Repeatable Read (and Serializable) prevent this.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-q8", question: "What isolation level do most production systems default to, and why?", answer: "Read Committed — a practical middle ground, since Serializable's strongest guarantee usually requires more locking or conflict detection, reducing concurrency, and most operations don't actually need full serializability.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-q9", question: "How is Durability typically achieved at the implementation level?", answer: "Via a write-ahead log (WAL): changes are written to a durable, sequential log before being acknowledged as committed, so the database can replay the log on recovery to reconstruct the correct state after a crash.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-q10", question: "If a database crashes right after a WAL write but before applying changes to the main data files, is the transaction lost?", answer: "No — because the WAL entry was durably persisted before commit was acknowledged, recovery replays the log to reapply the change, so durability holds even though the main data files hadn't been updated yet.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-q11", question: "Why doesn't ACID automatically extend across multiple microservices, each with its own database?", answer: "ACID transactions are guaranteed within a single database's transaction boundary; coordinating an all-or-nothing outcome across multiple independently-owned databases is a genuinely harder distributed-systems problem requiring separate patterns.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-q12", question: "What pattern is commonly used to achieve transaction-like behavior across multiple microservices?", answer: "The Saga pattern — a sequence of local transactions, each with a corresponding compensating action to undo it if a later step in the sequence fails.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-q13", question: "What's the real cost of choosing the strongest isolation level (Serializable) everywhere?", answer: "More locking or conflict detection overhead, which reduces concurrency and throughput — often an unnecessary cost for operations that never actually needed protection against every possible anomaly.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-q14", question: "Give a concrete example where Atomicity prevents a real business bug.", answer: "A bank transfer debiting Account A and crediting Account B — Atomicity guarantees both happen or neither does, never a state where money vanished from A but never arrived at B.", topic: "Databases", difficulty: "Beginner" },
    { id: "acid-q15", question: "What kinds of workloads are good candidates for relying heavily on ACID guarantees?", answer: "Financial transactions, inventory management, and booking systems — anywhere a partially-completed operation or a lost concurrent update causes real business or safety harm.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-q16", question: "What kinds of workloads can reasonably accept weaker-than-ACID guarantees?", answer: "High-throughput analytics or logging systems, where occasional minor inconsistency is a non-issue and the performance cost of strict ACID isn't justified.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-q17", question: "What's a common mistake regarding ACID and microservices?", answer: "Assuming ACID transactions automatically extend across service/database boundaries — they don't, without an additional distributed transaction pattern like Saga or two-phase commit.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-q18", question: "Why can 'Consistency' in ACID be a confusing term in a system design interview?", answer: "It refers to application-defined validity rules (constraints being satisfied), which is a different concept from 'consistency' in the CAP theorem, referring to replicas agreeing on the most recent value — the same word means two different things.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-q19", question: "How would you decide which isolation level to use for a specific operation?", answer: "Base it on the actual correctness needs of that operation — use a stronger level only where a specific anomaly (dirty read, non-repeatable read) would cause a real problem, rather than defaulting everywhere to the strongest or weakest option.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-q20", question: "Summarize ACID in one sentence.", answer: "The four guarantees — Atomicity, Consistency, Isolation, Durability — that a database transaction provides to prevent partial writes, invalid states, concurrent interference, and data loss on crash, at a real, tunable performance cost.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Walk me through what atomicity actually guarantees if a transaction fails halfway through.\"",
    "\"What's the trade-off between different isolation levels?\"",
    "\"How would you achieve transaction-like guarantees across multiple microservices, each with its own database?\"",
  ],

  commonMistakes: [
    "Assuming ACID transactions automatically extend across multiple databases or microservices — they generally don't without additional distributed transaction patterns.",
    "Using Serializable isolation everywhere 'to be safe,' paying a real throughput cost even where a weaker level would have sufficed.",
    "Confusing ACID's 'Consistency' (application-defined validity rules) with CAP's 'consistency' (replica agreement) — same word, genuinely different meaning.",
    "Treating isolation as a single on/off guarantee rather than a tunable spectrum of levels.",
  ],

  interviewTraps: [
    "\"What does the C in ACID stand for?\" is often a setup to test whether you conflate it with CAP's consistency — naming the distinction explicitly is a strong signal.",
    "\"How would you scale ACID transactions across microservices?\" is testing whether you reach for Saga/two-phase-commit rather than assuming single-database ACID just extends outward.",
  ],

  tradeoffs: [
    "Stronger isolation (especially Serializable) costs throughput and concurrency; weaker levels allow more concurrent throughput at the risk of specific, well-understood anomalies.",
    "ACID removes a large class of correctness bugs from application code, at the cost of real, tunable performance overhead (locking, logging).",
    "Single-database ACID is mature and well-understood; cross-service ACID-like guarantees require fundamentally different (harder) distributed patterns.",
  ],

  comparisonTable: {
    title: "ACID vs BASE",
    columns: ["ACID", "BASE"],
    rows: [
      { label: "Priority", values: ["Strong consistency", "Availability"] },
      { label: "Consistency model", values: ["Immediate, strict", "Eventual"] },
      { label: "Typical scope", values: ["Single database, transactional", "Distributed, horizontally scaled"] },
      { label: "Cost", values: ["Locking, reduced concurrency", "Application-level conflict resolution"] },
      { label: "Best fit", values: ["Financial data, bookings, inventory", "Social counters, carts, catalogs"] },
      { label: "CAP leaning", values: ["CP (consistency over availability)", "AP (availability over consistency)"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "acid-root",
    question: "Would a brief window of inconsistency in this data cause real harm?",
    options: [
      {
        label: "Yes — financial, inventory, or safety-critical correctness",
        next: {
          kind: "result",
          id: "acid-pick",
          result: "Lean on strong ACID guarantees.",
          rationale: "The cost of a partial or inconsistent write (double-charging, overselling, lost transfer) far outweighs the throughput cost of strong transactional guarantees here.",
        },
      },
      {
        label: "No — brief staleness is a non-issue (counters, feeds, carts)",
        next: {
          kind: "result",
          id: "acid-base",
          result: "A BASE-oriented, eventually consistent store is a reasonable trade.",
          rationale: "Accepting brief inconsistency buys higher availability and easier horizontal scaling where correctness isn't safety- or money-critical.",
        },
      },
    ],
  },

  memoryTrick:
    "\"A crash mid-transaction should look like it never happened.\" All four ACID letters exist to make that sentence true — atomically undone, still valid, isolated from onlookers, and durable once it did commit.",

  realWorldExamples: [
    "A hotel booking system uses a single ACID transaction to both mark a room as booked and charge the customer, so the two can never happen independently.",
    "PostgreSQL and MySQL (InnoDB) are widely chosen for financial and e-commerce systems specifically for their mature, well-tested ACID transaction support — Stripe's core ledger relies on exactly this.",
  ],

  mermaidDiagram: `flowchart LR
    A[Transaction commits] --> B["Write to write-ahead log (durable)"]
    B --> C[Acknowledge commit to client]
    C --> D["Apply changes to main data files (async)"]`,

  flashcards: [
    { id: "acid-fc1", front: "ACID — expand the acronym", back: "Atomicity, Consistency, Isolation, Durability.", topic: "Databases", difficulty: "Beginner" },
    { id: "acid-fc2", front: "Isolation levels, weakest to strongest", back: "Read Uncommitted → Read Committed → Repeatable Read → Serializable.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-fc3", front: "How is Durability actually implemented?", back: "Write-ahead log (WAL) — changes are durably logged before commit is acknowledged, so a crash can be recovered from by replaying the log.", topic: "Databases", difficulty: "Intermediate" },
    { id: "acid-fc4", front: "Does ACID extend across microservices automatically?", back: "No — cross-database transactional guarantees need separate patterns like Saga or two-phase commit.", topic: "Databases", difficulty: "Advanced" },
    { id: "acid-fc5", front: "ACID's 'Consistency' vs CAP's 'Consistency'", back: "ACID: application-defined validity rules are satisfied. CAP: replicas agree on the latest value. Same word, different meaning.", topic: "Databases", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "ACID",
    sections: [
      { heading: "The four letters", items: ["Atomicity: all-or-nothing", "Consistency: valid state → valid state", "Isolation: concurrent txns don't interfere", "Durability: survives a crash once committed"] },
      { heading: "Isolation levels", items: ["Read Uncommitted (weakest)", "Read Committed (common default)", "Repeatable Read", "Serializable (strongest, most costly)"] },
      { heading: "Durability mechanism", items: ["Write-ahead log (WAL)", "Log durably written before ack", "Replay log on recovery"] },
      { heading: "Watch for", items: ["Doesn't extend across microservices automatically", "Serializable-everywhere hurts throughput", "ACID's 'C' ≠ CAP's 'C'"] },
    ],
  },

  speedNotes: [
    "ACID = Atomicity, Consistency, Isolation, Durability.",
    "Isolation is a spectrum: Read Uncommitted → Serializable.",
    "Durability via write-ahead log (WAL), replayed on crash recovery.",
    "Doesn't automatically extend across microservices — use Saga/2PC.",
    "ACID's 'Consistency' ≠ CAP's 'Consistency' — common confusion.",
  ],
};
