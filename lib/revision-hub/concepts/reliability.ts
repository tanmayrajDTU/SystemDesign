import type { ConceptRevisionContent } from "./types";

export const reliability: ConceptRevisionContent = {
  slug: "reliability",
  title: "Reliability",
  topic: "Fundamentals",
  difficulty: "Beginner",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Reliability", href: "/docs/fundamentals/reliability" },
    { label: "Availability", href: "/docs/fundamentals/availability" },
    { label: "Fault Tolerance", href: "/docs/fundamentals/fault-tolerance" },
  ],

  summary: [
    "Reliability is the probability a system performs its intended function correctly over a given period, including in the presence of faults — a stricter bar than availability alone.",
    "A system can be available (responding to requests) while being unreliable (returning wrong answers, corrupting data, or silently dropping some requests).",
    "Reliability is measured through correctness signals: error rates, data integrity checks, successful-vs-failed request ratios — not just uptime.",
    "Achieving reliability requires handling faults gracefully: retries, idempotency, checksums, and validation, not just redundancy (which mainly buys availability).",
    "Reliability failures are often silent and harder to detect than availability failures — a server returning wrong data doesn't page anyone the way a server being down does.",
    "The distinction matters most in interviews when a candidate proposes redundancy as if it solves reliability — redundancy alone doesn't guarantee correctness.",
  ],

  whyAsked: [
    "It tests whether a candidate conflates 'the system responds' with 'the system responds correctly' — a common and consequential mix-up.",
    "It's a natural way to probe deeper failure-handling knowledge: retries, idempotency, data integrity — beyond just \"add more servers.\"",
    "Interviewers use it to see if a candidate's mental model of \"robust system\" goes past uptime into actual correctness under failure.",
  ],

  thirtySecondAnswer:
    "Reliability is the probability that a system performs its intended function correctly over time, including when things go wrong — it's a stricter bar than availability. A system can be available, meaning it's up and responding, while being unreliable, meaning some of those responses are wrong, stale, or the result of silent data corruption. Where availability is mostly solved with redundancy, reliability needs correctness-focused techniques: retries with idempotency, checksums, validation, and graceful degradation when a fault does occur. Reliability failures are also sneakier than availability failures — a wrong answer doesn't trigger an alert the way a dead server does, which is exactly why it needs deliberate design attention rather than being assumed as a side effect of high availability.",

  detailedAnswer: [
    "Reliability = probability of correct operation over time, even in the presence of faults — not just 'is it up.'",
    "Availability asks 'is it responding'; reliability asks 'is what it returns actually correct' — a system can satisfy one without the other.",
    "Key reliability techniques: idempotent operations (safe to retry), checksums/validation (detect corruption), graceful degradation (fail safely rather than incorrectly), and thorough error handling rather than swallowing failures silently.",
    "Reliability failures are often invisible to basic uptime monitoring — a service can be 100% 'up' while quietly returning incorrect results, which is why reliability needs its own correctness-focused metrics (error rates, data-integrity checks).",
    "Redundancy (the main lever for availability) doesn't automatically fix reliability — if the underlying logic has a bug, having three replicas just means three replicas of the same wrong answer.",
  ],

  questions: [
    { id: "rel-q1", question: "What is reliability?", answer: "The probability that a system performs its intended function correctly over a given period, including in the presence of faults.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "rel-q2", question: "How is reliability different from availability?", answer: "Availability measures whether the system is up and responding; reliability measures whether those responses are actually correct — a system can be available but unreliable.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "rel-q3", question: "Give an example of a system that's available but unreliable.", answer: "A server that responds to every request within its latency target but occasionally returns stale or corrupted data due to a race condition — it's 'up' the whole time, but not always correct.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q4", question: "Does adding redundancy (more replicas) improve reliability?", answer: "Not by itself — redundancy mainly improves availability; if the underlying logic is buggy, more replicas just mean more copies producing the same incorrect result.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q5", question: "What is idempotency, and why does it matter for reliability?", answer: "An idempotent operation produces the same result no matter how many times it's applied — this makes retries safe after a failure, without risking duplicate side effects (like double-charging a payment).", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q6", question: "Why are reliability failures often harder to detect than availability failures?", answer: "A dead server triggers obvious alerts (failed health checks, timeouts); a server silently returning wrong data can pass every uptime check while still being incorrect.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "rel-q7", question: "What role do checksums play in reliability?", answer: "They let a system detect data corruption (e.g. during storage or transfer) that wouldn't otherwise be visible, since corrupted data can still be 'successfully' returned without any error.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q8", question: "What does graceful degradation mean in the context of reliability?", answer: "Failing safely and predictably when a fault occurs (e.g. returning a cached or partial result with a clear indicator) rather than failing silently or returning an incorrect result as if it were normal.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q9", question: "How would you measure a system's reliability in production?", answer: "Track correctness-focused signals — error rates, failed transaction rates, data-integrity check failures — not just uptime, since uptime alone says nothing about correctness.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q10", question: "Why is retry logic dangerous without idempotency?", answer: "Retrying a non-idempotent operation (like 'charge $10') after an ambiguous failure can duplicate the effect (charging twice) even though the goal was just to ensure it happened once.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "rel-q11", question: "What's the relationship between reliability and fault tolerance?", answer: "Fault tolerance is largely how a system achieves reliability in the presence of faults — a fault-tolerant system continues operating correctly (reliably) even when individual components fail.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q12", question: "Why might an interviewer ask about reliability right after asking about availability?", answer: "To check whether the candidate conflates the two — a common mistake is treating 'we added redundancy' as a complete answer for reliability, when redundancy mainly buys availability.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "rel-q13", question: "What's a reliability concern specific to distributed systems?", answer: "Partial failures — where some but not all nodes involved in an operation fail — can leave data in an inconsistent state unless explicitly handled (e.g. via transactions or compensating actions).", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "rel-q14", question: "How does input validation relate to reliability?", answer: "It prevents malformed or unexpected input from silently producing an incorrect result or corrupting downstream state — a basic but essential reliability safeguard.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q15", question: "Can a system be reliable but not highly available?", answer: "Yes — a system that's frequently down but, whenever it is up, always returns correct results, is reliable in the correctness sense while having poor availability.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "rel-q16", question: "What's an example of a reliability technique used in payment systems specifically?", answer: "Idempotency keys — ensuring a retried payment request with the same key doesn't result in a duplicate charge, directly addressing the retry-safety concern.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q17", question: "Why does 'the request succeeded' not automatically mean 'the request was reliable'?", answer: "Success just means no error was raised — it doesn't verify the result was actually correct; reliability requires additional checks beyond the absence of an error.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "rel-q18", question: "How would you design for reliability in a distributed data pipeline?", answer: "Use idempotent processing, checksums or record counts to detect data loss/duplication, and explicit retry-with-backoff logic rather than assuming every stage succeeds silently.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "rel-q19", question: "What's the danger of only monitoring uptime dashboards?", answer: "They can show a fully 'green' system that's nonetheless silently corrupting data or returning wrong answers, since uptime monitoring doesn't verify correctness.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-q20", question: "Summarize the core distinction between availability and reliability in one sentence.", answer: "Availability asks whether the system responds; reliability asks whether what it returns is actually correct.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Does adding more replicas fix this reliability issue, or just the availability side?\"",
    "\"How would you make this retry safe?\"",
    "\"How would you actually detect this kind of silent failure in production?\"",
  ],

  commonMistakes: [
    "Treating redundancy/replication as a complete answer for reliability.",
    "Proposing retries without discussing idempotency.",
    "Monitoring only uptime and assuming correctness is implied.",
    "Using 'reliable' and 'available' interchangeably in an answer.",
  ],

  interviewTraps: [
    "\"We added three replicas, so it's reliable now\" is a trap answer — replicas address availability; reliability needs a separate, correctness-focused justification.",
    "Being asked \"how do you know it's actually correct, not just responding\" is testing whether you have real correctness-verification mechanisms in mind, not just redundancy.",
  ],

  tradeoffs: [
    "Stronger reliability guarantees (validation, checksums, idempotency tracking) add latency and implementation complexity.",
    "Aggressive retries improve perceived reliability but can amplify load on an already struggling downstream system if not paired with backoff.",
  ],

  decisionGuide: undefined,

  memoryTrick:
    "\"Up vs. Right\" — Availability = is it UP. Reliability = is it RIGHT. Redundancy buys UP; correctness techniques (idempotency, checksums, validation) buy RIGHT.",

  realWorldExamples: [
    "Payment systems build idempotency keys specifically because retrying a failed-looking request without one risks a real, costly reliability failure (double-charging), even though the system stayed fully available throughout.",
    "A CDN serving stale cached content after an origin update is available (fast responses, no errors) but briefly unreliable (serving outdated data) until cache invalidation propagates.",
  ],

  mermaidDiagram: `flowchart LR
    Req[Request] --> Sys[System]
    Sys -->|Responds, but data is wrong/stale| Unreliable[Available but NOT Reliable]
    Sys -->|Responds AND correct| Both[Available AND Reliable]
    Sys -.down.-> Unavailable[Not Available]`,

  flashcards: [
    { id: "rel-fc1", front: "Reliability — one-line definition", back: "The probability a system performs its intended function correctly over time, including under faults.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "rel-fc2", front: "Availability vs. reliability, in one line", back: "Availability = is it up. Reliability = is what it returns correct.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "rel-fc3", front: "Does redundancy alone fix reliability?", back: "No — redundancy mainly buys availability; correctness needs separate techniques like validation and idempotency.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-fc4", front: "Idempotency — why it matters for reliability", back: "Makes retries safe after failure, preventing duplicate side effects like double-charging.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "rel-fc5", front: "Why are reliability failures harder to detect than availability failures?", back: "A dead server triggers obvious alerts; wrong data can pass uptime checks silently.", topic: "Fundamentals", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Reliability",
    sections: [
      { heading: "Definition", items: ["Probability of correct operation over time, under faults"] },
      { heading: "vs. Availability", items: ["Availability = up", "Reliability = correct", "Can have one without the other"] },
      { heading: "Key techniques", items: ["Idempotency (safe retries)", "Checksums / validation", "Graceful degradation", "Explicit error handling"] },
      { heading: "Watch out for", items: ["Silent data corruption", "Non-idempotent retries", "Uptime dashboards implying correctness"] },
    ],
  },

  speedNotes: [
    "Reliability = correct operation over time, even with faults.",
    "Available ≠ reliable: up isn't the same as right.",
    "Redundancy fixes availability, not reliability by itself.",
    "Idempotency makes retries safe — essential reliability technique.",
    "Reliability failures are often silent — need correctness metrics, not just uptime.",
  ],
};
