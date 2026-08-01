import type { ConceptRevisionContent } from "./types";

export const longPolling: ConceptRevisionContent = {
  slug: "long-polling",
  title: "Long Polling",
  topic: "Networking",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  // No dedicated chapter exists for Long Polling yet — cross-link to the
  // closest related chapters, where it's covered as a stepping stone /
  // workaround discussion (WebSockets' "problem it solves" section, and
  // HTTP's request-response model that makes polling necessary at all).
  docLinks: [
    { label: "WebSockets", href: "/docs/networking/websockets" },
    { label: "HTTP", href: "/docs/networking/http" },
  ],

  summary: [
    "Long polling is a technique for faking server-to-client push on top of plain request-response HTTP: the client sends a request, and the server holds it open — without responding — until it actually has new data, or a timeout is reached.",
    "The moment the server responds (with data, or an empty timeout response), the client immediately opens a new long-poll request, so from the outside it looks like a continuous channel.",
    "It's a workaround, not a protocol feature — under the hood it's still ordinary HTTP request/response, just with an artificially delayed response.",
    "Compared to short/regular polling (client asks every N seconds regardless), long polling cuts wasted empty-response traffic and reduces latency for new-data delivery.",
    "Compared to WebSockets, it's simpler to deploy (works with any HTTP infrastructure, load balancer, proxy) but has higher per-message overhead and worse true-real-time latency.",
    "It ties up a server-side connection/thread for the duration of the hold, which is the main scalability cost — this is why it's usually paired with async I/O (event loops, non-blocking servers) rather than one-thread-per-connection.",
  ],

  whyAsked: [
    "It tests whether you understand that 'real-time' features can be built at different layers — protocol-level (WebSockets) vs. application-level workaround (long polling) — and whether you know the trade-offs between them.",
    "It's a good proxy for whether you understand connection-holding costs on the server side (threads, memory, load balancer timeouts) rather than just treating it as 'basically WebSockets.'",
    "Interviewers use it to see if you'd reach for the simplest workable solution (long polling needs no special infra) instead of always jumping to WebSockets even when the actual update frequency is low.",
  ],

  thirtySecondAnswer:
    "Long polling is a way to approximate server push using plain HTTP: the client sends a request, and instead of responding immediately, the server holds the connection open until it has new data to send, or until a timeout is hit — at which point the client immediately re-opens another long-poll request. It's still fundamentally request-response under the hood, just with a deliberately delayed response, so it works over ordinary HTTP infrastructure without needing a protocol upgrade. Compared to regular short polling, it reduces wasted empty responses and lowers the latency of getting new data. Compared to WebSockets, it's much simpler to deploy — no persistent bidirectional connection, no special proxy/load-balancer configuration — but it costs more per update (a full HTTP request/response cycle each time) and holds a server-side connection or thread open for the duration of the wait, which becomes the real scalability concern at high concurrency.",

  detailedAnswer: [
    "Mechanism: client sends request → server holds it open (no response) until new data exists or a timeout fires → server responds → client immediately sends a new request, repeating the cycle.",
    "It's an application-level pattern on top of standard HTTP, not a new protocol — any HTTP client/server/proxy can support it without special upgrades.",
    "Main scalability cost: each held-open request occupies a server-side connection (and often a thread), so a naive one-thread-per-connection server hits limits fast; async/event-loop servers handle it far better.",
    "Timeout handling matters: a sensible timeout (e.g. 20-30s) returns an empty response periodically so intermediate proxies/load balancers don't kill the connection for being idle too long.",
    "It sits between short polling (simplest, highest latency + most wasted requests) and WebSockets/SSE (most efficient, most infra complexity) on the real-time spectrum.",
    "Ordering and reconnection have to be handled by the application: if a long-poll request fails or a new one is slow to start, the client can miss updates unless the server tracks a 'last seen' cursor per client.",
  ],

  questions: [
    { id: "lp-q1", question: "What is long polling?", answer: "A technique where a client sends an HTTP request and the server deliberately holds it open until new data is available (or a timeout occurs), instead of responding immediately.", topic: "Networking", difficulty: "Beginner" },
    { id: "lp-q2", question: "Is long polling a separate protocol from HTTP?", answer: "No — it's an application-level pattern built entirely on ordinary HTTP request/response; there's no protocol upgrade involved.", topic: "Networking", difficulty: "Beginner" },
    { id: "lp-q3", question: "How does long polling differ from regular (short) polling?", answer: "Short polling asks 'anything new?' on a fixed timer regardless of whether there's new data, wasting requests. Long polling holds the request open until there actually is new data, cutting wasted empty responses and reducing latency.", topic: "Networking", difficulty: "Beginner" },
    { id: "lp-q4", question: "What happens when a long-poll request times out with no new data?", answer: "The server returns an empty (or 'no update') response, and the client immediately issues a new long-poll request to keep the cycle going.", topic: "Networking", difficulty: "Beginner" },
    { id: "lp-q5", question: "Why does long polling need a timeout at all — why not hold the connection open indefinitely?", answer: "Without a periodic response, intermediate proxies, load balancers, or the client itself may treat the connection as dead and close it, and the server has no clean way to detect a client that's actually gone.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q6", question: "What's the main server-side scalability cost of long polling?", answer: "Each open long-poll request occupies a server-side connection (and, on naive architectures, a dedicated thread) for the duration of the hold, which limits concurrent clients unless the server uses async/non-blocking I/O.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q7", question: "How would you architect a server to handle tens of thousands of concurrent long-poll connections?", answer: "Use an async, event-loop-based server (Node.js, Netty, async Python) rather than one-thread-per-connection, so held-open requests cost memory for a suspended coroutine/callback, not a full OS thread each.", topic: "Networking", difficulty: "Advanced" },
    { id: "lp-q8", question: "When would you choose long polling over WebSockets?", answer: "When updates are relatively infrequent, you want to avoid the operational complexity of persistent bidirectional connections, or your infrastructure (proxies, load balancers, corporate firewalls) doesn't reliably support WebSocket upgrades.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q9", question: "When would you choose WebSockets over long polling?", answer: "When you need true low-latency, high-frequency, bidirectional communication (chat, live gaming, collaborative editing) where the per-message overhead of repeated HTTP requests would be too costly.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q10", question: "Can a client miss updates between two long-poll requests?", answer: "Yes, if there's a gap between one request ending and the next starting — the server should track a cursor/version per client so a new request can immediately return anything missed in that gap.", topic: "Networking", difficulty: "Advanced" },
    { id: "lp-q11", question: "What's a real-world example of long polling still in use today?", answer: "Older or fallback implementations of chat and notification systems (and historically, libraries like Comet and early versions of Socket.IO) use long polling as a compatibility fallback when WebSockets aren't available.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q12", question: "Does long polling require the client to poll on a fixed interval?", answer: "No — that's the key difference from short polling; the client only re-requests immediately after the previous long-poll request returns (with data or a timeout), not on a fixed timer regardless of state.", topic: "Networking", difficulty: "Beginner" },
    { id: "lp-q13", question: "How does long polling interact with load balancers?", answer: "Load balancers need sufficiently long idle/read timeouts to avoid killing held-open requests prematurely, and sticky sessions may be needed if server-side state about the pending request lives on a specific instance.", topic: "Networking", difficulty: "Advanced" },
    { id: "lp-q14", question: "What's Server-Sent Events (SSE), and how does it compare to long polling?", answer: "SSE is a protocol-level, one-way (server-to-client) persistent connection over HTTP — more efficient than long polling for one-directional streaming updates, but still not bidirectional like WebSockets.", topic: "Networking", difficulty: "Advanced" },
    { id: "lp-q15", question: "Why might long polling be a reasonable interim choice before investing in WebSockets infrastructure?", answer: "It requires no special protocol support, works through virtually all existing HTTP infrastructure, and can validate the feature/product need before committing to the added operational complexity of persistent connections.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q16", question: "What's a common mistake when implementing long polling?", answer: "Not setting a reasonable server-side timeout, which risks intermediate infrastructure silently killing connections and the server never noticing the client is effectively gone.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q17", question: "How does long polling affect server resource usage compared to WebSockets, per active client?", answer: "Long polling repeats a full HTTP request/response cycle (headers, connection setup overhead) per update, whereas WebSockets pay connection setup cost once and then send minimal framing overhead per message.", topic: "Networking", difficulty: "Advanced" },
    { id: "lp-q18", question: "Is long polling suitable for bidirectional communication?", answer: "Not naturally — long polling is client-initiated request/response, so client-to-server messages still go over ordinary requests; it approximates only the server-to-client push direction well.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q19", question: "What HTTP status/response would a well-designed long-poll timeout return?", answer: "A normal 200 OK with an empty or 'no new data' payload — not an error — so clients can distinguish 'nothing changed' from an actual failure.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-q20", question: "Summarize long polling in one sentence.", answer: "A request-response workaround for near-real-time updates, where the server holds a client's request open until there's new data (or a timeout), trading extra per-update overhead for much simpler infrastructure than a persistent protocol like WebSockets.", topic: "Networking", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"How would this scale to 100k concurrent clients?\"",
    "\"Why not just use WebSockets from the start?\"",
    "\"How do you avoid missing updates between two long-poll requests?\"",
  ],

  commonMistakes: [
    "Describing long polling as if it were a persistent connection like WebSockets, rather than repeated request/response.",
    "Forgetting to set a server-side timeout, risking silent connection kills by proxies/load balancers.",
    "Assuming a naive thread-per-connection server can handle long polling at scale without async I/O.",
    "Not accounting for missed updates in the gap between one long-poll request ending and the next beginning.",
  ],

  interviewTraps: [
    "\"Isn't long polling basically the same as WebSockets?\" is testing whether you know it's still discrete HTTP request/response underneath, not a persistent channel.",
    "Being asked to scale it is testing whether you reach for async I/O rather than assuming more threads/servers solves a fundamentally per-connection-blocking design.",
  ],

  tradeoffs: [
    "Vs. short polling: less wasted traffic and lower update latency, at the cost of holding server connections open longer.",
    "Vs. WebSockets: much simpler infrastructure (plain HTTP) but higher per-update overhead and worse true real-time latency.",
    "Simplicity of implementation vs. the operational need for async/non-blocking servers to scale it well.",
  ],

  comparisonTable: {
    title: "Short Polling vs Long Polling vs WebSockets",
    columns: ["Short Polling", "Long Polling", "WebSockets"],
    rows: [
      { label: "Connection model", values: ["New request every interval", "Held-open request, re-opened after response", "Single persistent connection"] },
      { label: "Update latency", values: ["Up to one interval", "Near-immediate", "Immediate"] },
      { label: "Wasted traffic", values: ["High (empty responses)", "Low", "Minimal"] },
      { label: "Server cost per client", values: ["Low, bursty", "One held connection/thread", "One persistent connection"] },
      { label: "Infra complexity", values: ["None", "Low", "Higher (proxies, LB config)"] },
      { label: "Bidirectional?", values: ["No", "No (client-initiated only)", "Yes"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "lp-root",
    question: "What are your real-time requirements and infra constraints?",
    options: [
      {
        label: "Updates are infrequent, want minimal infra complexity",
        next: {
          kind: "result",
          id: "lp-shortpoll",
          result: "Short polling is probably enough.",
          rationale: "If staleness of a few seconds is fine and volume is low, the simplicity of a timer-based request beats the complexity of holding connections open.",
        },
      },
      {
        label: "Need near-real-time updates, but simple infra / uncertain WebSocket support",
        next: {
          kind: "result",
          id: "lp-longpoll",
          result: "Long polling is a solid middle ground.",
          rationale: "It gets close to real-time delivery without needing WebSocket-aware load balancers/proxies or a persistent-connection architecture.",
        },
      },
      {
        label: "Need true low-latency, high-frequency, or bidirectional communication",
        next: {
          kind: "result",
          id: "lp-ws",
          result: "Use WebSockets (or SSE if one-directional).",
          rationale: "The per-message overhead of repeated HTTP requests becomes the bottleneck at high update frequency — a persistent connection removes that cost.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Long polling = a request that pretends to be patient.\" Same HTTP request/response as always — the server just waits to answer until it actually has something to say.",

  realWorldExamples: [
    "Older chat and notification systems (and libraries like Comet, and early Socket.IO transport negotiation) use long polling as a WebSocket-unavailable fallback.",
    "Some internal dashboards and admin tools use long polling for 'live-ish' updates where full WebSocket infrastructure would be overkill for the update frequency involved.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant Client
    participant Server
    Client->>Server: GET /updates (request held open)
    Note over Server: waits until new data or timeout
    Server-->>Client: 200 OK (new data)
    Client->>Server: GET /updates (immediately re-opened)
    Note over Server: waits again...
    Server-->>Client: 200 OK (timeout, empty)
    Client->>Server: GET /updates (immediately re-opened)`,

  flashcards: [
    { id: "lp-fc1", front: "Long polling — one-line definition", back: "Client sends a request; the server holds it open until new data exists (or a timeout), then the client immediately re-requests.", topic: "Networking", difficulty: "Beginner" },
    { id: "lp-fc2", front: "Long polling vs short polling", back: "Short polling asks on a fixed timer regardless of new data; long polling only responds once there's actually something new (or times out).", topic: "Networking", difficulty: "Beginner" },
    { id: "lp-fc3", front: "Main scalability cost of long polling", back: "Each held-open request ties up a server-side connection/thread — needs async/non-blocking I/O to scale to many concurrent clients.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-fc4", front: "Long polling vs WebSockets — key trade-off", back: "Long polling: simpler infra, higher per-update overhead. WebSockets: more efficient and truly real-time, but more infra complexity.", topic: "Networking", difficulty: "Intermediate" },
    { id: "lp-fc5", front: "Why does a long-poll request need a timeout?", back: "So proxies/load balancers don't kill it for being idle, and the server has a clean way to detect if the client is still there.", topic: "Networking", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Long Polling",
    sections: [
      { heading: "Mechanism", items: ["Client requests → server holds open", "Server responds on new data or timeout", "Client immediately re-requests"] },
      { heading: "Vs alternatives", items: ["Short polling: wasteful, higher latency", "WebSockets: efficient, bidirectional, more infra", "SSE: efficient one-way, simpler than WebSockets"] },
      { heading: "Scaling", items: ["Needs async/event-loop server, not thread-per-connection", "Set sane timeouts (~20-30s)", "Track a cursor per client to avoid missed updates"] },
      { heading: "Watch for", items: ["It's still plain HTTP request/response", "Load balancer idle-timeout settings matter", "No native bidirectional support"] },
    ],
  },

  speedNotes: [
    "Long poll = request held open until new data or timeout, then re-request.",
    "Still plain HTTP — no protocol upgrade, unlike WebSockets.",
    "Scaling bottleneck: one connection/thread held per client — use async I/O.",
    "Simpler infra than WebSockets, but more per-update overhead.",
    "Track a per-client cursor to avoid missing updates between requests.",
  ],
};
