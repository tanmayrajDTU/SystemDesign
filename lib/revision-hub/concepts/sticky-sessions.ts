import type { ConceptRevisionContent } from "./types";

export const stickySessions: ConceptRevisionContent = {
  slug: "sticky-sessions",
  title: "Sticky Sessions",
  topic: "Load Balancing",
  difficulty: "Intermediate",
  estimatedMinutes: 10,
  docLinks: [
    { label: "Sticky Sessions", href: "/docs/load-balancing/sticky-sessions" },
    { label: "Load Balancing Algorithms", href: "/docs/load-balancing/algorithms" },
  ],
  summary: [
    "Sticky sessions (or session affinity) is a load balancing technique where a user's requests are consistently routed to the same backend server.",
    "It is typically implemented by the load balancer injecting a cookie into the client's browser, containing the ID of the server.",
    "This is useful for legacy applications that store session state (like login info or shopping carts) in local server memory.",
    "However, sticky sessions can lead to uneven load distribution and complicate server deployments and autoscaling.",
    "Modern stateless architectures generally avoid sticky sessions in favor of centralized session stores (like Redis)."
  ],
  whyAsked: [
    "To test your understanding of stateful vs. stateless architectures.",
    "To see if you know how to migrate a legacy monolith to a horizontally scalable system.",
    "To evaluate your knowledge of load balancing challenges and session management."
  ],
  thirtySecondAnswer: "Sticky sessions force a load balancer to route all requests from a specific user to the same backend server for the duration of their session. This is usually done via a tracking cookie. While this allows applications to store user state in local server memory, it breaks horizontal scalability, causes uneven load distribution, and means that if a server crashes, all users pinned to it lose their session data.",
  detailedAnswer: [
    "Sticky sessions are implemented at Layer 7 (HTTP) using cookies, or Layer 4 (TCP) using IP hash.",
    "The load balancer checks the incoming request for a specific cookie. If present, it routes to the specified server. If absent, it picks a server and sets the cookie.",
    "Advantage: Easy to implement without changing the application code of a stateful monolith.",
    "Advantage: Can improve local cache hit rates since the user always hits the same node.",
    "Disadvantage: Uneven load balancing. If one user generates huge traffic, that single server gets overloaded.",
    "Disadvantage: Poor fault tolerance. If the server dies, the user's session state is lost."
  ],
  questions: [
    { id: "ssk-q1", question: "What are sticky sessions?", answer: "A load balancing method that ensures all requests from a specific user are sent to the same backend server.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "ssk-q2", question: "How is session affinity usually implemented for web apps?", answer: "The load balancer injects a cookie into the user's browser that identifies the backend server.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "ssk-q3", question: "Why would an application need sticky sessions?", answer: "Because it stores user session data (like login state or cart items) in the local memory of the server.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "ssk-q4", question: "What happens if a server handling sticky sessions crashes?", answer: "The users pinned to that server lose their session data and are logged out or lose their unsaved progress.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q5", question: "How does sticky sessions affect load distribution?", answer: "It can cause uneven load (hotspots) because the LB cannot freely distribute requests; heavy users overload specific servers.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q6", question: "How can you achieve session affinity without cookies?", answer: "By using Source IP hashing at the Layer 4 load balancer.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q7", question: "What is the modern alternative to sticky sessions?", answer: "Stateless applications using a centralized, distributed cache (like Redis) to store session data.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "ssk-q8", question: "How do sticky sessions impact auto-scaling?", answer: "They make scaling down hard, because you can't easily terminate a server without disrupting active user sessions.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q9", question: "What is connection draining in the context of sticky sessions?", answer: "Allowing a server to finish serving active sticky sessions before taking it offline, preventing session loss.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q10", question: "Can sticky sessions improve performance?", answer: "Yes, by increasing the local cache hit rate for user-specific data on the backend server.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "ssk-q11", question: "How do websockets relate to sticky sessions?", answer: "WebSockets naturally form a persistent connection to a single server, which is technically sticky at the connection layer.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q12", question: "If a user changes networks (e.g., mobile to Wi-Fi), what happens to IP-based affinity?", answer: "Their IP changes, so the load balancer will likely route them to a different server, losing their session.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q13", question: "What is a 'duration-based' sticky session?", answer: "A sticky session cookie that expires after a set time, forcing the user to be re-balanced to potentially a new server.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "ssk-q14", question: "What is 'application-controlled' session stickiness?", answer: "The application itself generates the session cookie, and the load balancer just reads it to route the traffic.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "ssk-q15", question: "Why is migrating off sticky sessions a common architectural goal?", answer: "To make the application truly stateless, improving scalability, deployment speed, and fault tolerance.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q16", question: "Does a Layer 4 load balancer support cookie-based sticky sessions?", answer: "No, Layer 4 cannot read HTTP headers/cookies. It must rely on IP hashing.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q17", question: "What is the cost of moving from sticky sessions to Redis?", answer: "Increased network latency (fetching session over the network) and added infrastructure complexity.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "ssk-q18", question: "How do CDNs interact with sticky sessions?", answer: "CDNs cache static content, but dynamic requests that pass through must forward the sticky cookies to work properly.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "ssk-q19", question: "Can you use Round Robin with sticky sessions?", answer: "Round Robin is used to pick the *first* server, but subsequent requests bypass the algorithm due to the sticky cookie.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-q20", question: "What happens if a user blocks cookies?", answer: "Cookie-based sticky sessions will fail, and their requests will be load balanced randomly, likely breaking the app.", topic: "Load Balancing", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How would you migrate a legacy application from sticky sessions to a stateless architecture?",
    "What are the downsides of storing sessions in Redis instead of using sticky sessions?",
    "How does IP hashing compare to cookie-based session affinity?"
  ],
  commonMistakes: [
    "Designing a new application to use sticky sessions instead of being stateless.",
    "Forgetting that IP hashing breaks when many users are behind a single corporate NAT.",
    "Ignoring the difficulty of zero-downtime deployments when using sticky sessions."
  ],
  interviewTraps: [
    "Saying sticky sessions are 'bad' without acknowledging they are a cheap way to fix legacy apps.",
    "Assuming sticky sessions solve load balancing; they actually make load distribution *worse*."
  ],
  tradeoffs: [
    "Sticky Sessions vs Distributed Cache: Sticky is easier for legacy apps but limits scaling; distributed cache scales perfectly but adds network latency and operational complexity.",
    "Cookie vs IP Hash: Cookies are accurate per user but require Layer 7; IP Hash works at Layer 4 but groups all users behind a NAT to a single server."
  ],
  memoryTrick: "Sticky sessions glue a user to a server; if the server breaks, the user falls off.",
  realWorldExamples: [
    "AWS ALB configuring 'Target group stickiness' via an AWSELB cookie.",
    "A legacy PHP application storing `$_SESSION` in local server files."
  ],
  mermaidDiagram: `sequenceDiagram\n    participant User\n    participant LB as Load Balancer\n    participant S1 as Server 1\n    participant S2 as Server 2\n    \n    User->>LB: Request 1 (No Cookie)\n    LB->>S1: Routes to S1\n    S1-->>LB: Sets Session Cookie (Server=S1)\n    LB-->>User: Returns Response + Cookie\n    \n    User->>LB: Request 2 (Cookie: Server=S1)\n    LB->>S1: Routes to S1 based on Cookie\n    S1-->>User: Returns Response`,
  flashcards: [
    { id: "ssk-fc1", front: "What is a sticky session?", back: "Routing a user's requests to the same backend server for the whole session.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "ssk-fc2", front: "Main drawback of sticky sessions?", back: "Uneven load balancing and loss of session data if the server crashes.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-fc3", front: "How is it implemented at Layer 7?", back: "By injecting a tracking cookie into the client's browser.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "ssk-fc4", front: "Alternative to sticky sessions?", back: "Stateless architecture using a centralized session store (like Redis).", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "ssk-fc5", front: "How do they complicate auto-scaling?", back: "You can't easily terminate servers to scale down without killing active user sessions.", topic: "Load Balancing", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Sticky Sessions Cheat Sheet",
    sections: [
      {
        heading: "Implementation",
        items: [
          "Layer 7: Load Balancer cookies.",
          "Layer 7: Application-generated cookies.",
          "Layer 4: Source IP Hashing."
        ]
      },
      {
        heading: "Pros",
        items: [
          "Requires no code changes for stateful legacy apps.",
          "High local cache hit rate.",
          "Avoids network calls to distributed caches."
        ]
      },
      {
        heading: "Cons",
        items: [
          "Hotspots (uneven load).",
          "Hard to do zero-downtime deployments.",
          "Session loss on server failure."
        ]
      }
    ]
  },
  speedNotes: [
    "Pins users to one server.",
    "Uses cookies or IP hashes.",
    "Fixes stateful legacy apps.",
    "Creates uneven load distribution.",
    "Stateless with Redis is better."
  ]
};
