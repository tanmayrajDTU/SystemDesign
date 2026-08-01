import type { ConceptRevisionContent } from "./types";

export const leaderFollower: ConceptRevisionContent = {
  slug: "leader-follower-replication",
  title: "Leader-Follower Replication",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Leader-Follower", href: "/docs/databases/leader-follower" },
    { label: "Multi-leader", href: "/docs/databases/multi-leader" },
    { label: "Replication", href: "/docs/databases/replication" },
  ],

  summary: [
    "Leader-follower (primary-replica) is a replication topology where exactly one node — the leader — accepts all writes, and one or more followers replicate its data and can serve reads.",
    "It sidesteps write-conflict resolution entirely: with a single authoritative write path, there's no possibility of two nodes accepting conflicting writes at the same moment.",
    "It scales reads (add more followers) and improves availability/durability, but write throughput is still capped by one leader's capacity — that's what sharding is for, not this.",
    "Failover — promoting a follower when the leader fails — is the operationally hard part: it must detect failure reliably, promote exactly one follower, and avoid split-brain.",
    "It's the default, standard topology in nearly every major production database (PostgreSQL streaming replication, MySQL replication) precisely because of its simplicity.",
    "It's the right choice for the vast majority of systems, unless writes genuinely need to be accepted in multiple distant regions simultaneously — that pushes toward multi-leader instead.",
  ],

  whyAsked: [
    "It's the default replication topology, so interviewers check a candidate reaches for it first and knows precisely why it's simpler than the alternative.",
    "The failover/split-brain question is a realistic, concrete test of operational thinking beyond the happy path.",
    "It sets up the natural comparison against multi-leader replication to see if trade-offs (not just familiarity) drive the choice.",
  ],

  thirtySecondAnswer:
    "Leader-follower replication designates a single node — the leader — as the sole acceptor of writes, with one or more followers replicating its data and able to serve read traffic. By having exactly one authoritative write path, it avoids write-conflict resolution entirely, which is what makes it dramatically simpler to reason about and implement correctly than multi-leader alternatives. It scales read throughput and improves availability/durability by adding followers, but write throughput is still capped by the single leader's capacity — sharding, not more followers, is the answer if writes themselves are the bottleneck. The genuinely hard operational part is failover: when the leader fails, a follower must be promoted reliably, with exactly one becoming the new leader, since a mishandled failover risks data loss or split-brain, where two nodes both believe they're in charge.",

  detailedAnswer: [
    "Single leader accepts all writes; followers replicate its write-ahead log and can serve reads.",
    "Avoids write-conflict resolution entirely — there's only one authoritative sequence of writes, unlike multi-leader.",
    "Scales reads and improves availability/durability by adding followers; does not scale write throughput (that's sharding's job).",
    "Failover (promoting a follower) must detect leader failure reliably, promote exactly one follower, and avoid split-brain.",
    "The standard, default replication topology in nearly all major production databases (PostgreSQL, MySQL).",
    "Right choice for the vast majority of systems, unless genuinely multi-region low-latency writes are needed (then consider multi-leader).",
  ],

  questions: [
    { id: "lf-q1", question: "What is leader-follower replication, in one sentence?", answer: "A replication topology where a single leader node accepts all writes, and one or more followers replicate its data and can serve reads.", topic: "Databases", difficulty: "Beginner" },
    { id: "lf-q2", question: "Why does leader-follower replication avoid write conflicts entirely?", answer: "Because only one node (the leader) is ever authoritative for write ordering, there's no scenario where two nodes accept conflicting writes to the same data independently.", topic: "Databases", difficulty: "Beginner" },
    { id: "lf-q3", question: "Does leader-follower replication scale write throughput?", answer: "No — all writes still go through the single leader; only read throughput scales as more followers are added.", topic: "Databases", difficulty: "Intermediate" },
    { id: "lf-q4", question: "What is failover in a leader-follower setup?", answer: "The process of promoting a follower to become the new leader when the original leader fails, so writes can resume.", topic: "Databases", difficulty: "Intermediate" },
    { id: "lf-q5", question: "What is split-brain, and why is it dangerous?", answer: "A situation where two nodes both believe they're the leader simultaneously (e.g. after a botched failover) — it can cause conflicting writes to be accepted independently, corrupting data consistency.", topic: "Databases", difficulty: "Advanced" },
    { id: "lf-q6", question: "What three things must a robust failover process handle correctly?", answer: "Detect the leader's failure reliably (not too eagerly), ensure only one follower is promoted, and redirect write traffic to the new leader.", topic: "Databases", difficulty: "Advanced" },
    { id: "lf-q7", question: "What's a common mistake with leader-follower failover?", answer: "Not automating and regularly testing it, leaving a risky, slow, manual process to be improvised for the first time during an actual production incident.", topic: "Databases", difficulty: "Intermediate" },
    { id: "lf-q8", question: "When is leader-follower replication not sufficient on its own?", answer: "When write throughput itself needs to scale past a single machine (needs sharding), or when writes must be accepted with low latency in multiple distant geographic regions simultaneously (needs multi-leader).", topic: "Databases", difficulty: "Intermediate" },
    { id: "lf-q9", question: "What's a real production example of leader-follower replication?", answer: "PostgreSQL's built-in streaming replication and MySQL's replication both default to a leader-follower (primary-replica) model.", topic: "Databases", difficulty: "Beginner" },
    { id: "lf-q10", question: "What happens to write availability during the window between a leader failing and a follower being promoted?", answer: "Writes are unavailable — there's a real, if hopefully brief, window where no node is accepting writes until failover completes.", topic: "Databases", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"What happens to write availability during the window between the leader failing and a follower being promoted?\"",
    "\"How would you avoid split-brain during failover?\"",
    "\"Why doesn't leader-follower replication help with write throughput scaling?\"",
  ],

  commonMistakes: [
    "Not automating and regularly testing failover, risking a slow manual process during a real incident.",
    "Assuming leader-follower solves write scaling — it only distributes read load.",
    "Routing all reads to followers without accounting for replication lag.",
  ],

  interviewTraps: [
    "\"Add more followers to handle more writes\" is a trap — followers help reads only, never writes.",
    "Being asked about failover safety is testing whether you name split-brain specifically, not just 'the backup takes over.'",
  ],

  tradeoffs: [
    "Simplicity and safety (no write conflicts) vs. write throughput still capped by a single leader.",
    "Read scaling via followers vs. a real (if brief) write-unavailability window during failover.",
  ],

  comparisonTable: {
    title: "Leader-Follower vs Multi-Leader Replication",
    columns: ["Leader-Follower", "Multi-Leader"],
    rows: [
      { label: "Writes accepted by", values: ["One leader only", "Multiple leaders, independently"] },
      { label: "Write conflicts possible?", values: ["No — single authoritative write path", "Yes — needs explicit conflict resolution"] },
      { label: "Best for", values: ["Most systems; read-heavy workloads", "Globally distributed, low-latency multi-region writes"] },
      { label: "Complexity", values: ["Lower — simple, well-understood", "Higher — conflict resolution is genuinely hard"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "lf-root",
    question: "Do users in multiple, geographically distant regions need to write with low latency simultaneously?",
    options: [
      {
        label: "No — one region/leader can handle writes fine",
        next: {
          kind: "result",
          id: "lf-choose-lf",
          result: "Use Leader-Follower replication.",
          rationale: "It's simpler, avoids write conflicts entirely, and is the right default for the vast majority of systems.",
        },
      },
      {
        label: "Yes — distant regions need local, low-latency writes",
        next: {
          kind: "result",
          id: "lf-choose-ml",
          result: "Consider Multi-Leader replication.",
          rationale: "It's the only way to get low-latency local writes in multiple regions — but only adopt it once you've accepted the real cost of building genuine conflict resolution.",
        },
      },
    ],
  },

  memoryTrick:
    "\"One control tower, no collisions.\" A single leader deciding write order is exactly what makes conflicts structurally impossible.",

  realWorldExamples: [
    "PostgreSQL's streaming replication and MySQL's replication both default to leader-follower as their standard topology.",
    "A URL shortener's primary database (leader) handles all link-creation writes, while read replicas (followers) absorb cache-miss redirect traffic.",
  ],

  mermaidDiagram: `flowchart TD
    Client -->|writes| Leader[(Leader)]
    Leader -->|replicate| F1[(Follower 1)]
    Leader -->|replicate| F2[(Follower 2)]
    Client -.reads.-> Leader
    Client -.reads.-> F1
    Client -.reads.-> F2`,

  flashcards: [
    { id: "lf-fc1", front: "Leader-follower — one-line definition", back: "One leader accepts all writes; followers replicate and can serve reads.", topic: "Databases", difficulty: "Beginner" },
    { id: "lf-fc2", front: "Why no write conflicts?", back: "Only one authoritative write path — there's never two nodes deciding write order independently.", topic: "Databases", difficulty: "Beginner" },
    { id: "lf-fc3", front: "Does it scale writes?", back: "No — writes are capped by the single leader; only reads scale with more followers.", topic: "Databases", difficulty: "Intermediate" },
    { id: "lf-fc4", front: "Split-brain", back: "Two nodes both believe they're the leader — a dangerous failover failure mode.", topic: "Databases", difficulty: "Advanced" },
    { id: "lf-fc5", front: "When to consider multi-leader instead", back: "When distant regions need low-latency local writes simultaneously.", topic: "Databases", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Leader-Follower Replication",
    sections: [
      { heading: "Core idea", items: ["One leader accepts writes", "Followers replicate + serve reads"] },
      { heading: "Solves", items: ["Read scaling", "Availability/durability", "No write conflicts"] },
      { heading: "Doesn't solve", items: ["Write-throughput scaling (→ sharding)"] },
      { heading: "Failover risks", items: ["Split-brain", "Write-unavailability window", "Needs automation + regular testing"] },
    ],
  },

  speedNotes: [
    "One leader accepts writes; followers replicate + serve reads.",
    "No write conflicts — single authoritative write path.",
    "Scales reads only, not writes (sharding handles writes).",
    "Failover risk: split-brain if not automated/tested.",
    "Default choice unless multi-region low-latency writes are needed.",
  ],
};
