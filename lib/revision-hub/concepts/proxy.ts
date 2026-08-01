import type { ConceptRevisionContent } from "./types";

export const proxy: ConceptRevisionContent = {
  slug: "proxy",
  title: "Proxy (Forward Proxy)",
  topic: "Networking",
  difficulty: "Beginner",
  estimatedMinutes: 8,

  docLinks: [
    { label: "Proxy", href: "/docs/networking/proxy" },
    { label: "Reverse Proxy", href: "/docs/networking/reverse-proxy" },
  ],

  summary: [
    "A (forward) proxy sits between clients and the wider internet, forwarding client requests outward — the destination server sees the proxy, not the original client.",
    "It exists to centralize control, monitoring, or anonymization of outbound traffic for a group of clients, without changing anything about the destination servers.",
    "Common uses: content filtering, anonymization, caching of frequently requested external content, and logging/monitoring of outbound traffic.",
    "It's the mirror image of a reverse proxy: a forward proxy represents clients to the outside world; a reverse proxy represents servers to the outside world.",
    "It's a genuine dual-use tool — the same mechanism that enables corporate content filtering or privacy can also enable surveillance or censorship, depending on who operates it.",
    "Because all outbound traffic passes through it, a forward proxy is both a single point of failure and a potential bottleneck if not deployed redundantly.",
  ],

  whyAsked: [
    "It's mostly asked to check the forward-vs-reverse proxy distinction is solid — this pairing is one of the most commonly confused in system design vocabulary.",
    "It surfaces whether a candidate thinks about centralized policy/control trade-offs (a bottleneck and SPOF risk) rather than just the feature list.",
    "It's a quick check on whether a candidate recognizes the dual-use, privacy-sensitive nature of the tool.",
  ],

  thirtySecondAnswer:
    "A forward proxy sits between clients and the internet, forwarding their requests outward on their behalf — the destination server sees the proxy's identity, not the original client's. It exists to centralize policy for a group of clients: content filtering, traffic monitoring, anonymization, and caching of commonly requested external resources, all in one place instead of per-device. It's the mirror image of a reverse proxy, which represents servers rather than clients. Because it sits on the path of all outbound traffic for everyone behind it, a forward proxy is both a genuine single point of failure if not deployed redundantly, and a dual-use tool — the exact mechanism that enables corporate filtering or privacy can just as easily enable surveillance or censorship depending on who controls it.",

  detailedAnswer: [
    "A forward proxy forwards client requests outward; from the destination's perspective, the proxy — not the client — is the apparent source.",
    "It centralizes content filtering, traffic logging/monitoring, anonymization, and caching for a whole group of clients in one place.",
    "It's the mirror image of a reverse proxy: forward proxies represent clients, reverse proxies represent servers.",
    "It's genuinely dual-use — the same mechanism enabling privacy or corporate policy enforcement can enable surveillance or censorship depending on the operator.",
    "It's a single point of failure and potential bottleneck for all outbound traffic from behind it unless deployed with its own redundancy.",
  ],

  questions: [
    { id: "fp-q1", question: "What is a forward proxy, in one sentence?", answer: "A server that sits between clients and the wider internet, forwarding client requests outward on their behalf — the destination sees the proxy, not the original client.", topic: "Networking", difficulty: "Beginner" },
    { id: "fp-q2", question: "Whose identity does a destination server see in a forward proxy setup?", answer: "The proxy's IP address, not the original client's — the request appears to originate from the proxy.", topic: "Networking", difficulty: "Beginner" },
    { id: "fp-q3", question: "What problem does a forward proxy solve for an organization?", answer: "It centralizes content filtering, traffic monitoring, and outbound policy for many clients in one place, instead of every device implementing it individually.", topic: "Networking", difficulty: "Beginner" },
    { id: "fp-q4", question: "Name four common uses of a forward proxy.", answer: "Content filtering, anonymization, caching of frequently requested external content, and logging/monitoring of outbound traffic.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q5", question: "How does a forward proxy provide anonymization?", answer: "Since the destination server only sees the proxy's IP address, individual clients behind it are hidden from the destination's perspective.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q6", question: "How does caching work in a forward proxy?", answer: "It stores frequently requested external content locally, so repeat requests from any client on the network are served from the proxy's cache instead of going back out to the internet.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q7", question: "What's the core difference between a forward proxy and a reverse proxy?", answer: "A forward proxy represents clients to the outside world; a reverse proxy represents servers to the outside world — same underlying mechanism, opposite side of the conversation.", topic: "Networking", difficulty: "Beginner" },
    { id: "fp-q8", question: "Why is a forward proxy considered a dual-use tool?", answer: "The same mechanism that enables legitimate content filtering or privacy protection can be used for surveillance or censorship, depending entirely on who operates it and what policies they enforce.", topic: "Networking", difficulty: "Advanced" },
    { id: "fp-q9", question: "Why is a forward proxy a potential single point of failure?", answer: "If all outbound traffic from an organization routes through one proxy instance, that instance failing takes down all outbound access for everyone behind it.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q10", question: "Why is it hard for a forward proxy to inspect HTTPS traffic contents?", answer: "HTTPS traffic is encrypted end-to-end by TLS; the proxy can't read the actual content without additional (and often controversial) certificate-based interception.", topic: "Networking", difficulty: "Advanced" },
    { id: "fp-q11", question: "What's a real-world example of a forward proxy in an enterprise setting?", answer: "Enterprise network security products like Zscaler or Blue Coat, which are essentially forward proxy deployments at scale providing content filtering and threat detection.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q12", question: "Why might someone not need a forward proxy at all?", answer: "Individual consumer internet usage typically has no need for centralized outbound policy — most home connections have no forward proxy and don't need one.", topic: "Networking", difficulty: "Beginner" },
    { id: "fp-q13", question: "What's a 'transparent' forward proxy?", answer: "One configured at the network level so clients aren't even aware they're being proxied, rather than each client explicitly configuring proxy settings.", topic: "Networking", difficulty: "Advanced" },
    { id: "fp-q14", question: "What's a common mistake when deploying a forward proxy for a large organization?", answer: "Deploying only a single instance without considering it as a potential bottleneck or single point of failure for all outbound traffic.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q15", question: "How does a forward proxy relate to VPNs, conceptually?", answer: "Both can route and potentially anonymize outbound traffic through an intermediary, though a VPN typically encrypts the whole connection and operates at a lower network layer than an application-level forward proxy.", topic: "Networking", difficulty: "Advanced" },
    { id: "fp-q16", question: "Why do people commonly confuse forward and reverse proxies?", answer: "Both are intermediaries that forward traffic on someone's behalf using the same underlying mechanism — the distinction is entirely about which party (client or server) they represent.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q17", question: "What's the latency cost of introducing a forward proxy?", answer: "It adds a network hop to every outbound request, contributing some additional latency in exchange for the centralized control it provides.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q18", question: "What kind of caching benefit does a forward proxy provide for software updates?", answer: "If many machines on the same network request the same update file, the proxy can cache it after the first fetch, saving bandwidth on repeated downloads of identical content.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q19", question: "Should a forward proxy be deployed redundantly? Why?", answer: "Yes, if it's on the critical path for all outbound traffic from an organization — a single instance would otherwise be a new, avoidable single point of failure.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-q20", question: "What ethical consideration is unique to deploying a forward proxy compared to most other infrastructure components?", answer: "Its filtering and logging capabilities directly affect user privacy and access — deploying one requires being deliberate and transparent about what policies it enforces, given the legitimate dual-use concerns involved.", topic: "Networking", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"What's the difference between a forward proxy and a reverse proxy, in terms of who they represent?\"",
    "\"Why might a company deploy a forward proxy for its employees' internet access?\"",
    "\"How would you avoid the proxy itself becoming a bottleneck or single point of failure?\"",
  ],

  commonMistakes: [
    "Deploying a single forward proxy instance for a large organization without considering it a potential bottleneck or SPOF.",
    "Confusing forward and reverse proxies in system design discussions — they solve related but distinctly different problems for opposite parties.",
    "Assuming a forward proxy can freely inspect HTTPS content without certificate-based interception.",
  ],

  interviewTraps: [
    "\"What's a proxy?\" with no qualifier is often testing whether you immediately clarify forward vs reverse rather than assuming one.",
    "Being asked how a proxy handles HTTPS traffic is checking whether you know encrypted content isn't simply inspectable without interception.",
  ],

  tradeoffs: [
    "Centralized control, monitoring, and caching for many clients vs. an added network hop and a new potential bottleneck/SPOF.",
    "Privacy/policy benefits vs. genuine dual-use risk (surveillance/censorship) depending on the operator.",
  ],

  comparisonTable: {
    title: "Forward Proxy vs Reverse Proxy",
    columns: ["Forward Proxy", "Reverse Proxy"],
    rows: [
      { label: "Sits in front of", values: ["Clients", "Servers"] },
      { label: "Represents", values: ["The client, to the outside world", "The server, to the outside world"] },
      { label: "Hides", values: ["The client's identity from the destination", "The server's identity/topology from the client"] },
      { label: "Typical use", values: ["Corporate filtering, VPNs, anonymizing outbound requests", "Load balancing, TLS termination, backend protection"] },
    ],
  },

  memoryTrick:
    "\"Forward proxy fronts for the client.\" It stands in front of the client, facing outward — the opposite of a reverse proxy, which stands in front of the server, facing the client.",

  realWorldExamples: [
    "A corporate network routes all employee traffic through a forward proxy that blocks malicious domains, logs requests for security auditing, and caches commonly accessed update servers.",
    "Enterprise products like Zscaler or Blue Coat are, at their core, forward proxy deployments at scale for content filtering and threat detection.",
  ],

  mermaidDiagram: `flowchart LR
    C1[Client 1] --> P[Forward Proxy]
    C2[Client 2] --> P
    C3[Client 3] --> P
    P -->|appears as single source| Internet[Destination servers]`,

  flashcards: [
    { id: "fp-fc1", front: "Forward proxy — one-line definition", back: "A server forwarding client requests outward — destination sees the proxy, not the client.", topic: "Networking", difficulty: "Beginner" },
    { id: "fp-fc2", front: "Forward proxy vs reverse proxy", back: "Forward proxy represents clients; reverse proxy represents servers.", topic: "Networking", difficulty: "Beginner" },
    { id: "fp-fc3", front: "Four common forward proxy uses", back: "Content filtering, anonymization, caching, logging/monitoring.", topic: "Networking", difficulty: "Intermediate" },
    { id: "fp-fc4", front: "Why is a forward proxy dual-use?", back: "The same filtering/logging mechanism can enable legitimate policy or privacy — or surveillance/censorship — depending on the operator.", topic: "Networking", difficulty: "Advanced" },
    { id: "fp-fc5", front: "Why can't a forward proxy easily inspect HTTPS content?", back: "It's end-to-end encrypted by TLS; inspection requires certificate-based interception.", topic: "Networking", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Proxy (Forward Proxy)",
    sections: [
      { heading: "Represents", items: ["The client, to the destination server"] },
      { heading: "Common uses", items: ["Content filtering", "Anonymization", "Caching external content", "Logging/monitoring"] },
      { heading: "Risks", items: ["Single point of failure if not redundant", "Dual-use: policy tool or surveillance tool", "Can't inspect HTTPS without interception"] },
      { heading: "Not this", items: ["Reverse proxy — represents servers, not clients"] },
    ],
  },

  speedNotes: [
    "Forward proxy = represents the client outward.",
    "Destination sees the proxy's IP, not the client's.",
    "Uses: filtering, anonymization, caching, logging.",
    "Mirror image of reverse proxy (which represents servers).",
    "Dual-use tool — same mechanism, good or bad depending on operator.",
  ],
};
