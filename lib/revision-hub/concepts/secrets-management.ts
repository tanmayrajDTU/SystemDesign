import type { ConceptRevisionContent } from "./types";

export const secretsManagement: ConceptRevisionContent = {
  slug: "secrets-management",
  title: "Secrets Management",
  topic: "Security",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Secrets Management", href: "/docs/security/secrets-management" }
  ],
  summary: [
    "Secrets management is the secure storage, access control, and auditing of sensitive information.",
    "Secrets include API keys, database passwords, TLS certificates, and SSH keys.",
    "It prevents hardcoding secrets in source code or leaving them exposed in plain text configuration files.",
    "Dedicated tools like HashiCorp Vault, AWS Secrets Manager, and Azure Key Vault provide this functionality.",
    "Core features include encryption at rest, fine-grained access control, dynamic secrets, and rotation."
  ],
  whyAsked: [
    "To ensure you know how to build secure, production-ready applications.",
    "To verify you understand that hardcoding credentials is a critical security vulnerability.",
    "To test your knowledge of injecting configuration and secrets securely in modern cloud environments."
  ],
  thirtySecondAnswer: "Secrets management involves securely storing and tightly controlling access to sensitive data like passwords, API keys, and certificates. Instead of hardcoding credentials in source code or environment variables, applications retrieve them at runtime from a centralized, encrypted vault (e.g., AWS Secrets Manager, HashiCorp Vault). These systems provide strict access controls (IAM), audit logging, and automated secret rotation, minimizing the risk of credential leakage.",
  detailedAnswer: [
    "Centralization: All secrets are stored in one secure, heavily guarded location rather than scattered across files.",
    "Encryption: Secrets are encrypted at rest and in transit.",
    "Access Control: Strict identity-based policies dictate which services or users can read which secrets.",
    "Dynamic Secrets: Generating temporary, short-lived credentials on demand (e.g., a DB password valid for 1 hour).",
    "Audit Trails: Comprehensive logging of who accessed what secret and when.",
    "Rotation: Automated periodic changing of passwords or keys to reduce the impact of a compromised secret."
  ],
  questions: [
    { id: "secm-q1", question: "What is a 'secret' in the context of software engineering?", answer: "Sensitive information that must be protected, such as API keys, database passwords, encryption keys, and certificates.", topic: "Security", difficulty: "Beginner" },
    { id: "secm-q2", question: "Why is hardcoding secrets in source code a bad practice?", answer: "Source code is often shared, version-controlled (e.g., Git), and accessible to many people. Hardcoded secrets are easily leaked and hard to revoke.", topic: "Security", difficulty: "Beginner" },
    { id: "secm-q3", question: "What is a Secrets Management System?", answer: "A centralized tool or service designed specifically to securely store, control access to, and audit usage of secrets (e.g., HashiCorp Vault, AWS Secrets Manager).", topic: "Security", difficulty: "Beginner" },
    { id: "secm-q4", question: "How do applications typically retrieve secrets at runtime?", answer: "They authenticate with the secrets manager using an IAM role or token, and retrieve the secret via API call or environment variable injection during startup.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q5", question: "What is secret rotation?", answer: "The practice of periodically changing secrets (like updating a DB password every 30 days) to limit the useful lifespan of a potentially leaked credential.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q6", question: "What are 'Dynamic Secrets'?", answer: "Credentials that are generated on-the-fly when requested and automatically expire or are revoked after a short period.", topic: "Security", difficulty: "Advanced" },
    { id: "secm-q7", question: "Why are dynamic secrets better than static secrets?", answer: "They eliminate the risk of long-lived leaked credentials. If a dynamic secret is stolen, it is likely already expired.", topic: "Security", difficulty: "Advanced" },
    { id: "secm-q8", question: "What is 'Encryption as a Service' in secrets management?", answer: "When the secrets manager provides an API to encrypt/decrypt data, so the application never actually handles or sees the underlying encryption keys.", topic: "Security", difficulty: "Advanced" },
    { id: "secm-q9", question: "Why is environment variable injection sometimes considered less secure than API retrieval?", answer: "Environment variables can be easily dumped by debugging tools, crash logs, or subprocesses, potentially exposing the secrets.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q10", question: "Name two popular cloud-managed secrets managers.", answer: "AWS Secrets Manager and Azure Key Vault (or Google Cloud Secret Manager).", topic: "Security", difficulty: "Beginner" },
    { id: "secm-q11", question: "What is the difference between AWS Parameter Store and AWS Secrets Manager?", answer: "Parameter Store is primarily for config data (supports basic secure strings). Secrets Manager is purpose-built for secrets, offering built-in automatic rotation and cross-account access.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q12", question: "How do you handle secrets in a Kubernetes environment?", answer: "Using Kubernetes native Secrets (base64 encoded, but should be encrypted at rest in etcd), or integrating a CSI provider for external vaults like HashiCorp Vault.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q13", question: "What is a 'break-glass' procedure?", answer: "An emergency protocol to access high-level secrets or admin accounts when normal authentication systems fail.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q14", question: "How does IAM (Identity and Access Management) integrate with secrets management?", answer: "IAM defines which machine identities (roles/service accounts) or human identities are allowed to read specific secrets.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q15", question: "What is the 'Secret Zero' problem?", answer: "The bootstrap problem: how do you securely provide the very first secret (e.g., a token or cert) to an application so it can authenticate to the secrets manager?", topic: "Security", difficulty: "Advanced" },
    { id: "secm-q16", question: "How is the Secret Zero problem typically solved in AWS?", answer: "By assigning an IAM Role directly to the EC2 instance or ECS task, relying on the cloud provider's underlying identity infrastructure rather than passing a static token.", topic: "Security", difficulty: "Advanced" },
    { id: "secm-q17", question: "What role does auditing play in secrets management?", answer: "It provides a tamper-proof log of exactly who or what accessed a secret and when, crucial for compliance and incident response.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q18", question: "Should you commit encrypted secrets to version control?", answer: "It is possible using tools like SOPS (Sealed Secrets), but managing the decryption keys still requires a robust secrets manager.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q19", question: "What happens if a secrets manager goes offline?", answer: "Applications that fetch secrets on startup might fail to boot. Applications already running might survive if they cache secrets, but caching introduces security risks.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-q20", question: "How do you detect leaked secrets?", answer: "By using secret scanning tools (e.g., GitHub Advanced Security, GitGuardian) that monitor repositories for patterns matching keys and passwords.", topic: "Security", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How do you solve the 'Secret Zero' (bootstrapping) problem?",
    "Explain the pros and cons of injecting secrets as environment variables vs direct API calls.",
    "How would you implement automatic secret rotation for a database password?"
  ],
  commonMistakes: [
    "Assuming Base64 encoding (like default Kubernetes secrets) is encryption.",
    "Logging environment variables for debugging and accidentally leaking secrets to CloudWatch/Datadog.",
    "Giving overly broad IAM permissions (e.g., wildcard access to all secrets)."
  ],
  interviewTraps: [
    "Failing to mention how the application authenticates to the secrets vault (IAM roles/Service Accounts).",
    "Designing a system where secrets are manually rotated, which is error-prone and scales poorly."
  ],
  tradeoffs: [
    "Caching Secrets vs Security: Caching secrets in memory improves performance and resilience if the vault goes down, but risks stale credentials and memory leaks.",
    "Dynamic Secrets vs Complexity: Dynamic secrets are highly secure but complex to implement, requiring close integration with databases/services."
  ],
  memoryTrick: "Vault it, limit access (IAM), rotate often, and never hardcode.",
  realWorldExamples: [
    "Uber uses HashiCorp Vault to securely manage and rotate database credentials dynamically.",
    "Netflix uses heavily customized IAM roles and KMS to ensure services only access their specific secrets."
  ],
  mermaidDiagram: "flowchart LR\\n  App -- IAM Authentication --> Vault[Secrets Manager]\\n  Vault -- Validates Identity --> IAM\\n  Vault -- Returns Decrypted Secret --> App\\n  App -- Connects Using Secret --> Database",
  flashcards: [
    { id: "secm-fc1", front: "Secrets Management", back: "Centralized, secure storage for API keys, passwords, and certs.", topic: "Security", difficulty: "Beginner" },
    { id: "secm-fc2", front: "Secret Zero Problem", back: "The challenge of securely giving a service the initial credential needed to authenticate to the secrets manager.", topic: "Security", difficulty: "Advanced" },
    { id: "secm-fc3", front: "Dynamic Secrets", back: "Short-lived, on-demand credentials generated by the secrets manager and automatically revoked.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-fc4", front: "Secret Rotation", back: "The process of periodically changing credentials to limit the impact of a leak.", topic: "Security", difficulty: "Intermediate" },
    { id: "secm-fc5", front: "Base64 Encoding", back: "A data format representation, NOT encryption. Used by default K8s secrets and easily reversed.", topic: "Security", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Secrets Management Best Practices",
    sections: [
      { heading: "Core Rules", items: ["Never hardcode secrets", "Never commit secrets to Git", "Use IAM roles, not static tokens"] },
      { heading: "Key Features", items: ["Encryption at rest", "Granular IAM access", "Audit logging", "Auto-rotation"] },
      { heading: "Tools", items: ["AWS Secrets Manager", "HashiCorp Vault", "Azure Key Vault"] }
    ]
  },
  speedNotes: [
    "Never hardcode credentials.",
    "Centralize in a secure Vault.",
    "Use IAM for access control.",
    "Rotate secrets regularly.",
    "Dynamic secrets expire quickly."
  ]
};
