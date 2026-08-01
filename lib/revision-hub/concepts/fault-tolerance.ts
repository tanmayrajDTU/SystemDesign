import type { ConceptRevisionContent } from "./types";

export const faultTolerance: ConceptRevisionContent = {
  slug: "fault-tolerance",
  title: "Fault Tolerance",
  topic: "Fundamentals",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Fault Tolerance", href: "/docs/fundamentals/fault-tolerance" },
    { label: "Availability", href: "/docs/fundamentals/availability" },
    { label: "Reliability", href: "/docs/fundamentals/reliability" },
  ],

  summary: [
    "Fault tolerance is a system's ability to keep operating correctly when one or more components fail — it doesn't prevent failure, it survives it without becoming a user-visible outage.",
    "In a large enough system, failure is a statistical certainty, not an edge case — fault tolerance treats failure as a routine input to design for, not an exception to hope against.",
    "The core technique is redundancy plus detection plus automatic response: replicate a component, detect when an instance fails, and route around it before users notice.",
    "Fault tolerance and high availability are closely related — fault tolerance is largely how high availability actually gets achieved at the component level.",
    "Not every failure needs the same tolerance — critical paths (payment processing) usually get more redundancy investment than non-critical ones (a recommendation widget).",
    "A common failure mode is building redundancy for the obvious failure (a server crashing) while missing subtler ones (a slow, half-failing dependency, or correlated failures across 'redundant' replicas).",
  ],

  whyAsked: [
    "It tests whether a candidate treats failure as a first-class design input rather than an afterthought bolted on at the end.",
    "It's the natural follow-up to any architecture diagram: \"what happens when this box dies?\"",
    "It distinguishes candidates who can reason about partial, cascading, or correlated failures from those who only consider a single clean component crash.",
  ],

  thirtySecondAnswer:
    "Fault tolerance is a system's ability to keep operating correctly even when parts of it fail — it doesn't prevent failure, it survives it without that failure becoming a visible outage. The core recipe is redundancy plus detection plus automatic response: replicate a component so there's no single point of failure, detect when an instance goes down, and route traffic away from it automatically. In a large enough system, some component is statistically always failing, so fault tolerance treats failure as a routine, expected input to the design rather than a rare edge case — and the harder part isn't handling an obvious clean crash, it's handling subtler failures like a slow, half-working dependency or correlated failures across supposedly independent replicas.",

  detailedAnswer: [
    "Fault tolerance = continuing to operate correctly despite component failures — distinct from preventing failure altogether, which isn't realistically achievable at scale.",
    "Standard toolkit: redundancy (multiple instances/replicas), health checks/detection (knowing something failed), and automatic failover (routing around the failed component without human intervention).",
    "Failures aren't just binary up/down — a 'gray failure' (a component that's slow or partially broken but still technically responding) is often harder to detect and handle than a clean crash.",
    "Correlated failures (multiple 'redundant' replicas failing together due to a shared dependency, region, or bug) undermine naive redundancy — true fault tolerance accounts for shared failure domains, not just component count.",
    "Not all components deserve equal fault-tolerance investment — critical-path components (payment, auth) typically warrant more redundancy than best-effort ones (a non-critical recommendation feature).",
  ],

  questions: [
    { id: "ft-q1", question: "What is fault tolerance?", answer: "A system's ability to continue operating correctly when one or more components fail, without that failure becoming a user-visible outage.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ft-q2", question: "Does fault tolerance mean preventing failures from happening?", answer: "No — it means surviving failures that do happen, correctly and without visible disruption; preventing all failure isn't realistically achievable at scale.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ft-q3", question: "What are the three core components of a fault-tolerant design?", answer: "Redundancy (multiple instances), detection (health checks/monitoring to know something failed), and automatic response (failover routing away from the failed component).", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-q4", question: "Why is failure treated as a routine input rather than an edge case in large systems?", answer: "At sufficient scale, individual component failures (disk, server, network link) become statistically frequent — something is almost always failing somewhere, so designing only for the happy path is unrealistic.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-q5", question: "What is a 'gray failure', and why is it harder to handle than a clean crash?", answer: "A component that's slow or partially broken but still technically responding — health checks based on simple up/down status can miss it entirely, unlike an obvious crash that trips an alert immediately.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q6", question: "What is a correlated failure, and why does it undermine redundancy?", answer: "When multiple 'redundant' replicas fail together due to a shared dependency, region, or bug — naive redundancy assumes independent failure, so correlated failures can take down every replica simultaneously despite the redundancy.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q7", question: "How does fault tolerance relate to availability?", answer: "Fault tolerance is largely how high availability is actually achieved at the component level — surviving individual failures without outage is what keeps overall system availability high.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-q8", question: "Should every component in a system get the same level of fault-tolerance investment?", answer: "No — critical-path components (payments, authentication) usually warrant more redundancy and investment than non-critical, best-effort ones (a recommendation widget).", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-q9", question: "What's an example of a fault-tolerance technique for handling a slow dependency?", answer: "A timeout combined with a circuit breaker — cutting off calls to a dependency that's responding too slowly, rather than letting slow responses cascade and exhaust resources upstream.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q10", question: "Why is a health check based only on 'is the process running' often insufficient?", answer: "A process can be running while unable to serve correct responses (e.g. stuck waiting on a dependency) — a deeper health check that verifies actual functional capability catches gray failures a simple liveness check would miss.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q11", question: "How does redundancy across availability zones/regions relate to fault tolerance?", answer: "It protects against a correlated failure at the zone or region level (power outage, networking issue) that a single-zone redundancy strategy wouldn't survive.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-q12", question: "What's the difference between fault tolerance and disaster recovery?", answer: "Fault tolerance is about continuing to operate through routine component failures automatically; disaster recovery is the broader plan for recovering from a catastrophic event (e.g. full region loss) that may not be instantly self-healing.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q13", question: "Why can retries make a failing system worse instead of better?", answer: "Aggressive retries against an already-struggling dependency can amplify load and push it further into failure — this is why retries need backoff and circuit breakers rather than unlimited immediate retrying.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q14", question: "What's a circuit breaker, in the context of fault tolerance?", answer: "A mechanism that stops sending requests to a dependency once it's detected as failing/slow, giving it room to recover instead of being hit with continued load, and periodically testing whether it's healthy again.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-q15", question: "How does graceful degradation relate to fault tolerance?", answer: "Rather than failing outright when a non-critical dependency is down, the system can serve a reduced but still functional experience (e.g. showing cached results) — a fault-tolerant response, not just a binary success/failure.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-q16", question: "Why might chaos engineering (deliberately injecting failures) be used to validate fault tolerance?", answer: "It tests whether the redundancy/detection/failover mechanisms actually work under real failure conditions, rather than trusting untested assumptions about what would happen.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q17", question: "What's a common mistake when designing for fault tolerance?", answer: "Building redundancy for the obvious failure mode (a server crashing) while missing subtler ones — gray failures, correlated failures, or cascading failures triggered by retries.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q18", question: "How does load shedding relate to fault tolerance?", answer: "Deliberately rejecting some requests under extreme load protects the system from total collapse, trading some availability for the rest of the system continuing to function correctly for other requests.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-q19", question: "Why is 'add a replica' not automatically sufficient for fault tolerance?", answer: "Without detection (knowing the primary failed) and automatic failover (routing to the replica), a replica sitting idle doesn't actually help — all three pieces (redundancy, detection, response) are needed together.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-q20", question: "Summarize fault tolerance in one sentence.", answer: "The ability to keep operating correctly through component failures, via redundancy, detection, and automatic failover, rather than trying to prevent failure from ever happening.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What happens to this system when that specific component fails?\"",
    "\"How would you detect that failure, and how quickly?\"",
    "\"What's a failure mode this design doesn't handle yet?\"",
  ],

  commonMistakes: [
    "Only designing for a clean, obvious component crash and ignoring gray/partial failures.",
    "Assuming redundant replicas fail independently without considering shared/correlated failure domains.",
    "Adding redundancy without detection and automatic failover to actually use it.",
    "Using unlimited, immediate retries that amplify load on an already-struggling dependency.",
  ],

  interviewTraps: [
    "\"Is this design fault tolerant?\" followed by \"what if the failure is slow, not a clean crash\" is testing whether gray failures were considered at all.",
    "Being asked whether your redundant replicas could fail together is a trap for anyone who assumed independence without checking for shared dependencies, regions, or code paths.",
  ],

  tradeoffs: [
    "More redundancy improves fault tolerance but increases cost and operational complexity.",
    "Aggressive automatic failover reduces downtime but risks flapping (repeatedly failing over) if detection is too sensitive.",
    "Load shedding under extreme failure protects the overall system but sacrifices availability for the shed requests.",
  ],

  decisionGuide: {
    kind: "question",
    id: "ft-root",
    question: "What kind of failure are you designing tolerance for?",
    options: [
      {
        label: "A single instance crashing",
        next: {
          kind: "result",
          id: "ft-crash",
          result: "Redundant instances + load balancer health checks + automatic failover.",
          rationale: "The standard, most common case — multiple instances behind a load balancer that detects and routes around a dead instance.",
        },
      },
      {
        label: "A dependency responding slowly (gray failure)",
        next: {
          kind: "result",
          id: "ft-gray",
          result: "Timeouts + circuit breaker, not just a liveness health check.",
          rationale: "A slow-but-technically-alive dependency won't trip a simple up/down check — timeouts and circuit breakers cut off the damage before it cascades upstream.",
        },
      },
      {
        label: "An entire availability zone or region failing",
        next: {
          kind: "result",
          id: "ft-region",
          result: "Multi-AZ / multi-region redundancy, not just multiple instances in one zone.",
          rationale: "Instance-level redundancy within a single zone doesn't survive a zone-wide event — the failure domain has to be addressed at the same level as the redundancy.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Redundancy + Detection + Response\" — the three-part recipe for fault tolerance. Missing any one means redundancy that isn't actually used, or a failure that's never noticed, or a failure noticed but never routed around.",

  realWorldExamples: [
    "Netflix's Chaos Monkey deliberately kills production instances at random specifically to force every team to build genuine fault tolerance rather than assuming untested redundancy would work.",
    "Circuit breakers are a standard pattern in microservice architectures specifically to prevent one slow, gray-failing dependency from cascading into a full outage across otherwise-healthy services.",
  ],

  mermaidDiagram: `flowchart TD
    LB[Load Balancer] --> A[Instance A - healthy]
    LB --> B[Instance B - FAILED]
    LB --> C[Instance C - healthy]
    HC[Health Check] -->|detects failure| B
    HC -->|signals| LB
    LB -->|routes around B| A
    LB -->|routes around B| C`,

  flashcards: [
    { id: "ft-fc1", front: "Fault tolerance — one-line definition", back: "A system's ability to keep operating correctly when components fail, without a visible outage.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ft-fc2", front: "Three-part recipe for fault tolerance", back: "Redundancy + detection + automatic failover.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ft-fc3", front: "Gray failure", back: "A component that's slow or partially broken but still technically responding — harder to detect than a clean crash.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-fc4", front: "Correlated failure", back: "Multiple 'redundant' replicas failing together due to a shared dependency, region, or bug.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ft-fc5", front: "Circuit breaker — purpose", back: "Stops sending requests to a failing/slow dependency, preventing cascading failure upstream.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Fault Tolerance",
    sections: [
      { heading: "Core recipe", items: ["Redundancy", "Detection (health checks)", "Automatic failover"] },
      { heading: "Failure types to design for", items: ["Clean crash", "Gray failure (slow, partial)", "Correlated failure (shared dependency/region)"] },
      { heading: "Techniques", items: ["Multi-instance + load balancer", "Timeouts + circuit breakers", "Multi-AZ / multi-region", "Graceful degradation", "Load shedding"] },
    ],
  },

  speedNotes: [
    "Fault tolerance = survive failure correctly, not prevent it.",
    "Recipe: redundancy + detection + automatic failover.",
    "Gray failures (slow, not dead) are harder than clean crashes.",
    "Correlated failures undermine naive redundancy — check shared failure domains.",
    "Circuit breakers + timeouts prevent cascading failure from slow dependencies.",
  ],
};
