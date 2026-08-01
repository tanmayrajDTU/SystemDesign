import type { ConceptRevisionContent } from "./types";

export const amazonCartDesign: ConceptRevisionContent = {
  slug: "amazon-cart-design",
  title: "Amazon Shopping Cart Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Amazon Cart System", href: "/docs/case-studies/amazon-cart" },
  ],
  summary: [
    "The Amazon shopping cart (Dynamo) requires extreme high availability; 'never lose an add to cart' is the golden rule.",
    "It sacrifices strong consistency for high availability (AP in CAP theorem).",
    "Data is typically stored in a distributed NoSQL key-value store (like DynamoDB).",
    "Eventual consistency can lead to conflicts (e.g., deleted items reappearing), which are resolved during read time.",
    "Vector clocks or timestamp-based conflict resolution are used to handle concurrent modifications.",
  ],
  whyAsked: [
    "Tests deep understanding of the CAP theorem (specifically AP systems).",
    "Evaluates knowledge of conflict resolution and vector clocks.",
    "Assesses ability to design highly scalable key-value storage schemas.",
  ],
  thirtySecondAnswer: "Designing Amazon's shopping cart requires prioritizing Availability over Consistency. If a data center partition occurs, users must still be able to add items. We use a distributed NoSQL datastore like DynamoDB. Because writes can happen concurrently on different nodes without immediate syncing, conflicts occur. The system returns all conflicting versions to the client on read, and resolves them (often by merging) using Vector Clocks to track causality between cart updates.",
  detailedAnswer: [
    "Core requirement: Always writeable. A rejected 'Add to Cart' is lost revenue.",
    "Architecture: Stateless API servers backed by a multi-region distributed Key-Value store.",
    "Data Model: Partition Key is UserID (or SessionID for unauthenticated users). Value is the serialized cart state.",
    "Conflict Resolution: Uses Vector Clocks. If node A and node B receive updates for the same cart while disconnected, they both accept them.",
    "Upon read, the system detects divergent vector clocks and returns both versions.",
    "The client (or presentation layer) merges the carts (e.g., taking the union of items) and writes back the resolved state.",
  ],
  questions: [
    { id: "acd-q1", question: "Why prioritize Availability over Consistency for a shopping cart?", answer: "Because rejecting an 'add to cart' action results in immediate lost revenue. Users tolerate minor glitches (like an item reappearing) better than failures.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "acd-q2", question: "What is the CAP theorem classification of this system?", answer: "AP (Highly Available and Partition Tolerant). It relies on Eventual Consistency.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "acd-q3", question: "How does DynamoDB handle data partitioning?", answer: "Consistent hashing. Data is partitioned across a ring of nodes using the hash of the partition key (UserID).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "acd-q4", question: "What is a Vector Clock?", answer: "A data structure used for determining the partial ordering of events in a distributed system, tracking which node updated what and when.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "acd-q5", question: "How are conflicts resolved?", answer: "By pushing resolution to the read phase. The client receives conflicting versions and merges them, usually by taking a union of items in both carts.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "acd-q6", question: "What happens to a cart for an unauthenticated user?", answer: "The cart is tied to a Session ID stored in a cookie. When the user logs in, the session cart is merged with their persistent user cart.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "acd-q7", question: "Why not use a relational database for the cart?", answer: "RDBMS focuses on strong consistency and ACID, which requires locking and coordination, limiting scalability and write availability during partitions.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "acd-q8", question: "How do you handle deleted items reappearing (resurrection)?", answer: "If merging involves taking unions, a deleted item might reappear if one branch didn't see the delete. Using 'tombstones' (markers for deleted items) solves this.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "acd-q9", question: "What is sloppy quorum?", answer: "During network partitions, if the designated replica nodes are unreachable, writes are temporarily accepted by other healthy nodes (hinted handoff) to maintain availability.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "acd-q10", question: "What is Hinted Handoff?", answer: "A node temporarily stores a write intended for a downed node. When the downed node recovers, the temporary node forwards the data.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "acd-q11", question: "How is the data structured in the Key-Value store?", answer: "Key: UserID, Value: JSON object containing CartItems (ProductID, Quantity), Timestamp, and VectorClock.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "acd-q12", question: "How do you scale reads for the shopping cart?", answer: "Since carts are accessed frequently (on every page load), read replicas or an in-memory cache (Redis) layered in front of the KV store can be used.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "acd-q13", question: "What if the vector clock grows too large?", answer: "Implement truncation schemes. Keep only the most recent N node timestamps, though this risks losing causal history.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "acd-q14", question: "How to handle cart expiry?", answer: "Use a TTL (Time To Live) feature on the datastore. Unauthenticated carts might expire in 30 days, while authenticated ones might persist longer.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "acd-q15", question: "Is the checkout process also AP?", answer: "No, checkout involves inventory and payments, which must be CP (Consistent and Partition Tolerant) using relational DBs and distributed transactions.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "acd-q16", question: "How do you handle multi-device synchronization?", answer: "The vector clock mechanisms naturally handle this. Changes from mobile and web are treated as concurrent updates and merged upon the next read.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "acd-q17", question: "What are the limitations of timestamp-based conflict resolution (LWW)?", answer: "Last-Write-Wins (LWW) relies on synchronized clocks (NTP). Clock drift can cause data loss (e.g., ignoring a valid recent update).", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "acd-q18", question: "How do you backup cart data?", answer: "Continuous asynchronous replication to cold storage (like S3). Exact point-in-time recovery is less critical for carts than for orders.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "acd-q19", question: "What happens when you click 'Save for later'?", answer: "The item is removed from the active cart object and appended to a separate 'SavedItems' list, usually stored in the same partition.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "acd-q20", question: "Why is statelessness important for the API tier?", answer: "Allows any API server to handle any request, enabling horizontal scaling and easy recovery from server failures.", topic: "System Design Case Studies", difficulty: "Beginner" },
  ],
  commonFollowUps: [
    "Can you explain vector clocks with an example?",
    "How does the design change if we want to enforce a hard limit on cart size (e.g., max 50 items)?",
    "How do tombstones affect storage, and how are they cleaned up?",
  ],
  commonMistakes: [
    "Designing the cart using a relational database with strict locking.",
    "Failing to explain how conflicts are resolved (assuming eventual consistency just 'works').",
    "Confusing the AP nature of the cart with the CP nature of checkout.",
  ],
  interviewTraps: [
    "Using Last-Write-Wins (LWW) without acknowledging the risk of data loss due to clock drift in distributed systems.",
    "Assuming read-after-write consistency is guaranteed everywhere.",
  ],
  tradeoffs: [
    "Availability vs Consistency: To ensure a user can always add to cart, we risk returning stale data or requiring conflict resolution on read.",
    "Client-side vs Server-side Merge: Client-side merging offloads compute but complicates client logic. Server-side is easier for clients but can be complex if business rules change.",
  ],
  memoryTrick: "Always writeable, resolve on read (Vector Clocks).",
  realWorldExamples: [
    "Amazon's original Dynamo paper was specifically written to solve this exact shopping cart problem.",
    "Riak is an open-source database heavily inspired by the Dynamo paper.",
  ],
  mermaidDiagram: `flowchart TD
    Client --> LB[Load Balancer]
    LB --> API[API Server]
    API --> N1[(Node A)]
    API --> N2[(Node B)]
    API --> N3[(Node C)]
    N1 -.->|Gossip/Replication| N2
    N2 -.->|Gossip/Replication| N3
    N3 -.->|Gossip/Replication| N1
`,
  flashcards: [
    { id: "acd-fc1", front: "What is the primary design goal of Amazon's cart?", back: "Extreme High Availability (Always Writeable).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "acd-fc2", front: "Where does this system fall in the CAP theorem?", back: "AP (Availability and Partition Tolerance).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "acd-fc3", front: "How are concurrent updates tracked?", back: "Using Vector Clocks to maintain causal history.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "acd-fc4", front: "When are data conflicts resolved?", back: "At read time (Semantic Resolution), often by the client.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "acd-fc5", front: "What prevents deleted items from resurrecting during a merge?", back: "Using Tombstones to explicitly mark items as deleted.", topic: "System Design Case Studies", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "Amazon Shopping Cart",
    sections: [
      { heading: "Core Philosophy", items: ["Never lose an 'Add to Cart'", "AP over CP", "Eventual Consistency"] },
      { heading: "Data Store", items: ["Distributed Key-Value Store", "Partition Key: UserID", "Consistent Hashing"] },
      { heading: "Handling Partitions", items: ["Vector Clocks", "Sloppy Quorum", "Hinted Handoff"] },
    ],
  },
  speedNotes: [
    "Always writeable, AP system",
    "NoSQL Key-Value store",
    "Vector Clocks track versions",
    "Resolve conflicts on read",
    "Tombstones prevent item resurrection",
  ],
};
