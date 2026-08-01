import type { ConceptRevisionContent } from "./types";

export const nosql: ConceptRevisionContent = {
  slug: "nosql",
  title: "NoSQL",
  topic: "Databases",
  difficulty: "Beginner",
  estimatedMinutes: 12,

  docLinks: [
    { label: "NoSQL", href: "/docs/databases/nosql" },
    { label: "SQL", href: "/docs/databases/sql" },
    { label: "BASE", href: "/docs/databases/base" },
  ],

  summary: [
    "NoSQL (\"not only SQL\") is an umbrella term for non-relational databases — it's not one data model, but four genuinely different ones: document, key-value, column-family, and graph.",
    "Each model targets a different access pattern: document for flexible nested entities, key-value for extremely fast simple lookups, column-family for huge sparse tables, graph for relationship-heavy data.",
    "NoSQL systems generally trade away relational rigor — fixed schema, general-purpose joins, and often strong consistency — in exchange for easier horizontal scaling or a more natural fit to a specific data shape.",
    "Many NoSQL databases were designed from the ground up around partitioning (sharding) and eventual consistency, which is exactly why they scale horizontally more naturally than relational databases retrofitted for it.",
    "The relaxed consistency many NoSQL stores default to is formalized as BASE, the deliberate alternative philosophy to ACID's strong guarantees.",
    "Choosing NoSQL 'because it scales better' without matching the specific model to the actual access pattern is the most common way teams get worse results than a relational database would have given them.",
  ],

  whyAsked: [
    "Interviewers use it to check whether you know NoSQL isn't one thing — picking the right sub-model (document vs key-value vs column-family vs graph) for a stated access pattern is the real signal.",
    "It probes whether you understand what's actually being traded away (joins, schema enforcement, strong consistency) rather than treating NoSQL as a free scalability upgrade.",
    "It's a natural setup for CAP/BASE discussion — testing whether you connect the data-model choice to its consistency/availability consequences.",
  ],

  thirtySecondAnswer:
    "NoSQL is an umbrella term for non-relational databases, and it's important to be precise that it covers four genuinely different data models — document stores like MongoDB, key-value stores like Redis or DynamoDB, column-family stores like Cassandra, and graph databases like Neo4j — each optimized for a different access pattern rather than being one general-purpose alternative to relational databases. They generally trade away relational rigor: no fixed schema, no general-purpose joins across arbitrary tables, and often relaxed (eventual) consistency instead of strong guarantees, in exchange for horizontal scalability and a more natural fit to a specific data shape. Many NoSQL systems were designed from day one around partitioning data across nodes and tolerating eventual consistency, which is exactly why they scale out more naturally than a relational database that was built assuming a single, strongly consistent instance. The real skill in an interview isn't knowing NoSQL exists — it's picking the specific model that matches the actual access pattern, since a document store used like a relational database (constantly needing application-level joins) fights against its own design.",

  detailedAnswer: [
    "Four distinct models, not one: document (nested JSON-like entities), key-value (simplest, fastest lookups), column-family (wide, sparse tables at huge scale), graph (relationship-centric data).",
    "Document stores bundle related data together (a user with their recent orders in one document), avoiding joins for common queries — at the cost of duplication and awkwardness querying that embedded data independently at scale.",
    "Horizontal scaling is often a first-class design goal: avoiding cross-node joins and relaxing strict consistency lets data be partitioned across many nodes more straightforwardly than a join-heavy relational model.",
    "Weaker (or absent) general-purpose ad-hoc querying/joins compared to SQL — document/key-value structures should be designed around known query patterns up front, not queried flexibly after the fact.",
    "Consistency is often relaxed by default (eventual consistency, formalized as BASE) — the application must be designed to tolerate and reason about temporarily stale or divergent reads.",
    "Picking the wrong sub-model for the actual access pattern (e.g. a document store fighting constant need for cross-document joins) is the most common practical failure mode.",
  ],

  questions: [
    { id: "nosql-q1", question: "What does NoSQL stand for, and what does it actually cover?", answer: "\"Not only SQL\" — an umbrella term for non-relational databases covering four genuinely different data models: document, key-value, column-family, and graph.", topic: "Databases", difficulty: "Beginner" },
    { id: "nosql-q2", question: "What are the four main NoSQL data models, with an example database for each?", answer: "Document (MongoDB), key-value (Redis, DynamoDB), column-family (Cassandra, HBase), and graph (Neo4j).", topic: "Databases", difficulty: "Beginner" },
    { id: "nosql-q3", question: "What is a document database optimized for?", answer: "Storing flexible, often nested JSON-like documents, where a common entity and its closely related data are bundled together, avoiding a join for typical reads.", topic: "Databases", difficulty: "Beginner" },
    { id: "nosql-q4", question: "What is a key-value store optimized for?", answer: "The simplest possible model — a key maps to an opaque value — optimized for extremely fast, simple lookups; used heavily for caching and session storage.", topic: "Databases", difficulty: "Beginner" },
    { id: "nosql-q5", question: "What is a column-family store optimized for?", answer: "Very wide, often sparse tables at huge scale — e.g. time-series or IoT sensor data — where different rows can have very different sets of populated columns.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q6", question: "What is a graph database optimized for?", answer: "Data that's primarily about relationships/connections between entities — social networks, recommendation engines, fraud detection.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q7", question: "Why do many NoSQL databases scale horizontally more easily than relational databases?", answer: "They're often designed from the ground up around partitioning (sharding) and avoid cross-node joins, since a document typically contains everything needed for a common query — relational databases, built around join-heavy queries, are harder to partition this cleanly.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q8", question: "What consistency model do many NoSQL databases default to, and what does that require of the application?", answer: "Eventual consistency (formalized as BASE) — the application must be designed to tolerate brief windows where different replicas might return different, possibly stale answers.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q9", question: "What's the trade-off of embedding related data in a single document, versus normalizing it across tables?", answer: "Embedding avoids a join for the common case (fetching an entity with its closely related data in one read), but makes independently querying that embedded data at scale (e.g. 'all orders over $1000 across all users') more awkward.", topic: "Databases", difficulty: "Advanced" },
    { id: "nosql-q10", question: "Why is 'NoSQL is more scalable, so let's use it' considered a common mistake?", answer: "It skips evaluating whether the actual data and access pattern fit any specific NoSQL model at all — choosing NoSQL without matching the model to the real query pattern often produces worse results than a well-indexed relational database.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q11", question: "What happens when a document store is used like a relational database?", answer: "It fights against its own design — needing constant application-level 'joins' (multiple round trips to stitch together related documents) that a relational database would have handled natively and efficiently.", topic: "Databases", difficulty: "Advanced" },
    { id: "nosql-q12", question: "When would a graph database be the right choice over a document or relational database?", answer: "When the core problem is fundamentally about relationships/connections between entities — like traversing a social graph or computing recommendations — where relational joins or repeated document lookups would be comparatively awkward and slow.", topic: "Databases", difficulty: "Advanced" },
    { id: "nosql-q13", question: "Why might a column-family store be preferred for IoT sensor data?", answer: "It's optimized for extremely wide, sparse tables at huge scale with high write throughput, which matches the shape of time-series sensor readings far better than a relational schema designed around fixed columns per row.", topic: "Databases", difficulty: "Advanced" },
    { id: "nosql-q14", question: "How does schema flexibility in a document database become a liability?", answer: "Without discipline, documents in the same collection can drift into inconsistent shapes over time, creating real maintenance headaches when application code has to handle many subtly different document structures.", topic: "Databases", difficulty: "Advanced" },
    { id: "nosql-q15", question: "Why is DynamoDB a good fit for Amazon's shopping cart use case?", answer: "It's designed around BASE principles, prioritizing the cart always being available to add to over the cart being perfectly, immediately consistent across every replica — a stale-but-available cart is a better customer experience than an unavailable one.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q16", question: "What's the key difference between designing queries for SQL vs for a key-value or document store?", answer: "SQL supports flexible, ad-hoc queries after the fact via joins/filters; key-value and document stores generally need the access pattern designed up front into the key/document structure, since they support far fewer flexible query capabilities.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q17", question: "When would a relational database still be a better fit than any NoSQL model?", answer: "For data with complex, evolving relationships that benefit from ad-hoc relational queries and strong consistency guarantees — financial ledgers or systems requiring multi-entity transactional integrity.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q18", question: "What's a common mistake in assuming 'all NoSQL databases make the same trade-offs'?", answer: "Document, key-value, column-family, and graph databases are genuinely different tools solving different problems — assuming they're interchangeable ignores that each is optimized for a distinct access pattern.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-q19", question: "How would you decide which specific NoSQL model fits a given problem?", answer: "Match the model to the actual access pattern: bundled, entity-shaped reads → document; simple fast lookups → key-value; huge sparse/high-write tables → column-family; relationship traversal → graph.", topic: "Databases", difficulty: "Advanced" },
    { id: "nosql-q20", question: "Summarize NoSQL in one sentence.", answer: "An umbrella term for four genuinely different non-relational data models — document, key-value, column-family, graph — each trading relational rigor (schema, joins, often strong consistency) for horizontal scale or a better fit to a specific access pattern.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Which specific NoSQL model fits this access pattern, and why?\"",
    "\"What are you giving up by choosing NoSQL here compared to a relational database?\"",
    "\"How would you handle the consistency model this NoSQL store gives you?\"",
  ],

  commonMistakes: [
    "Choosing NoSQL simply because 'it scales better' without evaluating whether the data and access pattern actually fit any specific NoSQL model.",
    "Using a document or key-value store like a relational database, ending up needing constant application-level joins.",
    "Assuming all NoSQL databases make the same trade-offs, when document, key-value, column-family, and graph stores are genuinely different tools.",
    "Not designing document/key structures around actual query patterns up front, then discovering the store can't support a needed query flexibly.",
  ],

  interviewTraps: [
    "\"Isn't NoSQL just more scalable?\" is testing whether you recognize scalability comes from matching a specific model to a specific access pattern, not from NoSQL as a blanket label.",
    "\"So NoSQL means no schema at all?\" is testing whether you know schema flexibility varies a lot by model and still requires discipline to avoid drift.",
  ],

  tradeoffs: [
    "Schema flexibility and natural horizontal scaling vs. weaker general-purpose querying and often relaxed consistency.",
    "Bundling related data for fast entity-shaped reads vs. awkwardness querying that embedded data independently at scale.",
    "Four genuinely different models mean the right choice depends entirely on matching model to access pattern, not a single NoSQL-vs-SQL binary.",
  ],

  comparisonTable: {
    title: "NoSQL vs SQL",
    columns: ["NoSQL", "SQL (Relational)"],
    rows: [
      { label: "Data models", values: ["Document, key-value, column-family, graph", "Single relational model"] },
      { label: "Schema", values: ["Flexible / schema-less", "Fixed, enforced"] },
      { label: "Queries", values: ["Access-pattern-specific, less ad-hoc", "Rich, flexible joins/aggregations"] },
      { label: "Consistency", values: ["Often eventual (BASE)", "Strong (ACID)"] },
      { label: "Scaling", values: ["Horizontal scale often built-in", "Requires deliberate sharding"] },
      { label: "Best fit", values: ["Matches a specific access pattern at scale", "Structured, related data needing integrity"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "nosql-root",
    question: "What's the primary access pattern for this data?",
    options: [
      {
        label: "Fetch one entity with its closely related data bundled together",
        next: {
          kind: "result",
          id: "nosql-document",
          result: "A document database is likely the best fit.",
          rationale: "Embedding related data avoids joins for the common case, and schema flexibility suits variable/nested entity shapes.",
        },
      },
      {
        label: "Extremely fast, simple key lookups (caching, sessions)",
        next: {
          kind: "result",
          id: "nosql-kv",
          result: "A key-value store is the best fit.",
          rationale: "The simplest possible model — key maps to value — is optimized purely for lookup speed at scale.",
        },
      },
      {
        label: "Huge, sparse, high-write-volume tables (time-series, IoT)",
        next: {
          kind: "result",
          id: "nosql-columnfamily",
          result: "A column-family store is the best fit.",
          rationale: "Designed for very wide, sparse tables at huge scale with high write throughput, unlike a fixed relational schema.",
        },
      },
      {
        label: "Data primarily about relationships/connections between entities",
        next: {
          kind: "result",
          id: "nosql-graph",
          result: "A graph database is the best fit.",
          rationale: "Relationship traversal (social graphs, recommendations, fraud detection) is what graph databases are purpose-built for.",
        },
      },
    ],
  },

  memoryTrick:
    "\"NoSQL is four tools, not one.\" Document, key-value, column-family, graph — say which one you mean, or you haven't really answered the question.",

  realWorldExamples: [
    "Amazon's DynamoDB (key-value/document hybrid) powers their shopping cart service, deliberately trading strict consistency for always-on availability at massive scale.",
    "A product catalog with highly variable attributes per category (a shirt has size/color, a laptop has RAM/storage) is a natural fit for a document database, where each product document holds whatever attributes are relevant.",
  ],

  mermaidDiagram: `flowchart LR
    Client --> Router[Partition Router]
    Router -->|hash of key| N1[Node 1]
    Router -->|hash of key| N2[Node 2]
    Router -->|hash of key| N3[Node 3]`,

  flashcards: [
    { id: "nosql-fc1", front: "NoSQL — one-line definition", back: "An umbrella term for non-relational databases covering four distinct models: document, key-value, column-family, graph.", topic: "Databases", difficulty: "Beginner" },
    { id: "nosql-fc2", front: "The four NoSQL models + one example each", back: "Document (MongoDB), key-value (Redis/DynamoDB), column-family (Cassandra), graph (Neo4j).", topic: "Databases", difficulty: "Beginner" },
    { id: "nosql-fc3", front: "Why do NoSQL stores often scale horizontally more easily?", back: "Designed from the start around partitioning and avoiding cross-node joins, unlike relational databases built around join-heavy queries.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-fc4", front: "Most common NoSQL mistake", back: "Choosing it just because 'it scales' without matching the specific model to the actual access pattern.", topic: "Databases", difficulty: "Intermediate" },
    { id: "nosql-fc5", front: "NoSQL's default consistency model", back: "Often eventual consistency (BASE) — the application must tolerate brief staleness/divergence across replicas.", topic: "Databases", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "NoSQL",
    sections: [
      { heading: "Four models", items: ["Document: nested, entity-shaped (MongoDB)", "Key-value: fastest lookups (Redis, DynamoDB)", "Column-family: huge sparse tables (Cassandra)", "Graph: relationships (Neo4j)"] },
      { heading: "Trades away", items: ["Fixed schema", "General-purpose joins", "Often strong consistency (→ BASE)"] },
      { heading: "Gains", items: ["Horizontal scale, often built-in", "Natural fit to specific access patterns", "Schema flexibility"] },
      { heading: "Watch for", items: ["Wrong model for the access pattern", "Document store used like relational DB", "Undisciplined schema drift"] },
    ],
  },

  speedNotes: [
    "NoSQL = 4 models, not 1: document, key-value, column-family, graph.",
    "Trades schema/joins/strong consistency for scale + access-pattern fit.",
    "Design keys/documents around known query patterns up front.",
    "Default consistency is often eventual (BASE), not strong.",
    "Pick the model matching the access pattern — not 'NoSQL' as a blanket choice.",
  ],
};
