import type { ConceptRevisionContent } from "./types";

export const dns: ConceptRevisionContent = {
  slug: "dns",
  title: "DNS",
  topic: "Networking",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "DNS", href: "/docs/networking/dns" },
    { label: "CDN", href: "/docs/networking/cdn" },
  ],

  summary: [
    "DNS is a distributed, hierarchical naming system that translates human-readable domain names into the IP addresses computers actually route traffic with.",
    "Its real system-design value isn't the translation itself — it's that it decouples a stable, human-facing name from a backend IP address that can change freely.",
    "Resolution walks a hierarchy (root → TLD → authoritative server) but is heavily cached at every layer — browser, OS, resolver — governed by a TTL set on the record.",
    "TTL is a genuine trade-off: low TTL means fast propagation of changes (good for failover) at the cost of more lookup volume; high TTL reduces overhead but slows propagation.",
    "DNS gives coarse-grained routing tools — round-robin DNS, geo-DNS, and health-check-based failover — but it can't react to real-time load the way an actual load balancer can.",
    "DNS itself is a dependency on the critical path of every request; an unreliable or unmanaged DNS setup becomes a single point of failure for an otherwise healthy system.",
  ],

  whyAsked: [
    "It tests whether a candidate sees DNS as more than 'name → IP' — specifically, whether they understand it as a decoupling and coarse routing mechanism.",
    "TTL trade-off questions check whether a candidate can reason about a real failover/migration scenario concretely, not just describe DNS in the abstract.",
    "It's a natural setup for multi-region and disaster-recovery design questions.",
  ],

  thirtySecondAnswer:
    "DNS is a distributed, hierarchical system that translates human-readable domain names into IP addresses, resolved through a chain — root servers, then TLD servers, then the domain's authoritative server — that's heavily cached at every layer according to a TTL set on the record. Its real value in system design isn't just the lookup: it decouples a stable name from a backend address that can change freely, which is what makes DNS-based load balancing, geo-routing, and failover possible. TTL is the core trade-off — a low TTL propagates changes fast (good for failover) at the cost of more lookup volume, while a high TTL is cheaper but slower to propagate — and because DNS sits on the critical path of every request, an unreliable DNS setup can make an otherwise healthy system completely unreachable.",

  detailedAnswer: [
    "DNS translates domain names to IPs via a hierarchy: root servers → TLD servers → the domain's authoritative server.",
    "Its deeper value is decoupling: a name stays stable while the IP address behind it changes, enabling infrastructure changes with zero client-visible impact.",
    "TTL governs caching at every layer (browser, OS, recursive resolver) — this is the main lever for how fast a DNS change actually propagates.",
    "Round-robin DNS, geo-DNS, and health-check-based failover are all DNS-level routing tools, but they're coarse-grained compared to a real load balancer.",
    "A DNS outage (or an unreliable provider) is a single point of failure on the critical path of every request, even if every backend server is perfectly healthy.",
  ],

  questions: [
    { id: "dns-q1", question: "What does DNS actually do, in one sentence?", answer: "It's a distributed, hierarchical naming system that translates human-readable domain names into the IP addresses computers use to route traffic.", topic: "Networking", difficulty: "Beginner" },
    { id: "dns-q2", question: "Why does DNS matter for system design beyond just 'name lookup'?", answer: "It decouples a stable, human-facing name from an actual (and potentially frequently changing) IP address, which is what enables load balancing, failover, and infrastructure changes without client-visible impact.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q3", question: "Walk through the DNS resolution hierarchy.", answer: "A resolver asks a root server where the TLD (e.g. .com) servers are, asks the TLD server where the domain's authoritative server is, then asks that authoritative server for the actual IP address.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q4", question: "Why is the full DNS resolution chain rarely walked on every request?", answer: "DNS responses are cached extensively at multiple layers — browser, OS, recursive resolver, sometimes ISP — each governed by the record's TTL, so most lookups are served from cache.", topic: "Networking", difficulty: "Beginner" },
    { id: "dns-q5", question: "What is a TTL in DNS, and what's the trade-off in setting it?", answer: "Time-to-live — how long a resolved answer can be cached. A low TTL propagates changes faster (good for failover) but increases query volume and lookup latency; a high TTL reduces overhead but slows propagation of changes.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q6", question: "What is round-robin DNS?", answer: "Returning multiple IP addresses for one name in rotating order, spreading client connections across multiple servers — a coarse form of load balancing.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q7", question: "What is geo-DNS?", answer: "Returning a different IP address depending on the requester's geographic location, routing users to their nearest data center.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q8", question: "How does DNS support failover?", answer: "By health-checking the servers behind a name and no longer returning the IP of any that are unhealthy — though this only takes effect as fast as health checks and cached TTLs allow.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q9", question: "Why can't DNS alone replace a real load balancer?", answer: "DNS-based routing is coarse — it can only react to whether a server is up or down (and only as fast as TTLs allow), not to real-time load the way an actual load balancer can.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q10", question: "Why would you deliberately lower a DNS record's TTL before a planned migration?", answer: "So that once the record is actually changed during cutover, clients pick up the new address quickly instead of continuing to use a long-cached, stale one.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q11", question: "What's the risk of setting a very high TTL on a critical record?", answer: "A failover or migration can take as long as the longest cached TTL among clients to fully propagate — potentially hours, which is a real operational risk during an incident.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q12", question: "What's the difference between an A record and a CNAME record?", answer: "An A record maps a name directly to an IPv4 address; a CNAME maps a name to another name (an alias), which is then itself resolved.", topic: "Networking", difficulty: "Beginner" },
    { id: "dns-q13", question: "Why is DNS itself considered a single point of failure risk?", answer: "It sits on the critical path of every request — if it's not resilient (e.g. a reputable, redundant managed provider), an otherwise perfectly healthy system becomes completely unreachable if DNS can't resolve.", topic: "Networking", difficulty: "Advanced" },
    { id: "dns-q14", question: "When does DNS-level routing matter most in an architecture?", answer: "Multi-region deployments (routing users to their nearest region) and disaster recovery (redirecting all traffic to a backup region, whose servers have different IPs entirely).", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q15", question: "When is a simple DNS setup sufficient?", answer: "Single-region deployments behind one load balancer — DNS just needs to point at the load balancer's stable address, which handles finer-grained routing itself.", topic: "Networking", difficulty: "Beginner" },
    { id: "dns-q16", question: "What's a common mistake with DNS TTLs during an incident?", answer: "Having a very high TTL set with no advance planning, so a needed failover takes hours to propagate to all clients instead of minutes.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-q17", question: "What's an MX record used for?", answer: "Specifying which mail servers handle email for a domain.", topic: "Networking", difficulty: "Beginner" },
    { id: "dns-q18", question: "Why might a company use both geo-DNS and a CDN together?", answer: "Geo-DNS routes users to their nearest data center/region at the DNS level, while a CDN additionally caches and serves specific content from edge locations even closer to the user — complementary layers of proximity-based routing.", topic: "Networking", difficulty: "Advanced" },
    { id: "dns-q19", question: "Why is relying on a single, unmanaged DNS server risky for a production system?", answer: "Without redundancy, a failure of that one DNS server makes the entire system unreachable regardless of how healthy the actual backend infrastructure is — reputable managed DNS providers build in their own redundancy for exactly this reason.", topic: "Networking", difficulty: "Advanced" },
    { id: "dns-q20", question: "What is a TXT record commonly used for?", answer: "Arbitrary text data, frequently used for domain ownership verification (e.g. proving control of a domain to a third-party service).", topic: "Networking", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"How would you use DNS to support a multi-region failover strategy?\"",
    "\"What's the trade-off in setting a very low vs. very high TTL on a critical record?\"",
    "\"Why can't DNS alone replace a real load balancer?\"",
  ],

  commonMistakes: [
    "Setting a very high TTL and being surprised a failover or migration takes hours to propagate.",
    "Relying on DNS-based load balancing alone for real-time traffic distribution instead of a real load balancer.",
    "Forgetting DNS itself is a dependency — treating it as an afterthought instead of a redundant, managed critical-path component.",
  ],

  interviewTraps: [
    "\"Just update the DNS record and traffic will move over\" glosses over TTL-driven propagation delay — a real interview trap if you don't mention it.",
    "Being asked to design failover is often quietly testing whether you know DNS-level failover is coarse and TTL-bound, not instant.",
  ],

  tradeoffs: [
    "Low TTL: faster propagation of changes, more query volume and lookup overhead.",
    "High TTL: less overhead, slower propagation — a real risk during incident response or migration.",
  ],

  memoryTrick:
    "\"DNS is the internet's phone book — but the book only gets reprinted as often as its TTL allows.\" The name is stable; the number behind it, and how fast everyone learns it changed, is the whole game.",

  realWorldExamples: [
    "A migration between cloud providers lowers TTL well in advance, cuts over by updating the record, and raises TTL again once stable.",
    "Netflix uses geo-aware DNS alongside CDNs to route users toward the data center or edge location giving the best streaming performance for their resolved location.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant Client
    participant Resolver as Recursive Resolver
    participant Root as Root Server
    participant TLD as .com TLD Server
    participant Auth as Authoritative Server
    Client->>Resolver: Where is example.com?
    Resolver->>Root: Where is .com?
    Root-->>Resolver: Ask the .com TLD servers
    Resolver->>TLD: Where is example.com?
    TLD-->>Resolver: Ask example.com's authoritative server
    Resolver->>Auth: What's the IP?
    Auth-->>Resolver: 93.184.216.34
    Resolver-->>Client: 93.184.216.34`,

  flashcards: [
    { id: "dns-fc1", front: "DNS — one-line definition", back: "A distributed, hierarchical system translating domain names into IP addresses.", topic: "Networking", difficulty: "Beginner" },
    { id: "dns-fc2", front: "Why does DNS matter beyond simple lookup?", back: "It decouples a stable name from a changeable IP, enabling failover and infra changes with no client impact.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-fc3", front: "TTL trade-off", back: "Low TTL = faster propagation, more query volume. High TTL = less overhead, slower propagation.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-fc4", front: "Why can't DNS replace a real load balancer?", back: "It's coarse — reacts only to up/down (via health checks and TTL), not real-time load.", topic: "Networking", difficulty: "Intermediate" },
    { id: "dns-fc5", front: "Round-robin DNS vs Geo-DNS", back: "Round-robin: rotate through multiple IPs. Geo-DNS: return the IP nearest the requester's location.", topic: "Networking", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "DNS",
    sections: [
      { heading: "Resolution chain", items: ["Root → TLD → Authoritative server", "Cached at browser/OS/resolver per TTL"] },
      { heading: "Record types", items: ["A — name → IPv4", "AAAA — name → IPv6", "CNAME — name → name (alias)", "MX — mail servers", "TXT — arbitrary text/verification"] },
      { heading: "Routing tools", items: ["Round-robin — rotate IPs", "Geo-DNS — nearest region", "Health-check failover — drop unhealthy IPs"] },
      { heading: "Watch for", items: ["TTL: propagation speed vs. query overhead", "DNS as a SPOF if not redundant/managed", "DNS ≠ real-time load balancer"] },
    ],
  },

  speedNotes: [
    "DNS = name → IP, resolved via root → TLD → authoritative chain.",
    "Real value: decouples stable name from changeable backend address.",
    "TTL trade-off: low = fast propagation, high = less overhead.",
    "DNS routing (round-robin, geo, failover) is coarse, not real-time.",
    "DNS itself is a critical-path dependency — needs its own redundancy.",
  ],
};
