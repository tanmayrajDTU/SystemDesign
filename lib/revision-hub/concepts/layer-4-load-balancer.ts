import type { ConceptRevisionContent } from "./types";

export const layer4LoadBalancer: ConceptRevisionContent = {
  slug: "layer-4-load-balancer",
  title: "Layer 4 Load Balancer",
  topic: "Load Balancing",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Layer 4 Load Balancing", href: "/docs/load-balancing/layer-4" },
    { label: "Layer 7 Load Balancing", href: "/docs/load-balancing/layer-7" },
  ],
  summary: [
    "Layer 4 load balancing operates at the Transport layer of the OSI model.",
    "It makes routing decisions based on IP addresses and TCP/UDP ports.",
    "It does not inspect the contents of the application layer (like HTTP headers or URLs).",
    "Because it doesn't parse application data, it is extremely fast and requires minimal compute overhead.",
    "It often acts as a network address translator (NAT), forwarding packets to backend servers.",
  ],
  whyAsked: [
    "To test your understanding of the OSI model in practical system design.",
    "To see if you know when to use L4 (speed, raw TCP) vs L7 (smart routing).",
    "To evaluate knowledge of high-throughput network architectures.",
  ],
  thirtySecondAnswer: "A Layer 4 Load Balancer operates at the transport layer, routing traffic based purely on source/destination IPs and ports (TCP/UDP). Because it doesn't decrypt traffic or inspect HTTP headers, it is blazing fast and handles massive throughput, making it ideal for raw network performance and non-HTTP protocols, though it lacks smart routing capabilities.",
  detailedAnswer: [
    "Operates at the Transport Layer (OSI Layer 4).",
    "Uses IP address and Port number to make routing decisions.",
    "Cannot see HTTP headers, cookies, or URL paths (especially if traffic is encrypted).",
    "Maintains a mapping of incoming connections to backend server connections (often via NAT).",
    "Uses less CPU and memory compared to L7 load balancers.",
    "Often used as a primary edge load balancer, which then routes to L7 load balancers.",
  ],
  questions: [
    { id: "l4lb-q1", question: "At what OSI layer does a Layer 4 Load Balancer operate?", answer: "Layer 4, the Transport Layer.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l4lb-q2", question: "What protocols does an L4 load balancer deal with?", answer: "Primarily TCP and UDP.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l4lb-q3", question: "Can an L4 load balancer route traffic based on a URL path?", answer: "No, it cannot inspect application-level data.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l4lb-q4", question: "Why is an L4 load balancer generally faster than an L7 load balancer?", answer: "It does not need to parse or decrypt the application payload (e.g., HTTP).", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-q5", question: "What information does an L4 load balancer use to route traffic?", answer: "Source IP, Source Port, Destination IP, Destination Port, and Protocol.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-q6", question: "How does NAT work in the context of L4 load balancing?", answer: "The LB changes the destination IP from its own public IP to the backend server's private IP before forwarding the packet.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l4lb-q7", question: "Can an L4 load balancer terminate SSL/TLS?", answer: "Usually no; SSL termination happens at L7. L4 just passes the encrypted TCP stream through.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-q8", question: "What happens to the source IP address when an L4 load balancer forwards a packet?", answer: "In standard NAT, the source IP might be changed to the LB's IP. In Direct Server Return (DSR), the original source IP is preserved.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l4lb-q9", question: "What is Direct Server Return (DSR)?", answer: "A configuration where the backend server responds directly to the client, bypassing the load balancer on the return path.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l4lb-q10", question: "Why use DSR?", answer: "To prevent the load balancer from becoming a bottleneck for large outbound responses (like video streaming).", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l4lb-q11", question: "Can L4 load balancers perform health checks?", answer: "Yes, usually by attempting to open a TCP connection to the backend port.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-q12", question: "How does connection tracking work in an L4 load balancer?", answer: "It keeps a state table of active TCP/UDP flows to ensure all packets for a session go to the same backend server.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l4lb-q13", question: "Name a common software used for L4 load balancing.", answer: "HAProxy, NGINX (stream module), Linux Virtual Server (IPVS).", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-q14", question: "When would you definitely choose L4 over L7?", answer: "For non-HTTP protocols (like custom game protocols, databases) or when absolute maximum network throughput is required.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-q15", question: "What is a 5-tuple in networking?", answer: "Source IP, Source Port, Destination IP, Destination Port, Protocol. Used by L4 LBs to track connections.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-q16", question: "Does an L4 LB need to wait for a full HTTP request to route a packet?", answer: "No, it routes immediately upon the TCP handshake.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l4lb-q17", question: "How do you achieve session stickiness on an L4 load balancer?", answer: "Usually via Source IP hashing.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-q18", question: "What is the primary bottleneck for an L4 load balancer?", answer: "Network interface bandwidth and connection state table memory.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l4lb-q19", question: "Can you route `/api` to Server A and `/web` to Server B using L4?", answer: "No, that requires L7 routing.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l4lb-q20", question: "Is AWS Network Load Balancer (NLB) Layer 4 or Layer 7?", answer: "Layer 4.", topic: "Load Balancing", difficulty: "Beginner" },
  ],
  commonFollowUps: [
    "Explain Direct Server Return (DSR) and its advantages.",
    "How does an L4 load balancer handle SSL traffic?",
    "Compare the performance characteristics of L4 vs L7.",
  ],
  commonMistakes: [
    "Thinking L4 can read HTTP headers or cookies.",
    "Assuming L4 is always better just because it is faster (it lacks flexibility).",
    "Forgetting that L4 needs to maintain connection state tables.",
  ],
  interviewTraps: [
    "Designing a system that requires URL-based routing but placing an L4 load balancer as the only entry point.",
  ],
  tradeoffs: [
    "Performance vs Flexibility: L4 is incredibly fast but lacks the ability to route intelligently based on application data.",
    "Resource usage: L4 uses very little CPU compared to L7 which must parse HTTP and manage SSL.",
  ],
  memoryTrick: "Layer 4 looks at the Envelopes (IP/Port), Layer 7 reads the Letter (URL/Headers).",
  realWorldExamples: [
    "AWS Network Load Balancer (NLB) used to handle millions of requests per second for a gaming backend.",
    "Database load balancing where traffic is pure TCP, not HTTP.",
  ],
  mermaidDiagram: `flowchart LR
    Client1[Client] --> |TCP 80| L4[Layer 4 LB]
    Client2[Client] --> |TCP 443| L4
    L4 --> |Forward Packets| S1[Backend 1]
    L4 --> |Forward Packets| S2[Backend 2]
    Note right of L4: Routing based on IP & Port only`,
  flashcards: [
    { id: "l4lb-fc1", front: "What OSI layer does L4 load balancing use?", back: "Transport Layer (TCP/UDP).", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l4lb-fc2", front: "Can an L4 LB route based on HTTP headers?", back: "No, it only sees IP addresses and ports.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l4lb-fc3", front: "Why is L4 faster than L7?", back: "It doesn't parse application payloads or terminate SSL.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l4lb-fc4", front: "What is Direct Server Return (DSR)?", back: "Backend servers send responses directly to the client, bypassing the LB.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l4lb-fc5", front: "How is sticky session implemented at L4?", back: "Usually via Source IP Hashing.", topic: "Load Balancing", difficulty: "Intermediate" },
  ],
  cheatSheet: {
    title: "Layer 4 Load Balancer Cheat Sheet",
    sections: [
      {
        heading: "Basics",
        items: [
          "Operates at Transport Layer.",
          "Routes via IP and Port.",
          "Protocols: TCP, UDP.",
        ],
      },
      {
        heading: "Pros",
        items: [
          "Ultra-fast, low latency.",
          "High throughput.",
          "Low CPU/Memory overhead.",
        ],
      },
      {
        heading: "Cons",
        items: [
          "No smart routing (URL, headers).",
          "Cannot terminate SSL easily.",
          "Sticky sessions limited to IP.",
        ],
      },
    ],
  },
  speedNotes: [
    "Transport layer (TCP/UDP).",
    "Routes by IP and Port.",
    "No HTTP header inspection.",
    "Extremely fast and lightweight.",
    "AWS equivalent: Network Load Balancer.",
  ],
};
