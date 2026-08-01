import type { ConceptRevisionContent } from "./types";

export const eventualConsistency: ConceptRevisionContent = {
  slug: "eventual-consistency",
  title: "Eventual Consistency",
  topic: "Distributed Systems",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "CAP Theorem", href: "/docs/fundamentals/cap-theorem" },
    { label: "Replication", href: "/docs/databases/replication" }
  ],
  summary: [
    "Eventual consistency is a consistency model where updates to a distributed system will eventually be visible to all nodes.",
    "It trades immediate strong consistency for high availability and lower latency.",
    "If no new updates are made to a given data item, eventually all accesses will return the last updated value.",
    "Often requires conflict resolution mechanisms like vector clocks or 'last write wins' (LWW).",
    "Commonly used in distributed databases like Cassandra, DynamoDB, and Riak."
  ],
  whyAsked: [
    "To test your understanding of tradeoffs between availability and consistency (CAP theorem).",
    "To see if you know how to architect highly available systems.",
    "To evaluate your knowledge of handling conflicts in multi-leader or leaderless setups."
  ],
  thirtySecondAnswer: "Eventual consistency guarantees that if no new updates are made, all replicas in a distributed system will eventually converge to the same state. By not waiting for all nodes to acknowledge an update before responding to a client, systems achieve much lower latency and higher availability, surviving network partitions. However, this means clients might read stale data, and concurrent writes can cause conflicts that must be resolved using techniques like Last Write Wins or Vector Clocks.",
  detailedAnswer: [
    "Strong consistency requires synchronous replication, which is slow and vulnerable to network partitions.",
    "Eventual consistency uses asynchronous replication. A write is acknowledged after writing to a subset of nodes (or just one).",
    "Background processes like read repair, anti-entropy (gossip), or hinted handoff are used to propagate data to lagging replicas.",
    "Clients may experience 'stale reads' if they read from a replica that hasn't received the latest update yet.",
    "Concurrent writes to different replicas create conflicts that need resolution, typically handled by the application or via timestamps (LWW)."
  ],
  questions: [
    { id: "evcon-q1", question: "What is Eventual Consistency?", answer: "A model ensuring that, given enough time without new writes, all replicas will converge to the same data state.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "evcon-q2", question: "Why choose eventual consistency over strong consistency?", answer: "To achieve higher availability and lower latency, especially during network partitions.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "evcon-q3", question: "How does eventual consistency relate to the CAP theorem?", answer: "It is typical of AP (Available and Partition-tolerant) systems, sacrificing CP (Consistent).", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-q4", question: "What is a 'stale read'?", answer: "When a client reads from a replica that has not yet received the most recent updates, returning outdated data.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "evcon-q5", question: "What is 'Read Repair'?", answer: "A mechanism where a read operation detects inconsistencies among replicas and updates the stale replicas in the background.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-q6", question: "What is 'Anti-Entropy'?", answer: "A background background process (often gossip protocol) that synchronizes replicas to ensure they eventually hold the same data.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-q7", question: "What is Hinted Handoff?", answer: "If a target node is down, another node temporarily stores the write (a hint) and delivers it when the target node recovers.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-q8", question: "What is LWW (Last Write Wins)?", answer: "A conflict resolution strategy where the system uses timestamps to determine the 'latest' write and discards older ones.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "evcon-q9", question: "What is the problem with LWW?", answer: "It relies on physical clocks, which can suffer from clock drift, potentially causing the loss of genuinely newer data.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "evcon-q10", question: "How do Vector Clocks help in eventual consistency?", answer: "They help detect concurrent writes (conflicts) accurately, allowing the application to resolve them safely.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "evcon-q11", question: "Name a database that defaults to eventual consistency.", answer: "Apache Cassandra or Amazon DynamoDB (when not using strongly consistent reads).", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "evcon-q12", question: "What is Causal Consistency?", answer: "A stronger form of eventual consistency ensuring that operations that are causally related are seen in that order by all nodes.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "evcon-q13", question: "What is Read-Your-Own-Writes consistency?", answer: "A guarantee that a client will always see their own recent updates, often achieved by routing reads to the node they just wrote to.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-q14", question: "Is DNS eventually consistent?", answer: "Yes, DNS updates take time to propagate globally across various caches, meaning it is eventually consistent.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "evcon-q15", question: "How does asynchronous replication lead to eventual consistency?", answer: "The master acknowledges the write immediately, but followers apply the write later, creating a window where reads might be stale.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-q16", question: "What happens to eventually consistent systems during a prolonged network partition?", answer: "They continue to accept writes on both sides, which will need to be aggressively reconciled once the partition heals.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "evcon-q17", question: "Can a bank use eventual consistency for account balances?", answer: "Typically no, they require strong consistency (ACID) to prevent double-spending or overdrafts.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-q18", question: "How do you tune consistency in Cassandra?", answer: "Using Quorum settings. By setting Write Quorum + Read Quorum > Replication Factor, you can achieve strong consistency.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "evcon-q19", question: "What are 'siblings' in the context of eventual consistency?", answer: "Conflicting versions of a record kept by the database when it cannot automatically resolve a concurrent write conflict.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "evcon-q20", question: "What is the 'inconsistency window'?", answer: "The time gap between a write occurring and it being successfully propagated to all replicas.", topic: "Distributed Systems", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How would you implement conflict resolution in a shopping cart application?",
    "Explain tunable consistency and Quorum reads/writes.",
    "When is eventual consistency absolutely unacceptable?"
  ],
  commonMistakes: [
    "Assuming eventual consistency means data loss (it means stale reads and conflicts, not necessarily dropping data).",
    "Failing to discuss how conflicts are actually resolved (LWW, CRDTs, Vector Clocks).",
    "Thinking eventual consistency implies slow systems; it's actually used to make systems faster for clients."
  ],
  interviewTraps: [
    "Proposing eventual consistency for financial ledgers or transactional systems.",
    "Mentioning LWW without acknowledging the risks of clock drift."
  ],
  tradeoffs: [
    "High Availability vs Stale Data",
    "Low Latency vs Conflict Resolution Overhead",
    "Network Partition Tolerance vs Strong Consistency"
  ],
  memoryTrick: "Like updating a Wikipedia page: everyone will EVENTUALLY see the new edit, but if two people edit at once, you have to resolve the conflict.",
  realWorldExamples: [
    "DNS (Domain Name System) takes up to 48 hours to propagate fully.",
    "Amazon DynamoDB shopping carts use it, resolving conflicts by merging carts rather than rejecting items."
  ],
  mermaidDiagram: `sequenceDiagram
    participant C as Client
    participant N1 as Node 1
    participant N2 as Node 2
    C->>N1: Write(A=1)
    N1-->>C: Ack (Fast Response)
    Note over N1, N2: Inconsistency Window
    N1->>N2: Async Sync(A=1)`,
  flashcards: [
    { id: "evcon-fc1", front: "What does Eventual Consistency guarantee?", back: "If no new writes occur, all replicas will eventually hold the same data.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "evcon-fc2", front: "What is Last Write Wins (LWW)?", back: "A conflict resolution strategy using timestamps to keep the latest write, risking data loss from clock drift.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-fc3", front: "What is Read Repair?", back: "Fixing stale replicas on the fly when a read operation detects inconsistencies.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "evcon-fc4", front: "What is the main tradeoff for Eventual Consistency?", back: "Sacrificing strong consistency to gain high availability and low latency.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "evcon-fc5", front: "What are CRDTs?", back: "Conflict-Free Replicated Data Types, specialized data structures that handle concurrent updates without conflicts.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Eventual Consistency Cheat Sheet",
    sections: [
      { heading: "Core Concept", items: ["High availability (AP in CAP)", "Asynchronous replication", "Eventual convergence"] },
      { heading: "Background Processes", items: ["Read Repair", "Anti-Entropy (Gossip)", "Hinted Handoff"] },
      { heading: "Conflict Resolution", items: ["Last Write Wins (LWW)", "Vector Clocks", "Application-level resolution"] }
    ]
  },
  speedNotes: [
    "Trades consistency for availability.",
    "Fast writes, asynchronous replication.",
    "Reads may be stale.",
    "Requires conflict resolution (LWW/Vectors).",
    "Used in Cassandra, DNS, DynamoDB."
  ]
};
