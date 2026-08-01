import type { ConceptRevisionContent } from "./types";

export const grpc: ConceptRevisionContent = {
  slug: "grpc",
  title: "gRPC",
  topic: "Networking",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "gRPC", href: "/docs/networking/grpc" },
    { label: "HTTP", href: "/docs/networking/http" },
    { label: "REST", href: "/docs/networking/rest" },
  ],

  summary: [
    "gRPC is an open-source RPC framework built by Google that lets a client call a method on a remote server as if it were a local function call, built on top of HTTP/2.",
    "It uses Protocol Buffers (protobuf) — a compact binary serialization format — for both the wire format and the strongly typed service contract (.proto files), instead of JSON.",
    "It's built for internal, high-volume, service-to-service traffic where the overhead of JSON parsing and HTTP/1.1's connection limits become a real cost at scale.",
    "HTTP/2 gives it multiplexed streams over a single connection, plus native support for four call patterns: unary, server-streaming, client-streaming, and bidirectional streaming.",
    "The strongly typed .proto contract is generated into client/server code in many languages, giving compile-time safety across service boundaries that JSON-over-REST doesn't have.",
    "The trade-off is human-readability and browser support: binary payloads aren't debuggable by eyeballing a request the way JSON is, and browsers need a gRPC-Web proxy layer since browsers can't speak raw HTTP/2 gRPC framing directly.",
  ],

  whyAsked: [
    "It tests whether you know when internal service-to-service performance actually justifies moving off REST/JSON, rather than defaulting to gRPC everywhere as a buzzword.",
    "The streaming call patterns (unary vs the three streaming modes) reveal whether you understand gRPC as more than 'REST but binary' — it's a genuinely different communication model.",
    "It's a good test of whether you can reason about strongly typed contracts across services (protobuf/.proto) as a real design lever for large microservice fleets, not just a performance detail.",
  ],

  thirtySecondAnswer:
    "gRPC is an open-source RPC framework from Google that lets a client call a method on a remote service as if it were local, built on HTTP/2 and using Protocol Buffers — a compact binary serialization format — instead of JSON, for both the wire format and a strongly typed service contract defined in .proto files. It's purpose-built for internal, high-volume service-to-service communication, where JSON parsing overhead and HTTP/1.1's one-request-per-connection limitation become real costs at scale. HTTP/2 gives it multiplexed streams over a single connection and native support for four call patterns: simple request-response (unary), and three streaming variants — server-streaming, client-streaming, and full bidirectional streaming. The .proto contract is compiled into strongly typed client and server code across many languages, catching mismatches at compile time rather than at runtime the way loosely typed JSON APIs often do. The trade-off is that binary payloads aren't human-readable for quick debugging, and browsers can't speak gRPC's HTTP/2 framing directly, so browser clients need a gRPC-Web proxy layer in between.",

  detailedAnswer: [
    "Wire format: Protocol Buffers — a compact binary encoding, smaller and faster to (de)serialize than JSON, defined by a shared .proto schema between client and server.",
    "Transport: HTTP/2, giving multiplexed concurrent streams over one TCP connection — no head-of-line blocking at the HTTP layer, unlike HTTP/1.1.",
    "Four call patterns: unary (single request, single response), server-streaming (one request, stream of responses), client-streaming (stream of requests, one response), and bidirectional streaming (both sides stream independently).",
    "Strong typing: the .proto file is the single source of truth, compiled into client/server stubs across many languages — mismatches between services surface at compile time, not as a runtime JSON-parsing surprise.",
    "Best fit: internal, high-throughput, latency-sensitive service-to-service calls, especially in polyglot microservice fleets where one shared typed contract avoids per-language ad-hoc client code.",
    "Cost: binary payloads aren't human-readable (harder ad-hoc debugging than curl-ing a JSON endpoint), and native browser support doesn't exist — gRPC-Web requires a proxy translating between browser-compatible HTTP and native gRPC.",
  ],

  questions: [
    { id: "grpc-q1", question: "What is gRPC, fundamentally?", answer: "An open-source RPC framework from Google that lets a client call a method on a remote server as if it were a local function call, built on HTTP/2 and Protocol Buffers.", topic: "Networking", difficulty: "Beginner" },
    { id: "grpc-q2", question: "What serialization format does gRPC use by default, and why?", answer: "Protocol Buffers (protobuf) — a compact binary format that's faster to serialize/deserialize and produces smaller payloads than JSON.", topic: "Networking", difficulty: "Beginner" },
    { id: "grpc-q3", question: "What transport protocol does gRPC run on, and what does that give it?", answer: "HTTP/2 — giving it multiplexed streams over a single TCP connection, avoiding the one-request-per-connection limitation of HTTP/1.1.", topic: "Networking", difficulty: "Beginner" },
    { id: "grpc-q4", question: "What are the four call patterns gRPC natively supports?", answer: "Unary (single request/response), server-streaming, client-streaming, and bidirectional streaming.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-q5", question: "What is a .proto file, and what's its role?", answer: "A schema file defining a gRPC service's methods and message types; it's compiled into strongly typed client/server code in many languages, serving as the single shared contract between services.", topic: "Networking", difficulty: "Beginner" },
    { id: "grpc-q6", question: "Why is gRPC typically preferred for internal microservice communication over REST?", answer: "At high call volumes, protobuf's compact binary encoding and HTTP/2 multiplexing reduce serialization and connection overhead meaningfully compared to repeated JSON-over-HTTP/1.1 requests.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-q7", question: "Why is gRPC generally a poor fit for public-facing browser clients?", answer: "Browsers can't speak gRPC's native HTTP/2 framing directly, so a proxy layer (gRPC-Web) is needed to translate between browser-compatible HTTP requests and native gRPC calls to the backend.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-q8", question: "What's a downside of gRPC's binary payload format compared to REST's JSON?", answer: "It's not human-readable, so ad-hoc debugging (curl-ing an endpoint and eyeballing the response) is harder — you generally need proto-aware tooling (e.g. grpcurl) instead.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-q9", question: "How does gRPC's strong typing help in a large polyglot microservice fleet?", answer: "Every service consumes the same generated stubs from one .proto contract, so a schema mismatch between two services in different languages is caught at compile time rather than surfacing as a runtime error.", topic: "Networking", difficulty: "Advanced" },
    { id: "grpc-q10", question: "Give an example of when server-streaming would be the right gRPC call pattern.", answer: "A client requesting a large result set (e.g. search results, log lines) where the server can start sending results incrementally as they're found rather than waiting to assemble the entire response first.", topic: "Networking", difficulty: "Advanced" },
    { id: "grpc-q11", question: "Give an example of when bidirectional streaming would be the right gRPC call pattern.", answer: "A real-time collaborative feature (e.g. live chat, multiplayer game state sync) where both client and server need to send updates to each other independently over the same long-lived call.", topic: "Networking", difficulty: "Advanced" },
    { id: "grpc-q12", question: "How does gRPC handle backward compatibility when a service's schema evolves?", answer: "Protobuf assigns numbered fields; new fields can be added with new numbers, and old fields can be deprecated without renumbering, letting old and new clients/servers interoperate as long as field numbers aren't reused or removed carelessly.", topic: "Networking", difficulty: "Advanced" },
    { id: "grpc-q13", question: "Why might a team choose gRPC even for moderate traffic, beyond raw performance?", answer: "The strongly typed, code-generated contract reduces integration bugs across many services and languages — a design/maintainability benefit independent of the specific throughput gains.", topic: "Networking", difficulty: "Advanced" },
    { id: "grpc-q14", question: "What does gRPC use for built-in deadline/timeout propagation, and why does that matter?", answer: "gRPC supports passing a deadline along a call chain so downstream services know how much time remains for the overall request — helpful for preventing wasted work on requests the caller has already given up on.", topic: "Networking", difficulty: "Advanced" },
    { id: "grpc-q15", question: "Why is gRPC generally not cached the way REST responses are?", answer: "Because gRPC calls are RPC-style method invocations rather than resource-URL fetches, there's no natural per-URL cache key the way HTTP/CDN caching relies on for REST GET requests.", topic: "Networking", difficulty: "Advanced" },
    { id: "grpc-q16", question: "What's a common mistake teams make when adopting gRPC for a public API?", answer: "Underestimating the need for a gRPC-Web proxy and the loss of easy human-readable debugging/tooling that public API consumers often expect from REST/JSON.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-q17", question: "How does gRPC's connection model compare to a REST client making repeated HTTP/1.1 calls?", answer: "gRPC multiplexes many concurrent calls over a single persistent HTTP/2 connection, whereas HTTP/1.1 REST clients often open multiple parallel connections to work around one-request-at-a-time-per-connection limits.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-q18", question: "Is gRPC tied to a specific programming language?", answer: "No — protobuf and gRPC tooling generate client/server stubs for many languages (Go, Java, Python, C++, and more) from the same .proto definition, which is part of its appeal in polyglot systems.", topic: "Networking", difficulty: "Beginner" },
    { id: "grpc-q19", question: "What's a scenario where REST would still beat gRPC despite gRPC's performance advantages?", answer: "A public API meant to be broadly consumed, easily debugged with common HTTP tools, and cached at the CDN/HTTP layer — REST's simplicity and universal tooling outweigh gRPC's throughput benefits there.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-q20", question: "Summarize gRPC in one sentence.", answer: "A high-performance RPC framework over HTTP/2 using binary Protocol Buffers and a strongly typed schema, purpose-built for fast, typed internal service-to-service communication rather than public/browser-facing APIs.", topic: "Networking", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Why not just use REST internally too, for consistency?\"",
    "\"How would a browser client talk to this gRPC service?\"",
    "\"Which of the four call patterns fits this specific use case, and why?\"",
  ],

  commonMistakes: [
    "Assuming gRPC is a drop-in replacement for REST everywhere, including public/browser-facing APIs, without accounting for gRPC-Web's added complexity.",
    "Treating all gRPC calls as unary request-response, missing opportunities to use streaming patterns where they fit naturally.",
    "Reusing or renumbering protobuf field numbers during schema evolution, breaking backward compatibility.",
    "Underestimating the debugging/tooling gap versus JSON — needing proto-aware tools instead of a plain curl request.",
  ],

  interviewTraps: [
    "\"So gRPC is just faster REST?\" is testing whether you understand it as a genuinely different RPC + streaming model, not merely a binary encoding of the same REST semantics.",
    "\"Would you use gRPC for your public API?\" is testing whether you recognize the browser-support and human-readability trade-offs, not just gRPC's raw performance numbers.",
  ],

  tradeoffs: [
    "Performance and strong typing (compact binary, compile-time contract) vs. human-readability and ad-hoc debuggability (need proto-aware tooling, not curl).",
    "Native streaming support for real-time/bidirectional patterns vs. lack of native browser support (requires a gRPC-Web proxy).",
    "Best for internal polyglot microservice fleets; weaker fit for public APIs needing broad client compatibility and HTTP caching.",
  ],

  comparisonTable: {
    title: "gRPC vs REST",
    columns: ["gRPC", "REST"],
    rows: [
      { label: "Format", values: ["Binary (Protobuf)", "Text (JSON)"] },
      { label: "Transport", values: ["HTTP/2 (multiplexed)", "HTTP/1.1+ (one resource per URL)"] },
      { label: "Typing", values: ["Strong, compile-time (.proto)", "Loose, runtime (JSON schema optional)"] },
      { label: "Call patterns", values: ["Unary + 3 streaming modes", "Request-response only"] },
      { label: "Browser support", values: ["Needs gRPC-Web proxy", "Native"] },
      { label: "Best fit", values: ["Internal service-to-service", "Public/general web APIs"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "grpc-root",
    question: "Is this an internal, service-to-service call or a public/browser-facing API?",
    options: [
      {
        label: "Internal, high-volume, latency-sensitive service-to-service traffic",
        next: {
          kind: "result",
          id: "grpc-pick",
          result: "gRPC is a strong fit.",
          rationale: "Binary protobuf and HTTP/2 multiplexing meaningfully cut overhead at high internal call volumes, and the shared typed contract helps across many services/languages.",
        },
      },
      {
        label: "Public API or browser clients need to call it directly",
        next: {
          kind: "result",
          id: "grpc-rest",
          result: "Prefer REST (or GraphQL) instead.",
          rationale: "Native browser support, human-readable payloads, and simple HTTP caching matter more for public-facing consumption than gRPC's internal performance edge.",
        },
      },
    ],
  },

  memoryTrick:
    "\"gRPC = calling a function, not fetching a resource.\" Think method call across the network — typed, binary, streaming-capable — not a URL you GET.",

  realWorldExamples: [
    "Google's own internal service infrastructure uses gRPC (and its predecessor Stubby) extensively for service-to-service communication at massive scale.",
    "Netflix uses gRPC for a significant portion of internal microservice communication where low latency and high throughput between services matter.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant ServiceA
    participant ServiceB
    Note over ServiceA,ServiceB: Single persistent HTTP/2 connection
    ServiceA->>ServiceB: GetUser(id) [protobuf, unary]
    ServiceB-->>ServiceA: User{...} [protobuf]
    ServiceA->>ServiceB: StreamOrders(userId) [server-streaming]
    ServiceB-->>ServiceA: Order 1
    ServiceB-->>ServiceA: Order 2
    ServiceB-->>ServiceA: Order 3`,

  flashcards: [
    { id: "grpc-fc1", front: "gRPC — one-line definition", back: "An RPC framework over HTTP/2 using binary Protocol Buffers, letting a client call a remote method as if it were local.", topic: "Networking", difficulty: "Beginner" },
    { id: "grpc-fc2", front: "gRPC's four call patterns", back: "Unary, server-streaming, client-streaming, bidirectional streaming.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-fc3", front: "Why gRPC for internal service-to-service calls?", back: "Compact binary encoding + HTTP/2 multiplexing beats JSON-over-HTTP/1.1 at high call volumes, plus a shared strongly typed contract.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-fc4", front: "Why doesn't a browser call gRPC directly?", back: "Browsers can't speak gRPC's native HTTP/2 framing — needs a gRPC-Web proxy translating to/from browser-compatible HTTP.", topic: "Networking", difficulty: "Intermediate" },
    { id: "grpc-fc5", front: ".proto file's role", back: "Defines the service's methods/messages; compiled into strongly typed client/server stubs across many languages.", topic: "Networking", difficulty: "Beginner" },
  ],

  cheatSheet: {
    title: "gRPC",
    sections: [
      { heading: "Core", items: ["Binary: Protocol Buffers", "Transport: HTTP/2 (multiplexed)", "Contract: .proto → generated stubs"] },
      { heading: "Call patterns", items: ["Unary", "Server-streaming", "Client-streaming", "Bidirectional streaming"] },
      { heading: "Best fit", items: ["Internal, high-volume, polyglot microservices", "Latency-sensitive service-to-service calls"] },
      { heading: "Watch for", items: ["No native browser support (gRPC-Web needed)", "Not human-readable (need proto-aware tools)", "No natural HTTP-style caching"] },
    ],
  },

  speedNotes: [
    "gRPC = RPC over HTTP/2 + binary Protobuf, not resource URLs.",
    "Four call patterns: unary, server-stream, client-stream, bidirectional.",
    ".proto = shared typed contract → generated stubs, many languages.",
    "Best for internal service-to-service traffic, not public/browser APIs.",
    "No native browser support — needs gRPC-Web proxy; hard to cache.",
  ],
};
