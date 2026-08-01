import type { ConceptRevisionContent } from "./types";

export const tcp: ConceptRevisionContent = {
  slug: "tcp",
  title: "TCP",
  topic: "Networking",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "TCP", href: "/docs/networking/tcp" },
    { label: "UDP", href: "/docs/networking/udp" },
    { label: "HTTP", href: "/docs/networking/http" },
  ],

  summary: [
    "TCP is a transport-layer protocol giving reliable, ordered, connection-oriented delivery of a byte stream over an unreliable network (IP only offers best-effort delivery).",
    "It guarantees four things: reliable delivery (retransmits lost data), ordered delivery, an explicit connection lifecycle (handshake/teardown), and flow/congestion control.",
    "The three-way handshake (SYN, SYN-ACK, ACK) exists to agree on initial sequence numbers before any data flows — and is exactly why opening a new connection has a real, measurable latency cost.",
    "Reliability mechanics: every byte gets a sequence number, the receiver ACKs what it got, unACKed data gets retransmitted after a timeout, and out-of-order packets are buffered and reassembled.",
    "Head-of-line blocking is the big cost of ordering guarantees: one lost packet blocks delivery of everything after it, even data that already arrived successfully — this is a real problem on lossy networks.",
    "TCP is a byte stream, not a message protocol — it guarantees bytes arrive in order, but message framing (knowing where one logical message ends and the next begins) is left entirely to the application.",
  ],

  whyAsked: [
    "It tests whether a candidate understands what reliability guarantees actually cost (handshake latency, head-of-line blocking), not just that TCP is 'the reliable one'.",
    "The TCP vs UDP choice is a recurring, genuine design decision (databases, APIs vs. live video, gaming, DNS), so interviewers use it to see if trade-offs drive your protocol choice.",
    "It sets up deeper questions about connection reuse, HTTP/2 multiplexing, and why HTTP/3 moved to QUIC over UDP.",
  ],

  thirtySecondAnswer:
    "TCP is a transport-layer protocol that turns an unreliable network (IP, which only offers best-effort delivery) into a reliable, ordered byte stream: every byte gets a sequence number, the receiver acknowledges what arrived, and anything lost gets retransmitted after a timeout, with out-of-order data buffered and reassembled before the application ever sees it. A three-way handshake (SYN, SYN-ACK, ACK) establishes the connection first, which is why opening a new TCP connection has a real, measurable latency cost — one full round trip minimum, more with TLS on top. The real cost of all this reliability is head-of-line blocking: because delivery must be in order, one lost packet blocks everything received after it until it's retransmitted, even data that arrived fine — which is exactly why latency-sensitive, loss-tolerant workloads like live video or gaming often prefer UDP instead.",

  detailedAnswer: [
    "TCP guarantees reliable, ordered, connection-oriented delivery over an unreliable network (IP), via sequence numbers, ACKs, and retransmission.",
    "The three-way handshake (SYN/SYN-ACK/ACK) sets up initial sequence numbers before data flows — the source of TCP's connection-setup latency.",
    "Out-of-order packets are buffered and reassembled by the transport layer, so the application always sees an in-order byte stream.",
    "Head-of-line blocking is the direct cost of ordering: one lost packet stalls delivery of everything after it, a real problem on lossy networks like mobile.",
    "TCP is just a byte stream — message framing (where one message ends, the next begins) is entirely the application's responsibility, not something TCP provides.",
    "Connection reuse (keep-alive) avoids repeatedly paying the handshake cost; HTTP/2 multiplexes many logical requests over one TCP connection for the same reason.",
  ],

  questions: [
    { id: "tcp-q1", question: "What does TCP guarantee that the underlying IP network doesn't?", answer: "Reliable, in-order, connection-oriented delivery of a byte stream — IP itself only offers best-effort delivery with no such guarantees.", topic: "Networking", difficulty: "Beginner" },
    { id: "tcp-q2", question: "What are TCP's four core guarantees?", answer: "Reliable delivery (retransmission), ordered delivery, connection-oriented setup/teardown, and flow/congestion control.", topic: "Networking", difficulty: "Beginner" },
    { id: "tcp-q3", question: "Walk through the TCP three-way handshake.", answer: "Client sends SYN, server replies SYN-ACK, client replies ACK — after this, both sides have agreed on initial sequence numbers and the connection is established.", topic: "Networking", difficulty: "Beginner" },
    { id: "tcp-q4", question: "Why does establishing a new TCP connection add latency?", answer: "The handshake requires a full round trip before any application data can be sent — this is a real, measurable cost, more with TLS layered on top for HTTPS.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q5", question: "How does TCP detect and recover from lost packets?", answer: "Every byte gets a sequence number; the receiver sends ACKs for data received; if the sender doesn't get an ACK within a timeout, it retransmits.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q6", question: "What is head-of-line blocking in TCP?", answer: "A lost packet forces all subsequently received packets to wait for its retransmission before being delivered to the application, even if they already arrived successfully.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q7", question: "Why is head-of-line blocking a bigger problem on mobile/lossy networks?", answer: "Higher packet loss rates mean retransmissions happen more often, and each one stalls all subsequently-arrived data behind it — compounding into noticeable latency spikes.", topic: "Networking", difficulty: "Advanced" },
    { id: "tcp-q8", question: "Does TCP guarantee message boundaries?", answer: "No — TCP is just a reliable byte stream; knowing where one logical message ends and the next begins (framing) is the application's responsibility, e.g. via length-prefixing.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q9", question: "Why should you reuse TCP connections (keep-alive) rather than opening a new one per request?", answer: "Each new connection pays the handshake's round-trip cost again; reusing a connection avoids that repeated overhead entirely.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q10", question: "How does HTTP/2 reduce the cost of TCP's per-connection overhead?", answer: "It multiplexes many logical HTTP requests over a single TCP connection, so the handshake cost (and the connection itself) is paid once instead of per-request.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q11", question: "Why did HTTP/3 move away from TCP entirely?", answer: "To eliminate TCP's transport-level head-of-line blocking — HTTP/3 runs over QUIC (built on UDP), which reimplements reliability per-stream so one lost packet only blocks its own stream.", topic: "Networking", difficulty: "Advanced" },
    { id: "tcp-q12", question: "What is congestion control in TCP, at a high level?", answer: "Mechanisms that make the sender slow down when it detects signs of network congestion (e.g. packet loss), to avoid overwhelming the network or the receiver.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q13", question: "Why is TCP the default choice for database connections and file transfer?", answer: "Both need guaranteed, ordered, complete delivery — losing or reordering bytes silently would corrupt the data, which TCP's guarantees directly prevent.", topic: "Networking", difficulty: "Beginner" },
    { id: "tcp-q14", question: "What's a scenario where TCP's guarantees are actively the wrong fit?", answer: "Real-time media (video calls, live streaming) — waiting for a lost, stale frame to be retransmitted (and blocking newer data behind it) is worse than simply skipping it.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q15", question: "How does a TCP connection close?", answer: "Via a FIN handshake — each side signals it's done sending, mirroring the SYN handshake used to open the connection.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-q16", question: "What's the relationship between TCP and TLS in terms of connection setup cost?", answer: "TLS adds its own handshake on top of TCP's — so an HTTPS connection pays both the TCP handshake round trip and the TLS handshake round trip(s) before any encrypted application data flows.", topic: "Networking", difficulty: "Advanced" },
    { id: "tcp-q17", question: "Why can't an application just assume TCP data arrives in discrete, application-level chunks matching what was sent?", answer: "TCP may coalesce or split writes at the byte-stream level — what one side sends in one write call isn't guaranteed to arrive in one matching read call, so framing must be handled explicitly.", topic: "Networking", difficulty: "Advanced" },
    { id: "tcp-q18", question: "What's a common mistake when diagnosing latency spikes on mobile networks?", answer: "Not accounting for head-of-line blocking — a single dropped packet on a lossy connection can stall an entire TCP connection's data, which looks like generic slowness if you don't know to look for it.", topic: "Networking", difficulty: "Advanced" },
    { id: "tcp-q19", question: "What did Google's move to QUIC demonstrate about TCP's limitations?", answer: "That TCP's head-of-line blocking was a real, measurable performance problem on lossy mobile networks — motivating a UDP-based transport that reimplements reliability without that specific limitation.", topic: "Networking", difficulty: "Advanced" },
    { id: "tcp-q20", question: "Why is TCP described as giving applications a 'clean abstraction'?", answer: "It hides retransmission, reordering, and duplicate detection behind a simple guarantee (bytes arrive in order, exactly once, or you get an error), so applications don't have to reimplement that logic themselves.", topic: "Networking", difficulty: "Intermediate" },
  ],

  commonFollowUps: [
    "\"Why does opening a new TCP connection cost latency, and how do modern systems avoid paying it repeatedly?\"",
    "\"What is head-of-line blocking, and how does HTTP/3 address it?\"",
    "\"When would you choose UDP over TCP for this component?\"",
  ],

  commonMistakes: [
    "Assuming TCP guarantees message boundaries — it doesn't; it's a byte stream, and framing is the application's job.",
    "Opening a new TCP connection per request instead of reusing connections via keep-alive.",
    "Not accounting for head-of-line blocking when diagnosing latency spikes on lossy networks.",
    "Treating TCP as strictly 'better' than UDP rather than a different, sometimes wrong, set of trade-offs.",
  ],

  interviewTraps: [
    "\"Is TCP always the safer choice?\" is testing whether you'll default to it reflexively or actually reason about whether ordering/reliability guarantees are needed for this specific workload.",
    "Being asked about latency spikes on mobile is often fishing for head-of-line blocking specifically, not generic 'network is slow' answers.",
  ],

  tradeoffs: [
    "Strong reliability and ordering guarantees vs. handshake latency and head-of-line blocking.",
    "Simplicity for applications (reliability 'for free') vs. no control over how loss is handled — an application can't choose to skip a lost packet even when that would be better.",
  ],

  comparisonTable: {
    title: "TCP vs UDP",
    columns: ["TCP", "UDP"],
    rows: [
      { label: "Connection", values: ["Yes — handshake required", "No — connectionless"] },
      { label: "Reliability", values: ["Guaranteed, retransmits lost data", "None — packets can be lost silently"] },
      { label: "Ordering", values: ["Guaranteed", "Not guaranteed"] },
      { label: "Head-of-line blocking", values: ["Yes", "No — packets are independent"] },
      { label: "Typical uses", values: ["Web traffic, databases, file transfer", "DNS, live video/audio, gaming, VoIP"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "tcp-root",
    question: "Does this workload need guaranteed, in-order delivery of every byte?",
    options: [
      {
        label: "Yes — losing or reordering data would break correctness",
        next: {
          kind: "result",
          id: "tcp-choose-tcp",
          result: "Use TCP (or a protocol built on it, like HTTP).",
          rationale: "Databases, file transfer, and most APIs need complete, ordered, exactly-once delivery — exactly what TCP guarantees.",
        },
      },
      {
        label: "No — fresh, current data matters more than complete data",
        next: {
          kind: "question",
          id: "tcp-latency-check",
          question: "Is this workload latency-sensitive and tolerant of occasional loss (real-time media, gaming, DNS)?",
          options: [
            {
              label: "Yes",
              next: {
                kind: "result",
                id: "tcp-choose-udp",
                result: "Use UDP (possibly with a partial-reliability layer like QUIC if some guarantees are still needed).",
                rationale: "UDP avoids handshake latency and head-of-line blocking entirely — the right trade when a late or duplicate packet is worse than a dropped one.",
              },
            },
            {
              label: "No — reconsider requirements",
              next: {
                kind: "result",
                id: "tcp-choose-reconsider",
                result: "Default back to TCP unless you have a specific, validated reason not to.",
                rationale: "Without a clear latency/loss-tolerance driver, TCP's guarantees are the safer default — UDP should be a deliberate choice, not a reflexive one.",
              },
            },
          ],
        },
      },
    ],
  },

  memoryTrick:
    "\"TCP trades speed for certainty.\" Handshake + acknowledgments + retransmission = you always get every byte, in order — but you pay for it in setup latency and head-of-line blocking.",

  realWorldExamples: [
    "A mobile app keeping a persistent, reused TCP connection (via HTTP keep-alive) avoids repeatedly paying the handshake cost — a real latency win on mobile networks where round trips are expensive.",
    "Google's move to QUIC (underlying HTTP/3) was explicitly motivated by TCP's head-of-line blocking hurting performance on lossy mobile networks.",
  ],

  mermaidDiagram: `flowchart LR
    A[SYN handshake\\nconnection established] --> B[Data transfer\\nwith ACKs + retransmission]
    B --> C[FIN handshake\\nconnection closed]`,

  flashcards: [
    { id: "tcp-fc1", front: "TCP — one-line definition", back: "A transport-layer protocol giving reliable, ordered, connection-oriented byte-stream delivery.", topic: "Networking", difficulty: "Beginner" },
    { id: "tcp-fc2", front: "Three-way handshake", back: "SYN → SYN-ACK → ACK — establishes the connection and initial sequence numbers before data flows.", topic: "Networking", difficulty: "Beginner" },
    { id: "tcp-fc3", front: "Head-of-line blocking", back: "A lost packet blocks delivery of all subsequently-arrived data until it's retransmitted.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-fc4", front: "Does TCP guarantee message boundaries?", back: "No — it's a byte stream; message framing is the application's responsibility.", topic: "Networking", difficulty: "Intermediate" },
    { id: "tcp-fc5", front: "Why does HTTP/3 use QUIC/UDP instead of TCP?", back: "To eliminate TCP's transport-level head-of-line blocking, reimplementing reliability per-stream instead.", topic: "Networking", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "TCP",
    sections: [
      { heading: "Guarantees", items: ["Reliable delivery (retransmission)", "Ordered delivery", "Connection-oriented (handshake/teardown)", "Flow/congestion control"] },
      { heading: "Costs", items: ["Handshake latency (1 RTT minimum)", "Head-of-line blocking", "No message framing — byte stream only"] },
      { heading: "Use for", items: ["Web/API traffic", "Database connections", "File transfer"] },
      { heading: "Avoid for", items: ["Real-time media", "Gaming state updates", "Tiny, latency-critical queries (DNS)"] },
    ],
  },

  speedNotes: [
    "TCP = reliable, ordered, connection-oriented byte stream over unreliable IP.",
    "3-way handshake (SYN/SYN-ACK/ACK) → real, measurable connection-setup latency.",
    "Head-of-line blocking: one lost packet stalls everything behind it.",
    "TCP is a byte stream — no message framing, that's on the application.",
    "Reuse connections (keep-alive) to avoid repeated handshake cost.",
  ],
};
