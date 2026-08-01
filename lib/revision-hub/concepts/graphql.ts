import type { ConceptRevisionContent } from "./types";

export const graphql: ConceptRevisionContent = {
  slug: "graphql",
  title: "GraphQL",
  topic: "Networking",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "GraphQL", href: "/docs/networking/graphql" },
    { label: "REST", href: "/docs/networking/rest" },
  ],

  summary: [
    "GraphQL is a query language and runtime for APIs where the client specifies exactly what data it needs — potentially across many related resources — in a single request, and gets back a response shaped exactly like the query.",
    "It was built by Facebook specifically to fix REST's over-fetching (unused fields in a fixed response) and under-fetching (multiple round trips for related data) problems.",
    "A GraphQL API typically exposes a single endpoint; the query itself, not the URL, determines what's returned.",
    "It has a strongly typed schema (queries, mutations, sometimes subscriptions) that serves as both documentation and a validation contract between client and server.",
    "The classic operational challenge is the N+1 query problem: naively resolving nested fields can trigger one database query per item unless you batch with something like DataLoader.",
    "It trades REST's simple HTTP caching (cacheable per URL) for client-driven flexibility — caching GraphQL responses is meaningfully harder since most requests go over POST to one endpoint.",
  ],

  whyAsked: [
    "It tests whether you understand REST's actual pain points (over/under-fetching) precisely enough to explain what GraphQL is solving, not just that it exists.",
    "The N+1 problem is a favorite follow-up because it reveals whether you understand what happens underneath a convenient client-side query, not just the client-facing API surface.",
    "It's used to gauge trade-off reasoning: whether you'd default to GraphQL everywhere, or recognize where REST's simplicity (caching, tooling, operational maturity) still wins.",
  ],

  thirtySecondAnswer:
    "GraphQL is a query language and runtime for APIs that lets the client specify exactly what data it needs, across potentially many related resources, in a single request — and the response comes back shaped exactly like that query, no more and no less. It was built at Facebook specifically to solve two REST pain points: over-fetching, where a fixed-shape endpoint returns fields a client doesn't need, and under-fetching, where getting related data (a user, their posts, each post's comments) requires several sequential REST calls. A GraphQL API is typically exposed as a single endpoint with a strongly typed schema describing available queries, mutations, and types, which doubles as documentation and a validation contract. The main operational gotcha is the N+1 query problem — naively resolving nested fields can fire one database query per item unless resolvers batch requests, typically with something like DataLoader — and because most GraphQL traffic goes over POST to one endpoint, it loses REST's simple per-URL HTTP caching, trading it for client-driven flexibility instead.",

  detailedAnswer: [
    "Client specifies fields/relationships in the query itself; the server returns exactly that shape — directly solving both over-fetching and under-fetching.",
    "Typically one endpoint (e.g. /graphql) rather than many resource URLs; the query body, not the URL, determines the response.",
    "Schema-first: queries (reads), mutations (writes), and optionally subscriptions (real-time updates) are all defined against a strongly typed schema shared by client and server.",
    "N+1 problem: resolving a list's nested field naively (e.g. each post's author) can trigger one query per item — solved by batching resolvers (DataLoader pattern) to coalesce them into one query.",
    "Caching is harder than REST: since most requests are POST to a single endpoint, standard HTTP/CDN caching per URL doesn't apply directly — needs persisted queries, response-level caching, or client-side normalized caches (Apollo Client, Relay) instead.",
    "Query complexity/depth needs explicit guarding (depth limiting, query cost analysis) since clients can otherwise construct arbitrarily expensive nested queries against the server.",
  ],

  questions: [
    { id: "gql-q1", question: "What is GraphQL, fundamentally?", answer: "A query language and runtime for APIs where the client specifies exactly what data it needs in a single request, and the response is shaped exactly like that request.", topic: "Networking", difficulty: "Beginner" },
    { id: "gql-q2", question: "What two specific REST problems was GraphQL built to solve?", answer: "Over-fetching (getting unused fields from a fixed-shape response) and under-fetching (needing multiple round trips to assemble related data).", topic: "Networking", difficulty: "Beginner" },
    { id: "gql-q3", question: "How many endpoints does a typical GraphQL API expose, and how does that differ from REST?", answer: "Usually just one endpoint (e.g. /graphql); unlike REST, the URL doesn't determine the resource — the query body does.", topic: "Networking", difficulty: "Beginner" },
    { id: "gql-q4", question: "What are the three main operation types in GraphQL?", answer: "Queries (reads), mutations (writes), and subscriptions (real-time/event-based updates).", topic: "Networking", difficulty: "Beginner" },
    { id: "gql-q5", question: "What is the N+1 query problem in GraphQL?", answer: "Resolving a nested field across a list of items naively triggers one database query per item (plus the original list query), instead of one batched query — e.g. fetching each post's author separately for 50 posts.", topic: "Networking", difficulty: "Intermediate" },
    { id: "gql-q6", question: "How is the N+1 problem typically solved?", answer: "By batching resolver calls within a single request tick, commonly via the DataLoader pattern, which coalesces many individual lookups into one batched query.", topic: "Networking", difficulty: "Intermediate" },
    { id: "gql-q7", question: "Why is caching harder in GraphQL than in REST?", answer: "REST benefits from HTTP/CDN caching per URL; GraphQL typically sends all requests as POST to a single endpoint, so there's no natural URL-based cache key — requires persisted queries, response caching keyed by query+variables, or client-side normalized caches.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-q8", question: "What is a GraphQL schema, and why does it matter?", answer: "A strongly typed contract describing every available type, query, mutation, and subscription — it serves as both living documentation and a validation layer the server enforces automatically.", topic: "Networking", difficulty: "Beginner" },
    { id: "gql-q9", question: "How would you prevent a client from sending an arbitrarily deep/expensive nested query?", answer: "Enforce query depth limiting and/or query cost analysis (assigning a computed 'cost' to a query and rejecting ones over a threshold) before execution.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-q10", question: "What are GraphQL subscriptions, and what do they require under the hood?", answer: "A mechanism for clients to receive real-time updates when specific data changes, typically implemented over WebSockets or Server-Sent Events since plain request/response can't push updates.", topic: "Networking", difficulty: "Intermediate" },
    { id: "gql-q11", question: "Why might error handling be trickier in GraphQL compared to REST?", answer: "A GraphQL response can return HTTP 200 with a mix of successful data and partial errors in the same payload (per-field errors), so clients must inspect the response body's errors array rather than relying solely on the HTTP status code.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-q12", question: "What's a persisted query, and why is it used?", answer: "A pre-registered query stored server-side and referenced by an id/hash instead of sending the full query text each time — reduces request size and enables safe server-side caching/allow-listing of known queries.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-q13", question: "How does GraphQL handle versioning compared to REST's URL/header versioning?", answer: "GraphQL typically avoids explicit versioning by additively evolving the schema (deprecating fields rather than removing them), since clients only request the fields they use, so unused old fields can coexist with new ones.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-q14", question: "When would GraphQL be a poor fit compared to REST?", answer: "Simple APIs with a small number of clients and stable data needs, where REST's simplicity and native HTTP caching outweigh GraphQL's flexibility — and where the added complexity of resolvers/schema isn't justified.", topic: "Networking", difficulty: "Intermediate" },
    { id: "gql-q15", question: "What's a resolver in GraphQL?", answer: "A function responsible for fetching the data for a specific field in the schema — each field in a query maps to a resolver that knows how to produce that piece of data.", topic: "Networking", difficulty: "Beginner" },
    { id: "gql-q16", question: "Why might file uploads be awkward in GraphQL?", answer: "GraphQL's spec is built around JSON-shaped queries/responses, so binary file uploads require an extension (like the multipart request spec) rather than being natively supported the way a REST endpoint can just accept multipart/form-data.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-q17", question: "How does GraphQL reduce mobile client bandwidth usage compared to REST?", answer: "Because the client requests exactly the fields it needs, it avoids downloading and parsing unused fields that a fixed REST response would otherwise include — directly meaningful on constrained mobile networks.", topic: "Networking", difficulty: "Intermediate" },
    { id: "gql-q18", question: "What's a common mistake teams make when adopting GraphQL?", answer: "Treating it as a drop-in REST replacement without addressing N+1 query patterns, query cost limits, or caching strategy — leading to worse performance than the REST API it replaced.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-q19", question: "How do GraphQL mutations typically differ from REST's POST/PUT/PATCH distinction?", answer: "GraphQL doesn't map mutations onto HTTP-verb semantics at all — every mutation is just a named operation in the schema, so idempotency and intent have to be documented/enforced explicitly rather than inferred from a verb.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-q20", question: "Summarize GraphQL in one sentence.", answer: "A query language and single-endpoint API runtime that lets clients request exactly the data shape they need, solving REST's over/under-fetching at the cost of harder caching and new problems like N+1 queries.", topic: "Networking", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"How would you solve the N+1 problem here?\"",
    "\"How do you cache GraphQL responses given there's just one endpoint?\"",
    "\"How would you stop a client from sending an abusively deep query?\"",
  ],

  commonMistakes: [
    "Adopting GraphQL without addressing N+1 query patterns, tanking performance versus the REST API it replaced.",
    "Assuming GraphQL responses can't have errors because the HTTP status is 200 — partial/per-field errors live in the response body.",
    "Not limiting query depth/cost, leaving the server exposed to arbitrarily expensive client-constructed queries.",
    "Treating GraphQL as strictly superior to REST rather than a trade-off suited to specific client-diversity/data-shape problems.",
  ],

  interviewTraps: [
    "\"Doesn't GraphQL just make everything faster?\" is testing whether you know it trades fetch efficiency for harder caching and new failure modes like N+1.",
    "\"Where would you NOT use GraphQL?\" is testing whether you can argue against the technology you just explained, not just advocate for it.",
  ],

  tradeoffs: [
    "Client-driven flexible data shape vs. harder HTTP/CDN caching (single POST endpoint instead of many cacheable URLs).",
    "Fewer round trips for related data vs. the operational need to guard against N+1 queries and expensive nested queries.",
    "Additive schema evolution avoids REST-style versioning, but requires discipline around deprecating rather than removing fields.",
  ],

  comparisonTable: {
    title: "GraphQL vs REST",
    columns: ["GraphQL", "REST"],
    rows: [
      { label: "Data shape", values: ["Client-specified per query", "Fixed per endpoint"] },
      { label: "Endpoints", values: ["Typically one", "One per resource"] },
      { label: "Over/under-fetching", values: ["Solved by design", "Common problem"] },
      { label: "Caching", values: ["Harder (needs persisted queries / client cache)", "Native HTTP caching per URL"] },
      { label: "Error handling", values: ["200 OK + per-field errors in body", "Standard HTTP status codes"] },
      { label: "Common pitfall", values: ["N+1 queries, deep query abuse", "Over/under-fetching, awkward non-CRUD actions"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "gql-root",
    question: "Do multiple client types need meaningfully different shapes of the same data?",
    options: [
      {
        label: "Yes — mobile, web, and partners all need different subsets/relationships",
        next: {
          kind: "result",
          id: "gql-pick",
          result: "GraphQL is a strong fit.",
          rationale: "Each client can request exactly what it needs from a single schema, avoiding a proliferation of bespoke REST endpoints per client type.",
        },
      },
      {
        label: "No — one or two clients, roughly the same data shape works for all",
        next: {
          kind: "result",
          id: "gql-rest",
          result: "REST is simpler and probably sufficient.",
          rationale: "Without genuinely divergent client needs, REST's simpler caching and tooling outweigh GraphQL's flexibility benefits.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Ask exactly, get exactly.\" The client's query IS the response shape — nothing more, nothing less — which is the whole point, and the whole caching headache.",

  realWorldExamples: [
    "GitHub's v4 API is GraphQL, letting integrators fetch precisely the repo/issue/PR fields they need in one request instead of chaining several REST calls.",
    "Shopify exposes a GraphQL Storefront API so different storefront clients (web, mobile apps, custom integrations) can each query only the product/cart fields relevant to them.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant Client
    participant GraphQLServer
    participant DB
    Client->>GraphQLServer: POST /graphql { user { name, posts { title } } }
    GraphQLServer->>DB: batched resolver queries (DataLoader)
    DB-->>GraphQLServer: user + posts data
    GraphQLServer-->>Client: { data: { user: { name, posts } } }`,

  flashcards: [
    { id: "gql-fc1", front: "GraphQL — one-line definition", back: "A query language/runtime letting clients request exactly the data shape they need in a single request.", topic: "Networking", difficulty: "Beginner" },
    { id: "gql-fc2", front: "What two REST problems does GraphQL solve?", back: "Over-fetching (unused fields) and under-fetching (multiple round trips for related data).", topic: "Networking", difficulty: "Beginner" },
    { id: "gql-fc3", front: "N+1 query problem", back: "Naively resolving a nested field per list item triggers one query per item — fixed by batching (e.g. DataLoader).", topic: "Networking", difficulty: "Intermediate" },
    { id: "gql-fc4", front: "Why is GraphQL caching harder than REST?", back: "Most requests are POST to a single endpoint, so there's no natural per-URL cache key like REST has.", topic: "Networking", difficulty: "Advanced" },
    { id: "gql-fc5", front: "How does GraphQL handle API versioning?", back: "Usually avoids it — evolves the schema additively, deprecating fields instead of removing them, since clients only request what they use.", topic: "Networking", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "GraphQL",
    sections: [
      { heading: "Core idea", items: ["Client query = response shape", "Single endpoint, typed schema", "Queries / mutations / subscriptions"] },
      { heading: "Solves", items: ["Over-fetching", "Under-fetching (fewer round trips)"] },
      { heading: "Watch for", items: ["N+1 queries → batch with DataLoader", "Deep/expensive query abuse → depth & cost limits", "Caching needs persisted queries or client-side cache"] },
      { heading: "Vs REST", items: ["No per-URL HTTP caching", "200 OK + errors array, not status-code-driven", "Additive schema evolution instead of versioning"] },
    ],
  },

  speedNotes: [
    "GraphQL: client query = exact response shape, one endpoint.",
    "Solves REST's over-fetching and under-fetching.",
    "N+1 problem: batch nested resolvers with DataLoader.",
    "Caching is harder — no natural per-URL cache key.",
    "Guard query depth/cost; errors live in the response body, not just status code.",
  ],
};
