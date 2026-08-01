import type { ConceptRevisionContent } from "./types";

export const distributedSystemsOverview: ConceptRevisionContent = {
  slug: "distributed-systems-overview",
  title: "Distributed Systems Overview",
  topic: "Distributed Systems",
  difficulty: "Intermediate",
  estimatedMinutes: 25,
  docLinks: [
    { label: "CAP Theorem", href: "/docs/fundamentals/cap-theorem" },
    { label: "Consensus", href: "/docs/distributed-systems/consensus" },
    { label: "Consistent Hashing", href: "/docs/distributed-systems/consistent-hashing" },
  ],
  summary: [
    "A distributed system is a collection of independent computers that appear to its users as a single coherent system.",
    "They are built to achieve high availability, fault tolerance, and horizontal scalability.",
    "Designing these systems introduces profound complexities: network partitions, unreliable clocks, and data consistency challenges.",
    "The CAP theorem dictates tradeoffs between Consistency and Availability during network failures.",
    "Core primitives include consensus algorithms (Raft/Paxos), replication, partitioning (sharding), and distributed locking."
  ],
  whyAsked: [
    "It forms the foundation of modern backend engineering and cloud architectures.",
    "To test if you understand the tradeoffs (CAP, latency vs. consistency) when scaling beyond a single machine.",
    "To ensure you don't make naive assumptions (like reliable networks or perfect clocks)."
  ],
  thirtySecondAnswer: "A distributed system coordinates multiple machines over a network to act as one unified system. We use them to scale horizontally, increase availability, and survive hardware failures. However, they introduce the Eight Fallacies of Distributed Computing (e.g., networks are reliable, latency is zero). To build them, we must manage state across nodes using replication for fault tolerance, partitioning for capacity, and consensus algorithms (like Raft) to agree on state. The CAP theorem bounds our design, forcing a choice between Consistency and Availability during a network partition.",
  detailedAnswer: [
    "Horizontal Scaling vs Vertical Scaling: Distributed systems enable horizontal scaling (adding more cheap machines) rather than hitting the hardware limits of a single massive machine.",
    "Fallacies of Distributed Computing: Networks fail, latency is not zero, bandwidth is limited, the network is not secure, topology changes, there is more than one admin, transport cost isn't zero, and the network is heterogeneous.",
    "CAP Theorem: You cannot simultaneously have strong Consistency, high Availability, and Partition tolerance. In reality, Partitions happen, so you must choose CP or AP.",
    "State Management: The hardest part. Solved via Replication (copying data for durability/reads) and Partitioning (splitting data for write/storage capacity).",
    "Coordination: Nodes must agree. This requires consensus protocols (Paxos, Raft), leader election, and distributed clocks (Logical/Vector clocks) to order events."
  ],
  questions: [
    { id: "dso-q1", question: "What is a Distributed System?", answer: "A group of independent computers working together over a network to appear as a single entity to the user.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dso-q2", question: "Why do we build distributed systems?", answer: "To achieve horizontal scalability, fault tolerance, high availability, and low latency (by placing nodes closer to users).", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dso-q3", question: "Name a few of the 'Fallacies of Distributed Computing'.", answer: "The network is reliable, latency is zero, bandwidth is infinite, the network is secure, topology doesn't change.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dso-q4", question: "What is Horizontal vs. Vertical Scaling?", answer: "Vertical is adding more CPU/RAM to one machine (scale up). Horizontal is adding more machines to the pool (scale out).", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dso-q5", question: "What is the CAP Theorem?", answer: "A theorem stating a distributed data store can provide at most two of: Consistency, Availability, and Partition Tolerance.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-q6", question: "Why must we always choose 'P' in the CAP theorem?", answer: "Because network partitions (failures) are inevitable in distributed systems over the internet. You can't sacrifice 'P', so you choose between 'C' or 'A'.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-q7", question: "What is Network Partition?", answer: "When the network fails, causing nodes in a distributed system to be unable to communicate with each other.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-q8", question: "What is Replication?", answer: "Keeping copies of the same data on multiple nodes to increase availability, read throughput, and fault tolerance.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-q9", question: "What is Partitioning (Sharding)?", answer: "Splitting a large dataset into smaller chunks and storing them across different nodes to scale storage capacity and write throughput.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-q10", question: "What is a Consensus Algorithm?", answer: "A protocol (like Paxos or Raft) that allows a cluster of distributed nodes to agree on a single value or state, even if some nodes fail.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-q11", question: "What is Eventual Consistency?", answer: "A guarantee that if no new updates are made, all reads will eventually return the last updated value. Used in AP systems.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-q12", question: "What is Strong Consistency?", answer: "A guarantee that a read operation immediately following a write will always return that updated value. Used in CP systems.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-q13", question: "Why are physical clocks unreliable in distributed systems?", answer: "Because of clock drift. NTP synchronizes them, but there is always a margin of error, making it impossible to perfectly order events using timestamps.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dso-q14", question: "What is a Logical Clock (e.g., Lamport Clock)?", answer: "A mechanism that uses counters, not physical time, to capture chronological and causal relationships between events in a distributed system.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dso-q15", question: "What is the split-brain problem?", answer: "When a network partition causes a cluster to split, and both halves elect a leader, leading to conflicting data writes.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dso-q16", question: "How does a quorum prevent split-brain?", answer: "By requiring a majority (e.g., 3 out of 5 nodes) to elect a leader or write data. Two isolated halves cannot both have a majority.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dso-q17", question: "What is the role of ZooKeeper/etcd?", answer: "They are highly reliable distributed coordination services used for leader election, configuration management, and distributed locking.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dso-q18", question: "What is Consistent Hashing?", answer: "A routing technique that minimizes the number of keys remapped when nodes are added or removed from a cluster.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dso-q19", question: "What is a Two-Phase Commit (2PC)?", answer: "A distributed algorithm to ensure all nodes commit a transaction, or all abort it. It is strongly consistent but slow and prone to blocking.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dso-q20", question: "What is the Saga Pattern?", answer: "A way to manage distributed transactions using a sequence of local transactions, where each updates data and publishes a message to trigger the next step. If a step fails, compensating transactions are run.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you design a distributed ID generator?",
    "How does Raft elect a leader?",
    "Explain when you would favor an AP system over a CP system."
  ],
  commonMistakes: [
    "Assuming network calls are instant and reliable.",
    "Relying on system timestamps for absolute ordering of events.",
    "Designing a system with single points of failure without redundancy."
  ],
  interviewTraps: [
    "Saying a system is 'CA' (Consistent and Available) over a network. During a partition, you MUST choose C or A. CA only exists on a single node.",
    "Using synchronous replication everywhere; it severely degrades latency and availability."
  ],
  tradeoffs: [
    "Consistency vs. Availability: The core CAP tradeoff. E-commerce carts often choose A (Eventual Consistency), while banking ledgers choose C.",
    "Replication (Fault Tolerance) vs. Latency: Waiting for a quorum of nodes to acknowledge a write improves durability but adds network latency."
  ],
  memoryTrick: "Distributed systems scale OUT, but introduce the CAP tax (Consistency, Availability, Partitions).",
  realWorldExamples: [
    "Cassandra is designed as an AP system, prioritizing high availability for writes over immediate consistency.",
    "Google Spanner is a strongly consistent database that uses atomic clocks (TrueTime) to achieve external consistency globally."
  ],
  mermaidDiagram: `flowchart TD
    Client --> LoadBalancer
    LoadBalancer --> Node1
    LoadBalancer --> Node2
    LoadBalancer --> Node3
    
    Node1 <--> |Replication/Consensus| Node2
    Node2 <--> |Replication/Consensus| Node3
    Node3 <--> |Replication/Consensus| Node1
    
    subgraph Distributed Cluster
    Node1
    Node2
    Node3
    end`,
  flashcards: [
    { id: "dso-fc1", front: "CAP Theorem", back: "In a network partition (P), you must choose between Consistency (C) and Availability (A).", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dso-fc2", front: "Quorum", back: "The minimum number of nodes (usually a majority) that must agree for an operation to succeed.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-fc3", front: "Split-Brain", back: "A scenario where a cluster divides, and multiple nodes incorrectly act as the leader.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dso-fc4", front: "Logical Clocks", back: "Counters used to order events based on causality because physical clocks drift.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dso-fc5", front: "Sharding vs Replication", back: "Sharding splits data to scale capacity. Replication copies data to increase reliability.", topic: "Distributed Systems", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Distributed Systems Basics",
    sections: [
      {
        heading: "CAP Theorem",
        items: [
          "CP: Stops accepting writes if separated (Bank).",
          "AP: Accepts writes, resolves conflicts later (Social Media)."
        ]
      },
      {
        heading: "State Management",
        items: [
          "Replication: Redundancy and read speed.",
          "Partitioning: Capacity and write speed."
        ]
      },
      {
        heading: "Coordination",
        items: [
          "Consensus: Raft, Paxos.",
          "Coordination Services: ZooKeeper, etcd."
        ]
      }
    ]
  },
  speedNotes: [
    "Networks are unreliable.",
    "Physical clocks drift.",
    "CAP forces tradeoffs.",
    "Quorums prevent split-brain.",
    "State requires consensus."
  ]
};
