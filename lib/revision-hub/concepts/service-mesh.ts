import type { ConceptRevisionContent } from "./types";

export const serviceMesh: ConceptRevisionContent = {
  slug: "service-mesh",
  title: "Service Mesh",
  topic: "Architecture",
  difficulty: "Advanced",
  estimatedMinutes: 12,
  docLinks: [
    { label: "Service Mesh", href: "/docs/microservices/service-mesh" }
  ],
  summary: [
    "A service mesh is a dedicated infrastructure layer for handling service-to-service communication.",
    "It offloads tasks like routing, retries, security, and observability from the application code.",
    "It is typically implemented as an array of lightweight network proxies (sidecars) deployed alongside application code.",
    "Istio, Linkerd, and Consul are popular service mesh implementations.",
    "It provides a uniform way to secure, connect, and monitor microservices."
  ],
  whyAsked: [
    "To test advanced knowledge of microservices operations at scale.",
    "To see if you understand how to separate infrastructure concerns from business logic.",
    "To evaluate knowledge of mTLS, load balancing, and distributed observability."
  ],
  thirtySecondAnswer: "In a complex microservices environment, managing network communication, security (like mTLS), retries, and tracing within the application code becomes unmanageable. A service mesh solves this by injecting a sidecar proxy next to every service instance. All incoming and outgoing traffic goes through this proxy, which enforces routing rules, handles retries, provides encryption, and emits metrics—allowing developers to focus solely on business logic.",
  detailedAnswer: [
    "Sidecar Pattern: Proxies are deployed alongside the application container in the same pod.",
    "Data Plane vs. Control Plane: Proxies form the data plane, while the control plane manages configuration and policy.",
    "Traffic Management: Supports advanced routing like canary releases, A/B testing, and circuit breaking.",
    "Security: Transparently encrypts traffic between services using mutual TLS (mTLS).",
    "Observability: Automatically generates metrics, logs, and distributed traces for all service communication.",
    "Decoupling: Removes networking and security logic from the application code."
  ],
  questions: [
    { id: "smsh-q1", question: "What is a service mesh?", answer: "An infrastructure layer that manages service-to-service communication securely and reliably.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q2", question: "What is the sidecar pattern?", answer: "Deploying a proxy alongside the application container to handle network traffic.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q3", question: "What is the Data Plane?", answer: "The collection of proxies that intercept and manage network traffic between services.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q4", question: "What is the Control Plane?", answer: "The central management component that configures the proxies and enforces policies.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q5", question: "How does a service mesh improve security?", answer: "By enforcing mutual TLS (mTLS) for all inter-service communication automatically.", topic: "Architecture", difficulty: "Advanced" },
    { id: "smsh-q6", question: "Name a popular service mesh implementation.", answer: "Istio, Linkerd, or HashiCorp Consul.", topic: "Architecture", difficulty: "Beginner" },
    { id: "smsh-q7", question: "How does it help with observability?", answer: "By automatically emitting metrics, logs, and traces for all network traffic.", topic: "Architecture", difficulty: "Advanced" },
    { id: "smsh-q8", question: "What is a canary deployment in a service mesh?", answer: "Routing a small percentage of traffic to a new service version to test it safely.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q9", question: "Does a service mesh replace an API Gateway?", answer: "No, API Gateways handle external (North-South) traffic, while a service mesh handles internal (East-West) traffic.", topic: "Architecture", difficulty: "Advanced" },
    { id: "smsh-q10", question: "What is the main drawback of a service mesh?", answer: "Added complexity and potential latency overhead due to extra network hops through proxies.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q11", question: "How does it handle circuit breaking?", answer: "The proxy stops sending traffic to a failing service automatically based on configured rules.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q12", question: "What is Envoy?", answer: "A popular open-source high-performance proxy often used as the data plane in service meshes.", topic: "Architecture", difficulty: "Advanced" },
    { id: "smsh-q13", question: "Do you need a service mesh for a monolith?", answer: "No, it's designed for distributed microservices architectures.", topic: "Architecture", difficulty: "Beginner" },
    { id: "smsh-q14", question: "How does it reduce developer burden?", answer: "Developers don't need to write code for retries, mTLS, or tracing logic.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q15", question: "What is fault injection?", answer: "A feature in a service mesh to intentionally introduce delays or errors to test system resilience.", topic: "Architecture", difficulty: "Advanced" },
    { id: "smsh-q16", question: "Can a service mesh route traffic based on HTTP headers?", answer: "Yes, advanced Layer 7 routing is a core feature.", topic: "Architecture", difficulty: "Advanced" },
    { id: "smsh-q17", question: "What is East-West traffic?", answer: "Traffic flowing internally between microservices within a data center.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q18", question: "What is North-South traffic?", answer: "Traffic entering or leaving the data center from external clients.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-q19", question: "How does a service mesh help with legacy apps?", answer: "By adding a sidecar proxy, legacy apps get modern networking features without code changes.", topic: "Architecture", difficulty: "Advanced" },
    { id: "smsh-q20", question: "When should you NOT use a service mesh?", answer: "When you have a simple architecture or lack the DevOps resources to manage it.", topic: "Architecture", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "What is the difference between an API Gateway and a Service Mesh?",
    "How does Envoy proxy work under the hood?",
    "How do you debug latency issues introduced by the mesh?"
  ],
  commonMistakes: [
    "Confusing an API Gateway with a Service Mesh.",
    "Implementing a service mesh prematurely before microservices scale demands it.",
    "Ignoring the resource overhead of running a proxy alongside every container."
  ],
  interviewTraps: [
    "Assuming a service mesh solves all architectural problems.",
    "Failing to mention the control plane vs. data plane separation."
  ],
  tradeoffs: [
    "Developer Productivity vs. Operational Complexity",
    "Feature Richness vs. Resource Overhead (Memory/CPU for sidecars)",
    "Consistent Security vs. Slight Network Latency"
  ],
  memoryTrick: "Service Mesh = A postal service for microservices. It handles the routing, tracking, and secure delivery so the sender doesn't have to.",
  realWorldExamples: [
    "Lyft: Created Envoy to handle their massive internal microservices traffic.",
    "Kubernetes Environments: Istio is commonly used to secure and monitor microservices deployed on K8s."
  ],
  mermaidDiagram: `flowchart TD
    subgraph Control Plane
        CP[Control Plane / Istiod]
    end
    subgraph Node A
        AppA[Service A] <--> ProxyA[Sidecar Proxy]
    end
    subgraph Node B
        ProxyB[Sidecar Proxy] <--> AppB[Service B]
    end
    ProxyA <-->|mTLS Data Plane| ProxyB
    CP -.->|Config| ProxyA
    CP -.->|Config| ProxyB`,
  flashcards: [
    { id: "smsh-fc1", front: "What is a Service Mesh?", back: "An infrastructure layer handling service-to-service communication.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-fc2", front: "What is a Sidecar Proxy?", back: "A proxy deployed alongside an application to intercept and manage its traffic.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-fc3", front: "Control Plane vs Data Plane?", back: "Control plane manages policies; Data plane executes policies by moving the traffic.", topic: "Architecture", difficulty: "Advanced" },
    { id: "smsh-fc4", front: "How does it secure traffic?", back: "By enforcing automatic mutual TLS (mTLS) between services.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "smsh-fc5", front: "Service Mesh vs API Gateway?", back: "API Gateway handles external (North-South) traffic; Mesh handles internal (East-West) traffic.", topic: "Architecture", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Service Mesh",
    sections: [
      {
        heading: "Core Capabilities",
        items: [
          "Traffic routing (Canary, A/B)",
          "Security (mTLS)",
          "Observability (Tracing, Metrics)",
          "Reliability (Retries, Circuit Breaking)"
        ]
      },
      {
        heading: "Key Components",
        items: [
          "Data Plane (e.g., Envoy)",
          "Control Plane (e.g., Istio)",
          "Sidecar Proxy container"
        ]
      },
      {
        heading: "When to adopt",
        items: [
          "High number of microservices",
          "Need for strict mTLS security",
          "Complex traffic routing needs"
        ]
      }
    ]
  },
  speedNotes: [
    "Abstracts networking logic",
    "Uses sidecar proxies",
    "Provides automatic mTLS",
    "Control plane + Data plane",
    "Handles East-West traffic"
  ]
};
