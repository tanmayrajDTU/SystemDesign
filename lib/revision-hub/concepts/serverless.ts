import type { ConceptRevisionContent } from "./types";

export const serverless: ConceptRevisionContent = {
  slug: "serverless",
  title: "Serverless",
  topic: "Cloud & Infrastructure",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Serverless Overview", href: "/docs/cloud/serverless" },
    { label: "Containers", href: "/docs/cloud/containers" },
  ],
  summary: [
    "Serverless is a cloud computing execution model where the cloud provider dynamically manages the allocation and provisioning of servers.",
    "Developers write and deploy code (often as functions) without worrying about underlying infrastructure, OS, or server maintenance.",
    "Pricing is based on actual amount of resources consumed by an application, rather than on pre-purchased units of capacity.",
    "It scales automatically from zero to thousands of concurrent executions.",
    "Commonly implemented as Function-as-a-Service (FaaS) like AWS Lambda, Google Cloud Functions, or Azure Functions.",
  ],
  whyAsked: [
    "To gauge your familiarity with modern cloud architectures and cost optimization.",
    "To test understanding of event-driven programming paradigms.",
    "To see if you know the tradeoffs, such as cold starts vs operational simplicity.",
  ],
  thirtySecondAnswer: "Serverless abstracts away server management, allowing developers to deploy code that runs on-demand in response to events. You don't provision, patch, or maintain servers; the cloud provider handles it all. You only pay for the exact milliseconds your code runs. It enables rapid development and infinite scaling, but introduces challenges like cold starts, vendor lock-in, and debugging complexity in distributed setups.",
  detailedAnswer: [
    "Serverless apps are inherently event-driven, triggered by HTTP requests, database changes, queue messages, or timers.",
    "Code is typically stateless; state must be stored in external databases or storage services.",
    "Cold starts occur when a function is invoked after a period of inactivity, causing latency while the provider spins up a new execution environment.",
    "It heavily encourages microservices architectures, breaking apps down into single-purpose functions.",
    "While 'serverless' implies no servers, servers are still involved; they are just completely abstracted from the user.",
  ],
  questions: [
    { id: "sls-q1", question: "What does 'serverless' mean?", answer: "A model where the cloud provider manages server infrastructure, and users only write code and pay for execution time.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "sls-q2", question: "What is FaaS?", answer: "Function-as-a-Service, the primary implementation of serverless computing (e.g., AWS Lambda).", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "sls-q3", question: "What is a 'cold start'?", answer: "The delay experienced when a serverless function is invoked for the first time or after a period of inactivity, as the provider must allocate resources and initialize the runtime.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-q4", question: "How does billing work in Serverless?", answer: "You are billed for the exact number of requests and the duration of compute time (in milliseconds) consumed, rather than paying for idle servers.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "sls-q5", question: "How do serverless functions handle state?", answer: "They are stateless. Any required state must be retrieved from and saved to external storage like a database or object store.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-q6", question: "Name a common use case for serverless functions.", answer: "Processing file uploads (e.g., resizing images when they hit S3), handling webhooks, or running scheduled cron jobs.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "sls-q7", question: "What triggers a serverless function?", answer: "Events. These can be HTTP API gateways, message queues, database triggers, file storage uploads, or scheduled timers.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "sls-q8", question: "What are the limitations of serverless functions?", answer: "Execution time limits (e.g., 15 mins for AWS Lambda), cold starts, debugging difficulty, and vendor lock-in.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-q9", question: "How do you mitigate cold starts?", answer: "Using provisioned concurrency (keeping some instances warm), optimizing deployment package size, or choosing faster runtimes (like Go or Node.js over Java).", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "sls-q10", question: "Is serverless always cheaper than VMs or containers?", answer: "No. For consistent, high-volume workloads, dedicated servers or containers are often cheaper. Serverless is cheapest for bursty or low-traffic workloads.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-q11", question: "What is vendor lock-in in the context of serverless?", answer: "Relying heavily on specific cloud provider triggers, APIs, and services (like DynamoDB and API Gateway) makes it hard to migrate to another cloud.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "sls-q12", question: "How does serverless scaling differ from VM autoscaling?", answer: "Serverless scales instantly per request, from zero to thousands of concurrent executions. VM autoscaling takes minutes and scales in coarse blocks.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-q13", question: "What are serverless databases?", answer: "Databases that automatically scale capacity up and down based on demand and charge per operation, like Amazon DynamoDB or Aurora Serverless.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "sls-q14", question: "Why is local debugging hard in serverless?", answer: "Replicating the exact cloud execution environment, IAM permissions, and event triggers locally is complex.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-q15", question: "What is an API Gateway's role in serverless?", answer: "It acts as the front door, receiving HTTP requests, providing routing, auth, and rate limiting, and mapping requests to the appropriate serverless function.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-q16", question: "Can a serverless function run a web socket server?", answer: "Traditionally no, because functions are short-lived. However, API Gateway can manage the persistent websocket connection and trigger functions on specific events.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "sls-q17", question: "How do microservices map to serverless?", answer: "Each endpoint or business capability can be its own independent function, taking the microservices concept to a nano-service extreme.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-q18", question: "What happens if a serverless function fails?", answer: "Depending on the trigger, the cloud provider can automatically retry the execution or send the failed event to a Dead Letter Queue (DLQ).", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "sls-q19", question: "What languages can you run on serverless?", answer: "Most providers support Node.js, Python, Go, Java, C#. Many also support custom runtimes via Docker containers.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "sls-q20", question: "What is the 'scale to zero' capability?", answer: "When there is no traffic, the provider tears down all instances of the function, costing you exactly $0.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
  ],
  commonFollowUps: [
    "How would you design a high-throughput, low-latency system using Serverless?",
    "How do you handle distributed tracing across dozens of serverless functions?",
    "At what scale does it make financial sense to move from Serverless to Containers?",
  ],
  commonMistakes: [
    "Using serverless for long-running, continuous compute tasks (e.g., video rendering taking hours).",
    "Ignoring the impact of cold starts on user-facing synchronous APIs.",
    "Creating monolithic serverless functions that do too many things.",
  ],
  interviewTraps: [
    "Saying 'there are no servers'. Servers exist; they are just managed by someone else.",
    "Assuming serverless is infinitely scalable without limits (providers have account concurrency limits).",
  ],
  tradeoffs: [
    "Operational Simplicity vs. Vendor Lock-in: Easy to build and deploy, but hard to move away from AWS/GCP/Azure.",
    "Pay-for-Use vs. Predictable Costs: Cheap for sporadic workloads, but costs can skyrocket unexpectedly under heavy, sustained load.",
  ],
  memoryTrick: "Serverless is like a taxi: you don't own the car, you only pay while riding, and the driver (cloud provider) handles the maintenance.",
  realWorldExamples: [
    "A thumbnail generator that triggers automatically when an image is uploaded to an S3 bucket.",
    "A backend for a smart home device where traffic is highly unpredictable and mostly idle during the day.",
  ],
  mermaidDiagram: `flowchart LR
    User --> API[API Gateway]
    API --> F1[Function 1 (Login)]
    API --> F2[Function 2 (Get Data)]
    F1 --> DB[(Database)]
    F2 --> DB
    S3[S3 Upload] --> F3[Function 3 (Resize Image)]
  `,
  flashcards: [
    { id: "sls-fc1", front: "What does FaaS stand for?", back: "Function-as-a-Service", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "sls-fc2", front: "What causes a cold start in serverless?", back: "Invoking a function that has been idle, requiring the provider to spin up a new container.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-fc3", front: "How is serverless billed?", back: "Per request and compute duration (milliseconds).", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "sls-fc4", front: "Can serverless functions store local state?", back: "No, they are ephemeral. State must go to an external DB or cache.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "sls-fc5", front: "What is a major risk of adopting serverless architectures?", back: "Vendor lock-in.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "Serverless Cheat Sheet",
    sections: [
      {
        heading: "Core Characteristics",
        items: [
          "No infrastructure management.",
          "Pay-per-use billing.",
          "Auto-scales to zero.",
          "Event-driven execution."
        ]
      },
      {
        heading: "Common Triggers",
        items: [
          "HTTP APIs (API Gateway).",
          "File uploads (S3).",
          "Message Queues (SQS/SNS).",
          "Database Streams (DynamoDB Streams)."
        ]
      },
      {
        heading: "Drawbacks",
        items: [
          "Cold starts add latency.",
          "Time limits on execution.",
          "Difficult local debugging.",
          "Vendor lock-in."
        ]
      }
    ]
  },
  speedNotes: [
    "No server management required.",
    "Pay only for execution time.",
    "Event-driven architecture.",
    "Beware of cold starts.",
    "Functions are stateless."
  ]
};
