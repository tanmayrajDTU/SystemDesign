import type { ConceptRevisionContent } from "./types";

export const consistentHashing: ConceptRevisionContent = {
  slug: "consistent-hashing",
  title: "Consistent Hashing",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Consistent Hashing", href: "/docs/distributed-systems/consistent-hashing" },
    { label: "Sharding", href: "/docs/databases/sharding" }
  ],
  summary: [
    "Consistent Hashing is a distributed hashing scheme that operates independently of the number of servers or objects.",
    "It assigns both servers and data to positions on a conceptual circular hash ring.",
    "When a server is added or removed, it only affects a minimal amount of data (K/N), unlike modulo hashing where almost all data is remapped.",
    "Data keys are mapped to the ring, and the system walks clockwise to find the first available server.",
    "Virtual nodes (vnodes) are often used to ensure even data distribution across servers of varying capacities.",
    "It is a foundational technique in distributed caching, NoSQL databases, and load balancers."
  ],
  whyAsked: [
    "To see if you understand how to scale stateful systems dynamically.",
    "To test your knowledge of data partitioning and minimizing reshuffling during topology changes.",
    "To evaluate if you can identify edge cases like hotspots and uneven data distribution in distributed systems."
  ],
  thirtySecondAnswer: "Consistent hashing maps both data keys and server nodes to a circular hash space. To find where a key lives, you hash the key to a position on the ring and walk clockwise until you hit a server node. If a server is added or removed, only the keys belonging to that specific server segment need to be moved, vastly reducing data movement compared to standard modulo hashing. Virtual nodes are used to balance the load more evenly across physical machines.",
  detailedAnswer: [
    "In standard modulo hashing (hash(key) % N), changing N (number of servers) invalidates nearly all mappings, causing massive cache misses or data migrations.",
    "Consistent hashing solves this by mapping the output range of a hash function (e.g., 0 to 2^32-1) onto a logical ring.",
    "Both server IDs (e.g., IP addresses) and data keys are hashed using the same function to determine their positions on this ring.",
    "A key is assigned to the first server encountered by moving clockwise from the key's position on the ring.",
    "When server S is removed, only its keys are reassigned to the next server clockwise. When a new server is added, it only takes keys from its immediate clockwise successor.",
    "Because physical servers on the ring might be placed unevenly (causing skewed load), we use 'virtual nodes'. A single physical server might correspond to hundreds of virtual nodes randomly distributed on the ring, smoothing out the load."
  ],
  questions: [
    { id: "ch-q1", question: "What is the primary problem consistent hashing solves?", answer: "It minimizes data remapping when the number of servers (N) changes.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "ch-q2", question: "How does routing work on a consistent hash ring?", answer: "Hash the data key, find its position on the ring, and move clockwise to the nearest server node.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "ch-q3", question: "What happens when a node is removed?", answer: "Only the data mapped to the removed node is moved to the next clockwise node. Other data remains untouched.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "ch-q4", question: "What happens when a node is added?", answer: "It takes over a portion of data from its immediate clockwise successor; no other nodes are affected.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "ch-q5", question: "What is the expected fraction of keys that move when N changes?", answer: "K / N, where K is total keys and N is the number of servers.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-q6", question: "What is a virtual node (vnode)?", answer: "A technique where one physical server maps to multiple points on the hash ring to balance load.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-q7", question: "Why do we need virtual nodes?", answer: "Standard consistent hashing can lead to uneven data distribution. Vnodes randomize placement, ensuring uniform distribution.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-q8", question: "How can vnodes handle heterogeneous servers?", answer: "Assign more vnodes to powerful servers and fewer to weaker ones, achieving weighted distribution.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-q9", question: "Which data structure is typically used to implement a hash ring?", answer: "A self-balancing Binary Search Tree (like a Red-Black Tree) or a sorted array with binary search.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-q10", question: "What is the time complexity to find a node on the ring?", answer: "O(log N) where N is the number of total virtual nodes on the ring.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-q11", question: "Does consistent hashing guarantee perfect load balancing?", answer: "No, even with vnodes, there can be slight variances. Hotkeys also bypass the distribution logic.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-q12", question: "How is replication handled in consistent hashing?", answer: "By walking clockwise and picking the next 'R' distinct physical nodes (not just virtual nodes).", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "ch-q13", question: "What is cascading failure in consistent hashing?", answer: "When a node dies, its load shifts to the next node. If the next node is near capacity, it might crash too, causing a domino effect.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "ch-q14", question: "How do virtual nodes help mitigate cascading failures?", answer: "Because a dead node's vnodes are scattered, its load is distributed across many remaining physical servers, not just one.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "ch-q15", question: "What hash functions are preferred for consistent hashing?", answer: "Cryptographic (MD5, SHA-1) or non-cryptographic (MurmurHash) functions that offer uniform distribution.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "ch-q16", question: "How does DynamoDB use consistent hashing?", answer: "Dynamo uses a partitioned hash ring where data is replicated to N successive nodes to ensure high availability.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "ch-q17", question: "How do you handle a 'hot key' in consistent hashing?", answer: "Consistent hashing doesn't solve hot keys natively. You need application-level caching, key splitting, or salting.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "ch-q18", question: "What is the impact of too many virtual nodes?", answer: "Increased memory overhead for the routing table and slightly slower O(log N) lookups.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "ch-q19", question: "Can consistent hashing be used for stateless services?", answer: "Yes, for instance, in sticky-session load balancing to route a user to the same server while allowing dynamic scaling.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "ch-q20", question: "What is the difference between consistent hashing and rendezvous hashing?", answer: "Rendezvous hashing (Highest Random Weight) achieves the same goal without a ring, by scoring nodes per key.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you handle a celebrity user (hot key) causing a skewed load on one server?",
    "How does data replication work in a consistent hashing system?",
    "How do you implement the ring efficiently in code?"
  ],
  commonMistakes: [
    "Thinking consistent hashing solves the hot-key problem (it only solves the hot-partition/skew problem).",
    "Forgetting to mention virtual nodes—without them, consistent hashing distributes data very poorly.",
    "Assuming O(1) lookup time. It's O(log N) since you have to search the sorted ring for the next node."
  ],
  interviewTraps: [
    "Replicating data to the next 3 virtual nodes instead of the next 3 distinct PHYSICAL nodes, which ruins fault tolerance.",
    "Using a simple array without sorting it, leading to O(N) lookup instead of O(log N)."
  ],
  tradeoffs: [
    "Vnodes balance load perfectly BUT increase the size of the routing table.",
    "Requires maintaining a synchronized view of the ring across all routers/clients, adding coordination overhead."
  ],
  memoryTrick: "Data walks the ring clockwise to find its nearest home.",
  realWorldExamples: [
    "Amazon DynamoDB / Apache Cassandra for data partitioning and replication.",
    "Akamai / CDN edge caching to ensure the same video chunks map to the same edge servers."
  ],
  mermaidDiagram: `flowchart LR
    Client --> HashKey[Hash Key to 0-360]
    HashKey --> Ring((Hash Ring))
    Ring --> NodeA[Node A]
    Ring --> NodeB[Node B]
    Ring --> NodeC[Node C]`,
  flashcards: [
    { id: "ch-fc1", front: "What does Consistent Hashing minimize?", back: "Data re-mapping when nodes are added or removed (K/N keys move).", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "ch-fc2", front: "How do you find a node on the ring?", back: "Hash the key and walk clockwise to the first node.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "ch-fc3", front: "What solves uneven data distribution on the ring?", back: "Virtual Nodes (vnodes).", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-fc4", front: "What is the lookup complexity on the ring?", back: "O(log N) using a BST or binary search on a sorted array.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "ch-fc5", front: "How are heterogeneous servers handled?", back: "By assigning proportional amounts of vnodes based on capacity.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Consistent Hashing Cheatsheet",
    sections: [
      {
        heading: "The Basics",
        items: [
          "Maps keys and servers to a circular hash space.",
          "Clockwise walk to find node.",
          "Only K/N keys are moved on topology change."
        ]
      },
      {
        heading: "Virtual Nodes",
        items: [
          "1 physical server = multiple virtual nodes on ring.",
          "Provides uniform distribution.",
          "Prevents cascading failures.",
          "Enables weighted capacity."
        ]
      },
      {
        heading: "Implementation",
        items: [
          "Array of sorted hashes + Binary Search = O(log N).",
          "Replication requires finding distinct physical nodes."
        ]
      }
    ]
  },
  speedNotes: [
    "Ring maps keys to servers.",
    "Move clockwise to find server.",
    "Only K/N data moves.",
    "Virtual nodes balance the load.",
    "Lookup is O(log N)."
  ]
};
