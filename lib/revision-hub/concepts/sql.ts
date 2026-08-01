import type { ConceptRevisionContent } from "./types";

export const sql: ConceptRevisionContent = {
  slug: "sql",
  title: "SQL",
  topic: "Databases",
  difficulty: "Beginner",
  estimatedMinutes: 12,

  docLinks: [
    { label: "SQL", href: "/docs/databases/sql" },
    { label: "NoSQL", href: "/docs/databases/nosql" },
    { label: "ACID", href: "/docs/databases/acid" },
  ],

  summary: [
    "SQL (Structured Query Language) is the standard language for relational databases — data lives in tables with predefined schemas, related to each other via foreign keys, queried declaratively (joins, filters, aggregations).",
    "\"SQL database\" and \"relational database\" are used almost interchangeably — SQL is the query language, but the term signals the whole relational model behind it.",
    "The core value is enforced structure: the database itself enforces schema, foreign keys, and constraints, so correctness doesn't rest entirely on application code getting it right every time.",
    "Relational databases pair naturally with ACID transactions — strong consistency and integrity guarantees are a first-class feature, not something bolted on.",
    "The main cost is that a fixed schema requires explicit migrations to change, and horizontal write scaling (sharding across many machines) is harder than it is for systems designed around it from the start.",
    "The query planner is what makes SQL declarative — you describe what data you want, not how to retrieve it, and the database decides the actual execution strategy (which indexes, which join order).",
  ],

  whyAsked: [
    "It's foundational data-modeling vocabulary — almost every system design problem eventually needs a data store, and SQL is the default lens for reasoning about structured, related data.",
    "Interviewers use it to see whether you understand what the database is actually buying you (integrity, joins, ACID) rather than just knowing the SELECT syntax.",
    "It sets up the SQL-vs-NoSQL trade-off discussion that tests whether you can match a data store to an access pattern instead of defaulting to whichever you're more familiar with.",
  ],

  thirtySecondAnswer:
    "SQL is the standard query language for relational databases, where data lives in structured tables with a fixed schema, and tables relate to each other through foreign keys. It's declarative — you describe what data you want via SELECT/JOIN/WHERE, and the database's query planner figures out the actual retrieval strategy, using indexes to avoid scanning entire tables. The real value of a relational database isn't just the query language — it's that the database itself enforces schema, foreign keys, and constraints, and pairs naturally with ACID transactions, pushing correctness guarantees into well-tested database internals instead of application code. The trade-off is that a fixed schema needs explicit migrations to evolve, and scaling write throughput horizontally (sharding across many machines) is a genuinely harder problem for relational databases than for systems designed around distribution from day one — which is exactly the gap many NoSQL systems were built to fill.",

  detailedAnswer: [
    "Core model: tables (rows + typed columns), primary keys (uniquely identify a row), foreign keys (reference another table's primary key, enforcing relational integrity), and joins (combine rows across tables).",
    "Declarative querying: SQL states what you want; the query planner decides how — index selection, join order, execution strategy — which is a big part of what makes relational databases powerful without hand-written retrieval logic.",
    "Schema enforcement happens at the database level: every row must match the table's column structure/types, and constraints (foreign key, unique, not-null) are enforced automatically, not left to application discipline.",
    "Pairs naturally with ACID transactions — multi-step operations (debit + credit, book + charge) get all-or-nothing guarantees directly from the database.",
    "Main structural cost: schema changes require explicit migrations, and horizontal write scaling (sharding) is a genuinely hard, deliberate engineering effort rather than a built-in default.",
    "Read scaling is comparatively easy (read replicas, caching, indexing) — most teams reach for those well before considering sharding.",
  ],

  questions: [
    { id: "sql-q1", question: "What does SQL stand for, and what does it operate on?", answer: "Structured Query Language — the standard language for interacting with relational databases, which store data in structured tables with predefined schemas.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-q2", question: "What is a primary key?", answer: "A column (or set of columns) that uniquely identifies each row in a table.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-q3", question: "What is a foreign key, and what does it guarantee?", answer: "A column referencing a primary key in another table — the database enforces that the referenced value must actually exist, preventing orphaned or invalid references.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-q4", question: "What does it mean that SQL is a declarative language?", answer: "You describe what data you want (via SELECT/JOIN/WHERE), and the database's query planner decides how to retrieve it efficiently — you don't write the retrieval algorithm yourself.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-q5", question: "What is a join, and why is it central to the relational model?", answer: "Combining rows from multiple tables based on a related column (typically a foreign key) — it's what lets normalized, related data be queried back together without duplicating it across tables.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-q6", question: "How does a relational database avoid scanning an entire table on every query?", answer: "Via indexes — data structures (commonly B-trees) that let the query planner jump directly to relevant rows instead of scanning every row linearly.", topic: "Databases", difficulty: "Intermediate" },
    { id: "sql-q7", question: "What does the query planner actually do?", answer: "It decides the most efficient way to execute a given SQL statement — which indexes to use, what order to join tables in — based on table statistics, so the developer only states the desired result.", topic: "Databases", difficulty: "Intermediate" },
    { id: "sql-q8", question: "Why do relational databases pair naturally with ACID transactions?", answer: "The relational model's emphasis on structural integrity (foreign keys, constraints) is a natural fit for ACID's guarantee that multi-step operations either fully succeed or fully fail, keeping the database in a valid state throughout.", topic: "Databases", difficulty: "Intermediate" },
    { id: "sql-q9", question: "Why is horizontal write scaling harder for relational databases than for many NoSQL systems?", answer: "Relational databases are built around join-heavy queries and strong consistency across related tables, which becomes much harder to coordinate once data is split (sharded) across many machines — many NoSQL systems are designed around partitioning from the start instead.", topic: "Databases", difficulty: "Advanced" },
    { id: "sql-q10", question: "What's the difference between a schema migration in a relational database and just writing a new document shape in a document store?", answer: "A relational schema change (adding/altering a column) requires an explicit migration applied to the whole table structure; a document store can often just start writing documents with a new shape, no schema-wide migration required.", topic: "Databases", difficulty: "Intermediate" },
    { id: "sql-q11", question: "Why might over-normalizing a schema hurt read performance?", answer: "Splitting data into many small, highly normalized tables means common queries require many joins, which can become a real performance cost for read-heavy workloads — sometimes deliberate denormalization is the better trade.", topic: "Databases", difficulty: "Advanced" },
    { id: "sql-q12", question: "What would you reach for before sharding, to scale a relational database's read throughput?", answer: "Read replicas and caching — both solve read scaling with far less complexity than sharding writes across multiple primary nodes.", topic: "Databases", difficulty: "Intermediate" },
    { id: "sql-q13", question: "Why is 'SQL database' often used interchangeably with 'relational database'?", answer: "SQL is the standard query language virtually all relational databases use, so the terms have become near-synonymous in casual usage, even though SQL is technically just the language, not the storage model itself.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-q14", question: "What's a common mistake that causes a relational database to perform poorly at scale?", answer: "Not indexing columns used in frequent WHERE/JOIN conditions, forcing full table scans that get progressively slower as the table grows.", topic: "Databases", difficulty: "Intermediate" },
    { id: "sql-q15", question: "When would a relational database be the wrong default choice?", answer: "For extremely high write-throughput workloads needing horizontal scale from day one, or for data without a clear, stable schema (highly variable/nested structures) where a document database fits more naturally.", topic: "Databases", difficulty: "Intermediate" },
    { id: "sql-q16", question: "What guarantees does a NOT NULL or UNIQUE constraint provide, and where is it enforced?", answer: "They're enforced by the database itself at write time — a NOT NULL constraint rejects a row missing a required value, and UNIQUE rejects a duplicate — removing that correctness burden from application code.", topic: "Databases", difficulty: "Intermediate" },
    { id: "sql-q17", question: "Why would a heavily sharded relational database (like Postgres) still be chosen for financial systems over a NoSQL alternative?", answer: "Because the correctness guarantees (foreign keys, constraints, ACID transactions) that financial data demands are a much more natural, mature fit in the relational model, even though sharding adds real operational complexity.", topic: "Databases", difficulty: "Advanced" },
    { id: "sql-q18", question: "What's the relationship between indexing and write performance?", answer: "Every index speeds up relevant reads but adds overhead to writes (each index must be updated on insert/update/delete), so indexes should be added deliberately for actual query patterns, not indiscriminately.", topic: "Databases", difficulty: "Advanced" },
    { id: "sql-q19", question: "How would you decide between a relational database and a NoSQL store for a new service?", answer: "Look at whether the data has clear, stable relationships benefiting from enforced integrity and complex queries (favor relational), versus a specific access pattern (huge scale, flexible/nested structure, simple key lookups) that a particular NoSQL model fits more naturally.", topic: "Databases", difficulty: "Advanced" },
    { id: "sql-q20", question: "Summarize SQL/relational databases in one sentence.", answer: "A data model organizing information into structured, related tables with enforced integrity constraints, queried via a declarative language, trading some scaling flexibility for strong consistency and powerful relational querying.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"How would you scale this relational database's write throughput?\"",
    "\"Why relational over NoSQL for this specific use case?\"",
    "\"What would you index here, and why?\"",
  ],

  commonMistakes: [
    "Not indexing columns used in frequent WHERE/JOIN conditions, causing full table scans as data grows.",
    "Over-normalizing to the point where simple queries need many joins, hurting read-heavy performance.",
    "Assuming a relational database can't scale at all, rather than recognizing read replicas/caching solve most scaling needs before sharding is required.",
    "Treating 'SQL' and 'relational database' as if the query language itself were the source of the integrity guarantees, rather than the underlying schema/constraint model.",
  ],

  interviewTraps: [
    "\"Can relational databases scale?\" is testing whether you know read scaling (replicas, caching) is comparatively easy, and only write sharding is the genuinely hard part.",
    "\"Why not just use NoSQL, it's more scalable\" is testing whether you'll trade away integrity guarantees you don't actually need to give up for this specific data.",
  ],

  tradeoffs: [
    "Strong integrity and powerful joins vs. a fixed schema that requires explicit migrations to evolve.",
    "Read scaling is comparatively easy (replicas, caching) vs. write scaling (sharding) being a genuinely hard, deliberate effort.",
    "Mature, well-understood tooling vs. less natural fit for highly variable/nested data shapes than some NoSQL models.",
  ],

  comparisonTable: {
    title: "SQL vs NoSQL",
    columns: ["SQL (Relational)", "NoSQL"],
    rows: [
      { label: "Schema", values: ["Fixed, enforced by the database", "Flexible / schema-less"] },
      { label: "Relationships", values: ["Foreign keys + joins", "Usually embedded or denormalized"] },
      { label: "Consistency", values: ["Strong, ACID transactions", "Often eventual (BASE)"] },
      { label: "Horizontal scaling", values: ["Harder, needs sharding", "Often designed in from the start"] },
      { label: "Best fit", values: ["Structured, related data needing integrity", "High-scale, flexible, or specific access patterns"] },
      { label: "Query flexibility", values: ["Rich, ad-hoc joins/aggregations", "Narrower, access-pattern-specific"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "sql-root",
    question: "Does your data have clear, stable relationships that benefit from enforced integrity and complex queries?",
    options: [
      {
        label: "Yes — related entities, correctness matters, need joins/aggregations",
        next: {
          kind: "result",
          id: "sql-pick",
          result: "A relational (SQL) database is the natural fit.",
          rationale: "Enforced foreign keys, constraints, and ACID transactions remove a large class of correctness bugs from application code, and joins let you query across related entities directly.",
        },
      },
      {
        label: "No — variable/nested structure, extreme scale, or simple key lookups",
        next: {
          kind: "result",
          id: "sql-nosql",
          result: "Consider a NoSQL store matching the specific access pattern.",
          rationale: "Document, key-value, column-family, or graph models each fit a specific data shape and scaling need better than forcing it through a rigid relational schema.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Tables, keys, joins.\" If the data has clear relationships you'd want enforced (not just remembered), it belongs in a relational schema — foreign keys are the database refusing to let you make a mistake.",

  realWorldExamples: [
    "Stripe relies heavily on a sharded Postgres architecture for its core financial ledger, specifically for the strong consistency and integrity guarantees financial data demands.",
    "A typical e-commerce order system uses foreign keys to guarantee an order can never reference a nonexistent customer or product, without hand-written application-level checks.",
  ],

  mermaidDiagram: `erDiagram
    USERS ||--o{ ORDERS : places
    ORDERS ||--o{ ORDER_ITEMS : contains
    USERS {
        int id PK
        string name
        string email
    }
    ORDERS {
        int id PK
        int user_id FK
        decimal total
    }`,

  flashcards: [
    { id: "sql-fc1", front: "SQL — one-line definition", back: "The standard query language for relational databases, which store data in related, structured tables with enforced schemas.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-fc2", front: "Foreign key", back: "A column referencing a primary key in another table — the database enforces the referenced value must exist.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-fc3", front: "Why is SQL 'declarative'?", back: "You state what data you want; the query planner decides how to retrieve it (indexes, join order), not you.", topic: "Databases", difficulty: "Beginner" },
    { id: "sql-fc4", front: "Why is horizontal write scaling harder for relational DBs?", back: "They're built around join-heavy queries and strong cross-table consistency, which is much harder to coordinate once data is sharded across machines.", topic: "Databases", difficulty: "Advanced" },
    { id: "sql-fc5", front: "Read scaling vs write scaling in relational databases", back: "Read scaling is comparatively easy (replicas, caching); write scaling (sharding) is genuinely hard and deliberate.", topic: "Databases", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "SQL",
    sections: [
      { heading: "Core model", items: ["Tables (rows + typed columns)", "Primary key: unique row identifier", "Foreign key: enforced cross-table reference", "Join: combine related rows"] },
      { heading: "Strengths", items: ["Enforced schema + constraints", "Powerful declarative querying", "Pairs naturally with ACID"] },
      { heading: "Costs", items: ["Schema changes need migrations", "Horizontal write scaling is hard (sharding)", "Over-normalization can hurt read perf"] },
      { heading: "Scale in order", items: ["1. Read replicas", "2. Caching", "3. Sharding (only if truly needed)"] },
    ],
  },

  speedNotes: [
    "SQL = declarative query language for relational (table-based) data.",
    "Foreign keys + constraints = integrity enforced by the DB itself.",
    "Query planner picks execution strategy; you just state the result.",
    "Read scaling easy (replicas/caching); write scaling (sharding) is hard.",
    "Best fit: structured, related data where correctness matters.",
  ],
};
