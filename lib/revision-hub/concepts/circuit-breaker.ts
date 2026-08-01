import type { ConceptRevisionContent } from "./types";

export const circuitBreaker: ConceptRevisionContent = {
  slug: "circuit-breaker",
  title: "Circuit Breaker Pattern",
  topic: "Architecture",
  difficulty: "Intermediate",
  estimatedMinutes: 10,
  docLinks: [
    { label: "Circuit Breaker", href: "/docs/microservices/circuit-breaker" },
    { label: "Retry", href: "/docs/microservices/retry" }
  ],
  summary: [
    "The Circuit Breaker pattern prevents an application from repeatedly trying to execute an operation that is likely to fail.",
    "It acts as a state machine with three states: Closed, Open, and Half-Open.",
    "It helps to fail fast and recover gracefully, protecting failing services from being overwhelmed with requests.",
    "It is crucial in distributed systems to prevent cascading failures.",
    "Often used in conjunction with fallbacks and retry mechanisms."
  ],
  whyAsked: [
    "To test understanding of fault tolerance and system resilience.",
    "To see how you handle downstream service failures in a distributed architecture.",
    "To evaluate knowledge of preventing cascading failures."
  ],
  thirtySecondAnswer: "A circuit breaker acts like an electrical switch for remote calls. Normally it's 'Closed', letting requests flow. If a downstream service fails repeatedly, the breaker 'Opens', immediately failing fast for subsequent requests to prevent overwhelming the struggling service. After a timeout, it goes 'Half-Open', allowing a few test requests through. If they succeed, it 'Closes' again; if they fail, it re-'Opens'. This prevents cascading failures across microservices.",
  detailedAnswer: [
    "Closed State: Requests flow normally. Failures are counted. If the failure rate exceeds a threshold, state changes to Open.",
    "Open State: Requests are immediately rejected without attempting the call (fast failure). A timeout clock starts.",
    "Half-Open State: After the timeout, a limited number of requests are allowed to pass to check if the downstream service has recovered.",
    "Cascading Failure Prevention: Stops a slow downstream service from exhausting threads and resources in the upstream caller.",
    "Fallback Mechanism: When Open, the system can return a cached response or a default value instead of an error.",
    "Resilience4j / Hystrix: Common libraries used to implement this pattern in Java ecosystems."
  ],
  questions: [
    { id: "cb-q1", question: "What is the Circuit Breaker pattern?", answer: "A pattern to prevent an application from repeatedly trying an operation that is likely to fail.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cb-q2", question: "What does the 'Closed' state mean?", answer: "The circuit is functioning normally and allowing requests to pass through.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cb-q3", question: "What does the 'Open' state mean?", answer: "The circuit is broken; requests are immediately failed without calling the downstream service.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cb-q4", question: "What is the 'Half-Open' state?", answer: "A trial state allowing a limited number of requests to test if the downstream service has recovered.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q5", question: "Why is failing fast important?", answer: "It frees up resources immediately instead of waiting for a timeout, preventing cascading failures.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q6", question: "What triggers the transition from Closed to Open?", answer: "The failure rate (or slow call rate) exceeding a configured threshold.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q7", question: "What is a cascading failure?", answer: "When one service failing causes upstream services to also fail due to resource exhaustion.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q8", question: "What is a fallback?", answer: "A default response or alternative logic executed when the circuit is Open.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q9", question: "How does a Circuit Breaker differ from a Retry?", answer: "Retry attempts the operation again; Circuit Breaker prevents the operation entirely if it's known to be failing.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q10", question: "Can Retry and Circuit Breaker be used together?", answer: "Yes, you can retry a few times, and if those fail, trip the circuit breaker.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cb-q11", question: "What metrics does a circuit breaker track?", answer: "Successes, failures, timeouts, and execution times over a sliding window.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cb-q12", question: "How long does it stay in the Open state?", answer: "For a configured wait duration, after which it transitions to Half-Open.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q13", question: "What happens if a request succeeds in Half-Open state?", answer: "The circuit breaker transitions back to the Closed state.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q14", question: "What happens if a request fails in Half-Open state?", answer: "The circuit breaker transitions back to the Open state and resets the wait timer.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q15", question: "Name a library that implements this pattern.", answer: "Resilience4j, Netflix Hystrix, or Polly (.NET).", topic: "Architecture", difficulty: "Beginner" },
    { id: "cb-q16", question: "Is a Circuit Breaker useful for database connections?", answer: "Yes, it can prevent connection pool exhaustion when a database is slow or unresponsive.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cb-q17", question: "What is the Bulkhead pattern?", answer: "Isolating resources (like connection pools) so failure in one area doesn't affect others, often used with Circuit Breakers.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cb-q18", question: "Should every external call have a circuit breaker?", answer: "Generally yes, any network call can fail and should be protected.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-q19", question: "How does a service mesh handle circuit breaking?", answer: "It can be configured in the proxy (like Envoy) without changing application code.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cb-q20", question: "What is a sliding window in this context?", answer: "The mechanism used to track recent request successes/failures (e.g., last 100 requests or last 10 seconds).", topic: "Architecture", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you implement fallbacks effectively?",
    "How does Circuit Breaker interact with Auto-scaling?",
    "Explain the sliding window algorithm used to calculate error rates."
  ],
  commonMistakes: [
    "Configuring timeouts that are longer than the upstream service's timeout.",
    "Not providing a graceful fallback mechanism.",
    "Using retries without an eventual circuit breaker, causing 'retry storms'."
  ],
  interviewTraps: [
    "Confusing Circuit Breaker states (Open means failing/blocked, Closed means working/flowing).",
    "Thinking a Circuit Breaker fixes the downstream issue (it just protects the upstream)."
  ],
  tradeoffs: [
    "System Stability vs. Initial Setup Complexity",
    "Fast Failure vs. Occasional False Positives (tripping too early)",
    "Stale Data (via fallback) vs. No Data"
  ],
  memoryTrick: "Circuit Breaker: CLOSED is Good (electricity flows), OPEN is Bad (wires cut, fail fast).",
  realWorldExamples: [
    "E-commerce Checkout: If the recommendation engine is down, the circuit opens and checkout proceeds without recommendations rather than failing entirely.",
    "Streaming App: If the personalized thumbnail service is slow, the circuit opens and serves default thumbnails to keep the UI fast."
  ],
  mermaidDiagram: `stateDiagram-v2
    [*] --> Closed
    Closed --> Open : Failure Rate > Threshold
    Open --> HalfOpen : Timeout Expired
    HalfOpen --> Closed : Success
    HalfOpen --> Open : Failure`,
  flashcards: [
    { id: "cb-fc1", front: "Circuit Breaker CLOSED state", back: "Normal operation; requests pass through to the downstream service.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cb-fc2", front: "Circuit Breaker OPEN state", back: "Failing fast; requests are rejected immediately without network calls.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cb-fc3", front: "Circuit Breaker HALF-OPEN state", back: "Testing recovery; allowing a few requests through to see if the service is healthy.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-fc4", front: "What does it prevent?", back: "Cascading failures and resource exhaustion in upstream services.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cb-fc5", front: "What is a Fallback?", back: "Providing a default response or cached data when the circuit is Open.", topic: "Architecture", difficulty: "Intermediate" }
  ],
  cheatSheet: {
    title: "Circuit Breaker",
    sections: [
      {
        heading: "States",
        items: [
          "Closed: Everything is fine",
          "Open: Failing fast, returning errors",
          "Half-Open: Testing if recovered"
        ]
      },
      {
        heading: "Key Configurations",
        items: [
          "Failure rate threshold (%)",
          "Sliding window size",
          "Wait duration in Open state"
        ]
      },
      {
        heading: "Why use it?",
        items: [
          "Prevent cascading failures",
          "Fail fast instead of hanging",
          "Give struggling services time to recover"
        ]
      }
    ]
  },
  speedNotes: [
    "Prevents cascading failures",
    "Open = Blocked, Closed = Flowing",
    "Half-Open tests recovery",
    "Fails fast to save resources",
    "Often uses fallbacks"
  ]
};
