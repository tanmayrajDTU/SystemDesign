import type { ConceptRevisionContent } from "./types";

export const rateLimiting: ConceptRevisionContent = {
  slug: "rate-limiting",
  title: "Rate Limiting",
  topic: "Security",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Rate Limiting", href: "/docs/security/rate-limiting" }
  ],
  summary: [
    "Rate limiting controls the rate of traffic sent or received by a network interface.",
    "It helps protect APIs and services from being overwhelmed by too many requests.",
    "Common algorithms include Token Bucket, Leaky Bucket, Fixed Window, and Sliding Window.",
    "Often implemented at the edge (API Gateway, Load Balancer) or application level.",
    "Essential for preventing DDoS attacks and ensuring fair usage among clients."
  ],
  whyAsked: [
    "To see if you understand how to protect systems from abuse and spikes.",
    "To test your knowledge of common rate-limiting algorithms and their tradeoffs.",
    "To evaluate your ability to design a distributed rate limiter."
  ],
  thirtySecondAnswer: "Rate limiting restricts the number of requests a client can make within a specified time frame. It prevents abuse, mitigates DDoS attacks, manages costs, and ensures fair resource allocation. Common algorithms include Token Bucket (allows bursts), Leaky Bucket (smooths traffic), Fixed Window (simple but has edge-case bursts), and Sliding Window Log/Counter (accurate but more complex). In distributed systems, rate limiting often relies on Redis for fast, centralized counting.",
  detailedAnswer: [
    "Token Bucket: Tokens are added at a fixed rate; requests consume tokens. Good for allowing bursts.",
    "Leaky Bucket: Requests are processed at a constant rate, smoothing out bursts.",
    "Fixed Window Counter: Divides time into fixed windows. Simple but suffers from bursts at the window edges.",
    "Sliding Window Log: Keeps a timestamp of each request. Highly accurate but memory-intensive.",
    "Sliding Window Counter: Combines fixed window and sliding log, estimating counts for the previous window.",
    "Distributed Rate Limiting: Usually requires a centralized datastore like Redis to share state across multiple API servers."
  ],
  questions: [
    { id: "rl-q1", question: "What is the primary purpose of rate limiting?", answer: "To control traffic flow, prevent abuse/DDoS, and ensure fair resource allocation.", topic: "Security", difficulty: "Beginner" },
    { id: "rl-q2", question: "How does the Token Bucket algorithm work?", answer: "Tokens are added to a bucket at a fixed rate. Each request removes a token. If the bucket is empty, the request is dropped.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q3", question: "What is a key advantage of Token Bucket?", answer: "It allows for bursts of traffic up to the bucket's capacity.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q4", question: "How does Leaky Bucket differ from Token Bucket?", answer: "Leaky bucket processes requests at a strict constant rate, smoothing out traffic completely, whereas token bucket allows bursts.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q5", question: "What is the Fixed Window Counter algorithm?", answer: "It counts requests within a fixed time window (e.g., 00:00-00:01). If the limit is reached, subsequent requests are dropped until the next window.", topic: "Security", difficulty: "Beginner" },
    { id: "rl-q6", question: "What is the main drawback of Fixed Window Counter?", answer: "It allows bursts of traffic at the edges of the window. For example, 2x the limit can pass if a burst occurs right before and right after the window boundary.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q7", question: "How does Sliding Window Log solve the Fixed Window issue?", answer: "It keeps a timestamp for every request and dynamically counts requests in the exact time window preceding the current request.", topic: "Security", difficulty: "Advanced" },
    { id: "rl-q8", question: "What is the disadvantage of Sliding Window Log?", answer: "It consumes a lot of memory because it has to store a timestamp for every single request.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q9", question: "What is the Sliding Window Counter?", answer: "It's a hybrid approach that tracks counts per fixed window and estimates the current window's traffic based on a weighted overlap of the previous window.", topic: "Security", difficulty: "Advanced" },
    { id: "rl-q10", question: "Why is Redis commonly used for distributed rate limiting?", answer: "It provides fast, in-memory atomic operations and can act as a centralized state store for multiple API servers.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q11", question: "What HTTP status code is typically returned when a limit is exceeded?", answer: "HTTP 429 Too Many Requests.", topic: "Security", difficulty: "Beginner" },
    { id: "rl-q12", question: "What HTTP header is often included with a 429 response?", answer: "Retry-After, indicating how long the client should wait before trying again.", topic: "Security", difficulty: "Beginner" },
    { id: "rl-q13", question: "What race condition can occur in distributed rate limiting?", answer: "A read-modify-write race condition if multiple servers check the limit and increment the counter concurrently without locking.", topic: "Security", difficulty: "Advanced" },
    { id: "rl-q14", question: "How do you solve the race condition in Redis rate limiting?", answer: "By using Redis Lua scripts to ensure the check and increment happen atomically, or using atomic INCR operations.", topic: "Security", difficulty: "Advanced" },
    { id: "rl-q15", question: "Should a rate limiter fail open or fail closed?", answer: "Typically fail open. If the rate limiter (e.g., Redis) goes down, it's usually better to allow traffic to the API rather than blocking all requests, though this depends on the system's capacity.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q16", question: "Where is a rate limiter typically placed in a system architecture?", answer: "At the API Gateway or edge load balancer, before traffic reaches the backend application servers.", topic: "Security", difficulty: "Beginner" },
    { id: "rl-q17", question: "What identifiers can be used to rate limit clients?", answer: "IP address, API key, user ID, or a combination.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q18", question: "Why is IP-based rate limiting sometimes problematic?", answer: "Many users might share a single public IP via NAT (e.g., in a corporate office), so limiting by IP could block legitimate users.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q19", question: "What is 'soft' vs 'hard' rate limiting?", answer: "Hard limiting drops requests immediately. Soft limiting might allow a slight overage for a short time or delay requests instead of dropping.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-q20", question: "How does rate limiting differ from load shedding?", answer: "Rate limiting restricts traffic per client based on quotas. Load shedding drops overall traffic globally when the system is near capacity, regardless of client quotas.", topic: "Security", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you implement a distributed rate limiter?",
    "What are the race conditions in a distributed rate limiter and how do you solve them?",
    "How do you handle rate limiting by IP versus by user ID?"
  ],
  commonMistakes: [
    "Assuming an in-memory rate limiter is sufficient for a distributed, multi-server application.",
    "Ignoring race conditions that occur when multiple servers update a centralized counter concurrently.",
    "Not handling edge cases in the Fixed Window algorithm (e.g., 2x traffic at the boundary)."
  ],
  interviewTraps: [
    "Using a Sliding Window Log for a high-traffic system without realizing its high memory footprint.",
    "Failing to discuss how rate limiting affects user experience (e.g., returning 429 Too Many Requests)."
  ],
  tradeoffs: [
    "Token Bucket vs. Leaky Bucket: Token bucket allows bursts; leaky bucket enforces a strict processing rate.",
    "Accuracy vs. Memory: Sliding window log is accurate but uses a lot of memory; sliding window counter balances them."
  ],
  comparisonTable: {
    title: "Fixed Window vs Sliding Window vs Token Bucket vs Leaky Bucket",
    columns: ["Algorithm", "Pros", "Cons", "Use Case"],
    rows: [
      { label: "Fixed Window", values: ["Memory efficient, easy", "Spikes at edges", "Basic quotas"] },
      { label: "Sliding Window (Log)", values: ["Highly accurate", "High memory usage", "Strict enforcement"] },
      { label: "Token Bucket", values: ["Allows traffic bursts", "Tuning tricky", "Bursty APIs"] },
      { label: "Leaky Bucket", values: ["Smooths traffic output", "Bursts are delayed", "Legacy systems"] }
    ]
  },
  memoryTrick: "Fixed = Edgy, Sliding = Accurate, Token = Bursty, Leaky = Smooth.",
  realWorldExamples: [
    "Twitter limits API requests per user to prevent spam.",
    "Stripe uses token buckets to allow bursts while enforcing overall limits."
  ],
  mermaidDiagram: "flowchart LR\\n  Client --> API_Gateway\\n  API_Gateway --> Rate_Limiter\\n  Rate_Limiter -- Allowed --> Backend_Service\\n  Rate_Limiter -- Denied --> Client_429",
  flashcards: [
    { id: "rl-fc1", front: "Token Bucket", back: "Algorithm that adds tokens at a fixed rate; requests consume tokens. Allows bursts.", topic: "Security", difficulty: "Beginner" },
    { id: "rl-fc2", front: "Leaky Bucket", back: "Algorithm that processes requests at a constant strict rate, smoothing out bursts.", topic: "Security", difficulty: "Beginner" },
    { id: "rl-fc3", front: "Fixed Window edge problem", back: "Traffic bursts at the window boundary can allow up to 2x the limit in a short span.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-fc4", front: "Redis in Rate Limiting", back: "Provides fast, centralized in-memory counting with atomic operations via Lua scripts.", topic: "Security", difficulty: "Intermediate" },
    { id: "rl-fc5", front: "HTTP 429", back: "The standard HTTP status code for 'Too Many Requests'.", topic: "Security", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Rate Limiting Cheat Sheet",
    sections: [
      { heading: "Algorithms", items: ["Token Bucket", "Leaky Bucket", "Fixed Window", "Sliding Window"] },
      { heading: "Distributed Systems", items: ["Use Redis for state", "Use Lua scripts for atomicity"] },
      { heading: "HTTP Response", items: ["Status: 429 Too Many Requests", "Header: Retry-After"] }
    ]
  },
  speedNotes: [
    "Prevents abuse and DDoS.",
    "Token Bucket allows bursts.",
    "Leaky Bucket smooths traffic.",
    "Redis often used for state.",
    "Returns HTTP status 429."
  ]
};
