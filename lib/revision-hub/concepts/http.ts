import type { ConceptRevisionContent } from "./types";

export const http: ConceptRevisionContent = {
  slug: "http",
  title: "HTTP",
  topic: "Networking",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "HTTP", href: "/docs/networking/http" },
    { label: "TCP", href: "/docs/networking/tcp" },
    { label: "HTTPS", href: "/docs/networking/https" },
  ],

  summary: [
    "HTTP is an application-layer, request-response protocol: a client sends a method + path + headers (+ optional body), a server replies with a status code + headers (+ optional body).",
    "It's stateless — every request carries everything needed to process it, with no memory of prior requests, which is exactly what makes horizontal scaling of servers trivial.",
    "Methods encode intent (GET/POST/PUT/PATCH/DELETE); idempotency (same effect no matter how many times you repeat it) is what makes a method safe to retry automatically.",
    "Status codes are grouped by range: 2xx success, 3xx redirect, 4xx client error, 5xx server error — the range alone tells a client roughly how to react.",
    "HTTP runs on top of TCP (or, in HTTP/3, on top of QUIC/UDP) — HTTP defines the message format, the transport layer handles actually getting bytes there reliably.",
    "HTTP/1.1 → HTTP/2 → HTTP/3 is a story of removing head-of-line blocking: one connection at a time, then multiplexed streams over one TCP connection, then a UDP-based transport that removes blocking at the transport layer entirely.",
  ],

  whyAsked: [
    "It's baseline vocabulary — almost every design question eventually touches an API, and an interviewer wants confirmation you can talk precisely about methods, status codes, and statelessness before going further.",
    "Idempotency questions test whether you understand what's actually safe to retry, which matters directly for reliability and failure-handling design.",
    "It's the natural entry point into deeper protocol questions (HTTP/2 vs 3, WebSockets, gRPC) — an interviewer uses it to gauge how deep to go next.",
  ],

  thirtySecondAnswer:
    "HTTP is a stateless, application-layer request-response protocol: a client sends a method, path, headers, and optionally a body; the server replies with a status code, headers, and optionally a body. Methods encode intent — GET to read, POST to create, PUT/PATCH to update, DELETE to remove — and idempotency (whether repeating the same request has the same effect) determines what's safe to retry automatically. It runs on top of TCP by default, though HTTP/3 runs over QUIC/UDP instead specifically to avoid TCP's head-of-line blocking. Its statelessness is both its biggest strength, since any server can handle any request, making horizontal scaling trivial, and its biggest limitation, since sessions and real-time communication have to be built on top rather than assumed for free.",

  detailedAnswer: [
    "Request = method + path + headers + optional body; response = status code + headers + optional body — that's the entire message contract.",
    "Idempotent methods (GET, PUT, DELETE) are safe to retry automatically; non-idempotent ones (POST) risk duplicate side effects unless the API supports idempotency keys.",
    "Status code ranges tell you the category before you even read the specifics: 2xx success, 3xx redirect, 4xx client's fault, 5xx server's fault.",
    "Statelessness makes horizontal scaling trivial (no server needs to remember you) but pushes sessions, auth, and real-time push onto other layers (cookies/tokens, WebSockets).",
    "HTTP/1.1 opens one request at a time per connection (browsers work around it with parallel connections); HTTP/2 multiplexes many requests over one TCP connection; HTTP/3 swaps TCP for QUIC/UDP to kill transport-level head-of-line blocking entirely.",
  ],

  questions: [
    { id: "http-q1", question: "What does a basic HTTP request consist of?", answer: "A method (GET, POST, ...), a path, headers, and optionally a body.", topic: "Networking", difficulty: "Beginner" },
    { id: "http-q2", question: "What does a basic HTTP response consist of?", answer: "A status code, headers, and optionally a body.", topic: "Networking", difficulty: "Beginner" },
    { id: "http-q3", question: "What does 'idempotent' mean for an HTTP method?", answer: "Calling it multiple times has the same effect as calling it once — important because it determines whether it's safe to retry automatically.", topic: "Networking", difficulty: "Beginner" },
    { id: "http-q4", question: "Which common HTTP methods are idempotent?", answer: "GET, PUT, and DELETE are idempotent; POST and (usually) PATCH are not.", topic: "Networking", difficulty: "Beginner" },
    { id: "http-q5", question: "Why is it risky to blindly retry a failed POST request?", answer: "POST often creates a resource or triggers a side effect, so retrying it after a network failure can create a duplicate (e.g. double-charging a customer) unless the API supports idempotency keys.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q6", question: "What do the 4xx and 5xx status code ranges mean?", answer: "4xx means the client made a mistake (bad request, unauthorized, not found); 5xx means the server failed to handle an otherwise valid request.", topic: "Networking", difficulty: "Beginner" },
    { id: "http-q7", question: "What's the difference between a 401 and a 403 status code?", answer: "401 means the request isn't authenticated at all; 403 means it is authenticated, but the caller isn't authorized for that resource.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q8", question: "What does it mean that HTTP is stateless?", answer: "Every request must carry everything needed to process it — the server keeps no memory of previous requests from that client.", topic: "Networking", difficulty: "Beginner" },
    { id: "http-q9", question: "Why does HTTP's statelessness make horizontal scaling easier?", answer: "Since no server holds any client-specific state, any server instance can handle any incoming request, so a load balancer can freely distribute traffic across instances.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q10", question: "If HTTP is stateless, how do sessions and logins work at all?", answer: "State is reconstructed on every request via something the client sends back each time — a cookie or a bearer token — rather than the server remembering anything itself.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q11", question: "What transport protocol does HTTP/1.1 and HTTP/2 run on top of?", answer: "TCP — HTTP defines the message format, TCP handles reliable, ordered byte delivery underneath it.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q12", question: "What's the key limitation of HTTP/1.1 that HTTP/2 addresses?", answer: "HTTP/1.1 handles one request at a time per connection; HTTP/2 multiplexes many requests over a single TCP connection, plus adds header compression.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q13", question: "What does HTTP/3 change compared to HTTP/2?", answer: "It runs over QUIC (built on UDP) instead of TCP, removing head-of-line blocking at the transport layer, which especially helps on lossy networks like mobile.", topic: "Networking", difficulty: "Advanced" },
    { id: "http-q14", question: "How would you design a POST endpoint to be safely retryable?", answer: "Have the client send an idempotency key with the request; the server stores the result keyed by that value and returns the same result for a retried request instead of repeating the side effect.", topic: "Networking", difficulty: "Advanced" },
    { id: "http-q15", question: "Why is using GET for an action with side effects (like deleting something) a common mistake?", answer: "It breaks caching assumptions and idempotency expectations — a crawler, link preview, or automated retry could trigger the delete without the user ever intending it.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q16", question: "Why might an API return 200 OK with an error flag in the body instead of a proper 4xx/5xx code, and why is that a mistake?", answer: "It's often done to simplify client code, but it forces every client to parse the body to know if something failed, defeating the purpose of standard status codes and breaking generic error-handling middleware.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q17", question: "When would you choose WebSockets over plain HTTP?", answer: "For real-time, bidirectional communication (chat, live game state) — HTTP's request-response, stateless model isn't a good fit for that pattern.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q18", question: "Why might gRPC outperform plain REST-over-HTTP/1.1 for internal service-to-service calls?", answer: "gRPC uses a binary protocol and HTTP/2 multiplexing, which is more efficient for high-throughput, latency-sensitive internal traffic than repeated JSON-over-HTTP/1.1 requests.", topic: "Networking", difficulty: "Advanced" },
    { id: "http-q19", question: "What HTTP headers would you look at to determine the format and size of a request or response body?", answer: "Content-Type (format, e.g. application/json) and Content-Length (size in bytes) are the standard headers describing the body.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-q20", question: "Why do browsers open multiple parallel TCP connections under HTTP/1.1?", answer: "Because HTTP/1.1 only allows one request in flight per connection at a time (without pipelining complications), so parallel connections are a client-side workaround to load a page's many resources concurrently.", topic: "Networking", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"Which of these operations would you make idempotent, and how?\"",
    "\"How would you design this endpoint to be safely retryable?\"",
    "\"What's actually different at the wire level between HTTP/1.1, 2, and 3?\"",
  ],

  commonMistakes: [
    "Using GET for an action that has side effects.",
    "Blindly retrying non-idempotent POST requests without an idempotency key, risking duplicate side effects.",
    "Returning 200 OK for error conditions instead of the correct status code.",
    "Assuming HTTP statelessness means sessions can't exist — they can, just reconstructed per request via cookies/tokens.",
  ],

  interviewTraps: [
    "Being asked \"is this safe to retry\" is really asking whether you understand idempotency, not whether you know the word.",
    "\"Why not always use HTTP/3\" is testing whether you know it's a genuine trade-off (UDP-based, less universally supported/optimized in some environments) rather than a strictly-better replacement.",
  ],

  tradeoffs: [
    "Statelessness: trivial horizontal scaling, but sessions and real-time state have to be built on top rather than assumed.",
    "HTTP/1.1 simplicity and universal support vs. HTTP/2's multiplexing efficiency vs. HTTP/3's added complexity for lossy-network performance.",
  ],

  memoryTrick:
    "\"Method = intent, status = outcome.\" GET/POST/PUT/PATCH/DELETE says what you meant to do; 2xx/3xx/4xx/5xx says who's responsible for what happened.",

  realWorldExamples: [
    "Stripe's API is widely cited for well-designed HTTP practice: correct status codes, required idempotency keys on charge-creating POST requests, and structured JSON error bodies.",
    "A mobile app calling GET /api/feed to load a timeline, and POST /api/posts with an idempotency key so a flaky network retry never creates a duplicate post.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant Client
    participant Server
    Client->>Server: GET /users/123 HTTP/1.1
    Server-->>Client: HTTP/1.1 200 OK\\nContent-Type: application/json`,

  flashcards: [
    { id: "http-fc1", front: "HTTP — one-line definition", back: "A stateless, application-layer request-response protocol for client-server communication.", topic: "Networking", difficulty: "Beginner" },
    { id: "http-fc2", front: "Idempotent method", back: "One where repeating the request has the same effect as calling it once (GET, PUT, DELETE).", topic: "Networking", difficulty: "Beginner" },
    { id: "http-fc3", front: "401 vs 403", back: "401 = not authenticated at all. 403 = authenticated, but not authorized for this resource.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-fc4", front: "What does HTTP/2 add over HTTP/1.1?", back: "Multiplexing many requests over a single TCP connection, plus header compression.", topic: "Networking", difficulty: "Intermediate" },
    { id: "http-fc5", front: "What does HTTP/3 run over, and why?", back: "QUIC (built on UDP) instead of TCP, to eliminate transport-level head-of-line blocking.", topic: "Networking", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "HTTP",
    sections: [
      { heading: "Methods", items: ["GET — read, idempotent", "POST — create/action, not idempotent", "PUT — replace, idempotent", "PATCH — partial update, usually not idempotent", "DELETE — remove, idempotent"] },
      { heading: "Status ranges", items: ["2xx success", "3xx redirect", "4xx client error", "5xx server error"] },
      { heading: "Versions", items: ["1.1: one request/connection at a time", "2: multiplexed over one TCP connection", "3: over QUIC/UDP, no transport head-of-line blocking"] },
      { heading: "Watch for", items: ["Retry safety = idempotency", "Statelessness → sessions via cookies/tokens", "Correct status codes, not 200-with-error-flag"] },
    ],
  },

  speedNotes: [
    "Request = method + path + headers + body. Response = status + headers + body.",
    "Idempotent = safe to retry (GET, PUT, DELETE). POST isn't, unless idempotency key.",
    "Stateless → easy horizontal scaling, but sessions built on top (cookies/tokens).",
    "HTTP/1.1 → HTTP/2 (multiplex over TCP) → HTTP/3 (QUIC/UDP, no HOL blocking).",
    "401 = not authenticated. 403 = authenticated but not authorized.",
  ],
};
