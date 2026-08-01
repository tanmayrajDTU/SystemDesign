import type { ConceptRevisionContent } from "./types";

export const https: ConceptRevisionContent = {
  slug: "https",
  title: "HTTPS",
  topic: "Networking",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "HTTPS", href: "/docs/networking/https" },
    { label: "HTTP", href: "/docs/networking/http" },
    { label: "Reverse Proxy", href: "/docs/networking/reverse-proxy" },
  ],

  summary: [
    "HTTPS is HTTP transmitted over TLS — an encryption layer sitting between HTTP and TCP that adds confidentiality, integrity, and authentication.",
    "It closes three distinct attack classes at once: eavesdropping (reading plaintext traffic), tampering (modifying it in transit undetected), and impersonation (talking to a fake server).",
    "The TLS handshake uses asymmetric crypto only briefly, to safely exchange a symmetric key; the actual bulk data transfer uses fast symmetric encryption.",
    "A server's certificate, signed by a trusted Certificate Authority, is how the client verifies server identity without ever having talked to that server before.",
    "TLS 1.3 cut the handshake to a single round trip (with 0-RTT resumption for repeat connections), largely closing the historical 'HTTPS is slower' argument.",
    "TLS termination is usually centralized at a reverse proxy or load balancer, not duplicated in every backend instance — keeping certificate management in one place.",
  ],

  whyAsked: [
    "It checks whether a candidate understands what TLS actually protects against, not just that 'HTTPS = secure' as a slogan.",
    "Asking where you'd terminate TLS in an architecture is a quick, practical test of whether you think about certificate management operationally, not just conceptually.",
    "It's a natural bridge into broader security and infrastructure questions (reverse proxies, load balancers, zero-trust networking).",
  ],

  thirtySecondAnswer:
    "HTTPS is HTTP sent over TLS, adding three guarantees plain HTTP lacks: confidentiality (encrypted content), integrity (tampering is detectable), and authentication (a CA-signed certificate proves you're talking to the real server). The TLS handshake briefly uses asymmetric cryptography to safely establish a shared symmetric key, then switches to fast symmetric encryption for the actual data, since asymmetric crypto is too expensive to use for every byte. TLS 1.3 reduced the handshake to a single round trip, largely eliminating the old 'HTTPS is slower' argument, which is why 'HTTPS everywhere' is now the default rather than an optional hardening step. In practice, TLS termination is usually centralized at a reverse proxy or load balancer so certificate management doesn't have to be duplicated across a whole fleet.",

  detailedAnswer: [
    "HTTPS = HTTP + TLS, adding confidentiality, integrity, and server authentication on top of plain HTTP.",
    "It defends against three specific attacks simultaneously: eavesdropping, tampering, and impersonation.",
    "The handshake uses asymmetric crypto briefly to exchange a symmetric key; bulk transfer uses that symmetric key because it's far cheaper computationally.",
    "A certificate chain, rooted in a trusted CA, is how a client verifies server identity cold, with no prior relationship.",
    "TLS 1.3's one-round-trip handshake (plus 0-RTT resumption) closed most of the historical latency argument against HTTPS.",
    "TLS is usually terminated at a centralized layer (reverse proxy/load balancer) rather than in every backend instance, to keep certificate rotation and renewal in one place.",
  ],

  questions: [
    { id: "https-q1", question: "What is HTTPS, in one sentence?", answer: "HTTP transmitted over TLS, an encryption layer between HTTP and TCP that adds confidentiality, integrity, and authentication.", topic: "Networking", difficulty: "Beginner" },
    { id: "https-q2", question: "What three problems does HTTPS solve that plain HTTP doesn't?", answer: "Eavesdropping (reading data in transit), tampering (modifying it undetected), and impersonation (talking to a fake server) — TLS solves all three at once.", topic: "Networking", difficulty: "Beginner" },
    { id: "https-q3", question: "Why does TLS use asymmetric cryptography only during the handshake, not for all data?", answer: "Asymmetric crypto is computationally expensive; it's used briefly to safely establish a shared symmetric key, and the actual bulk data transfer uses fast symmetric encryption.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q4", question: "How does a client verify a server's identity without having talked to it before?", answer: "The server presents a certificate signed by a trusted Certificate Authority (CA); the client verifies the signature chain against CAs it already trusts.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q5", question: "What did TLS 1.3 change about the handshake?", answer: "It reduced the handshake to a single round trip in the common case (down from two in TLS 1.2), and added 0-RTT resumption for repeat connections.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q6", question: "Is 'HTTPS is slower than HTTP' still a strong argument today?", answer: "Largely no — TLS 1.3's reduced handshake and cheap modern hardware encryption have closed most of that gap, which is why HTTPS is the default expectation for essentially all production traffic.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q7", question: "Where is TLS typically terminated in a production architecture?", answer: "At a reverse proxy or load balancer, centralizing certificate management in one place rather than duplicating it across every backend instance.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q8", question: "What's the risk of terminating TLS at the edge and then sending data in plaintext internally?", answer: "It assumes internal network traffic is inherently safe, which may not hold depending on network architecture — some organizations now use TLS internally too (a 'zero trust' approach).", topic: "Networking", difficulty: "Advanced" },
    { id: "https-q9", question: "What is 'mixed content' and why do browsers block or warn about it?", answer: "Loading some resources over plain HTTP on an otherwise HTTPS page — it reintroduces exactly the eavesdropping/tampering vulnerabilities HTTPS was meant to close for that content.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q10", question: "What tool/protocol made automated certificate renewal widely accessible?", answer: "Let's Encrypt, via the ACME protocol — it removed manual renewal burden and cost as adoption barriers to HTTPS.", topic: "Networking", difficulty: "Beginner" },
    { id: "https-q11", question: "What's a common mistake with certificate management?", answer: "Letting certificates expire due to manual renewal processes — largely solved today by automated renewal via ACME/Let's Encrypt.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q12", question: "Does HTTPS protect against a compromised endpoint (e.g. malware on the client)?", answer: "No — TLS protects data in transit between client and server; it does nothing for data already exposed on a compromised endpoint before encryption or after decryption.", topic: "Networking", difficulty: "Advanced" },
    { id: "https-q13", question: "What layer does TLS sit at relative to HTTP and TCP?", answer: "Between them — HTTP messages are encrypted by TLS before being handed to TCP for transport.", topic: "Networking", difficulty: "Beginner" },
    { id: "https-q14", question: "Why is 'zero trust' networking relevant to TLS termination decisions?", answer: "It argues for encrypting internal traffic too, not just traffic crossing the public network boundary, since internal networks aren't automatically safe from compromise.", topic: "Networking", difficulty: "Advanced" },
    { id: "https-q15", question: "What does a TLS certificate actually certify?", answer: "That a specific public key belongs to a specific, verified domain/organization, as attested by a CA the client already trusts.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q16", question: "Why might you still see plain HTTP in a production system today?", answer: "Purely internal traffic within a tightly controlled, trusted network segment — though increasingly organizations use TLS there too given the low remaining cost.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q17", question: "What's the practical benefit of centralizing TLS termination at a reverse proxy?", answer: "Certificate issuance, renewal, and rotation happen in one place instead of being duplicated (and potentially inconsistently managed) across every backend instance.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q18", question: "How would you explain the handshake's asymmetric-then-symmetric approach with an analogy?", answer: "Like using a slow, secure method once to hand over a shared secret combination, then using that fast combination lock for every subsequent exchange instead of repeating the slow method each time.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q19", question: "Why is 'HTTPS everywhere' the modern default rather than an optional hardening step?", answer: "Browsers now actively mark plain HTTP sites as 'not secure', certificates are free and auto-renewing, and TLS 1.3's cost is minimal — there's little reason left not to use it universally.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-q20", question: "What's 0-RTT resumption and what's its trade-off?", answer: "It lets a client resume a previous TLS session with zero additional round trips, but data sent in that 0-RTT window can be vulnerable to replay attacks, so it's typically restricted to idempotent requests.", topic: "Networking", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"Where in this architecture would you terminate TLS, and why?\"",
    "\"What does HTTPS not protect you against?\"",
    "\"Walk me through what happens on the wire during a TLS handshake.\"",
  ],

  commonMistakes: [
    "Assuming internal network traffic is inherently safe once TLS is terminated at the edge.",
    "Letting certificates expire due to manual renewal instead of automating it.",
    "Mixing HTTP and HTTPS content on the same page.",
    "Treating HTTPS as a complete security solution rather than one layer (transport security) among several needed.",
  ],

  interviewTraps: [
    "\"Isn't HTTPS just slower, so why not skip it internally?\" is testing whether you know TLS 1.3 has largely closed that gap, not whether you'll repeat an outdated assumption.",
    "Being asked what HTTPS *doesn't* protect against is checking you don't treat it as a security cure-all.",
  ],

  tradeoffs: [
    "Modest CPU and handshake overhead vs. closing eavesdropping, tampering, and impersonation attacks entirely — a trade almost always worth making today.",
    "Centralized TLS termination (simpler cert management) vs. end-to-end encryption to every backend instance (stronger zero-trust posture, more operational overhead).",
  ],

  comparisonTable: {
    title: "HTTP vs HTTPS",
    columns: ["HTTP", "HTTPS"],
    rows: [
      { label: "Encryption", values: ["None — plaintext", "TLS-encrypted"] },
      { label: "Integrity", values: ["No tamper detection", "Tampering detectable"] },
      { label: "Server identity", values: ["Unverified", "Verified via CA-signed certificate"] },
      { label: "Setup cost", values: ["TCP handshake only", "TCP handshake + TLS handshake (1 RTT on TLS 1.3)"] },
      { label: "Modern default", values: ["Discouraged / flagged by browsers", "Expected everywhere"] },
    ],
  },

  memoryTrick:
    "\"C.I.A. over HTTP\" — HTTPS adds Confidentiality, Integrity, and Authentication on top of plain HTTP, closing eavesdropping, tampering, and impersonation in one layer.",

  realWorldExamples: [
    "Let's Encrypt's free, automated ACME-based certificates are widely credited with accelerating the industry-wide shift to 'HTTPS everywhere' by removing cost and manual renewal as adoption barriers.",
    "A reverse proxy terminating TLS for all public traffic, then talking plain HTTP to backend instances within a trusted private network, centralizes certificate management in one place.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant Client
    participant Server
    Client->>Server: ClientHello
    Server-->>Client: ServerHello + Certificate
    Client->>Client: Verify certificate against trusted CAs
    Client->>Server: Encrypted key exchange
    Note over Client,Server: Shared symmetric key derived
    Note over Client,Server: App data encrypted from here on`,

  flashcards: [
    { id: "https-fc1", front: "HTTPS — one-line definition", back: "HTTP over TLS — adds confidentiality, integrity, and server authentication.", topic: "Networking", difficulty: "Beginner" },
    { id: "https-fc2", front: "Three attacks HTTPS closes", back: "Eavesdropping, tampering, impersonation.", topic: "Networking", difficulty: "Beginner" },
    { id: "https-fc3", front: "Why asymmetric crypto only during the handshake?", back: "It's expensive — used once to establish a shared symmetric key, then fast symmetric encryption handles bulk data.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-fc4", front: "What changed in TLS 1.3?", back: "Handshake reduced to one round trip, plus 0-RTT resumption for repeat connections.", topic: "Networking", difficulty: "Intermediate" },
    { id: "https-fc5", front: "Where is TLS usually terminated?", back: "At a reverse proxy / load balancer, centralizing certificate management.", topic: "Networking", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "HTTPS",
    sections: [
      { heading: "Adds over HTTP", items: ["Confidentiality (encryption)", "Integrity (tamper detection)", "Authentication (CA-signed cert)"] },
      { heading: "Handshake", items: ["Asymmetric crypto → exchange symmetric key", "Symmetric crypto → bulk data transfer", "TLS 1.3: 1 RTT (0-RTT for resumption)"] },
      { heading: "Ops", items: ["Terminate centrally (reverse proxy/LB)", "Automate renewal (ACME / Let's Encrypt)", "Avoid mixed HTTP/HTTPS content"] },
    ],
  },

  speedNotes: [
    "HTTPS = HTTP + TLS: confidentiality, integrity, authentication.",
    "Asymmetric crypto only for handshake; symmetric for bulk transfer.",
    "TLS 1.3 = 1 RTT handshake (down from 2 in TLS 1.2).",
    "Cert = CA-signed proof of server identity — chain of trust.",
    "Terminate TLS centrally (reverse proxy/LB); automate renewal.",
  ],
};
