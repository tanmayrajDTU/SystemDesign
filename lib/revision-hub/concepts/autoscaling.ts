import type { ConceptRevisionContent } from "./types";

export const autoscaling: ConceptRevisionContent = {
  slug: "autoscaling",
  title: "Autoscaling",
  topic: "Cloud & Infrastructure",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Autoscaling", href: "/docs/cloud/autoscaling" },
  ],
  summary: [
    "Autoscaling is a cloud computing feature that automatically adjusts computational resources based on real-time demand.",
    "It ensures an application has enough resources to handle load spikes without over-provisioning for idle times.",
    "Horizontal scaling (scaling out/in) adds or removes machine instances.",
    "Vertical scaling (scaling up/down) increases or decreases the power (CPU, RAM) of existing machines.",
    "Modern systems rely heavily on autoscaling for high availability and cost optimization.",
  ],
  whyAsked: [
    "To test your ability to design systems that handle variable traffic efficiently.",
    "To evaluate cost-awareness in system design.",
    "To see if you understand the differences and tradeoffs between vertical and horizontal scaling.",
  ],
  thirtySecondAnswer: "Autoscaling dynamically adjusts resources to match demand. Horizontal scaling adds more machines to a pool behind a load balancer, ideal for stateless apps. Vertical scaling upgrades the specs of an existing machine, often requiring downtime, suited for monolithic databases. Autoscaling prevents crashing under high load while saving money during low load.",
  detailedAnswer: [
    "Autoscaling is driven by metrics (CPU, memory, request rates, custom application metrics).",
    "Thresholds are set to trigger scaling policies (e.g., if CPU > 80% for 5 mins, add 2 instances).",
    "Predictive scaling uses machine learning to anticipate traffic spikes based on historical data.",
    "Horizontal scaling requires a Load Balancer to distribute incoming traffic among the dynamic pool of instances.",
    "Stateful applications require careful handling during scaling out to ensure data consistency.",
  ],
  questions: [
    { id: "as-q1", question: "What is autoscaling?", answer: "The automatic adjustment of computing resources based on the current load or demand.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "as-q2", question: "What is horizontal scaling (scaling out)?", answer: "Adding more instances or nodes to a system to distribute the load.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "as-q3", question: "What is vertical scaling (scaling up)?", answer: "Increasing the resources (CPU, RAM, disk) of an existing server.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "as-q4", question: "What is a major downside of vertical scaling?", answer: "It has a hard hardware limit, and usually requires downtime to apply the upgrades.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-q5", question: "Why is horizontal scaling preferred for web servers?", answer: "Because web servers are usually stateless, allowing a load balancer to easily distribute traffic across any number of nodes without downtime.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-q6", question: "What metrics are commonly used to trigger autoscaling?", answer: "CPU utilization, memory usage, network I/O, queue length, and concurrent connections.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "as-q7", question: "What is scaling 'in' vs scaling 'down'?", answer: "Scaling in removes instances (horizontal). Scaling down reduces the specs of an instance (vertical).", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-q8", question: "What is an Auto Scaling Group (ASG)?", answer: "A logical collection of EC2 instances (in AWS) that share similar characteristics and are treated as a logical grouping for scaling and management.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-q9", question: "What is a cooldown period in autoscaling?", answer: "A wait period after a scaling activity completes before another can begin, preventing continuous scaling loops (flapping).", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-q10", question: "How does autoscaling handle stateful applications?", answer: "Poorly. If an instance holds local session state and is terminated during scale-in, the user loses their session. State should be externalized to a database or cache.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "as-q11", question: "What is Scheduled Scaling?", answer: "Scaling actions triggered at specific times, useful for predictable traffic patterns like business hours or planned marketing events.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "as-q12", question: "What is Predictive Scaling?", answer: "Using machine learning to analyze historical traffic patterns and automatically scale resources ahead of predicted spikes.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "as-q13", question: "Why might scaling based on CPU not always work?", answer: "If an application is I/O bound (waiting on a database), CPU might remain low while requests pile up. In this case, scaling based on queue length or active connections is better.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "as-q14", question: "How do you scale a monolithic relational database?", answer: "Typically via vertical scaling (buying a bigger server), or by adding read replicas. Full horizontal scaling (sharding) is complex.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-q15", question: "What role does a Load Balancer play in horizontal scaling?", answer: "It acts as the single point of contact for clients, distributing incoming traffic across the dynamic, autoscaled pool of backend servers.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "as-q16", question: "What is thrashing/flapping in autoscaling?", answer: "When the system rapidly scales out and then scales in repeatedly because thresholds are set too close to each other without adequate cooldowns.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-q17", question: "How do microservices benefit from autoscaling?", answer: "Each service can scale independently based on its specific load and resource needs, rather than scaling the entire application.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "as-q18", question: "How does containerization affect autoscaling?", answer: "Containers start much faster than VMs, allowing autoscaling events to react and provision new capacity in seconds rather than minutes.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-q19", question: "What is connection draining?", answer: "A process where a load balancer stops sending new requests to a terminating instance but allows existing requests to complete before fully shutting it down.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "as-q20", question: "Is autoscaling instantaneous?", answer: "No. Booting VMs or containers takes time. Traffic spikes can overwhelm a system before autoscaling finishes provisioning new instances.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
  ],
  commonFollowUps: [
    "How do you handle rapid traffic spikes if booting a new instance takes 5 minutes?",
    "How do you autoscale a service that processes a background task queue?",
    "How does session management work when instances are constantly being added and removed?",
  ],
  commonMistakes: [
    "Assuming autoscaling is instant. You must account for startup times.",
    "Trying to horizontally scale stateful components without externalizing state.",
    "Setting scale-in policies too aggressively, causing flapping.",
  ],
  interviewTraps: [
    "Defaulting to vertical scaling for modern web apps.",
    "Forgetting to mention load balancers when discussing horizontal scaling.",
  ],
  tradeoffs: [
    "Cost vs. Readiness: Running more instances idle costs money, but ensures you can handle instant spikes without waiting for scale-out.",
    "Horizontal vs. Vertical: Horizontal is highly available but complex; Vertical is simple but has hardware limits and downtime.",
  ],
  comparisonTable: {
    title: "Horizontal vs Vertical Autoscaling",
    columns: ["Attribute", "Horizontal Scaling (Scale Out)", "Vertical Scaling (Scale Up)"],
    rows: [
      { label: "Concept", values: ["Add more machines", "Add more CPU/RAM to one machine"] },
      { label: "Downtime", values: ["Zero downtime", "Usually requires reboot"] },
      { label: "Limits", values: ["Virtually unlimited", "Hardware limits of the host"] },
      { label: "Complexity", values: ["High (needs load balancer, statelessness)", "Low (just change instance type)"] },
      { label: "Best For", values: ["Stateless web servers, Microservices", "Monolithic databases"] },
    ]
  },
  memoryTrick: "Horizontal = Horizon (wide, spreading out with more servers). Vertical = Skyscraper (building taller/bigger on one spot).",
  realWorldExamples: [
    "Netflix scaling out their video streaming edge servers horizontally during prime time evening hours.",
    "Scaling an SQS worker fleet based on the queue length (number of messages waiting to be processed).",
  ],
  mermaidDiagram: `flowchart TD
    Client --> LB[Load Balancer]
    subgraph Auto Scaling Group
        S1[Server 1]
        S2[Server 2]
        S3[Server 3 (New)]
    end
    LB --> S1
    LB --> S2
    LB -.-> S3
    Metrics(CPU > 80%) -.->|Triggers| ASG[Scale Out Event]
  `,
  flashcards: [
    { id: "as-fc1", front: "What is adding more servers called?", back: "Horizontal scaling (scaling out).", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "as-fc2", front: "What is adding CPU/RAM to a server called?", back: "Vertical scaling (scaling up).", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "as-fc3", front: "What prevents a system from rapidly scaling in and out?", back: "Cooldown periods.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-fc4", front: "What component is strictly required for horizontal scaling of web servers?", back: "A Load Balancer.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "as-fc5", front: "How should session state be handled for autoscaled servers?", back: "Externalized to a cache (like Redis) or database.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "Autoscaling Cheat Sheet",
    sections: [
      {
        heading: "Types of Scaling",
        items: [
          "Horizontal: More machines.",
          "Vertical: Bigger machines."
        ]
      },
      {
        heading: "Triggers",
        items: [
          "Reactive: CPU, Memory, Request counts.",
          "Predictive: Machine learning based on history.",
          "Scheduled: Time-based rules."
        ]
      },
      {
        heading: "Key Concepts",
        items: [
          "Cooldown: Delay between scaling actions.",
          "Connection Draining: Graceful shutdown of nodes.",
          "Statelessness: Required for easy horizontal scaling."
        ]
      }
    ]
  },
  speedNotes: [
    "Matches resources to demand dynamically.",
    "Horizontal = more machines.",
    "Vertical = bigger machines.",
    "Requires stateless architecture.",
    "Cooldowns prevent scaling loops."
  ]
};
