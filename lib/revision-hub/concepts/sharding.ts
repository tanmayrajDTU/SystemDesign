import type { ConceptRevisionContent } from "./types";

export const sharding: ConceptRevisionContent = {
  slug: "sharding",
  title: "Sharding",
  topic: "Databases",
  difficulty: "Advanced",
  estimatedMinutes: 14,

  docLinks: [
    { label: "Sharding", href: "/docs/databases/sharding" },
    { label: "Partitioning", href: "/docs/databases/partitioning" },
    { label: "Consistent Hashing", href: "/docs/distributed-systems/consistent-hashing" },
  ],

  summary: [
    "Sharding (horizontal partitioning) splits a database's data across multiple independent machines, each holding a subset based on a shard key, scaling write throughput and total storage past what one machine can handle.",
    "It solves a different problem than replication: replicas each hold the full dataset and don't help write throughput, since all writes still funnel through one primary — sharding gives each shard only a fraction of the data and load.",
    "The shard key choice is the single highest-stakes decision: a poor one creates 'hot shards' (disproportionate load on one shard) and is very expensive to correct later.",
    "Cross-shard queries and joins become genuinely harder — a query spanning shards needs application code to query multiple shards and combine results, since it's no longer one simple query.",
    "Resharding (changing the number of shards later) is the hardest operational problem; naive hash sharding (hash(key) % N) remaps almost all keys when N changes, which is why consistent hashing is often used instead.",
    "It's widely considered one of the most operationally complex techniques in system design — most teams should exhaust vertical scaling, read replicas, and caching before reaching for it.",
  ],

  whyAsked: [
    "It's a strong signal of design maturity — interviewers check whether a candidate reaches for sharding only once simpler options are genuinely insufficient, not as a reflexive 'scale = shard' answer.",
    "The shard-key trade-off (hot shards vs. cross-shard queries) is where real design judgment shows, since there's no universally right key — it depends on access patterns.",
    "Resharding is a common, deliberately hard follow-up to see if a candidate anticipates a problem most people only discover in production.",
  ],

  thirtySecondAnswer:
    "Sharding splits a database's data across multiple independent machines, each holding a subset determined by a shard key, so that write throughput and total storage can scale past what any single machine could handle. It solves a fundamentally different problem than replication: replicas each hold a full copy of the data and still funnel all writes through one primary, while sharding gives each shard only a fraction of both the data and the write load. The real cost is genuine operational complexity — cross-shard queries and joins require querying multiple shards and combining results in application code instead of one simple query, a poorly chosen shard key creates 'hot shards' that get disproportionate load, and resharding (changing the shard count later) is expensive and risky unless you've planned for it, typically via consistent hashing to minimize how much data has to move. Because of this cost, most teams should exhaust vertical scaling, read replicas, and caching before reaching for sharding at all.",

  detailedAnswer: [
    "Splits data across multiple machines (shards) based on a shard key, scaling write throughput and total storage past a single machine's ceiling.",
    "Different from replication: shards each hold a subset of data (splitting the write load), while replicas each hold the full dataset (not helping writes at all).",
    "Shard key choice has long-lasting consequences — range-based, hash-based, and directory-based strategies each trade off hot-spot risk against range-query friendliness and flexibility.",
    "Cross-shard queries/joins and multi-shard transactions lose the simple guarantees a single-database query or ACID transaction provides.",
    "Resharding (adding shards later) is the hardest part — naive hash(key) % N remaps almost everything; consistent hashing minimizes data movement when the shard count changes.",
    "Should be adopted only once simpler techniques (vertical scaling, read replicas, caching) are measurably insufficient, given its real operational cost.",
  ],

  questions: [
    { id: "shard-q1", question: "What is sharding, in one sentence?", answer: "Splitting a database's data across multiple independent machines, each holding a subset based on a shard key, to scale write throughput and storage past a single machine's limits.", topic: "Databases", difficulty: "Beginner" },
    { id: "shard-q2", question: "What's the key difference between sharding and replication?", answer: "Replication keeps full copies of the same data on multiple machines (scaling reads, not writes, since all writes still go through one primary); sharding splits the data itself across machines, so each machine handles only a fraction of the writes and total data.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q3", question: "What is a shard key?", answer: "The column (or hash of a column) that determines which shard a given row lives on.", topic: "Databases", difficulty: "Beginner" },
    { id: "shard-q4", question: "What's the trade-off of range-based sharding?", answer: "Simple and naturally supports range queries, but can create 'hot' shards if certain ranges are accessed far more than others.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q5", question: "What's the trade-off of hash-based sharding?", answer: "Spreads data more evenly (avoiding hot spots), but makes range queries (e.g. 'all users created this month') much harder, since consecutive keys no longer live on the same shard.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q6", question: "What is directory-based sharding?", answer: "A separate lookup service explicitly maps each key to its shard — flexible (shards can be reassigned individually), but adds an extra lookup hop and a new critical dependency.", topic: "Databases", difficulty: "Advanced" },
    { id: "shard-q7", question: "What is a 'hot shard'?", answer: "A shard that ends up with disproportionately more data or traffic than others, usually due to a poorly chosen shard key (e.g. sharding by a celebrity's user ID overloading one specific shard).", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q8", question: "Why do cross-shard queries become much harder after sharding?", answer: "A query needing data spread across multiple shards can no longer be one simple query — it requires querying multiple shards individually and combining results in application code.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q9", question: "What happens to transactions that span multiple shards?", answer: "They lose the simple guarantees a single-database ACID transaction would provide, since coordinating a transaction across independent machines is a much harder distributed-systems problem.", topic: "Databases", difficulty: "Advanced" },
    { id: "shard-q10", question: "Why is resharding considered the hardest part of sharding?", answer: "Adding more shards later, especially with naive hash(key) % N sharding, requires remapping almost all keys when N changes, causing massive data movement.", topic: "Databases", difficulty: "Advanced" },
    { id: "shard-q11", question: "How does consistent hashing help with resharding?", answer: "It minimizes how much data needs to move when the shard count changes, unlike naive modulo-based hash sharding which remaps nearly everything.", topic: "Databases", difficulty: "Advanced" },
    { id: "shard-q12", question: "When should you actually reach for sharding?", answer: "Once write throughput or total data volume genuinely exceeds what a single, well-tuned (possibly vertically scaled, with read replicas and caching) machine can handle — not before.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q13", question: "What's a common mistake when choosing a shard key?", answer: "Choosing it based on convenience rather than actual query and load patterns, leading to hot shards or constant, painful cross-shard queries.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q14", question: "Why do most teams need to exhaust simpler options before sharding?", answer: "Sharding is one of the more operationally complex techniques in system design, and a poor shard key choice is very expensive to correct later — it should only be adopted once it's genuinely needed.", topic: "Databases", difficulty: "Advanced" },
    { id: "shard-q15", question: "What's a real production example of sharding?", answer: "Instagram sharded their Postgres database by user ID to scale past a single instance's limits, using directory-based logical shard mapping for flexibility in reassigning shards to physical machines over time.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q16", question: "Does sharding help with read scaling too?", answer: "Indirectly — each shard has less total data and load to handle, which can help reads too, but read replicas are the more direct, purpose-built tool for read scaling specifically.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q17", question: "What's the relationship between sharding and partitioning?", answer: "Sharding is horizontal partitioning specifically across multiple machines; partitioning is the more general concept and can also happen within a single machine.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-q18", question: "How would you explain sharding using a library analogy?", answer: "Like a library outgrowing one building and opening branch libraries, each holding a specific range of the collection (e.g. by author's last name) — anyone looking for a book needs to know which branch to visit, just as a shard router needs the shard key to find the right machine.", topic: "Databases", difficulty: "Beginner" },
    { id: "shard-q19", question: "Why is it risky to sharding significantly earlier than needed?", answer: "It adds substantial, ongoing operational complexity (routing layer, harder queries, rebalancing risk) for no real benefit if a single well-tuned database with replicas and caching could have handled the load for a long time.", topic: "Databases", difficulty: "Advanced" },
    { id: "shard-q20", question: "What should you plan for from the start when designing a sharded system?", answer: "How resharding will work later (e.g. via consistent hashing or a flexible directory-based mapping), rather than assuming the initial shard count will be permanent.", topic: "Databases", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"How would you choose a shard key for this system, and what could go wrong with that choice?\"",
    "\"How would a query needing data from multiple shards work, and what does that cost compared to a single-database query?\"",
    "\"How would you add more shards later without an enormous, risky data migration?\"",
  ],

  commonMistakes: [
    "Choosing a shard key based on convenience rather than actual query and load patterns.",
    "Sharding far earlier than necessary, before simpler techniques have been exhausted.",
    "Not planning for resharding from the start, making it painfully expensive to add capacity later.",
  ],

  interviewTraps: [
    "\"We need to scale, so let's shard\" without first ruling out vertical scaling, replicas, and caching is a trap most interviewers are listening for.",
    "Being asked what happens to a cross-shard transaction is testing whether you know it loses single-database ACID guarantees, not that it 'just works'.",
  ],

  tradeoffs: [
    "Scales write throughput and storage past a single machine vs. much harder cross-shard queries, joins, and multi-shard transactions.",
    "Hash-based sharding avoids hot shards but breaks range queries; range-based sharding keeps range queries natural but risks hot shards.",
  ],

  comparisonTable: {
    title: "Sharding vs Replication",
    columns: ["Sharding", "Replication"],
    rows: [
      { label: "Splits or copies data?", values: ["Splits — each shard has a subset", "Copies — each replica has the full dataset"] },
      { label: "Scales", values: ["Write throughput and total storage", "Read throughput; availability/durability"] },
      { label: "Query complexity", values: ["Cross-shard queries/joins are hard", "Any replica can answer any query alone"] },
      { label: "Operational risk", values: ["Hot shards, resharding, cross-shard transactions", "Replication lag, failover coordination"] },
    ],
  },

  memoryTrick:
    "\"Sharding splits the books across branch libraries.\" Each branch (shard) holds only its slice of the collection — great for spreading load, but you now need to know which branch has what you're looking for.",

  realWorldExamples: [
    "Instagram sharded their Postgres database by user ID with directory-based logical shard mapping to scale past a single instance's limits.",
    "A large-scale user database sharded by hash(user_id) spreads load evenly, at the cost of no longer being able to efficiently query 'all users in alphabetical order' as one simple query.",
  ],

  mermaidDiagram: `flowchart TD
    App[Application] --> Router[Shard Router]
    Router -->|user_id 1-1M| S1[(Shard 1)]
    Router -->|user_id 1M-2M| S2[(Shard 2)]
    Router -->|user_id 2M-3M| S3[(Shard 3)]`,

  flashcards: [
    { id: "shard-fc1", front: "Sharding — one-line definition", back: "Splitting a database's data across multiple machines by a shard key, to scale writes and storage past one machine's limits.", topic: "Databases", difficulty: "Beginner" },
    { id: "shard-fc2", front: "Sharding vs replication", back: "Sharding splits data across machines (scales writes); replication copies full data across machines (scales reads).", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-fc3", front: "Hot shard", back: "A shard with disproportionate load/data, usually from a poorly chosen shard key.", topic: "Databases", difficulty: "Intermediate" },
    { id: "shard-fc4", front: "Why is resharding hard?", back: "Naive hash(key) % N remaps nearly all keys when N changes — consistent hashing minimizes this.", topic: "Databases", difficulty: "Advanced" },
    { id: "shard-fc5", front: "When to shard", back: "Only once write throughput/storage genuinely exceeds a single machine's limits, after exhausting simpler options.", topic: "Databases", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Sharding",
    sections: [
      { heading: "Strategies", items: ["Range-based — simple, hot-shard risk", "Hash-based — even spread, loses range queries", "Directory-based — flexible, extra lookup hop"] },
      { heading: "Costs", items: ["Cross-shard queries/joins are hard", "Multi-shard transactions lose ACID simplicity", "Hot shards from poor key choice", "Resharding is expensive without planning"] },
      { heading: "Fix for resharding", items: ["Consistent hashing — minimizes data movement"] },
      { heading: "Adopt only after", items: ["Vertical scaling exhausted", "Read replicas + caching exhausted"] },
    ],
  },

  speedNotes: [
    "Sharding = split data across machines by shard key.",
    "Scales writes/storage — different from replication (scales reads).",
    "Shard key choice is high-stakes: hot shards if chosen poorly.",
    "Cross-shard queries/transactions lose single-DB simplicity.",
    "Resharding is hard — plan with consistent hashing from the start.",
  ],
};
