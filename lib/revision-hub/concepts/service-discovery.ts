import type { ConceptRevisionContent } from "./types";

export const serviceDiscovery: ConceptRevisionContent = {
  slug: "service-discovery",
  title: "Service Discovery",
  topic: "Distributed Systems",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Service Discovery", href: "/docs/distributed-systems/service-discovery" }
  ],
  summary: [
    "Service Discovery allows microservices to find each other's network locations dynamically.",
    "Because cloud environments use dynamic IPs and auto-scaling, hardcoding IP addresses is impossible.",
    "A Service Registry (like Consul, Eureka, or etcd) acts as a phone book for all running services.",
    "Services register themselves on startup and de-register (or stop sending heartbeats) on shutdown.",
    "Service discovery can be implemented client-side (client queries registry) or server-side (load balancer routes traffic).",
    "It often integrates closely with load balancing and health checking."
  ],
  whyAsked: [
    "To test your understanding of microservices architecture and dynamic cloud environments.",
    "To see if you know how to route traffic internally without relying on static configurations.",
    "To evaluate trade-offs between client-side and server-side complexity."
  ],
  thirtySecondAnswer: "In microservices, instances constantly spin up and down with changing IPs. Service Discovery acts as a dynamic phone book. When a service instance starts, it registers its IP with a Service Registry (e.g., Consul, Eureka). When Service A needs to call Service B, it checks the registry to find Service B's active IPs. This lookup can happen directly in the client (Client-Side Discovery) or via a dedicated Load Balancer (Server-Side Discovery). Heartbeats ensure dead instances are purged.",
  detailedAnswer: [
    "In monolithic systems, services run on static IPs or known hostnames. In cloud-native microservices, IPs change constantly due to scaling, deployments, and failures.",
    "The core component is the Service Registry, a highly available database containing network locations of service instances.",
    "Health Checks are critical: if an instance crashes, it won't deregister cleanly. The registry must ping instances (or expect heartbeats) to remove dead nodes.",
    "In Client-Side Discovery, the client queries the registry, gets a list of IPs, applies its own load balancing algorithm, and makes the request directly. This requires registry-aware code in every client.",
    "In Server-Side Discovery, the client hits a Load Balancer or API Gateway. The LB queries the registry and forwards the request. This abstracts the complexity away from the client.",
    "Kubernetes natively provides server-side service discovery via CoreDNS and Services."
  ],
  questions: [
    { id: "sdisc-q1", question: "What problem does Service Discovery solve?", answer: "It allows services to dynamically find the IP addresses and ports of other services they need to communicate with.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "sdisc-q2", question: "Why can't we just use DNS?", answer: "Traditional DNS relies on caching and TTLs, which are often too slow to update for rapidly changing container IPs.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "sdisc-q3", question: "What is a Service Registry?", answer: "A central database (like Consul or Eureka) that stores the network locations of all active service instances.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "sdisc-q4", question: "How does the registry know when a service dies?", answer: "Through periodic health checks or by requiring instances to send frequent heartbeats.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "sdisc-q5", question: "What is Client-Side Service Discovery?", answer: "The client queries the registry for IPs and handles its own load balancing to contact the target service directly.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-q6", question: "What is Server-Side Service Discovery?", answer: "The client sends requests to a load balancer, which queries the registry and routes the traffic.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-q7", question: "What is a major advantage of Server-Side Discovery?", answer: "Clients don't need language-specific libraries to interact with the registry; the complexity is abstracted.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-q8", question: "What is a major disadvantage of Server-Side Discovery?", answer: "The load balancer becomes an extra network hop and a potential bottleneck or single point of failure.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-q9", question: "How does Kubernetes handle Service Discovery?", answer: "Server-side. It assigns a static virtual IP to a Service and updates iptables/IPVS to route traffic to the dynamic Pod IPs.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-q10", question: "Name three popular Service Registry tools.", answer: "HashiCorp Consul, Netflix Eureka, and Apache ZooKeeper (or etcd).", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-q11", question: "How does a service mesh utilize service discovery?", answer: "The mesh control plane reads the registry and pushes the IP lists to sidecar proxies (like Envoy) running alongside every service.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "sdisc-q12", question: "What happens if the Service Registry goes down?", answer: "Clients usually cache the last known good list of IPs so they can continue to route traffic to existing instances, though new ones won't be discovered.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "sdisc-q13", question: "What is the difference between CP and AP service registries?", answer: "Consul/etcd are CP (strict consistency), while Eureka is AP (highly available, eventually consistent).", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "sdisc-q14", question: "Why might an AP registry (like Eureka) be better for Service Discovery?", answer: "Stale routing information (sending traffic to a dead node) is usually handled by client retries. Total registry unavailability is much worse.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "sdisc-q15", question: "What is the 'Self-Registration' pattern?", answer: "The service instance itself is responsible for registering and deregistering with the service registry.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-q16", question: "What is the 'Third-Party Registration' pattern?", answer: "An external component (like a deployment orchestrator or Registrator) handles registering the service instance.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "sdisc-q17", question: "How do you secure a service registry?", answer: "By requiring mutual TLS (mTLS) for registration and using ACLs to restrict which services can discover others.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "sdisc-q18", question: "What is peer-to-peer service discovery?", answer: "Services gossip their locations to each other without a centralized registry (e.g., using Serf/Gossip protocols).", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "sdisc-q19", question: "How do health checks prevent cascading failures?", answer: "They remove overwhelmed or slow nodes from the registry quickly, preventing them from receiving more traffic.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "sdisc-q20", question: "What role does DNS play in modern service discovery?", answer: "While traditional DNS is slow, systems like CoreDNS integrate with registries to provide fast, locally cached DNS lookups for services.", topic: "Distributed Systems", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How does a Service Mesh (like Istio) change the Service Discovery paradigm?",
    "If the registry dies, how does the system survive?",
    "Why not just use an AWS Elastic Load Balancer (ELB) instead of Consul?"
  ],
  commonMistakes: [
    "Thinking standard DNS is sufficient for microservices (TTL caching makes it too slow to react to crashes).",
    "Forgetting to mention health checks—without them, the registry fills up with dead IPs.",
    "Assuming client-side discovery doesn't require a load balancing algorithm (the client must pick an IP from the list)."
  ],
  interviewTraps: [
    "Designing a system where the registry is a single point of failure without local client-side caching.",
    "Manually implementing service discovery when discussing a Kubernetes environment (K8s does it natively)."
  ],
  tradeoffs: [
    "Client-side means fewer network hops but couples business logic with registry logic.",
    "Server-side abstracts complexity away but adds latency (an extra hop via the LB) and a single point of failure.",
    "AP registries (Eureka) survive partitions better but might serve stale IPs; CP registries (Consul) give perfect lists but might reject reads during partitions."
  ],
  comparisonTable: {
    title: "Client-Side vs Server-Side Service Discovery",
    columns: ["Feature", "Client-Side Discovery", "Server-Side Discovery"],
    rows: [
      { label: "Network Hops", values: ["1 hop (Direct to service)", "2 hops (Client -> LB -> Service)"] },
      { label: "Client Complexity", values: ["High (Needs registry client lib)", "Low (Just makes standard HTTP call)"] },
      { label: "Language Agnostic", values: ["No (Needs libraries per language)", "Yes (LB handles the logic)"] },
      { label: "Load Balancing", values: ["Client handles it (e.g., Round Robin)", "Load Balancer handles it"] },
      { label: "Examples", values: ["Netflix OSS (Eureka + Ribbon)", "Kubernetes Services, AWS ALB"] }
    ]
  },
  memoryTrick: "The Registry is a dynamic phonebook; Health checks act as the eraser.",
  realWorldExamples: [
    "Netflix Eureka: Client-side discovery used extensively in Spring Boot microservices.",
    "Kubernetes CoreDNS: Server-side discovery where services are assigned a virtual IP."
  ],
  mermaidDiagram: `flowchart LR
    ServiceA[Service A (Client)]
    Registry[(Service Registry)]
    ServiceB1[Service B (IP: .10)]
    ServiceB2[Service B (IP: .11)]
    
    ServiceB1 -. Registers .-> Registry
    ServiceB2 -. Registers .-> Registry
    
    ServiceA -- 1. Query 'Service B' --> Registry
    Registry -- 2. Returns [.10, .11] --> ServiceA
    ServiceA -- 3. Calls --> ServiceB2`,
  flashcards: [
    { id: "sdisc-fc1", front: "What is a Service Registry?", back: "A dynamic database containing active network locations of microservices.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "sdisc-fc2", front: "Why is traditional DNS poor for microservices?", back: "DNS TTL caching makes it too slow to adapt to rapidly changing container IPs.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-fc3", front: "What is Client-Side Discovery?", back: "Client queries registry, gets IPs, and connects directly to the target.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-fc4", front: "What is Server-Side Discovery?", back: "Client connects to a Load Balancer, which queries registry and forwards traffic.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "sdisc-fc5", front: "How are dead nodes removed from the registry?", back: "Through missed heartbeats or failed health checks.", topic: "Distributed Systems", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Service Discovery Cheatsheet",
    sections: [
      {
        heading: "Core Concepts",
        items: [
          "Registry: The central phonebook (Consul, Eureka).",
          "Registration: Instances announce themselves.",
          "Health Checks: Registry evicts dead nodes."
        ]
      },
      {
        heading: "Client-Side",
        items: [
          "Direct connection (1 hop).",
          "Client must know how to load balance.",
          "Client caches IPs in case registry dies."
        ]
      },
      {
        heading: "Server-Side",
        items: [
          "Traffic goes through LB (2 hops).",
          "Language agnostic.",
          "Standard in Kubernetes."
        ]
      }
    ]
  },
  speedNotes: [
    "Dynamic IPs need a registry.",
    "Registry acts as a phonebook.",
    "Heartbeats remove dead nodes.",
    "Client-side = direct, 1 hop.",
    "Server-side = LB, 2 hops."
  ]
};
