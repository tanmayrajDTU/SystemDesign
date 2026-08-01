import type { ConceptRevisionContent } from "./types";

export const rest: ConceptRevisionContent = {
  slug: "rest",
  title: "REST",
  topic: "Networking",
  difficulty: "Beginner",
  estimatedMinutes: 12,

  docLinks: [
    { label: "REST", href: "/docs/networking/rest" },
    { label: "HTTP", href: "/docs/networking/http" },
    { label: "GraphQL", href: "/docs/networking/graphql" },
  ],

  summary: [
    "REST (Representational State Transfer) is an architectural style for networked APIs built around resources (nouns like /users or /orders) manipulated through a small, uniform set of operations, typically HTTP methods.",
    "It's the dominant style for public and internal web APIs precisely because it maps cleanly onto HTTP as most developers already understand it: URLs are resources, methods are actions, status codes are outcomes.",
    "Statelessness (inherited from HTTP) is central: each request carries everything needed to process it, which is what makes REST APIs trivially horizontally scalable.",
    "'RESTful' is more of a spectrum than a strict certification — most production APIs borrow REST's conventions (resources, HTTP verbs, status codes) without implementing every constraint from Roy Fielding's original dissertation (like HATEOAS).",
    "REST's main structural weakness is that the server decides the response shape per endpoint, which leads to over-fetching (unused fields) and under-fetching (needing several round trips for related data) — the exact problems GraphQL was built to solve.",
    "Versioning, pagination, filtering, and nested-resource design are the recurring practical design questions once you're past the basic verb/resource mapping.",
  ],

  whyAsked: [
    "It's foundational API-design vocabulary — almost every system design interview eventually needs an API, and REST is the default lens interviewers use to judge whether you can design one cleanly.",
    "Resource modeling (what's a resource, what's a sub-resource, what's an action that doesn't map cleanly to a noun) reveals how well you structure a problem, not just whether you know HTTP verbs.",
    "It sets up the natural comparison questions (REST vs GraphQL vs gRPC) that test whether you can reason about trade-offs rather than defaulting to whichever technology is most familiar.",
  ],

  thirtySecondAnswer:
    "REST is an architectural style for APIs organized around resources — nouns like users or orders, addressed by URLs — manipulated through a small, uniform set of operations, almost always the standard HTTP methods: GET to read, POST to create, PUT/PATCH to update, DELETE to remove. It inherits HTTP's statelessness, meaning every request carries everything needed to process it, which is exactly what makes REST APIs trivial to scale horizontally behind a load balancer. 'RESTful' in practice is a spectrum rather than a strict specification — most real APIs adopt REST's core conventions (resource URLs, HTTP verbs, status codes) without implementing every constraint from the original dissertation, like hypermedia-driven navigation. Its main weakness is that the server fixes the response shape per endpoint, which causes over-fetching when a client needs only some fields, and under-fetching when related data requires multiple round trips — which is precisely the gap GraphQL was designed to close.",

  detailedAnswer: [
    "Core mapping: resources are nouns at URLs (/orders/123), HTTP methods are the verbs (GET/POST/PUT/PATCH/DELETE), and status codes communicate the outcome.",
    "Statelessness: each request is self-contained; the server holds no per-client session state between requests, which is what makes horizontal scaling straightforward.",
    "'RESTful' is a spectrum: most production APIs use resource URLs + HTTP verbs + status codes, but skip strict constraints like HATEOAS (responses containing links to related actions) — that's normal, not 'wrong REST.'",
    "Structural weakness: response shape is fixed per endpoint by the server, leading to over-fetching (extra unused fields) and under-fetching (needing N+1 calls for related resources).",
    "Practical design surface beyond CRUD: versioning strategy (URL vs header), pagination (offset vs cursor), filtering/sorting query params, and how to model actions that aren't naturally CRUD (e.g. POST /orders/123/cancel).",
    "Idempotency (from HTTP) carries directly into REST API design: GET/PUT/DELETE are expected to be safely retryable, POST generally isn't unless explicitly designed to be (idempotency keys).",
  ],

  questions: [
    { id: "rest-q1", question: "What does REST stand for, and what is it fundamentally organized around?", answer: "Representational State Transfer — an architectural style organizing APIs around resources (nouns), manipulated via a small, uniform set of operations, typically HTTP methods.", topic: "Networking", difficulty: "Beginner" },
    { id: "rest-q2", question: "How do REST APIs typically map CRUD operations to HTTP methods?", answer: "GET to read, POST to create, PUT to fully replace, PATCH to partially update, DELETE to remove.", topic: "Networking", difficulty: "Beginner" },
    { id: "rest-q3", question: "Why does REST rely on statelessness, and what does that buy you?", answer: "It inherits statelessness from HTTP — every request carries everything needed to process it — which lets any server instance handle any request, making horizontal scaling trivial.", topic: "Networking", difficulty: "Beginner" },
    { id: "rest-q4", question: "What does it mean that 'RESTful' is more of a spectrum than a strict rule?", answer: "Most real-world APIs adopt REST's core conventions (resource URLs, verbs, status codes) without implementing every constraint of Fielding's original model, like hypermedia-driven navigation (HATEOAS) — and that's considered normal practice, not a violation.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q5", question: "What is over-fetching, and why is it a REST problem?", answer: "A client receiving more fields than it needs from a fixed-shape endpoint response, wasting bandwidth and parsing effort — happens because REST's response shape is decided by the server per endpoint, not per client need.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q6", question: "What is under-fetching, and why is it a REST problem?", answer: "A client needing data from multiple related resources (a user, their orders, each order's items) that requires several sequential REST calls to assemble, because a single endpoint's fixed response can't span arbitrary relationships.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q7", question: "How would you model an action that isn't naturally a CRUD operation, like 'cancel an order'?", answer: "Model it as a sub-resource/action endpoint, e.g. POST /orders/123/cancel, rather than forcing it into PUT/PATCH on the order resource itself.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q8", question: "What are the two common approaches to API versioning in REST, and a trade-off between them?", answer: "URL versioning (/v1/orders) is explicit and cache-friendly but pollutes the URL; header-based versioning (Accept header) keeps URLs clean but is less visible/discoverable to API consumers.", topic: "Networking", difficulty: "Advanced" },
    { id: "rest-q9", question: "What's the difference between offset-based and cursor-based pagination, and when would you prefer cursor-based?", answer: "Offset-based (?page=3) is simple but breaks consistency if items are inserted/deleted between requests; cursor-based (?after=<id>) is stable under concurrent writes and preferred for large or frequently-changing datasets.", topic: "Networking", difficulty: "Advanced" },
    { id: "rest-q10", question: "Why is PUT expected to be idempotent but POST generally isn't?", answer: "PUT replaces a resource with the exact representation given, so repeating it produces the same end state; POST usually creates a new resource or triggers a side effect, so repeating it can create duplicates unless explicitly guarded (idempotency key).", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q11", question: "How should nested resources be modeled in REST URLs, e.g. comments on a post?", answer: "As a nested path reflecting the relationship, e.g. /posts/123/comments, with /comments/456 also addressable directly if comments need to be fetched/updated independently of their parent.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q12", question: "What HTTP status code should a successful POST that creates a resource return, and what else should the response include?", answer: "201 Created, along with a Location header pointing to the newly created resource's URL.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q13", question: "Why might a REST API choose to return 202 Accepted instead of 200/201?", answer: "For operations processed asynchronously — the request was accepted for processing but isn't complete yet, and the client should poll or be notified separately for the result.", topic: "Networking", difficulty: "Advanced" },
    { id: "rest-q14", question: "What is HATEOAS, and why do most production REST APIs skip it?", answer: "Hypermedia As The Engine Of Application State — responses include links describing what actions/resources are available next, letting clients navigate the API dynamically; most APIs skip it because it adds real complexity for limited practical benefit given clients are usually built against fixed documentation anyway.", topic: "Networking", difficulty: "Advanced" },
    { id: "rest-q15", question: "How would you design filtering and sorting for a REST collection endpoint?", answer: "Via query parameters, e.g. GET /orders?status=shipped&sort=-created_at, keeping the resource URL itself stable while parameters narrow/order the result set.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q16", question: "Why is using a verb in a REST URL (e.g. /getUserOrders) usually considered a design smell?", answer: "It breaks the resource-as-noun convention that makes REST predictable — the HTTP method should already express the verb (GET), so repeating it in the path is redundant and inconsistent with the rest of the API.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-q17", question: "How does REST handle partial updates, and what's a common pitfall?", answer: "PATCH is meant for partial updates — sending only the fields to change — but a common pitfall is implementing PATCH with full-replace semantics identical to PUT, confusing clients about what a partial update actually does.", topic: "Networking", difficulty: "Advanced" },
    { id: "rest-q18", question: "Why might you introduce a composite/aggregating endpoint in a REST API?", answer: "To reduce under-fetching for a specific common client need — e.g. a mobile home-screen endpoint that bundles user, recent orders, and notifications in one call instead of three round trips — at the cost of a less 'pure' resource model.", topic: "Networking", difficulty: "Advanced" },
    { id: "rest-q19", question: "What's the trade-off of choosing REST over GraphQL for a new public API?", answer: "REST is simpler to cache (HTTP caching works naturally per URL), more broadly understood, and easier to rate-limit per endpoint, at the cost of over/under-fetching flexibility that GraphQL gives clients directly.", topic: "Networking", difficulty: "Advanced" },
    { id: "rest-q20", question: "Summarize REST in one sentence.", answer: "An architectural style for APIs where resources are addressed by URLs and manipulated through a small uniform set of (typically HTTP) operations, relying on statelessness for simple horizontal scaling.", topic: "Networking", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"How would you version this API as requirements change?\"",
    "\"This client only needs 2 of these 10 fields — how would you address that in REST?\"",
    "\"Why REST over GraphQL/gRPC for this specific use case?\"",
  ],

  commonMistakes: [
    "Using verbs in URLs (e.g. /getUser) instead of letting the HTTP method express the action.",
    "Treating PATCH as a full replace, identical to PUT, rather than a genuine partial update.",
    "Ignoring pagination for large collections, or using offset-based pagination where data changes frequently.",
    "Forcing every operation into strict CRUD, producing awkward modeling for actions that are really commands (e.g. 'cancel', 'archive').",
  ],

  interviewTraps: [
    "\"Is your API RESTful?\" is often testing whether you understand REST as a spectrum of conventions, not whether you've implemented HATEOAS to the letter.",
    "\"How do you handle a client that only needs a few fields?\" is testing whether you recognize over-fetching as an inherent REST trade-off, not a bug to silently ignore.",
  ],

  tradeoffs: [
    "Simplicity and cacheability (URL-based, works with standard HTTP caching) vs. flexibility of response shape (which GraphQL solves directly).",
    "Uniform, predictable resource modeling vs. awkward fit for actions/commands that aren't naturally CRUD.",
    "URL versioning: explicit and cache-friendly, but clutters URLs, vs. header versioning: clean URLs, less discoverable.",
  ],

  comparisonTable: {
    title: "REST vs GraphQL vs gRPC",
    columns: ["REST", "GraphQL", "gRPC"],
    rows: [
      { label: "Data shape", values: ["Fixed per endpoint", "Client-specified per query", "Fixed per RPC method (protobuf schema)"] },
      { label: "Typical use case", values: ["Public/general web APIs", "Client-driven data aggregation", "Internal service-to-service calls"] },
      { label: "Format", values: ["JSON over HTTP/1.1+", "JSON over HTTP", "Binary protobuf over HTTP/2"] },
      { label: "Caching", values: ["Native HTTP caching per URL", "Harder (single endpoint, POST-based)", "Not typically cached"] },
      { label: "Over/under-fetching", values: ["Common problem", "Solved by design", "N/A — precise typed calls"] },
      { label: "Human readability", values: ["High", "High", "Low (binary)"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "rest-root",
    question: "Who are the primary consumers of this API?",
    options: [
      {
        label: "External/public clients, need broad compatibility and caching",
        next: {
          kind: "result",
          id: "rest-pick",
          result: "REST is the default sensible choice.",
          rationale: "Broadest client compatibility, natural HTTP caching, and the most universally understood conventions for a public-facing API.",
        },
      },
      {
        label: "Multiple client types (mobile/web) with very different data needs",
        next: {
          kind: "result",
          id: "rest-gql",
          result: "Consider GraphQL instead.",
          rationale: "Letting each client specify exactly the fields/relationships it needs avoids building and maintaining several bespoke REST endpoints.",
        },
      },
      {
        label: "Internal, high-volume service-to-service calls",
        next: {
          kind: "result",
          id: "rest-grpc",
          result: "Consider gRPC instead.",
          rationale: "Binary protobuf + HTTP/2 multiplexing outperforms JSON-over-REST for high-throughput internal traffic, and strong typing helps at scale across many services.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Nouns in the URL, verbs in the method.\" /orders/123 is the noun; GET/POST/PUT/PATCH/DELETE is the verb — if you're putting a verb in the URL, you've broken the pattern.",

  realWorldExamples: [
    "Stripe's public API is a widely cited example of clean REST design: predictable resource URLs, correct status codes, and cursor-based pagination for list endpoints.",
    "GitHub's REST API models repositories, issues, and pull requests as resources under predictable nested URLs (e.g. /repos/{owner}/{repo}/issues).",
  ],

  mermaidDiagram: `sequenceDiagram
    participant Client
    participant Server
    Client->>Server: GET /orders/123
    Server-->>Client: 200 OK {order data}
    Client->>Server: POST /orders/123/cancel
    Server-->>Client: 200 OK {status: cancelled}`,

  flashcards: [
    { id: "rest-fc1", front: "REST — one-line definition", back: "An architectural style organizing APIs around resources (nouns), manipulated via a uniform set of operations, typically HTTP methods.", topic: "Networking", difficulty: "Beginner" },
    { id: "rest-fc2", front: "Over-fetching", back: "A client receives more fields than it needs because the server fixes the response shape per endpoint.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-fc3", front: "Under-fetching", back: "A client needs multiple sequential REST calls to assemble data spanning several related resources.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-fc4", front: "Is 'RESTful' a strict specification?", back: "No — it's a spectrum; most APIs use resource URLs + HTTP verbs + status codes without implementing every original constraint (e.g. HATEOAS).", topic: "Networking", difficulty: "Intermediate" },
    { id: "rest-fc5", front: "Cursor vs offset pagination", back: "Cursor-based stays stable under concurrent inserts/deletes; offset-based (page numbers) can skip or repeat items when data changes mid-pagination.", topic: "Networking", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "REST",
    sections: [
      { heading: "Core mapping", items: ["Resources = nouns at URLs", "GET/POST/PUT/PATCH/DELETE = verbs", "Status codes = outcome"] },
      { heading: "Known weaknesses", items: ["Over-fetching: fixed response shape", "Under-fetching: needs multiple calls", "Awkward for non-CRUD actions"] },
      { heading: "Design decisions", items: ["Versioning: URL vs header", "Pagination: offset vs cursor", "Actions: POST /resource/{id}/action"] },
      { heading: "Remember", items: ["'RESTful' is a spectrum, not a checklist", "PUT/GET/DELETE idempotent, POST usually not", "201 Created + Location header on create"] },
    ],
  },

  speedNotes: [
    "REST = resources (nouns) + HTTP verbs + status codes.",
    "Stateless → trivial horizontal scaling.",
    "Weaknesses: over-fetching and under-fetching (GraphQL fixes both).",
    "'RESTful' is a spectrum — most APIs skip strict HATEOAS.",
    "Non-CRUD actions: POST /resource/{id}/action, not a URL verb.",
  ],
};
