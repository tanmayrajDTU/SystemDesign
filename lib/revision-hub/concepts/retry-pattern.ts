import type { ConceptRevisionContent } from "./types";

export const retryPattern: ConceptRevisionContent = {
  slug: "retry-pattern",
  title: "Retry Pattern",
  topic: "Architecture",
  difficulty: "Intermediate",
  estimatedMinutes: 10,
  docLinks: [
    { label: "Retry", href: "/docs/microservices/retry" },
    { label: "Circuit Breaker", href: "/docs/microservices/circuit-breaker" }
  ],
  summary: [
    "The Retry pattern enables an application to handle transient failures transparently.",
    "It retries a failed operation under the assumption that the problem is temporary.",
    "Essential in distributed systems where network glitches or temporary service unavailability are common.",
    "Should always be used with exponential backoff and jitter to prevent thundering herd problems.",
    "Typically combined with the Circuit Breaker pattern to fail fast when services are genuinely down."
  ],
  whyAsked: [
    "To test your understanding of handling transient failures in distributed systems.",
    "To see if you know how to prevent cascading failures using backoff and jitter."
  ],
  thirtySecondAnswer: "The Retry pattern transparently retries failed operations that are expected to succeed eventually, such as network timeouts or rate limits. It is crucial for building resilient microservices. A naive retry can overwhelm a struggling service, so it must be implemented with exponential backoff (increasing wait times) and jitter (randomized wait times) to spread out the load and avoid the thundering herd problem.",
  detailedAnswer: [
    "Identify transient faults (e.g., HTTP 503, 429, timeouts) that are safe to retry.",
    "Implement exponential backoff: increase the delay between retries exponentially.",
    "Add jitter: introduce randomness to the delay to prevent retry storms.",
    "Set a maximum number of retries and a maximum delay.",
    "Combine with Idempotency: Ensure the operation being retried does not cause unintended side effects if executed multiple times.",
    "Combine with Circuit Breaker: Stop retrying if the downstream service is consistently failing."
  ],
  questions: [
    { id: "rtrp-q1", question: "What is the primary purpose of the Retry pattern?", answer: "To handle transient failures by transparently retrying the failed operation.", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-q2", question: "What is a transient failure?", answer: "A temporary error, such as a brief network interruption or a temporary service overload.", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-q3", question: "Why is retrying immediately often a bad idea?", answer: "It can overwhelm a service that is already struggling, leading to a thundering herd problem.", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-q4", question: "What is exponential backoff?", answer: "Increasing the wait time between retries exponentially (e.g., 1s, 2s, 4s, 8s).", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-q5", question: "What is jitter?", answer: "Adding randomness to the backoff delay to prevent multiple clients from retrying at the exact same time.", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-q6", question: "Should you retry a 400 Bad Request error?", answer: "No, this is a permanent client error and will fail again if retried.", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-q7", question: "What HTTP status code is commonly retried?", answer: "HTTP 503 Service Unavailable, 429 Too Many Requests, or 504 Gateway Timeout.", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-q8", question: "What is idempotency and why is it important for retries?", answer: "Idempotency means an operation can be performed multiple times without changing the result beyond the initial application. It's critical so retries don't cause duplicate side effects (like double charging a credit card).", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-q9", question: "How does the Retry pattern interact with a Circuit Breaker?", answer: "A Retry pattern sits in front of a Circuit Breaker. If the Circuit Breaker is open, the Retry pattern should fail immediately instead of waiting and retrying.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-q10", question: "What is a 'thundering herd' in the context of retries?", answer: "When many clients experience a failure simultaneously and all retry at the exact same time, overwhelming the recovering service.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-q11", question: "How do you implement jitter?", answer: "By adding or subtracting a random variation to the calculated exponential backoff delay.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-q12", question: "What happens if you have infinite retries?", answer: "It can lead to resource exhaustion on the client side (blocked threads/connections) and prevent the downstream service from ever recovering.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-q13", question: "How do you handle retries for operations that modify state?", answer: "By using an idempotency key passed from the client, allowing the server to recognize and deduplicate the request.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-q14", question: "What is the tradeoff of using the Retry pattern?", answer: "Increased latency for the caller, as the system waits and tries again before finally returning an error or success.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-q15", question: "How does a retry storm occur?", answer: "When cascading failures in a microservices architecture cause multiple layers of services to all retry simultaneously, multiplying the number of requests exponentially.", topic: "Architecture", difficulty: "Advanced" },
    { id: "rtrp-q16", question: "How can you mitigate retry storms in a deep microservice call chain?", answer: "By implementing retries only at the edges of the system, or by passing retry budgets/quotas down the call chain.", topic: "Architecture", difficulty: "Advanced" },
    { id: "rtrp-q17", question: "What is a retry budget?", answer: "A limit on the ratio of retried requests to regular requests (e.g., max 10% of requests can be retries) to protect backend services.", topic: "Architecture", difficulty: "Advanced" },
    { id: "rtrp-q18", question: "Explain 'Full Jitter' vs 'Equal Jitter'.", answer: "Full Jitter picks a random delay between 0 and the max backoff. Equal Jitter uses half the backoff plus a random value between 0 and half the backoff.", topic: "Architecture", difficulty: "Advanced" },
    { id: "rtrp-q19", question: "Why might you use a circuit breaker instead of just retries?", answer: "Retries handle transient faults. If a service is completely down, retrying wastes resources. A circuit breaker fails fast and gives the service time to recover.", topic: "Architecture", difficulty: "Advanced" },
    { id: "rtrp-q20", question: "How do message queues inherently implement a form of the retry pattern?", answer: "Message brokers (like SQS/RabbitMQ) typically re-deliver messages if they are not explicitly acknowledged by the consumer, effectively acting as an asynchronous retry mechanism.", topic: "Architecture", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you calculate the backoff delay?",
    "Why is idempotency required for retries?",
    "How does retry interact with a circuit breaker?"
  ],
  commonMistakes: [
    "Retrying non-transient errors (e.g., HTTP 400 Bad Request).",
    "Missing backoff and jitter, causing a thundering herd.",
    "Infinite retries."
  ],
  interviewTraps: [
    "Suggesting retries for operations that are not idempotent (like a non-idempotent payment charge) without addressing deduplication."
  ],
  tradeoffs: [
    "Increased latency: Retrying takes time, which delays the response to the caller.",
    "Resource consumption: Threads/connections are held open while waiting to retry."
  ],
  memoryTrick: "Wait longer and randomly before trying again.",
  realWorldExamples: [
    "AWS SDKs automatically retry API calls with exponential backoff and jitter.",
    "Stripe's API libraries include built-in retry logic with idempotency keys."
  ],
  mermaidDiagram: `flowchart TD
  A[Client] -->|Call| B{Service}
  B -->|Fails (Transient)| C[Wait Backoff + Jitter]
  C -->|Retry| B
  B -->|Succeeds| D[Return Success]
  B -->|Fails Max Times| E[Return Error]`,
  flashcards: [
    { id: "rtrp-fc1", front: "What is Exponential Backoff?", back: "Increasing the delay time between retries exponentially.", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-fc2", front: "What is Jitter?", back: "Randomizing retry delays to prevent the thundering herd problem.", topic: "Architecture", difficulty: "Beginner" },
    { id: "rtrp-fc3", front: "What errors should you retry?", back: "Only transient errors (e.g., 503, 429, timeouts), not permanent ones (e.g., 400, 404).", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-fc4", front: "What is a Retry Storm?", back: "When retries multiply across multiple microservice layers, overwhelming the system.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "rtrp-fc5", front: "What is Idempotency's role in retries?", back: "Ensures that retrying an operation multiple times has the same effect as doing it once.", topic: "Architecture", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Retry Pattern",
    sections: [
      { heading: "When to use", items: ["Transient network errors", "Rate limits (HTTP 429)", "Timeouts"] },
      { heading: "Key concepts", items: ["Exponential Backoff", "Jitter", "Idempotency", "Retry Budgets"] },
      { heading: "Anti-patterns", items: ["Infinite retries", "Retrying permanent errors", "Synchronous retries deep in a call chain"] }
    ]
  },
  speedNotes: [
    "Handles transient faults.",
    "Must use exponential backoff.",
    "Must use jitter.",
    "Requires idempotent operations.",
    "Pairs well with Circuit Breaker."
  ]
};
