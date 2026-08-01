import type { ConceptRevisionContent } from "./types";

export const layer7LoadBalancer: ConceptRevisionContent = {
  slug: "layer-7-load-balancer",
  title: "Layer 7 Load Balancer",
  topic: "Load Balancing",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Layer 7 Load Balancing", href: "/docs/load-balancing/layer-7" },
    { label: "Layer 4 Load Balancing", href: "/docs/load-balancing/layer-4" },
  ],
  summary: [
    "Layer 7 load balancing operates at the Application layer of the OSI model.",
    "It parses and inspects application data, such as HTTP headers, URLs, and cookies.",
    "This allows for intelligent routing decisions based on the actual content of the request.",
    "It typically terminates SSL/TLS connections, requiring more CPU and memory than Layer 4.",
    "Layer 7 enables features like content-based routing, caching, and web application firewalls (WAF).",
  ],
  whyAsked: [
    "To test your ability to design microservice architectures where routing based on path is required.",
    "To evaluate your understanding of SSL termination and application-level networking.",
    "To see if you understand the performance implications of inspecting application payloads.",
  ],
  thirtySecondAnswer: "A Layer 7 Load Balancer operates at the application layer, parsing HTTP/HTTPS traffic to make intelligent routing decisions based on URLs, headers, or cookies. It can terminate SSL, enforce security rules, and route specific API paths to different microservices, but requires more CPU and memory than a Layer 4 load balancer because it fully inspects the traffic.",
  detailedAnswer: [
    "Operates at the Application Layer (OSI Layer 7).",
    "Can read and modify HTTP headers, cookies, and URLs.",
    "Allows routing different URLs (e.g., /api/users, /api/orders) to different backend microservices.",
    "Typically handles SSL/TLS termination, decrypting traffic before passing it to backend servers.",
    "Can perform rate limiting and WAF (Web Application Firewall) duties.",
    "Higher CPU usage because it must parse the application payload.",
  ],
  questions: [
    { id: "l7lb-q1", question: "At what OSI layer does a Layer 7 Load Balancer operate?", answer: "Layer 7, the Application Layer.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l7lb-q2", question: "What is the primary protocol handled by L7 load balancers?", answer: "HTTP and HTTPS.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l7lb-q3", question: "Can an L7 LB route traffic based on the URL path?", answer: "Yes, it can inspect the path and route accordingly (e.g., /images to an image server).", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l7lb-q4", question: "What is SSL Termination?", answer: "The process where the load balancer decrypts HTTPS traffic, relieving backend servers of the cryptographic workload.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-q5", question: "Why is L7 generally slower than L4?", answer: "Because it has to parse the application payload, buffer requests, and potentially decrypt SSL, which takes CPU time.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-q6", question: "How does L7 load balancing enable microservices?", answer: "By providing an API Gateway functionality, routing different API paths to different backend services.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-q7", question: "Can L7 use cookies for session stickiness?", answer: "Yes, it can inject or read cookies to route a user to the exact same backend server.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-q8", question: "What is a Reverse Proxy, and how does it relate to L7 LB?", answer: "An L7 LB acts as a reverse proxy, sitting in front of web servers and managing all incoming requests.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l7lb-q9", question: "Can an L7 LB modify the request before forwarding it?", answer: "Yes, it can add headers (like X-Forwarded-For) or rewrite URLs.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l7lb-q10", question: "What is X-Forwarded-For?", answer: "An HTTP header added by the LB to identify the original IP address of the client, since the backend only sees the LB's IP.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-q11", question: "Can L7 load balancers perform caching?", answer: "Yes, many L7 LBs (like NGINX) can cache static assets to reduce backend load.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-q12", question: "What is a Web Application Firewall (WAF)?", answer: "A security feature often integrated into L7 LBs to block malicious application-layer attacks like SQL injection.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l7lb-q13", question: "How does buffering work in an L7 load balancer?", answer: "It can read the entire request from a slow client before sending it to the backend quickly, protecting the backend from slow-loris attacks.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l7lb-q14", question: "Name common L7 load balancer software.", answer: "NGINX, HAProxy, Envoy, Traefik.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l7lb-q15", question: "Is AWS Application Load Balancer (ALB) Layer 4 or Layer 7?", answer: "Layer 7.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l7lb-q16", question: "Can L7 handle non-HTTP traffic like raw TCP database connections?", answer: "No, that is the job of a Layer 4 load balancer.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-q17", question: "What happens if an L7 LB runs out of CPU?", answer: "It becomes a bottleneck, latency increases, and it may drop requests.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l7lb-q18", question: "Why would you use L4 and L7 together?", answer: "L4 at the edge for massive DDoS protection and throughput, routing to internal L7 LBs for intelligent microservice routing.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l7lb-q19", question: "How does L7 load balancing help with blue/green deployments?", answer: "It can easily shift a percentage of HTTP traffic to a new version based on headers or weights.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "l7lb-q20", question: "Does L7 routing require creating two TCP connections?", answer: "Yes, one from Client to LB, and one from LB to Backend Server.", topic: "Load Balancing", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "Explain how SSL termination works and why it is placed at the load balancer.",
    "How do you pass the client's real IP address to the backend server?",
    "When would you combine L4 and L7 load balancers?",
  ],
  commonMistakes: [
    "Forgetting to pass the `X-Forwarded-For` header, breaking IP-based rate limiting on the backend.",
    "Using L7 for massive raw TCP data streams (like video streaming) where L4 would be better.",
  ],
  interviewTraps: [
    "Assuming L7 is strictly better than L4. L7 has significant CPU overhead.",
  ],
  tradeoffs: [
    "Smart Routing vs CPU Overhead: L7 allows complex routing and security but requires much more processing power per request.",
    "SSL Termination at LB vs End-to-End Encryption: Terminating at LB is easier to manage, but means traffic is unencrypted inside the internal network.",
  ],
  comparisonTable: {
    title: "Layer 4 vs Layer 7 Load Balancing",
    columns: ["Feature", "Layer 4", "Layer 7"],
    rows: [
      { label: "OSI Layer", values: ["Transport", "Application"] },
      { label: "Routing Basis", values: ["IP, Port", "URL, Headers, Cookies"] },
      { label: "Protocols", values: ["TCP, UDP", "HTTP, HTTPS, gRPC"] },
      { label: "SSL Termination", values: ["Rarely", "Standard"] },
      { label: "Performance", values: ["Very High", "Moderate (CPU intensive)"] },
      { label: "Header Modification", values: ["No", "Yes (X-Forwarded-For, etc.)"] },
    ],
  },
  memoryTrick: "Layer 7 reads the Letter (URL/Headers), Layer 4 only looks at the Envelopes (IP/Port).",
  realWorldExamples: [
    "AWS Application Load Balancer (ALB) routing `/api` to EC2 instances and `/images` to an S3 bucket.",
    "NGINX terminating SSL and acting as an API gateway for a Kubernetes cluster.",
  ],
  mermaidDiagram: `flowchart LR
    Client --> |HTTPS Request| L7[Layer 7 LB]
    Note over L7: SSL Termination & Header Inspection
    L7 --> |Path: /api| API[API Microservice]
    L7 --> |Path: /web| Web[Web Server]
    L7 --> |Path: /auth| Auth[Auth Service]`,
  flashcards: [
    { id: "l7lb-fc1", front: "What OSI layer does L7 load balancing use?", back: "Application Layer (HTTP/HTTPS).", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l7lb-fc2", front: "What is SSL termination?", back: "Decrypting HTTPS traffic at the load balancer to save backend CPU cycles.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-fc3", front: "How does the backend know the client's real IP with an L7 LB?", back: "Through the X-Forwarded-For HTTP header.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "l7lb-fc4", front: "Can an L7 LB route based on the URL path?", back: "Yes, it fully inspects the HTTP request.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "l7lb-fc5", front: "Why is L7 more resource-intensive than L4?", back: "It must parse application data, buffer requests, and often handle cryptography.", topic: "Load Balancing", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "Layer 7 Load Balancer Cheat Sheet",
    sections: [
      {
        heading: "Basics",
        items: [
          "Operates at Application Layer.",
          "Routes via URL, Headers, Cookies.",
          "Protocols: HTTP, HTTPS, gRPC.",
        ],
      },
      {
        heading: "Key Features",
        items: [
          "SSL Termination.",
          "Content-based routing.",
          "Header manipulation (X-Forwarded-For).",
        ],
      },
      {
        heading: "Trade-offs",
        items: [
          "High flexibility and intelligence.",
          "Higher CPU and Memory overhead.",
          "Slower than L4 for raw network throughput.",
        ],
      },
    ],
  },
  speedNotes: [
    "Application layer (HTTP/HTTPS).",
    "Inspects URLs and headers.",
    "Performs SSL termination.",
    "Enables microservice routing.",
    "AWS equivalent: Application LB.",
  ],
};
