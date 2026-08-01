import type { ConceptRevisionContent } from "./types";

export const authorization: ConceptRevisionContent = {
  slug: "authorization",
  title: "Authorization",
  topic: "Security",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Authorization", href: "/docs/security/authorization" },
    { label: "Authentication", href: "/docs/security/authentication" },
  ],
  summary: [
    "Authorization is the process of determining if an authenticated user has permission to access a resource.",
    "It answers the question 'What are you allowed to do?'.",
    "Common models include Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).",
    "Often implemented using Access Control Lists (ACLs) or policy engines like OPA.",
    "Crucial for ensuring data privacy and preventing privilege escalation."
  ],
  whyAsked: [
    "To test understanding of access control models and their implementations.",
    "To ensure you can design secure systems that protect sensitive data.",
    "To discuss scalability of permission checks in large distributed systems."
  ],
  thirtySecondAnswer: "Authorization determines the permissions of an authenticated entity, answering 'What can you do?'. It relies on models like RBAC (roles) or ABAC (attributes) to enforce policies. It is enforced at API gateways or service levels, ensuring users can only access resources they are permitted to, thereby protecting system integrity and data privacy.",
  detailedAnswer: [
    "Access Control: Enforcing rules that dictate who can access what.",
    "RBAC (Role-Based Access Control): Assigning permissions based on user roles.",
    "ABAC (Attribute-Based Access Control): Using user, resource, and environment attributes for fine-grained control.",
    "ACLs (Access Control Lists): Lists of permissions attached to specific resources.",
    "Policy Enforcement Point (PEP): Where the authorization decision is enforced.",
    "Policy Decision Point (PDP): Where the authorization policy is evaluated (e.g., OPA)."
  ],
  questions: Array.from({ length: 20 }, (_, i) => ({
    id: `authz-q${i + 1}`,
    question: `What is concept ${i + 1} of Authorization?`,
    answer: `Answer to question ${i + 1} explaining a key Authorization detail.`,
    topic: "Security",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "What is the difference between RBAC and ABAC?",
    "How would you implement authorization in a microservices architecture?",
    "How do you handle granular permissions in a multi-tenant application?"
  ],
  commonMistakes: [
    "Confusing authorization with authentication.",
    "Hardcoding authorization rules in business logic instead of using a centralized policy.",
    "Failing to validate authorization at every layer (e.g., only checking in UI, not in API)."
  ],
  interviewTraps: [
    "Designing a complex ABAC system when a simple RBAC system would suffice for the requirements.",
    "Ignoring the performance impact of checking complex authorization policies on every request."
  ],
  tradeoffs: [
    "RBAC vs. ABAC: RBAC is simpler to manage but less flexible; ABAC is highly flexible but complex to define and evaluate.",
    "Centralized vs. Decentralized AuthZ: Centralized policy management (e.g., OPA) simplifies auditing but can be a bottleneck; decentralized is faster but harder to keep consistent."
  ],
  memoryTrick: "AuthN verifies the ID. AuthZ grants the Zillion permissions.",
  realWorldExamples: [
    "An AWS IAM policy granting read-only access to a specific S3 bucket.",
    "A document management system where a user is an 'Editor' for one document but a 'Viewer' for another."
  ],
  mermaidDiagram: `flowchart LR
    A[User Request] --> B[API Gateway]
    B --> C{PEP}
    C <--> D[PDP / Policy Engine]
    C -->|Allowed| E[Service]
    C -->|Denied| F[403 Forbidden]`,
  flashcards: Array.from({ length: 5 }, (_, i) => ({
    id: `authz-fc${i + 1}`,
    front: `Authorization Concept ${i + 1}`,
    back: `Explanation of authorization concept ${i + 1}.`,
    topic: "Security",
    difficulty: "Intermediate"
  })),
  cheatSheet: {
    title: "Authorization Models",
    sections: [
      {
        heading: "RBAC",
        items: ["Role-Based", "Permissions tied to roles", "Users assigned roles"]
      },
      {
        heading: "ABAC",
        items: ["Attribute-Based", "Uses attributes (user, resource, env)", "Highly granular"]
      },
      {
        heading: "Best Practices",
        items: ["Enforce at API level", "Principle of least privilege", "Decouple policy from code"]
      }
    ]
  },
  speedNotes: [
    "Determines permissions.",
    "Answers 'What can you do?'.",
    "RBAC uses user roles.",
    "ABAC uses attributes.",
    "Enforce at API gateway."
  ]
};
