import type { ConceptRevisionContent } from "./types";

export const consensus: ConceptRevisionContent = {
  slug: "consensus",
  title: "Consensus in Distributed Systems",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Consensus Basics", href: "/docs/databases/consensus-basics" },
    { label: "Distributed Consensus", href: "/docs/distributed-systems/consensus" }
  ],
  summary: [
    "Consensus is the process by which a network of distributed nodes agrees on a single data value or a sequence of values.",
    "It is essential for ensuring fault tolerance, high availability, and strong consistency in distributed databases.",
    "Consensus algorithms must guarantee safety (no two nodes decide on different values) and liveness (the system eventually reaches a decision).",
    "In the presence of network partitions or node failures, reaching consensus can be challenging (as per the CAP theorem).",
    "Common consensus protocols include Paxos, Raft, and ZAB (ZooKeeper Atomic Broadcast)."
  ],
  whyAsked: [
    "To test your understanding of strong consistency and fault tolerance.",
    "To see if you know how distributed databases like CockroachDB or TiDB coordinate state.",
    "To evaluate your knowledge of the trade-offs between performance and consistency in distributed systems."
  ],
  thirtySecondAnswer: "Consensus is how distributed nodes agree on a single state despite failures. It ensures that multiple replicas of a database stay consistent. Algorithms like Raft or Paxos use leader election and quorum voting to safely commit distributed logs, guaranteeing that as long as a majority of nodes are alive, the system can progress and agree on data without violating safety properties.",
  detailedAnswer: [
    "A consensus protocol ensures that all non-faulty nodes in a distributed system agree on a proposed value.",
    "Nodes undergo a sequence of steps: a leader proposes a value, followers acknowledge it, and once a majority (quorum) agrees, the value is committed.",
    "Safety implies that only one value is chosen and nodes never learn different values for the same log entry.",
    "Liveness implies that eventually, every non-faulty node learns the chosen value.",
    "FLP Impossibility theorem states that deterministic consensus is impossible in an asynchronous system if even one node fails, which is why real protocols use randomized timeouts (like Raft) to break deadlocks."
  ],
  questions: Array.from({ length: 20 }).map((_, i) => ({
    id: `cns-q${i + 1}`,
    question: `Sample consensus question ${i + 1}?`,
    answer: `Sample consensus answer ${i + 1}.`,
    topic: "Distributed Systems",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "How does consensus affect system latency?",
    "What happens when the network partitions and no majority can be formed?",
    "How do leaderless systems achieve consensus?"
  ],
  commonMistakes: [
    "Confusing consensus with simple primary-replica replication (which is not fault-tolerant without a consensus layer for leader election).",
    "Assuming consensus is fast—it usually requires multiple network round trips.",
    "Thinking that consensus guarantees 100% availability during network partitions."
  ],
  interviewTraps: [
    "Claiming consensus algorithms are immune to the CAP theorem—they strictly prioritize Consistency over Availability during partitions.",
    "Forgetting that consensus requires a strict majority (N/2 + 1) to make progress."
  ],
  tradeoffs: [
    "Strong consistency vs. Latency: Consensus requires round-trips to multiple nodes.",
    "Fault tolerance vs. Resource overhead: Requires N nodes to tolerate (N-1)/2 failures."
  ],
  memoryTrick: "Consensus is a democratic vote where you need a strict majority to pass a law, ensuring no conflicting laws can ever be passed simultaneously.",
  realWorldExamples: [
    "etcd (used by Kubernetes for state management) uses Raft for consensus.",
    "Chubby (Google's lock service) uses Paxos to manage distributed locks."
  ],
  mermaidDiagram: `flowchart LR
    Client --> Leader
    Leader -->|Propose| NodeA
    Leader -->|Propose| NodeB
    NodeA -.->|Ack| Leader
    NodeB -.->|Ack| Leader
    Leader -->|Commit| Client`,
  flashcards: Array.from({ length: 5 }).map((_, i) => ({
    id: `cns-fc${i + 1}`,
    front: `Consensus concept ${i + 1}?`,
    back: `Explanation ${i + 1}`,
    topic: "Distributed Systems",
    difficulty: i < 3 ? "Beginner" : "Advanced"
  })),
  cheatSheet: {
    title: "Consensus Cheat Sheet",
    sections: [
      { heading: "Key Properties", items: ["Safety", "Liveness", "Fault Tolerance"] },
      { heading: "Algorithms", items: ["Raft", "Paxos", "ZAB"] },
      { heading: "Concepts", items: ["Quorum", "Leader Election", "Log Replication"] }
    ]
  },
  speedNotes: [
    "Agrees on single state.",
    "Requires N/2 + 1 quorum.",
    "Provides strong consistency.",
    "Tolerates minor node failures.",
    "Used in etcd, ZooKeeper."
  ]
};
