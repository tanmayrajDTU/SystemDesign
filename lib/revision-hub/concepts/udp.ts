import type { ConceptRevisionContent } from "./types";

export const udp: ConceptRevisionContent = {
  slug: "udp",
  title: "UDP",
  topic: "Networking",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "UDP", href: "/docs/networking/udp" },
    { label: "TCP", href: "/docs/networking/tcp" },
  ],

  summary: [
    "UDP is a transport-layer protocol that sends independent packets (datagrams) with no connection setup and no delivery, ordering, or duplicate-protection guarantees — the opposite of TCP.",
    "It exists because TCP's reliability guarantees have real costs (handshake latency, head-of-line blocking) that some applications would rather not pay.",
    "No handshake means a packet can go out immediately with zero setup round trip; no ordering guarantee means one lost packet never blocks delivery of the next one.",
    "The trade-off is total: applications needing any reliability at all must build it themselves on top of UDP, as QUIC does for HTTP/3.",
    "It's the right fit specifically when fresh, current data matters more than complete, ordered data — real-time media, gaming state, and small one-shot queries like DNS.",
    "UDP isn't inherently 'faster' at moving bytes — its advantage is specifically avoiding handshake and head-of-line-blocking costs, not raw throughput.",
  ],

  whyAsked: [
    "It's the natural counterpoint to TCP — interviewers use it to see whether protocol choice is driven by actual requirements (latency tolerance, loss tolerance) rather than habit.",
    "Explaining DNS or live video over UDP tests whether a candidate can connect an abstract trade-off to a concrete, real system.",
    "It opens into QUIC/HTTP3 questions, testing how current your understanding of the space is.",
  ],

  thirtySecondAnswer:
    "UDP is a connectionless transport protocol: it sends independent packets with no handshake, and no guarantee of delivery, ordering, or duplicate protection — the exact opposite of TCP's guarantees. That absence is the point: there's no setup round trip before sending, and because packets are independent, one lost packet never blocks delivery of the next one, avoiding TCP's head-of-line blocking entirely. The trade-off is that any reliability an application needs — retransmission, ordering, deduplication — has to be built on top of UDP itself, which is exactly what QUIC does for HTTP/3. It's the right choice specifically when fresh, current data matters more than complete data: real-time video/audio, gaming state updates, and small one-shot queries like DNS, where a late retransmitted packet is worse than a dropped one.",

  detailedAnswer: [
    "UDP sends independent datagrams: no handshake, no guaranteed delivery, no guaranteed order, no duplicate protection.",
    "No handshake means zero setup latency — a packet can be sent the instant the application wants to send it.",
    "No ordering guarantee means no head-of-line blocking — a lost packet doesn't stall delivery of subsequent, successfully-arrived packets.",
    "Any reliability the application actually needs must be built on top of UDP itself, which is real, specialized work (as QUIC demonstrates for HTTP/3).",
    "It fits workloads where freshness beats completeness: live video/audio, multiplayer game state, and small request-response queries like DNS.",
    "UDP isn't 'faster' at moving bytes over the wire — its benefit is specifically avoiding handshake and head-of-line-blocking costs, not higher raw throughput.",
  ],

  questions: [
    { id: "udp-q1", question: "What is UDP, in one sentence?", answer: "A connectionless transport-layer protocol that sends independent packets with no guarantee of delivery, ordering, or duplicate protection.", topic: "Networking", difficulty: "Beginner" },
    { id: "udp-q2", question: "What guarantees does UDP explicitly not provide, that TCP does?", answer: "Guaranteed delivery, guaranteed ordering, connection setup, and duplicate protection — UDP provides none of these.", topic: "Networking", difficulty: "Beginner" },
    { id: "udp-q3", question: "Why does UDP have no handshake latency?", answer: "Because it's connectionless — there's no setup phase to agree on state before sending; a packet can go out immediately.", topic: "Networking", difficulty: "Beginner" },
    { id: "udp-q4", question: "Why doesn't UDP suffer from head-of-line blocking?", answer: "Each packet is independent, with no ordering guarantee to enforce — so a lost packet has no mechanism forcing later, successfully-arrived packets to wait for it.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-q5", question: "Why does DNS typically use UDP instead of TCP?", answer: "A DNS query/response is small and simple; a lost query can just be retried by the application faster than paying for a full TCP handshake for one tiny exchange.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-q6", question: "Why would a live video call prefer UDP over TCP?", answer: "A dropped, stale frame is worse to wait for and retransmit than to simply skip in favor of the next, current frame — TCP's guaranteed retransmission would force waiting for now-irrelevant data.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-q7", question: "Is UDP inherently 'faster' than TCP at moving data?", answer: "Not in raw throughput — its actual benefit is avoiding handshake setup latency and head-of-line blocking, not moving bytes over the wire any faster.", topic: "Networking", difficulty: "Advanced" },
    { id: "udp-q8", question: "What's in a UDP packet's header, roughly?", answer: "Source/destination port, length, and a checksum — no sequence numbers or connection state, unlike TCP.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-q9", question: "If an application needs some reliability but wants to avoid TCP's head-of-line blocking, what can it do?", answer: "Build partial reliability on top of UDP itself — as QUIC does, reimplementing retransmission and ordering per-stream so one lost packet only blocks its own stream.", topic: "Networking", difficulty: "Advanced" },
    { id: "udp-q10", question: "Why is 'choosing UDP for a use case that needs reliable delivery, without building reliability on top' a common mistake?", answer: "It leads to silent data loss in production — UDP won't recover lost packets on its own, so any needed reliability must be explicitly engineered by the application.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-q11", question: "What kind of workload characterizes a good fit for UDP?", answer: "One where fresh, current data matters more than complete, ordered data — real-time media, gaming state updates, and small one-shot queries.", topic: "Networking", difficulty: "Beginner" },
    { id: "udp-q12", question: "Why is building reliability on top of UDP considered genuinely complex engineering, not a simple choice?", answer: "It means selectively reimplementing pieces of what TCP already solved (retransmission, ordering) while deliberately avoiding the specific costs (head-of-line blocking) that motivated leaving TCP in the first place — getting that balance right is real, specialized work.", topic: "Networking", difficulty: "Advanced" },
    { id: "udp-q13", question: "What is QUIC, and why is it built on UDP?", answer: "The transport protocol underlying HTTP/3 — built on UDP specifically to get TCP-like reliability where needed while avoiding TCP's head-of-line blocking, by reimplementing retransmission per-stream.", topic: "Networking", difficulty: "Advanced" },
    { id: "udp-q14", question: "Why might retransmitting a lost UDP game-state packet actually be counterproductive?", answer: "A newer position update is already on its way; resending a stale one wastes bandwidth and could even cause the receiver to briefly act on outdated state.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-q15", question: "What's the trade-off UDP makes compared to TCP, summarized in one line?", answer: "It trades all of TCP's delivery/ordering guarantees for minimal overhead and no head-of-line blocking.", topic: "Networking", difficulty: "Beginner" },
    { id: "udp-q16", question: "Would you use UDP for a financial transaction API? Why or why not?", answer: "No — financial transactions need guaranteed, ordered, complete delivery; silent packet loss with no automatic recovery is unacceptable for that use case, so TCP (or HTTP over TCP) is the right choice.", topic: "Networking", difficulty: "Beginner" },
    { id: "udp-q17", question: "How does UDP handle a corrupted packet detected via checksum?", answer: "It's simply dropped — UDP provides no mechanism to request retransmission or notify the application beyond that silent drop.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-q18", question: "What operational responsibility shifts entirely to the application when using raw UDP?", answer: "Detecting loss, deciding whether/how to recover from it, and handling packets that arrive out of order, if any of that matters for the use case.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-q19", question: "Why might online multiplayer games send frequent small UDP updates rather than fewer large ones?", answer: "Frequent small updates mean the newest state arrives soon regardless of any single lost packet, keeping perceived state close to real-time even under some loss.", topic: "Networking", difficulty: "Advanced" },
    { id: "udp-q20", question: "What should drive a UDP-vs-TCP decision, ideally?", answer: "Whether the workload's tolerance for loss and need for low latency outweighs the need for guaranteed, ordered delivery — a deliberate trade-off assessment, not a default 'UDP is faster' assumption.", topic: "Networking", difficulty: "Intermediate" },
  ],

  commonFollowUps: [
    "\"Why does DNS use UDP instead of TCP for most queries?\"",
    "\"What would you need to build on top of UDP if your application needed partial reliability?\"",
    "\"Is UDP ever actually faster in terms of raw data throughput?\"",
  ],

  commonMistakes: [
    "Choosing UDP for a use case that actually needs reliable delivery, without building the necessary reliability logic on top.",
    "Assuming UDP is inherently 'faster' in every sense, rather than specifically avoiding handshake and head-of-line-blocking costs.",
    "Building ad-hoc, unproven retransmission logic on UDP instead of looking at established approaches like QUIC's design.",
  ],

  interviewTraps: [
    "\"Isn't UDP just the faster protocol?\" is testing whether you understand its actual benefit (no handshake, no HOL blocking) versus a vague 'faster' claim.",
    "Being asked to design reliability on top of UDP from scratch is checking whether you'd reach for proven patterns (QUIC-style per-stream reliability) instead of improvising something fragile.",
  ],

  tradeoffs: [
    "Minimal overhead and no head-of-line blocking vs. zero delivery/ordering guarantees — right for real-time, loss-tolerant workloads, wrong for almost everything else.",
    "Building partial reliability on top of UDP (as QUIC does) buys the best of both worlds but is genuinely complex, specialized engineering, not a lightweight choice.",
  ],

  memoryTrick:
    "\"UDP shouts, it doesn't mail.\" No handshake, no receipt confirmation, no automatic resend — fast and simple, but nothing's guaranteed to land.",

  realWorldExamples: [
    "A multiplayer game sends player position updates over UDP dozens of times per second — a lost update doesn't matter, since a newer one is already arriving moments later.",
    "QUIC, underlying HTTP/3, is built on UDP to get TCP-like reliability per-stream while avoiding TCP's connection-wide head-of-line blocking.",
  ],

  mermaidDiagram: `flowchart LR
    A[Application] -->|send datagram| B[UDP]
    B -->|no handshake, no ack| C[Network]
    C --> D[Receiver UDP]
    D -->|deliver as-is, or drop silently on error| E[Receiving Application]`,

  flashcards: [
    { id: "udp-fc1", front: "UDP — one-line definition", back: "A connectionless transport protocol sending independent packets with no delivery, ordering, or duplicate guarantees.", topic: "Networking", difficulty: "Beginner" },
    { id: "udp-fc2", front: "Why no head-of-line blocking in UDP?", back: "Packets are independent — no ordering guarantee means a lost packet never blocks later ones.", topic: "Networking", difficulty: "Intermediate" },
    { id: "udp-fc3", front: "Why does DNS use UDP?", back: "Queries are small and simple; retrying at the application level is faster than a full TCP handshake for one tiny exchange.", topic: "Networking", difficulty: "Beginner" },
    { id: "udp-fc4", front: "Is UDP inherently faster than TCP?", back: "Not in raw throughput — its benefit is avoiding handshake latency and head-of-line blocking, not higher wire speed.", topic: "Networking", difficulty: "Advanced" },
    { id: "udp-fc5", front: "What is QUIC?", back: "The UDP-based transport underlying HTTP/3, reimplementing reliability per-stream to avoid TCP's head-of-line blocking.", topic: "Networking", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "UDP",
    sections: [
      { heading: "What it lacks (vs TCP)", items: ["No handshake", "No guaranteed delivery", "No guaranteed order", "No duplicate protection"] },
      { heading: "What it gains", items: ["Zero setup latency", "No head-of-line blocking", "Minimal per-packet overhead"] },
      { heading: "Use for", items: ["DNS queries", "Real-time audio/video", "Multiplayer game state"] },
      { heading: "Avoid for", items: ["File transfer", "Most web APIs", "Financial transactions"] },
    ],
  },

  speedNotes: [
    "UDP = independent datagrams, no handshake, no delivery/order guarantees.",
    "No ordering guarantee → no head-of-line blocking, unlike TCP.",
    "Use for: DNS, real-time media, gaming state — freshness over completeness.",
    "Not inherently 'faster' — benefit is avoided setup + HOL-blocking cost.",
    "Need reliability on UDP? Build it deliberately (see QUIC), don't improvise.",
  ],
};
