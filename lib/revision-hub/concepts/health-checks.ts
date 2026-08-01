import type { ConceptRevisionContent } from "./types";

export const healthChecks: ConceptRevisionContent = {
  slug: "health-checks",
  title: "Health Checks",
  topic: "Load Balancing",
  difficulty: "Beginner",
  estimatedMinutes: 10,
  docLinks: [
    { label: "Health Checks", href: "/docs/load-balancing/health-checks" },
    { label: "Layer 7 Load Balancing", href: "/docs/load-balancing/layer-7" },
  ],
  summary: [
    "Health checks are regular mechanisms used by load balancers or orchestrators to determine if a server or application instance is ready to receive traffic.",
    "They usually involve sending periodic requests (e.g., HTTP GET) to a specific endpoint (e.g., /health).",
    "If an instance fails a configurable number of consecutive checks, it is removed from the active routing pool.",
    "Active health checks actively probe instances, while passive health checks monitor live traffic for errors.",
    "Effective health checks prevent traffic from being routed to unhealthy or degraded instances, improving overall system availability."
  ],
  whyAsked: [
    "To evaluate understanding of system reliability and how to maintain high availability.",
    "To test practical knowledge of configuring load balancers and dealing with failed nodes.",
    "To see if a candidate considers the impact of health checks on system performance (e.g., overwhelming databases)."
  ],
  thirtySecondAnswer: "Health checks are automated probes sent by a load balancer or service mesh to application instances to verify their status. By periodically polling a dedicated endpoint, the load balancer ensures it only routes traffic to healthy nodes. If a node fails a health check, it's temporarily removed from the pool until it recovers, ensuring users don't experience failures due to crashed or overloaded servers.",
  detailedAnswer: [
    "Load balancers configure an interval, timeout, and threshold for health checks.",
    "Active health checks involve the load balancer proactively sending probes (HTTP, TCP, or ICMP) to a specific endpoint on each backend server.",
    "Passive health checks (or outlier detection) observe actual client traffic and remove servers that return too many errors or timeouts.",
    "Liveness probes check if an application is running (and should be restarted if not).",
    "Readiness probes check if an application is ready to handle traffic (e.g., has finished loading caches or connecting to databases).",
    "Deep health checks test dependencies (like database connectivity), but risk cascading failures if the dependency is slow."
  ],
  questions: [
    { id: "hc-q1", question: "What is a health check in load balancing?", answer: "A periodic test performed by a load balancer to check if a backend server is responsive and healthy before routing traffic to it.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q2", question: "What happens when a server fails a health check?", answer: "The load balancer temporarily removes the server from the routing pool so no new requests are sent to it.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q3", question: "What is an active health check?", answer: "The load balancer proactively sends synthetic requests to the backend server at regular intervals to test its health.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q4", question: "What is a passive health check?", answer: "The load balancer monitors actual client traffic. If a server returns an unusual number of errors, it's marked unhealthy.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q5", question: "What is the difference between liveness and readiness probes?", answer: "Liveness checks if the app is running (restarts it if not). Readiness checks if it can accept traffic (removes from LB if not).", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-q6", question: "What is a deep health check?", answer: "A health check that also verifies the status of downstream dependencies, such as database connections or external APIs.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-q7", question: "Why can deep health checks be dangerous?", answer: "If a shared database goes down, all application servers might fail their deep health checks, causing the load balancer to remove all servers and potentially crash the entire service.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-q8", question: "What HTTP status code typically indicates a healthy application?", answer: "HTTP 200 OK.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q9", question: "How does a load balancer decide a server has recovered?", answer: "The server must pass a consecutive number of health checks (healthy threshold) to be added back to the pool.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q10", question: "What is a shallow health check?", answer: "A check that only verifies if the application process is running and can respond to a simple request, without checking downstream dependencies.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q11", question: "Why use both active and passive health checks?", answer: "Active catches issues before traffic is sent; passive detects issues based on real user requests that synthetic probes might miss.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-q12", question: "How do you configure the interval for health checks?", answer: "It should be balanced: too frequent causes unnecessary load, too infrequent delays the detection of failed nodes.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-q13", question: "What is a health check timeout?", answer: "The maximum time the load balancer waits for a response from the backend before considering the check failed.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q14", question: "What is an unhealthy threshold?", answer: "The number of consecutive failed checks required before marking a server as unhealthy.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-q15", question: "What is connection draining?", answer: "When a server is marked unhealthy or deregistered, the load balancer stops sending new requests but allows existing ones to complete.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-q16", question: "How does a service mesh use health checks?", answer: "Sidecar proxies use health checks (often passive/outlier detection) to avoid routing traffic to degraded instances of other services.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "hc-q17", question: "Should a health check endpoint be authenticated?", answer: "Typically no, to keep it fast and accessible for the load balancer, but it shouldn't expose sensitive data.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-q18", question: "How can health checks cause a thundering herd?", answer: "If many load balancers or monitoring tools aggressively poll the same endpoints simultaneously, they can overload the application.", topic: "Load Balancing", difficulty: "Advanced" },
    { id: "hc-q19", question: "What is the role of a health check in auto-scaling?", answer: "Failed health checks can trigger the orchestrator (like Kubernetes or AWS ASG) to terminate the unhealthy instance and launch a replacement.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-q20", question: "How do you handle a scenario where all servers fail health checks?", answer: "Most load balancers will 'fail open' and route traffic to all nodes anyway, assuming a configuration or LB error, rather than dropping all traffic.", topic: "Load Balancing", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you prevent a database outage from taking down your entire application cluster via health checks?",
    "When would you use passive health checks over active health checks?",
    "How do health checks integrate with container orchestration systems like Kubernetes?"
  ],
  commonMistakes: [
    "Implementing deep health checks without caching the results, leading to downstream overload.",
    "Setting the health check interval too aggressively, consuming too much CPU/Network.",
    "Not distinguishing between liveness (needs restart) and readiness (needs traffic stopped)."
  ],
  interviewTraps: [
    "Assuming all health checks should test the database connection (this can lead to cascading failures).",
    "Forgetting that if 100% of nodes fail health checks, you probably want to fail open rather than dropping all traffic."
  ],
  tradeoffs: [
    "Deep vs Shallow checks: Deep is more accurate but risks cascading failures; shallow is safe but might pass traffic to a broken app.",
    "Frequent vs Infrequent checks: Frequent detects failures faster but adds overhead; infrequent saves resources but leaves the system vulnerable to routing traffic to dead nodes."
  ],
  memoryTrick: "Liveness = 'Am I alive?' (Restart if no). Readiness = 'Am I ready?' (Stop traffic if no).",
  realWorldExamples: [
    "AWS Application Load Balancer sending HTTP GET to /healthz every 30 seconds.",
    "Kubernetes using livenessProbes and readinessProbes to manage pod lifecycles."
  ],
  mermaidDiagram: `flowchart LR\n    LB[Load Balancer] -->|HTTP /health| S1[Server 1 - 200 OK]\n    LB -->|HTTP /health| S2[Server 2 - 500 Error]\n    LB -.-|Traffic routed| S1\n    LB -.-x|Traffic blocked| S2\n    style S2 fill:#ffcccc,stroke:#ff0000`,
  flashcards: [
    { id: "hc-fc1", front: "What is a health check?", back: "A probe sent by a load balancer to verify a server can handle traffic.", topic: "Load Balancing", difficulty: "Beginner" },
    { id: "hc-fc2", front: "Liveness vs Readiness Probe?", back: "Liveness: Restart if failed. Readiness: Stop traffic if failed.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-fc3", front: "Active vs Passive Health Check?", back: "Active: LB sends synthetic probes. Passive: LB monitors real user traffic for errors.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-fc4", front: "Danger of Deep Health Checks?", back: "Can cause cascading failures if a shared dependency (like a DB) is slow.", topic: "Load Balancing", difficulty: "Intermediate" },
    { id: "hc-fc5", front: "What is 'fail open' in health checks?", back: "If all nodes fail checks, route traffic to all anyway, assuming the check mechanism is broken.", topic: "Load Balancing", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Health Checks Cheat Sheet",
    sections: [
      {
        heading: "Types of Checks",
        items: [
          "Active: Synthetic requests sent periodically.",
          "Passive: Monitoring actual traffic for error rates.",
          "Deep: Checks dependencies (DB, caches).",
          "Shallow: Only checks if the application process is up."
        ]
      },
      {
        heading: "Kubernetes Probes",
        items: [
          "Liveness: Determines if container should be restarted.",
          "Readiness: Determines if container should receive traffic.",
          "Startup: Checks if a slow-starting application has initialized."
        ]
      },
      {
        heading: "Best Practices",
        items: [
          "Prefer shallow checks for load balancer routing.",
          "Use readiness probes to decouple traffic routing from restarts.",
          "Don't do expensive DB queries on every health check."
        ]
      }
    ]
  },
  speedNotes: [
    "Probes verify server availability.",
    "Removes dead nodes automatically.",
    "Liveness restarts, readiness routes.",
    "Beware of deep check cascades.",
    "Passive monitors real traffic errors."
  ]
};
