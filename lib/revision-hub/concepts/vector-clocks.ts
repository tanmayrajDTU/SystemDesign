import type { ConceptRevisionContent } from "./types";

export const vectorClocks: ConceptRevisionContent = {
  slug: "vector-clocks",
  title: "Vector Clocks",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Vector Clocks", href: "/docs/distributed-systems/vector-clocks" },
    { label: "Lamport Clocks", href: "/docs/distributed-systems/lamport-clock" }
  ],
  summary: [
    "Vector clocks are an algorithm for generating a partial ordering of events in a distributed system and detecting causality violations.",
    "Each node maintains an array (vector) of logical timestamps, with one entry for every node in the system.",
    "When a node performs a local event, it increments its own counter in its vector.",
    "When nodes communicate, they exchange vectors and merge them by taking the element-wise maximum.",
    "Unlike Lamport clocks, vector clocks can accurately determine if two events are causally related or concurrent."
  ],
  whyAsked: [
    "To test your understanding of causality and ordering in distributed systems.",
    "To evaluate your knowledge of conflict resolution in Dynamo-style databases.",
    "To see if you understand the tradeoffs of capturing true causal history vs metadata overhead."
  ],
  thirtySecondAnswer: "A vector clock is an array of logical clocks maintained by each node in a distributed system to track causality. When an event occurs, a node increments its own counter. When messages are sent, the vector is attached; upon receipt, the node merges the incoming vector by taking the maximum of each corresponding element. This allows the system to accurately determine if events are causally related or concurrent, which is crucial for conflict detection in distributed databases like Amazon Dynamo.",
  detailedAnswer: [
    "A vector clock is represented as an array V[1..N], where N is the number of nodes.",
    "Node i increments V[i] for every local event.",
    "When sending a message, Node i attaches its current vector V.",
    "When receiving a message with vector W, Node i updates its vector: V[j] = max(V[j], W[j]) for all j, and increments V[i].",
    "Event A causes Event B if every element in A's vector is <= B's vector, and at least one element is strictly less.",
    "If neither A causes B nor B causes A, the events are concurrent (a conflict exists)."
  ],
  questions: [
    { id: "vc-q1", question: "What is a Vector Clock?", answer: "A data structure used in distributed systems to determine the partial ordering of events and detect causal relationships.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "vc-q2", question: "What problem do Vector Clocks solve?", answer: "They solve the inability to accurately detect if two events are concurrent, which simple logical clocks (Lamport clocks) cannot do.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "vc-q3", question: "How is a Vector Clock represented?", answer: "As an array or map of counters, where each node in the system has its own corresponding index/counter.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "vc-q4", question: "What happens when a node performs a local event?", answer: "It increments its own counter in its local vector clock.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "vc-q5", question: "What happens when a node receives a message?", answer: "It merges the incoming vector with its own by taking the maximum of each element, then increments its own counter.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "vc-q6", question: "How do you determine if Event A caused Event B?", answer: "If all counters in A's vector are <= B's corresponding counters, and at least one is strictly less.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q7", question: "How do you detect concurrent events (conflicts)?", answer: "If A's vector has some counters greater than B's, and B's vector has some counters greater than A's.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q8", question: "What is a major disadvantage of Vector Clocks?", answer: "The size of the vector grows linearly with the number of nodes, adding significant metadata overhead.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "vc-q9", question: "How does Amazon Dynamo use Vector Clocks?", answer: "To track versions of data objects and detect concurrent writes that require conflict resolution by the client.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q10", question: "Can Vector Clocks determine real-time ordering?", answer: "No, they only determine causal logical ordering. They don't track physical time.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "vc-q11", question: "How do you handle nodes joining or leaving in Vector Clocks?", answer: "Usually via dynamic maps instead of fixed arrays, but removing nodes often requires garbage collection mechanisms to prevent infinite growth.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q12", question: "What is the difference between Vector Clocks and Version Vectors?", answer: "Vector Clocks track events across nodes, while Version Vectors track data replica updates. They operate identically in principle.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q13", question: "If Vector A is [2,1,0] and Vector B is [2,2,0], what is their relationship?", answer: "A happened before B, because all elements of A are <= B, and A[1] < B[1].", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "vc-q14", question: "If Vector A is [2,1,0] and Vector B is [1,2,0], what is their relationship?", answer: "They are concurrent. A has a higher value at index 0, but B has a higher value at index 1.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "vc-q15", question: "What is a Siblings in the context of Dynamo?", answer: "Conflicting versions of a data object detected via Vector Clocks that must be resolved by the application.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q16", question: "Why not use physical timestamps instead of Vector Clocks?", answer: "Physical clocks suffer from clock skew and drift, making it impossible to guarantee accurate causality ordering.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "vc-q17", question: "What is partial ordering?", answer: "A mathematical ordering where not every pair of items can be compared. In distributed systems, concurrent events have no order relative to each other.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q18", question: "Can Vector Clocks replace consensus algorithms like Paxos?", answer: "No. Vector Clocks detect conflicts; consensus algorithms prevent them by ensuring strong consistency.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q19", question: "How is vector clock metadata pruned in systems with many clients?", answer: "Using timestamp-based truncation, limiting the number of vector entries, or shifting to server-id based tracking.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-q20", question: "What happens if a node's vector clock counter overflows?", answer: "It could cause logical errors, though practical implementations use large integers (e.g., 64-bit) where overflow is statistically impossible.", topic: "Distributed Systems", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How does the size of a Vector Clock scale, and how can we mitigate it?",
    "Explain how a client handles 'siblings' when a read returns conflicting data.",
    "What is the difference between causal consistency and strong consistency?"
  ],
  commonMistakes: [
    "Assuming vector clocks resolve conflicts (they only DETECT conflicts; the app must resolve them).",
    "Confusing Vector Clocks with Lamport Clocks and assuming Lamport Clocks can detect concurrency.",
    "Assuming the length of the vector is fixed in dynamic systems."
  ],
  interviewTraps: [
    "Proposing Vector Clocks for a system with millions of ephemeral clients (the vector would grow too large).",
    "Failing to articulate that 'concurrent' does not mean 'happening at the exact same physical time', but rather 'happening without causal relation'."
  ],
  tradeoffs: [
    "Causality Accuracy vs Metadata Overhead",
    "Conflict Detection vs Immediate Consistency",
    "Client-side Conflict Resolution vs Server-side Coordination"
  ],
  comparisonTable: {
    title: "Vector Clocks vs Lamport Clocks",
    columns: ["Feature", "Vector Clocks", "Lamport Clocks"],
    rows: [
      { label: "Data Structure", values: ["Array/Map of counters", "Single integer counter"] },
      { label: "Size Overhead", values: ["O(N) where N is number of nodes", "O(1) constant size"] },
      { label: "Detects Causality", values: ["Yes (A -> B iff V(A) < V(B))", "No (L(A) < L(B) doesn't imply A -> B)"] },
      { label: "Detects Concurrency", values: ["Yes", "No"] },
      { label: "Use Case", values: ["Conflict detection (Dynamo)", "Total ordering with tie-breakers"] }
    ]
  },
  memoryTrick: "Lamport is one clock for the whole system; Vector is one clock per node, allowing you to see exactly 'who knew what when'.",
  realWorldExamples: [
    "Amazon Dynamo uses vector clocks to capture causality between different versions of the same object.",
    "Riak uses them (specifically version vectors) to detect concurrent updates and return siblings."
  ],
  mermaidDiagram: `sequenceDiagram
    participant N1 as Node 1
    participant N2 as Node 2
    Note over N1: [1,0]
    N1->>N2: Msg with [1,0]
    Note over N2: Merge: [1,1]
    N2->>N1: Msg with [1,1]
    Note over N1: Merge: [2,1]`,
  flashcards: [
    { id: "vc-fc1", front: "How do you detect concurrent events using Vector Clocks?", back: "If neither vector is less than or equal to the other (each has at least one element greater than the other).", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "vc-fc2", front: "What is the space complexity of a Vector Clock?", back: "O(N), where N is the number of nodes.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "vc-fc3", front: "What happens on receiving a message with Vector W at Node i?", back: "Node i sets V[j] = max(V[j], W[j]) for all j, and increments V[i].", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "vc-fc4", front: "Can Vector Clocks resolve data conflicts?", back: "No, they only detect them. The application or a heuristic (like LWW) must resolve them.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "vc-fc5", front: "What does V(A) < V(B) mean in Vector Clocks?", back: "Event A causally happened before Event B.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Vector Clocks Cheat Sheet",
    sections: [
      { heading: "Rules", items: ["Increment own counter on local event", "Merge by taking element-wise max", "Increment own counter on receive"] },
      { heading: "Comparison", items: ["A -> B: A[i] <= B[i] for all i, and A < B", "Concurrent: A !< B and B !< A"] },
      { heading: "Pros & Cons", items: ["Accurate causal history", "High metadata overhead (O(N))", "Requires garbage collection for dropped nodes"] }
    ]
  },
  speedNotes: [
    "Array of logical clocks.",
    "Tracks true causality.",
    "Detects concurrent events (conflicts).",
    "Space overhead is O(N).",
    "Used in Amazon Dynamo."
  ]
};
