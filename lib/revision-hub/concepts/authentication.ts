import type { ConceptRevisionContent } from "./types";

export const authentication: ConceptRevisionContent = {
  slug: "authentication",
  title: "Authentication",
  topic: "Security",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Authentication", href: "/docs/security/authentication" },
    { label: "Authorization", href: "/docs/security/authorization" },
  ],
  summary: [
    "Authentication is the process of verifying the identity of a user, device, or system.",
    "It answers the question 'Who are you?' before granting access to the system.",
    "Common methods include passwords, biometrics, tokens, and multi-factor authentication (MFA).",
    "Essential for security in distributed systems to prevent unauthorized access.",
    "Often implemented using standards like SAML, OpenID Connect, or simple username/password mechanisms."
  ],
  whyAsked: [
    "To evaluate understanding of foundational security concepts.",
    "To see if you can design secure user login and session management systems.",
    "To check knowledge of modern authentication protocols and best practices."
  ],
  thirtySecondAnswer: "Authentication verifies the identity of an entity, answering 'Who are you?'. It relies on factors like something you know (password), something you have (token), or something you are (biometrics). Secure authentication mechanisms, including MFA and SSO, are critical for protecting systems from unauthorized access while maintaining user convenience.",
  detailedAnswer: [
    "Identity Verification: Ensuring the user is who they claim to be.",
    "Authentication Factors: Knowledge (passwords), Possession (OTP, hardware tokens), Inherence (biometrics).",
    "Multi-Factor Authentication (MFA): Combining two or more factors for enhanced security.",
    "Single Sign-On (SSO): Allowing users to authenticate once to access multiple independent systems.",
    "Federated Identity: Delegating authentication to a trusted external identity provider (IdP).",
    "Session Management: Maintaining authenticated state securely using cookies or tokens after initial login."
  ],
  questions: Array.from({ length: 20 }, (_, i) => ({
    id: `authn-q${i + 1}`,
    question: `What is concept ${i + 1} of Authentication?`,
    answer: `Answer to question ${i + 1} explaining a key Authentication detail.`,
    topic: "Security",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "How do you securely store passwords in a database?",
    "How does MFA improve security, and what are its drawbacks?",
    "How does Single Sign-On (SSO) work across different domains?"
  ],
  commonMistakes: [
    "Storing passwords in plain text instead of using strong hashing algorithms like bcrypt or Argon2.",
    "Confusing authentication (identity) with authorization (permissions).",
    "Failing to implement rate limiting on login endpoints, allowing brute-force attacks."
  ],
  interviewTraps: [
    "Overcomplicating the initial authentication flow without considering user experience.",
    "Forgetting to discuss password resets and account recovery flows."
  ],
  tradeoffs: [
    "Security vs. User Convenience: Stricter authentication (like MFA) increases security but can frustrate users.",
    "Build vs. Buy: Building a custom authentication system gives control but is risky; using an IdP (like Auth0) is easier but costs money and adds a dependency."
  ],
  comparisonTable: {
    title: "Authentication vs Authorization",
    columns: ["Aspect", "Authentication", "Authorization"],
    rows: [
      { label: "Question", values: ["Who are you?", "What can you do?"] },
      { label: "Concept", values: ["Identity Verification", "Access Control"] },
      { label: "Mechanism", values: ["Passwords, Biometrics, Tokens", "Roles, Policies, ACLs"] },
      { label: "Tokens", values: ["ID Tokens (OIDC)", "Access Tokens (OAuth)"] }
    ]
  },
  memoryTrick: "Authentication = IDentification (AuthN). Authorization = Zillions of permissions (AuthZ).",
  realWorldExamples: [
    "Logging into a bank website using a username, password, and an SMS OTP.",
    "Using Google Sign-In to access a third-party application."
  ],
  mermaidDiagram: `flowchart TD
    A[Client] -->|Credentials| B(Auth Service)
    B -->|Verify| C{Valid?}
    C -->|Yes| D[Issue Session/Token]
    C -->|No| E[Reject]`,
  flashcards: Array.from({ length: 5 }, (_, i) => ({
    id: `authn-fc${i + 1}`,
    front: `Authentication Concept ${i + 1}`,
    back: `Explanation of authentication concept ${i + 1}.`,
    topic: "Security",
    difficulty: "Intermediate"
  })),
  cheatSheet: {
    title: "Authentication Fundamentals",
    sections: [
      {
        heading: "Auth Factors",
        items: ["Knowledge (Password)", "Possession (Token)", "Inherence (Biometric)"]
      },
      {
        heading: "Best Practices",
        items: ["Hash passwords with bcrypt/Argon2", "Implement MFA", "Use secure session management"]
      },
      {
        heading: "Common Protocols",
        items: ["SAML", "OpenID Connect", "OAuth 2.0 (for delegated auth)"]
      }
    ]
  },
  speedNotes: [
    "Verifies user identity.",
    "Answers 'Who are you?'.",
    "Use MFA for better security.",
    "Never store plain text passwords.",
    "Distinguish from authorization."
  ]
};
