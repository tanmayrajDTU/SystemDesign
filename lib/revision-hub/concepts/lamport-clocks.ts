import type { ConceptRevisionContent } from "./types";

export const lamportClocks: ConceptRevisionContent = {
  slug: "lamport-clocks",
  title: "Lamport Clocks",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Lamport Clocks", href: "/docs/distributed-systems/lamport-clock" },
    { label: "Vector Clocks", href: "/docs/distributed-systems/vector-clocks" }
  ],
  summary: [
    "A Lamport Clock is a simple logical clock algorithm used to determine the order of events in a distributed system.",
    "Each node maintains a single integer counter.",
    "The counter is incremented before every local event.",
    "When a message is sent, the counter is attached; when received, the node updates its counter to max(local, received) + 1.",
    "It guarantees that if Event A causally precedes Event B, then Clock(A) < Clock(B), but not the reverse."
  ],
  whyAsked: [
    "To test fundamental understanding of logical time vs physical time.",
    "To evaluate knowledge of event ordering in distributed architectures.",
    "As a stepping stone to discussing more complex mechanisms like Vector Clocks."
  ],
  thirtySecondAnswer: "A Lamport Clock is a simple logical counter maintained by each node to track event ordering without relying on synchronized physical clocks. A node increments its counter for local events, and upon receiving a message, updates its clock to the maximum of its own clock and the message's timestamp, plus one. While it guarantees that if A happened before B, A's timestamp is smaller, it cannot definitively tell if two events were concurrent or causally related just by looking at their timestamps.",
  detailedAnswer: [
    "Physical clocks are unreliable in distributed systems due to clock drift and skew.",
    "Lamport Clocks use a single integer counter per process to provide a logical timestamp.",
    "Rule 1: A process increments its counter before executing an event.",
    "Rule 2: A process attaches its current clock value to every message it sends.",
    "Rule 3: Upon receiving a message, a process updates its clock to max(local_clock, received_clock) + 1.",
    "To achieve total ordering, Lamport timestamps are combined with arbitrary tie-breakers (like Node ID), e.g., (Timestamp, NodeID)."
  ],
  questions: [
    { id: "lc-q1", question: "What is a Lamport Clock?", answer: "A simple logical clock mechanism used to assign a partial ordering to events in a distributed system.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "lc-q2", question: "Why do we need logical clocks?", answer: "Because physical clocks across distributed nodes cannot be perfectly synchronized due to clock drift.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "lc-q3", question: "How does a node update its Lamport clock on a local event?", answer: "It simply increments its integer counter by 1.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "lc-q4", question: "How does a node update its Lamport clock on receiving a message?", answer: "It sets its clock to max(local_clock, received_clock) + 1.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-q5", question: "If A -> B (A happens before B), what is true about their Lamport timestamps?", answer: "L(A) < L(B).", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-q6", question: "If L(A) < L(B), does that mean A happened before B?", answer: "No. It is possible they are concurrent. Lamport clocks do not capture causality backwards.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "lc-q7", question: "How do you achieve a total ordering of events using Lamport Clocks?", answer: "By breaking ties using a unique identifier, like a Node ID or Process ID: (Time, NodeID).", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "lc-q8", question: "Can Lamport Clocks detect concurrent events?", answer: "No, they cannot distinguish between causal events and concurrent events based purely on timestamps.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-q9", question: "What is the primary advantage of Lamport Clocks over Vector Clocks?", answer: "Extremely low overhead. It only requires storing and transmitting a single integer.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-q10", question: "Who invented Lamport Clocks?", answer: "Leslie Lamport, introduced in his seminal 1978 paper 'Time, Clocks, and the Ordering of Events in a Distributed System'.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "lc-q11", question: "What happens if a node never communicates with other nodes?", answer: "Its clock simply advances linearly based on local events, independently of the rest of the system.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-q12", question: "Is the total ordering provided by Lamport clocks consistent with true causality?", answer: "Yes, because if A causally precedes B, L(A) < L(B), so A will always be ordered before B in the total order.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "lc-q13", question: "What is a 'happens-before' relationship?", answer: "A relation indicating that one event causally influences another, denoted by A -> B.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "lc-q14", question: "What happens if a malicious node sends a message with an artificially massive Lamport timestamp?", answer: "It will force receiving nodes to update their clocks to a massive number, fast-forwarding the logical time of the whole system.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "lc-q15", question: "Does Lamport clock order align with physical time order?", answer: "Not necessarily. If A happens physically before B, but they don't communicate, their Lamport clocks could order B before A.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "lc-q16", question: "How are Lamport clocks used in practice?", answer: "Often as a basic primitive for ordering in distributed state machines, databases, or consensus protocols.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-q17", question: "What is the size of a Lamport timestamp?", answer: "Usually 64 bits (or 32 bits), essentially constant O(1) space.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "lc-q18", question: "Why can't Lamport clocks capture true causality?", answer: "Because compressing the state of all nodes into a single integer loses the information about which node influenced which.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "lc-q19", question: "Can two events have the exact same Lamport timestamp?", answer: "Yes, if they happen concurrently on different nodes that happen to have the same clock value.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-q20", question: "How does Spanner solve the physical clock problem that Lamport clocks address?", answer: "Spanner uses TrueTime (GPS and atomic clocks) to bound physical clock uncertainty instead of relying purely on logical clocks.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you detect concurrent events if Lamport Clocks cannot do it?",
    "Explain how to construct a totally ordered state machine using Lamport Clocks.",
    "What is the impact of a node failing in a system using Lamport Clocks?"
  ],
  commonMistakes: [
    "Assuming L(A) < L(B) implies A caused B.",
    "Believing that Lamport clocks can resolve data conflicts like Vector Clocks.",
    "Confusing logical time with synchronized physical time (NTP)."
  ],
  interviewTraps: [
    "Stating that Lamport Clocks provide strict causality tracking.",
    "Failing to mention that ties must be broken (e.g., using Node IDs) to achieve a total order."
  ],
  tradeoffs: [
    "O(1) Space Overhead vs Loss of Causality Detection",
    "Simplicity vs Inability to detect concurrent edits",
    "Total Ordering via tie-breakers vs Arbitrary Ordering of concurrent events"
  ],
  memoryTrick: "Lamport clocks only tell you if something MIGHT have happened before something else, not if it definitely did.",
  realWorldExamples: [
    "Foundational concept used in academic distributed systems literature.",
    "Used as a component in various distributed locking and consensus protocols."
  ],
  mermaidDiagram: `sequenceDiagram
    participant P1 as Process 1
    participant P2 as Process 2
    Note over P1: L=1
    P1->>P2: Msg(L=1)
    Note over P2: Local L=0 -> max(0,1)+1 = 2
    P2->>P1: Msg(L=2)
    Note over P1: Local L=1 -> max(1,2)+1 = 3`,
  flashcards: [
    { id: "lc-fc1", front: "What is the update rule on receiving a message?", back: "New Clock = max(Local Clock, Message Clock) + 1", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-fc2", front: "Does L(A) < L(B) imply A happened before B?", back: "No. A and B could be concurrent.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "lc-fc3", front: "Does A -> B imply L(A) < L(B)?", back: "Yes. If A happened before B, A's clock must be smaller.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "lc-fc4", front: "How do Lamport Clocks break ties?", back: "By appending a unique Node ID: (Timestamp, NodeID).", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "lc-fc5", front: "What problem do Lamport Clocks solve?", back: "The inability to rely on physical clocks to order events in distributed systems.", topic: "Distributed Systems", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Lamport Clocks Cheat Sheet",
    sections: [
      { heading: "Rules", items: ["Local event: L = L + 1", "Send: Attach L to msg", "Receive: L = max(L, msg.L) + 1"] },
      { heading: "Causality", items: ["A -> B implies L(A) < L(B)", "L(A) < L(B) DOES NOT imply A -> B"] },
      { heading: "Properties", items: ["Provides Partial Order", "Provides Total Order (with tie breaker)", "O(1) Space Complexity"] }
    ]
  },
  speedNotes: [
    "Single integer logical clock.",
    "Solves physical clock unreliability.",
    "A -> B implies L(A) < L(B).",
    "Cannot detect concurrent events.",
    "O(1) space complexity."
  ]
};
