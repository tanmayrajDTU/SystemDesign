import type { ConceptRevisionContent } from "./types";

export const reverseProxy: ConceptRevisionContent = {
  slug: "reverse-proxy",
  title: "Reverse Proxy",
  topic: "Networking",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Reverse Proxy", href: "/docs/networking/reverse-proxy" },
    { label: "Proxy", href: "/docs/networking/proxy" },
  ],

  summary: [
    "A reverse proxy sits in front of one or more backend servers, forwarding client requests to them — from the client's perspective, the reverse proxy *is* the server.",
    "It exists so backend servers don't need to be exposed directly to the internet, each independently handling TLS, hardening, and attack traffic.",
    "Common responsibilities: load balancing, TLS termination, caching, path-based request routing, and security (hiding backend topology, rate limiting).",
    "It's the mirror image of a forward proxy: a reverse proxy represents servers to the outside world, a forward proxy represents clients.",
    "It's almost universally recommended in front of any backend exposed to real traffic — even a single backend server benefits from centralized TLS and hardening.",
    "Because it now sits on the critical path for every request, the reverse proxy itself needs redundancy — otherwise it becomes a new single point of failure for everything behind it.",
  ],

  whyAsked: [
    "It's a near-default component in real architectures, so interviewers expect a candidate to reach for it and explain why, not just name-drop it.",
    "It checks whether a candidate reasons about the reverse proxy's own availability requirements, not just the benefits it provides.",
    "The forward-vs-reverse distinction is a common precision check on networking vocabulary.",
  ],

  thirtySecondAnswer:
    "A reverse proxy sits in front of one or more backend servers and forwards client requests to them — from the client's perspective, the reverse proxy is the server, and the actual backends behind it are invisible. It exists so backend servers don't each need to independently handle TLS termination, security hardening, and direct exposure to the internet; the reverse proxy centralizes load balancing, TLS termination, caching, and path-based routing into one well-defended layer. It's the mirror image of a forward proxy, which represents clients rather than servers. Because it now sits on the critical path for every single request, the reverse proxy itself needs to be deployed redundantly — otherwise it becomes a new single point of failure for everything behind it.",

  detailedAnswer: [
    "A reverse proxy forwards client requests to backend servers; clients only ever see the proxy, not the backends themselves.",
    "It centralizes TLS termination, load balancing, path-based routing, caching, and security hardening in one layer instead of duplicating it per backend.",
    "It's the mirror image of a forward proxy: reverse proxies represent servers, forward proxies represent clients.",
    "It's recommended almost universally in front of production backends, even a single server, for the TLS/hardening/abstraction benefits alone.",
    "It must be deployed with its own redundancy — a reverse proxy on the critical path for every request is a new single point of failure if run as a single instance.",
  ],

  questions: [
    { id: "rp-q1", question: "What is a reverse proxy, in one sentence?", answer: "A server that sits in front of one or more backend servers, forwarding client requests to them and returning responses as if it had produced them itself.", topic: "Networking", difficulty: "Beginner" },
    { id: "rp-q2", question: "What does the client see in a reverse proxy setup?", answer: "The reverse proxy itself — the actual backend server(s) behind it are invisible to the client.", topic: "Networking", difficulty: "Beginner" },
    { id: "rp-q3", question: "Why shouldn't backend servers typically be exposed directly to the internet?", answer: "Each one would need to independently handle TLS, security hardening, and direct exposure to attack traffic — a reverse proxy centralizes all of that into one well-defended layer instead.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q4", question: "Name four common responsibilities of a reverse proxy.", answer: "Load balancing, TLS termination, caching, and path-based request routing (plus general security/rate limiting).", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q5", question: "What is TLS termination, in the context of a reverse proxy?", answer: "Handling HTTPS encryption/decryption once, at the proxy, so backend servers can communicate over plain HTTP internally without each managing their own certificates.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q6", question: "How does a reverse proxy enable backend changes without clients noticing?", answer: "Clients only ever talk to the stable reverse proxy; backend servers can be added, removed, or replaced behind it freely, since the client-facing address never changes.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q7", question: "What's the core difference between a reverse proxy and a forward proxy?", answer: "A reverse proxy represents servers to the outside world; a forward proxy represents clients — same underlying mechanism, opposite side of the connection.", topic: "Networking", difficulty: "Beginner" },
    { id: "rp-q8", question: "Why would you use a reverse proxy even with only one backend server?", answer: "For the TLS termination, security hardening, and abstraction benefits alone — it's cheap insurance and makes future scaling (adding more backends) transparent later.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q9", question: "Why is the reverse proxy itself a risk if deployed as a single instance?", answer: "It sits on the critical path for every request — if it goes down, it takes down access to everything behind it, becoming a new single point of failure.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q10", question: "How do you make the reverse proxy layer itself highly available?", answer: "Deploy multiple instances with a lower-level load balancer or DNS in front of them, applying the same redundancy techniques one layer earlier.", topic: "Networking", difficulty: "Advanced" },
    { id: "rp-q11", question: "What is path-based routing in a reverse proxy?", answer: "Sending different URL paths (e.g. /api/* vs /static/*) to different backend services based on rules configured at the proxy.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q12", question: "How can a reverse proxy reduce load on backend servers directly?", answer: "By caching cacheable responses itself, serving repeat requests without ever forwarding them to the backend.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q13", question: "What's a real-world example of software commonly used as a reverse proxy?", answer: "Nginx or Envoy, deployed in front of a fleet of application servers to handle TLS termination, routing, and load balancing.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q14", question: "What's a common mistake with reverse proxy deployment?", answer: "Running only a single instance, making it a new single point of failure for the whole system, despite it protecting the backends behind it well.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q15", question: "When might a dedicated reverse proxy layer be unnecessary?", answer: "For purely internal services communicating only within a trusted private network, with no external exposure and no need for load balancing across instances.", topic: "Networking", difficulty: "Beginner" },
    { id: "rp-q16", question: "What's the latency cost of introducing a reverse proxy?", answer: "It adds one network hop to every request, a small but real amount of extra latency in exchange for its centralized benefits.", topic: "Networking", difficulty: "Beginner" },
    { id: "rp-q17", question: "How does a reverse proxy relate to a service mesh?", answer: "A service mesh's data plane (e.g. Envoy) is essentially a reverse-proxy-like sidecar deployed alongside every service instance, applying the same routing/security concerns at a more granular, per-service level.", topic: "Networking", difficulty: "Advanced" },
    { id: "rp-q18", question: "Why does centralizing rate limiting at the reverse proxy make sense?", answer: "It avoids duplicating the same rate-limiting logic in every backend service, applying a consistent policy in one place instead.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-q19", question: "What's the trade-off of concentrating so many responsibilities (TLS, routing, caching) into one reverse proxy layer?", answer: "It simplifies backend servers considerably, but concentrates operational importance and risk onto that layer, which now needs careful configuration and its own redundancy since it's on the critical path for every request.", topic: "Networking", difficulty: "Advanced" },
    { id: "rp-q20", question: "How would you explain a reverse proxy to someone non-technical?", answer: "Like a hotel front desk — guests call the front desk, not individual room phones directly, and the front desk decides which room actually handles the call without the caller needing to know or care.", topic: "Networking", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Why would you put a reverse proxy in front of your backend even if you only have one backend server today?\"",
    "\"How do you avoid the reverse proxy itself becoming a single point of failure?\"",
    "\"What's the difference between a forward proxy and a reverse proxy?\"",
  ],

  commonMistakes: [
    "Deploying only a single reverse proxy instance, making it a new single point of failure.",
    "Confusing forward and reverse proxies — they solve genuinely different problems for opposite parties.",
    "Not offloading TLS termination to the proxy, leaving every backend server to manage its own certificates unnecessarily.",
  ],

  interviewTraps: [
    "\"Why bother with a reverse proxy for just one backend server?\" is testing whether you value TLS termination and hardening on their own merits, not just load balancing.",
    "Being asked about reverse proxy availability is checking you don't treat it as inherently reliable just because it protects everything else.",
  ],

  tradeoffs: [
    "Centralizing TLS, routing, and security simplifies backend servers but concentrates risk and operational importance onto the proxy layer.",
    "An added network hop (small latency cost) in exchange for abstraction, load balancing, and centralized hardening.",
  ],

  comparisonTable: {
    title: "Reverse Proxy vs Forward Proxy",
    columns: ["Reverse Proxy", "Forward Proxy"],
    rows: [
      { label: "Sits in front of", values: ["Servers", "Clients"] },
      { label: "Represents", values: ["The server, to the outside world", "The client, to the outside world"] },
      { label: "Hides", values: ["The server's identity/topology from the client", "The client's identity from the destination"] },
      { label: "Typical use", values: ["Load balancing, TLS termination, backend protection", "Corporate filtering, VPNs, anonymizing outbound requests"] },
    ],
  },

  memoryTrick:
    "\"Reverse proxy is the hotel front desk.\" You call the front desk, not a room directly — it decides which room (backend) actually takes the call, and you never need to know which one it was.",

  realWorldExamples: [
    "Nginx or Envoy deployed in front of an application server fleet: terminating TLS, routing /api/* and /static/* to different services, and load-balancing across healthy instances.",
    "Envoy, originally built at Lyft, is now widely used as the data plane for service meshes — a reverse-proxy pattern applied at a per-service, sidecar level.",
  ],

  mermaidDiagram: `flowchart LR
    Client -->|HTTPS request| RP[Reverse Proxy]
    RP -->|/api/*| API[API Servers]
    RP -->|/static/*| Static[Static File Servers]
    RP -->|health checks| API`,

  flashcards: [
    { id: "rp-fc1", front: "Reverse proxy — one-line definition", back: "A server in front of backend(s), forwarding client requests — clients only ever see the proxy.", topic: "Networking", difficulty: "Beginner" },
    { id: "rp-fc2", front: "Reverse proxy vs forward proxy", back: "Reverse proxy represents servers; forward proxy represents clients.", topic: "Networking", difficulty: "Beginner" },
    { id: "rp-fc3", front: "Four common reverse proxy responsibilities", back: "Load balancing, TLS termination, caching, path-based routing.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-fc4", front: "Why use a reverse proxy with just one backend server?", back: "TLS termination, security hardening, and abstraction benefits alone justify it.", topic: "Networking", difficulty: "Intermediate" },
    { id: "rp-fc5", front: "Why must a reverse proxy be deployed redundantly?", back: "It's on the critical path for every request — a single instance is a new single point of failure.", topic: "Networking", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Reverse Proxy",
    sections: [
      { heading: "Represents", items: ["The server, to the client"] },
      { heading: "Responsibilities", items: ["Load balancing", "TLS termination", "Caching", "Path-based routing", "Security/rate limiting"] },
      { heading: "Risks", items: ["New single point of failure if not redundant", "Adds a network hop"] },
      { heading: "Not this", items: ["Forward proxy — represents clients, not servers"] },
    ],
  },

  speedNotes: [
    "Reverse proxy = represents the server, faces the client.",
    "Client sees only the proxy; backends are invisible.",
    "Responsibilities: load balancing, TLS termination, caching, routing.",
    "Use it even with one backend, for TLS/hardening alone.",
    "Must be deployed redundantly — it's a critical-path component.",
  ],
};
