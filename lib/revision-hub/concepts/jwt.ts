import type { ConceptRevisionContent } from "./types";

export const jwt: ConceptRevisionContent = {
  slug: "jwt",
  title: "JSON Web Token (JWT)",
  topic: "Security",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "JWT", href: "/docs/security/jwt" },
    { label: "Authentication", href: "/docs/security/authentication" },
  ],
  summary: [
    "JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.",
    "It consists of three parts: Header, Payload, and Signature, separated by dots.",
    "The signature ensures the token hasn't been altered, providing integrity and authenticity.",
    "Often used for stateless authentication in modern web applications and APIs.",
    "Payload data is Base64Url encoded, NOT encrypted, meaning it is readable by anyone."
  ],
  whyAsked: [
    "To test knowledge of stateless session management.",
    "To evaluate understanding of token signatures, signing algorithms, and security implications.",
    "To discuss tradeoffs between stateful (sessions) and stateless (JWT) authentication."
  ],
  thirtySecondAnswer: "JWT is a standard for creating tokens that assert claims. A JWT has three parts: header, payload, and signature. Because it's signed, the server can verify its integrity statelessly without a database lookup. However, it cannot be easily invalidated before expiration, and its payload is not encrypted, so sensitive data should not be stored in it.",
  detailedAnswer: [
    "Structure: Header (algorithm), Payload (claims/data), Signature (verification).",
    "Statelessness: Servers verify tokens cryptographically without database queries, improving scalability.",
    "Signing Algorithms: HMAC (symmetric, shared secret) or RSA/ECDSA (asymmetric, public/private key).",
    "Claims: Standard claims (iss, exp, sub) and custom claims.",
    "Revocation: Difficult because JWTs are stateless; usually handled via short lifetimes, blocklists, or token rotation.",
    "Storage: Typically stored in memory, HttpOnly cookies, or local storage (less secure)."
  ],
  questions: Array.from({ length: 20 }, (_, i) => ({
    id: `jwt-q${i + 1}`,
    question: `What is concept ${i + 1} of JWT?`,
    answer: `Answer to question ${i + 1} explaining a key JWT detail.`,
    topic: "Security",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "How do you invalidate a JWT before its expiration time?",
    "What are the security risks of storing a JWT in local storage vs. an HttpOnly cookie?",
    "When would you use asymmetric signing (RS256) over symmetric (HS256)?"
  ],
  commonMistakes: [
    "Storing sensitive data (like passwords or PII) in the JWT payload.",
    "Trusting tokens without verifying the signature or expiration (exp) claim.",
    "Accepting the 'none' algorithm in the header, allowing attackers to forge tokens."
  ],
  interviewTraps: [
    "Assuming JWTs are always better than session cookies (JWTs have size limits and revocation issues).",
    "Forgetting that JWTs are Base64 encoded, not encrypted."
  ],
  tradeoffs: [
    "Stateless vs. Revocable: JWTs avoid DB lookups but are hard to revoke instantly; Session cookies require DB lookups but are easily revoked.",
    "Size: JWTs can become large if they contain many claims, adding overhead to every HTTP request."
  ],
  comparisonTable: {
    title: "JWT vs Session Tokens",
    columns: ["Feature", "JWT", "Session Token (Opaque)"],
    rows: [
      { label: "Storage", values: ["Client-side (contains data)", "Server-side (reference ID)"] },
      { label: "Validation", values: ["Cryptographic signature", "Database/Cache lookup"] },
      { label: "Revocation", values: ["Difficult (wait for expiry/blocklist)", "Easy (delete from DB)"] },
      { label: "Scalability", values: ["High (Stateless)", "Medium (Requires DB/Cache scaling)"] }
    ]
  },
  memoryTrick: "JWT = Just Without Trusting (always verify the signature). Header.Payload.Signature.",
  realWorldExamples: [
    "An Access Token in an OAuth 2.0 flow.",
    "A token sent in the Authorization header (Bearer scheme) for an API."
  ],
  mermaidDiagram: `flowchart LR
    A[Client] -->|Login| B[Server]
    B -->|Generate JWT| C[Sign with Secret]
    C -->|Return JWT| A
    A -->|Request + JWT| B
    B -->|Verify Signature| D{Valid?}
    D -->|Yes| E[Allow Access]
    D -->|No| F[Deny 401]`,
  flashcards: Array.from({ length: 5 }, (_, i) => ({
    id: `jwt-fc${i + 1}`,
    front: `JWT Concept ${i + 1}`,
    back: `Explanation of JWT concept ${i + 1}.`,
    topic: "Security",
    difficulty: "Intermediate"
  })),
  cheatSheet: {
    title: "JWT Structure",
    sections: [
      {
        heading: "Parts (separated by .)",
        items: ["Header (alg, typ)", "Payload (claims)", "Signature"]
      },
      {
        heading: "Security Musts",
        items: ["Verify signature", "Check exp claim", "Don't store sensitive data"]
      },
      {
        heading: "Algorithms",
        items: ["HS256 (Symmetric/Shared Secret)", "RS256 (Asymmetric/Public-Private)"]
      }
    ]
  },
  speedNotes: [
    "Stateless token.",
    "Header, Payload, Signature.",
    "Payload is NOT encrypted.",
    "Hard to revoke instantly.",
    "Great for scalable APIs."
  ]
};
