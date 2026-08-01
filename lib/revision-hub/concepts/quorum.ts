import type { ConceptRevisionContent } from "./types";

export const quorum: ConceptRevisionContent = {
  slug: "quorum",
  title: "Quorum in Distributed Systems",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Consensus Overview", href: "/docs/distributed-systems/consensus" },
    { label: "Raft Protocol", href: "/docs/distributed-systems/raft" }
  ],
  summary: [
    "A quorum is the minimum number of nodes in a distributed system that must agree to commit an operation.",
    "It ensures strong consistency by guaranteeing that read and write operations overlap on at least one node.",
    "The standard formula for a strict quorum is (N / 2) + 1, where N is the total number of nodes.",
    "Quorums are used to prevent split-brain scenarios during network partitions.",
    "Dynamo-style databases allow tunable quorums (W + R > N) to balance consistency and availability."
  ],
  whyAsked: [
    "To test your understanding of how distributed databases resolve conflicts and maintain consistency.",
    "To evaluate your knowledge of network partitions and split-brain resolution.",
    "To see if you can tune performance and consistency using Read (R) and Write (W) quorums."
  ],
  thirtySecondAnswer: "A quorum is the minimum majority of nodes required to process a read or write operation. In leader-based systems, operations require an absolute majority (N/2+1) to ensure safety and prevent split-brain. In tunable systems like Cassandra, you can adjust Read (R) and Write (W) quorums such that W + R > N, ensuring that any read overlaps with the most recent write, providing strong consistency.",
  detailedAnswer: [
    "In a distributed database, requiring all nodes to acknowledge a write is too slow and fragile.",
    "Quorums allow systems to tolerate failures by only waiting for a subset of nodes.",
    "A strict majority quorum (N/2 + 1) prevents split-brain because two isolated partitions cannot both form a majority.",
    "Tunable quorums (e.g., in Cassandra) allow developers to set W (nodes required for write) and R (nodes required for read).",
    "If W + R > N, strong consistency is guaranteed because at least one node in the read quorum will have the latest write."
  ],
  questions: Array.from({ length: 20 }).map((_, i) => ({
    id: `qrm-q${i + 1}`,
    question: `Sample Quorum question ${i + 1}?`,
    answer: `Sample Quorum answer ${i + 1}.`,
    topic: "Distributed Systems",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "What happens if a write achieves a quorum but the client times out?",
    "How does a system recover if it loses a quorum (e.g., 3 out of 5 nodes die)?",
    "Explain sloppy quorums and hinted handoff."
  ],
  commonMistakes: [
    "Assuming quorums are always exactly N/2 + 1 (tunable systems allow other configurations).",
    "Thinking a system with 4 nodes is better than 3 (4 nodes only tolerate 1 failure just like 3 nodes, because 4/2+1 = 3)."
  ],
  interviewTraps: [
    "Recommending an even number of nodes for a consensus cluster. Always use an odd number (3, 5, 7) to optimize fault tolerance and avoid tie-breakers."
  ],
  tradeoffs: [
    "Consistency vs. Latency: Higher quorums provide stronger consistency but take longer to acknowledge.",
    "Availability vs. Correctness: Sloppy quorums improve availability but sacrifice strict consistency."
  ],
  memoryTrick: "W + R > N. Read and Write quorums must overlap, like a Venn diagram, guaranteeing at least one node knows the absolute truth.",
  realWorldExamples: [
    "Apache Cassandra allows per-query tuning of quorums (e.g., QUORUM, LOCAL_QUORUM, ONE).",
    "MongoDB replica sets require a strict majority to elect a new primary."
  ],
  mermaidDiagram: `flowchart TD
    Client -->|Write| Node1
    Client -->|Write| Node2
    Client -->|Write| Node3
    Node1 -.->|Ack| Client
    Node2 -.->|Ack| Client
    Note right of Client: Write Quorum (W=2) Reached`,
  flashcards: Array.from({ length: 5 }).map((_, i) => ({
    id: `qrm-fc${i + 1}`,
    front: `Quorum concept ${i + 1}?`,
    back: `Explanation ${i + 1}`,
    topic: "Distributed Systems",
    difficulty: i < 3 ? "Beginner" : "Advanced"
  })),
  cheatSheet: {
    title: "Quorum Cheat Sheet",
    sections: [
      { heading: "Strict Majority", items: ["N/2 + 1", "Odd node count recommended (3, 5)"] },
      { heading: "Tunable Quorum", items: ["W + R > N for strong consistency"] },
      { heading: "Use Cases", items: ["Leader Election", "Commit Log Replication"] }
    ]
  },
  speedNotes: [
    "Minimum nodes to agree.",
    "Prevents split-brain.",
    "Usually (N/2) + 1.",
    "W + R > N equation.",
    "Use odd cluster sizes."
  ]
};
