import type { ConceptRevisionContent } from "./types";

export const databaseConnectionPooling: ConceptRevisionContent = {
  slug: "database-connection-pooling",
  title: "Database Connection Pooling",
  topic: "Advanced Topics",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "SQL", href: "/docs/databases/sql" },
    { label: "NoSQL", href: "/docs/databases/nosql" },
  ],
  summary: [
    "Database connection pooling maintains a cache of active database connections.",
    "Creating a new database connection is expensive (TCP handshake, auth, resource allocation).",
    "Pools reuse existing connections to serve incoming requests rapidly.",
    "Prevents the database from being overwhelmed by too many simultaneous connections.",
    "Configuration parameters include min size, max size, and idle timeouts.",
    "It acts as a buffer and limits resource exhaustion on the DB server."
  ],
  whyAsked: [
    "To test your understanding of backend performance optimization.",
    "To evaluate knowledge of managing limited resources in a scalable system.",
    "To see if you understand the overhead of network and database operations."
  ],
  thirtySecondAnswer: "Database connection pooling is a technique to manage a cache of open database connections. Instead of opening a new, expensive connection for every request, an application borrows an existing connection from the pool, uses it, and returns it. This significantly reduces latency and prevents the database from crashing due to connection exhaustion under heavy load.",
  detailedAnswer: [
    "Connection creation involves TCP handshakes, TLS negotiation, and DB-level authentication, taking 10s-100s of ms.",
    "A pool maintains a 'min-idle' set of connections ready for immediate use.",
    "When a request arrives, it borrows a connection. If none are free, it waits or the pool opens a new one (up to 'max-active').",
    "When finished, the connection is returned to the pool rather than closed.",
    "Pools run health checks (e.g., SELECT 1) to ensure borrowed connections are still valid.",
    "Without a pool, a sudden traffic spike can cause connection exhaustion (OOM or connection limits reached) on the database."
  ],
  questions: [
    { id: "dcp-q1", question: "What is database connection pooling?", answer: "A technique that maintains a cache of open, reusable database connections to improve performance.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dcp-q2", question: "Why is opening a new database connection expensive?", answer: "It requires network routing, a TCP 3-way handshake, optional TLS setup, and database authentication.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dcp-q3", question: "What happens when an application requests a connection from an empty pool?", answer: "It either creates a new connection (if under the max limit) or waits/blocks until one is returned.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dcp-q4", question: "What happens when an application is done with a connection?", answer: "It returns the connection to the pool rather than closing it.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dcp-q5", question: "What is a 'connection leak'?", answer: "When an application fails to return borrowed connections to the pool, eventually exhausting the pool.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dcp-q6", question: "How does connection pooling protect the database?", answer: "By enforcing a strict maximum number of connections, preventing the DB from being overwhelmed.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dcp-q7", question: "What is the 'max pool size' parameter?", answer: "The absolute maximum number of simultaneous database connections the pool is allowed to maintain.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-q8", question: "What is the 'idle timeout'?", answer: "The duration a connection can sit unused in the pool before being closed and removed to save resources.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-q9", question: "How does a pool verify a connection is still alive?", answer: "By running a lightweight query (e.g., 'SELECT 1') before handing it to the application or via a background thread.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-q10", question: "How do you determine the optimal max pool size?", answer: "Through load testing; usually, it's a small number like 10-50 per instance, as too many connections cause DB context switching overhead.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-q11", question: "Why might a pool size of 1000 be worse than a pool size of 50?", answer: "Databases have limited CPU cores. Too many active connections lead to excessive thread context switching, degrading overall throughput.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-q12", question: "What is connection wait timeout?", answer: "The maximum time a thread will block waiting for a connection from the pool before throwing an error.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-q13", question: "Should you use connection pooling with serverless functions (like AWS Lambda)?", answer: "Standard pooling fails because Lambdas don't share memory. You need an external proxy like Amazon RDS Proxy or PgBouncer.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-q14", question: "What is PgBouncer?", answer: "A lightweight connection pooler specifically designed for PostgreSQL.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-q15", question: "Explain the difference between session pooling and transaction pooling in PgBouncer.", answer: "Session pooling ties a client to a connection for the whole session. Transaction pooling releases the connection back to the pool after every transaction, supporting vastly more clients.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dcp-q16", question: "How does multiplexing work in advanced connection poolers?", answer: "They multiplex many logical client connections onto a small number of physical database connections, mapping them per query/transaction.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dcp-q17", question: "What is the Thundering Herd problem in relation to connection pools?", answer: "When a service restarts or scales up massively, all instances try to create their initial pool connections simultaneously, overwhelming the database.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dcp-q18", question: "How do you handle stale connections caused by database failovers?", answer: "The pool must detect broken pipes via exceptions or health checks, discard the bad connections, and reconnect to the new primary.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dcp-q19", question: "What is HikariCP?", answer: "A very popular, high-performance JDBC connection pool for Java applications.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dcp-q20", question: "Can read-replicas share a connection pool with the primary database?", answer: "No, you typically maintain separate pools for the write node (primary) and the read nodes (replicas).", topic: "Advanced Topics", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How does connection pooling work in a serverless architecture?",
    "Why do PostgreSQL databases often need an external pooler like PgBouncer?",
    "How would you diagnose a connection leak?"
  ],
  commonMistakes: [
    "Setting the max pool size too high, thinking more is better (it causes DB thrashing).",
    "Failing to close/return connections in a 'finally' block.",
    "Not configuring a connection wait timeout, leading to indefinite blocking."
  ],
  interviewTraps: [
    "Assuming standard connection pools work seamlessly with AWS Lambda (they don't).",
    "Forgetting that connections can drop silently and need health checks."
  ],
  tradeoffs: [
    "Pool Size: Too small = app requests queue up; Too large = database thrashes due to context switching.",
    "Validation: Validating on borrow adds latency, but prevents app errors from stale connections."
  ],
  memoryTrick: "Think of a connection pool like a library of rare books. You borrow a book, read it, and return it. The library doesn't print a new book for every reader.",
  realWorldExamples: [
    "Amazon RDS Proxy is used to pool connections for serverless Lambdas connecting to Postgres/MySQL.",
    "HikariCP is the default, highly-optimized connection pool in Spring Boot applications."
  ],
  mermaidDiagram: `flowchart TD\n    A[App Thread 1] -->|Borrow| C(Connection Pool)\n    B[App Thread 2] -->|Borrow| C\n    C -->|Use| D1[Conn 1]\n    C -->|Use| D2[Conn 2]\n    D1 --> E[(Database)]\n    D2 --> E\n    D1 -->|Return| C`,
  flashcards: [
    { id: "dcp-fc1", front: "What is the primary benefit of a connection pool?", back: "It eliminates the latency overhead of creating new connections for every request.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dcp-fc2", front: "Why is a massive pool size (e.g., 5000) usually a bad idea?", back: "It causes excessive CPU context switching on the database server.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-fc3", front: "What is a connection leak?", back: "When the application fails to return connections to the pool, eventually exhausting it.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dcp-fc4", front: "How do serverless functions handle connection pooling?", back: "They use an external proxy (like PgBouncer or RDS Proxy) since they don't share memory.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dcp-fc5", front: "How does a pool check if a connection is valid?", back: "By running a test query (like 'SELECT 1') before giving it to the app.", topic: "Advanced Topics", difficulty: "Intermediate" }
  ],
  cheatSheet: {
    title: "Database Connection Pooling",
    sections: [
      { heading: "Why it's needed", items: ["TCP Handshake is slow", "DB auth is slow", "Protects DB from overload"] },
      { heading: "Key Parameters", items: ["Min Idle", "Max Active", "Max Wait Time", "Idle Timeout"] },
      { heading: "Common Tools", items: ["HikariCP (Java)", "PgBouncer (Postgres)", "Amazon RDS Proxy"] },
      { heading: "Best Practices", items: ["Keep pool sizes small (e.g., CPU cores * 2)", "Always release connections", "Use external proxy for Serverless"] }
    ]
  },
  speedNotes: [
    "Caches open database connections.",
    "Reduces network/auth latency.",
    "Protects DB from connection exhaustion.",
    "Keep pool sizes relatively small.",
    "Serverless requires external poolers."
  ]
};
