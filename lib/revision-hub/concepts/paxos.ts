import type { ConceptRevisionContent } from "./types";

export const paxos: ConceptRevisionContent = {
  slug: "paxos",
  title: "Paxos Consensus Algorithm",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 25,
  docLinks: [
    { label: "Paxos Protocol", href: "/docs/distributed-systems/paxos" },
    { label: "Consensus Overview", href: "/docs/distributed-systems/consensus" }
  ],
  summary: [
    "Paxos is a family of protocols for solving consensus in a network of unreliable processors.",
    "It allows a distributed system to agree on a single value safely, even if nodes fail or messages are lost.",
    "The protocol involves Proposers, Acceptors, and Learners.",
    "It operates in two main phases: Prepare/Promise and Accept/Accepted.",
    "Due to its complexity, variations like Multi-Paxos are used in real-world implementations."
  ],
  whyAsked: [
    "To test deep theoretical knowledge of distributed systems.",
    "To discuss the foundations of distributed consensus, as Paxos is the original algorithm.",
    "To compare it against Raft and discuss the trade-offs of leaderless vs. leader-based systems."
  ],
  thirtySecondAnswer: "Paxos guarantees that a distributed system can agree on a single value despite node failures. Proposers suggest values with unique sequence numbers to Acceptors. If a majority of Acceptors promise to ignore older proposals, the Proposer commits the value. It ensures safety (only one value is ever chosen) but can suffer from liveness issues (dueling proposers) unless a single stable leader is elected.",
  detailedAnswer: [
    "Phase 1a (Prepare): A Proposer selects a unique proposal number N and sends it to a majority of Acceptors.",
    "Phase 1b (Promise): Acceptors promise not to accept proposals with numbers less than N and return the highest numbered proposal they've already accepted.",
    "Phase 2a (Accept): If the Proposer receives promises from a majority, it sends an Accept request with the value (either its own or the highest previously accepted one).",
    "Phase 2b (Accepted): Acceptors accept the value unless they have already promised a higher N.",
    "Learners are then notified of the chosen value."
  ],
  questions: Array.from({ length: 20 }).map((_, i) => ({
    id: `pxs-q${i + 1}`,
    question: `Sample Paxos question ${i + 1}?`,
    answer: `Sample Paxos answer ${i + 1}.`,
    topic: "Distributed Systems",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "What is Multi-Paxos and how does it differ from Basic Paxos?",
    "What is the 'dueling proposers' problem (livelock)?",
    "How does Google Spanner use Paxos?"
  ],
  commonMistakes: [
    "Confusing Basic Paxos (agrees on a single value) with Multi-Paxos (agrees on a distributed log).",
    "Assuming Paxos requires a strict leader (Basic Paxos doesn't, but Multi-Paxos usually uses a stable leader to avoid livelock)."
  ],
  interviewTraps: [
    "Trying to explain Paxos implementation details step-by-step without understanding the underlying safety properties.",
    "Forgetting that Acceptors must remember their highest promised proposal number even after a crash (requires stable storage)."
  ],
  tradeoffs: [
    "Safety vs. Understandability: Highly mathematically rigorous but notoriously hard to implement correctly.",
    "Decentralization vs. Performance: Basic Paxos is leaderless but slow due to two-phase commits; Multi-Paxos adds a leader for speed."
  ],
  memoryTrick: "Propose, Promise, Accept, Accepted. Think of it like proposing marriage: First you ask for permission (Prepare/Promise), then you offer the ring (Accept/Accepted).",
  realWorldExamples: [
    "Google Spanner uses Paxos for strong consistency across data centers.",
    "Apache Cassandra uses a variant of Paxos for lightweight transactions (Compare and Set)."
  ],
  mermaidDiagram: `sequenceDiagram
    participant Proposer
    participant Acceptor1
    participant Acceptor2
    Proposer->>Acceptor1: Prepare(N)
    Proposer->>Acceptor2: Prepare(N)
    Acceptor1-->>Proposer: Promise(N)
    Acceptor2-->>Proposer: Promise(N)
    Proposer->>Acceptor1: Accept(N, Value)
    Proposer->>Acceptor2: Accept(N, Value)
    Acceptor1-->>Proposer: Accepted(N, Value)
    Acceptor2-->>Proposer: Accepted(N, Value)`,
  flashcards: Array.from({ length: 5 }).map((_, i) => ({
    id: `pxs-fc${i + 1}`,
    front: `Paxos concept ${i + 1}?`,
    back: `Explanation ${i + 1}`,
    topic: "Distributed Systems",
    difficulty: i < 3 ? "Beginner" : "Advanced"
  })),
  cheatSheet: {
    title: "Paxos Cheat Sheet",
    sections: [
      { heading: "Roles", items: ["Proposer", "Acceptor", "Learner"] },
      { heading: "Phases", items: ["Phase 1: Prepare/Promise", "Phase 2: Accept/Accepted"] },
      { heading: "Issues", items: ["Livelock (Dueling Proposers)"] }
    ]
  },
  speedNotes: [
    "Solves consensus mathematically.",
    "Requires a majority quorum.",
    "Two-phase commit process.",
    "Proposer, Acceptor, Learner roles.",
    "Multi-Paxos optimizes log replication."
  ]
};
