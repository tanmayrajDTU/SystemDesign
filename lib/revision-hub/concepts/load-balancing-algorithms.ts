import type { ConceptRevisionContent } from "./types";

export const loadBalancingAlgorithms: ConceptRevisionContent = {
  slug: "load-balancing-algorithms",
  title: "Load Balancing Algorithms",
  topic: "Load Balancing",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Algorithms", href: "/docs/load-balancing/algorithms" },
    { label: "Layer 7 Load Balancing", href: "/docs/load-balancing/layer-7" },
  ],
  summary: [
    "Load balancing algorithms determine how incoming traffic is distributed across backend servers.",
    "Static algorithms (like Round Robin) distribute traffic without checking server state.",
    "Dynamic algorithms (like Least Connections) make decisions based on the current load of the servers.",
    "Hashing algorithms (like IP Hash) are used to maintain session persistence (sticky sessions).",
    "Choosing the right algorithm prevents overloading a single server and ensures high availability.",
  ],
  whyAsked: [
    "To test your understanding of how systems distribute work efficiently.",
    "To evaluate your knowledge of system state and dynamic vs static routing.",
    "To see if you know how to handle specific edge cases, like long-lived connections or sticky sessions.",
  ],
  thirtySecondAnswer: "Load balancing algorithms decide which backend server gets the next request. Round Robin is simple and static, distributing requests sequentially. Least Connections is dynamic, sending traffic to the server with the fewest active connections. IP Hash uses the client's IP to ensure they always hit the same server (sticky sessions). Choosing the right one depends on request duration and server capacity.",
  detailedAnswer: [
    "Round Robin: Requests are distributed sequentially across the pool of servers. Best when servers are identical and requests are short.",
    "Weighted Round Robin: Assigns a weight to each server based on its capacity. More powerful servers get more requests.",
    "Least Connections: Sends the new request to the server with the fewest active connections. Ideal for long-lived connections like WebSockets or DB queries.",
    "Least Response Time: Sends requests to the server with the fewest active connections AND the lowest average response time.",
    "IP Hash: Generates a hash from the client's IP address to map them to a specific server. Useful for maintaining session state (sticky sessions).",
  ],
  questions: [
    { id: "lba-q1", question: "What is Round Robin load balancing?", answer: "Distributing requests sequentially across a list of servers.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "lba-q2", question: "When is Round Robin a bad choice?", answer: "When requests have vastly different processing times, or servers have different capacities.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-q3", question: "What is Weighted Round Robin?", answer: "An algorithm where servers are assigned a weight (e.g., 2x or 3x) based on capacity, receiving proportionally more traffic.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "lba-q4", question: "How does the Least Connections algorithm work?", answer: "It routes the next request to the server with the fewest currently active connections.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "lba-q5", question: "When would you prefer Least Connections over Round Robin?", answer: "When connections are long-lived (like WebSockets) or request processing times vary heavily.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-q6", question: "What is IP Hashing?", answer: "Hashing the client's IP address to consistently route them to the same backend server.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-q7", question: "What is the primary use case for IP Hashing?", answer: "Maintaining session persistence (sticky sessions) without a centralized session store.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-q8", question: "What is the downside of IP Hashing?", answer: "Traffic can become unbalanced if many clients sit behind a single NAT or Proxy with the same IP.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "lba-q9", question: "How does Least Response Time algorithm improve upon Least Connections?", answer: "It considers both the number of active connections and the historical response time of the server to find the genuinely fastest node.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "lba-q10", question: "What is Random load balancing?", answer: "Picking a server completely at random. Statistically smooths out at large scale but can be uneven in small bursts.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "lba-q11", question: "What happens in IP Hashing if a server goes down?", answer: "The hashing ring must be recalculated, usually resulting in clients being reassigned to new servers (losing session state).", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "lba-q12", question: "How does Consistent Hashing fix the problem of server failure in IP Hashing?", answer: "It minimizes the number of keys/clients that need to be remapped when a server is added or removed.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "lba-q13", question: "What is Power of Two Choices?", answer: "Picking two servers at random and sending the request to the one with the fewer active connections. Highly efficient at scale.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "lba-q14", question: "If you have a mix of old slow servers and new fast servers, which algorithm is best?", answer: "Weighted Round Robin or Least Connections.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-q15", question: "Does Round Robin check server health?", answer: "The algorithm itself doesn't, but the LB generally relies on separate health checks to remove dead nodes from the rotation.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-q16", question: "Can Least Connections be used in a Layer 4 load balancer?", answer: "Yes, L4 tracks TCP connection states, so it knows active connection counts.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-q17", question: "What is Geo-based or Proximity routing?", answer: "Routing the client to the server physically closest to them, usually handled at the DNS layer.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-q18", question: "Why avoid sticky sessions (IP Hash) if possible?", answer: "They break statelessness, make scaling harder, and unevenly distribute load.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "lba-q19", question: "What algorithm do modern cloud load balancers default to?", answer: "Often Round Robin or Least Connections, combined with health checks.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "lba-q20", question: "How does URL Hashing differ from IP Hashing?", answer: "URL Hashing hashes the request path instead of the IP, useful for ensuring cache hits on backend servers.", topic: "Load Balancing", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "Explain when Round Robin fails to distribute load evenly.",
    "How does the Power of Two Choices algorithm work in massive distributed systems?",
    "Why are stateless backends preferred over sticky sessions?",
  ],
  commonMistakes: [
    "Using Round Robin for workloads with highly variable request processing times.",
    "Relying on IP Hashing for sticky sessions without realizing that clients behind a corporate NAT share one IP.",
  ],
  interviewTraps: [
    "Recommending IP Hashing for state management. The better design is usually to store sessions in a distributed cache like Redis, keeping application servers stateless.",
  ],
  tradeoffs: [
    "Simplicity (Round Robin) vs Accuracy (Least Connections): Simple algorithms require less compute on the LB, but might result in uneven backend load.",
    "Sticky Sessions vs Statelessness: Sticky sessions save DB lookups but create uneven load and risk session loss on server failure.",
  ],
  comparisonTable: {
    title: "Round Robin vs Least Connections vs IP Hash vs Weighted",
    columns: ["Algorithm", "Behavior", "Best Use Case", "Drawback"],
    rows: [
      { label: "Round Robin", values: ["Sequential distribution", "Identical servers, fast requests", "Fails if request times vary"] },
      { label: "Weighted", values: ["Proportional by capacity", "Mix of old and new hardware", "Requires manual tuning"] },
      { label: "Least Connections", values: ["Lowest active connections", "Long-lived connections (WebSockets)", "LB must track state"] },
      { label: "IP Hash", values: ["Hashes client IP", "Session persistence (Sticky)", "NAT clients clump to one server"] },
    ],
  },
  memoryTrick: "Round Robin takes turns, Least Connections checks the line, IP Hash remembers your face.",
  realWorldExamples: [
    "Using URL Hashing in a CDN or caching tier to ensure requests for the same image always hit the same caching server, maximizing cache hits.",
    "Using Least Connections for a WebSocket chat application where connections stay open for hours.",
  ],
  mermaidDiagram: `flowchart TD
    Client1[Client A]
    Client2[Client B]
    LB[Load Balancer]
    S1[Server 1 (High Load)]
    S2[Server 2 (Low Load)]
    
    Client1 --> LB
    Client2 --> LB
    
    LB -->|Least Connections| S2
    Note right of LB: Routes to least busy server`,
  flashcards: [
    { id: "lba-fc1", front: "What is Round Robin?", back: "Distributing requests sequentially one by one across servers.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "lba-fc2", front: "When should you use Weighted Round Robin?", back: "When your backend servers have different compute capacities.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-fc3", front: "What does Least Connections do?", back: "Routes traffic to the server with the fewest currently active connections.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "lba-fc4", front: "Why use IP Hashing?", back: "To maintain sticky sessions by always routing a client to the same server.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "lba-fc5", front: "What is the Power of Two Choices?", back: "Picking two random servers and sending the request to the one with less load.", topic: "Load Balancing", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "LB Algorithms Cheat Sheet",
    sections: [
      {
        heading: "Static Algorithms",
        items: [
          "Round Robin: Sequential order.",
          "Weighted Round Robin: Factoring in server capacity.",
          "Random: Statistically even at scale.",
        ],
      },
      {
        heading: "Dynamic Algorithms",
        items: [
          "Least Connections: Fewest active connections.",
          "Least Response Time: Fastest historical response.",
        ],
      },
      {
        heading: "Hashing Algorithms",
        items: [
          "IP Hash: Sticky sessions for clients.",
          "URL Hash: Maximizes cache hits for specific paths.",
        ],
      },
    ],
  },
  speedNotes: [
    "Round Robin: simple, equal servers.",
    "Weighted: unequal server capacities.",
    "Least Connections: long-lived tasks.",
    "IP Hash: sticky sessions.",
    "Power of Two: efficient at scale.",
  ],
};
