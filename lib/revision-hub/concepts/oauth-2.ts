import type { ConceptRevisionContent } from "./types";

export const oauth2: ConceptRevisionContent = {
  slug: "oauth-2",
  title: "OAuth 2.0",
  topic: "Security",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "OAuth", href: "/docs/security/oauth" },
    { label: "Authentication", href: "/docs/security/authentication" },
  ],
  summary: [
    "OAuth 2.0 is an authorization framework that enables third-party applications to obtain limited access to an HTTP service.",
    "It works by delegating user authentication to the service that hosts the user account.",
    "Uses access tokens to grant access without sharing user credentials.",
    "Defines multiple grant types (flows) for different types of clients (web, mobile, server).",
    "Often used in conjunction with OpenID Connect (OIDC) for identity verification."
  ],
  whyAsked: [
    "To evaluate understanding of modern delegated authorization standards.",
    "To see if you can design secure API access for third-party integrations.",
    "To test knowledge of token-based security and flow types."
  ],
  thirtySecondAnswer: "OAuth 2.0 is a delegated authorization framework allowing third-party apps access to user resources without exposing credentials. It uses Access Tokens issued by an Authorization Server. It defines several grant types like Authorization Code for web apps and Client Credentials for machine-to-machine, ensuring secure, scoped access.",
  detailedAnswer: [
    "Roles: Resource Owner (user), Client (app), Authorization Server, Resource Server (API).",
    "Access Token: A credential used to access protected resources, often a JWT.",
    "Refresh Token: A token used to obtain a new access token when the current one expires.",
    "Scopes: Used to specify the level of access requested by the client.",
    "Grant Types: Different flows to obtain tokens based on client capabilities.",
    "Authorization Code Flow: The most common and secure flow for server-side applications."
  ],
  questions: Array.from({ length: 20 }, (_, i) => ({
    id: `oa-q${i + 1}`,
    question: `What is concept ${i + 1} of OAuth 2.0?`,
    answer: `Answer to question ${i + 1} explaining a key OAuth 2.0 detail.`,
    topic: "Security",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "Explain the Authorization Code flow step-by-step.",
    "What is PKCE and why is it used with OAuth?",
    "How does OpenID Connect differ from OAuth 2.0?"
  ],
  commonMistakes: [
    "Using OAuth 2.0 for authentication alone (it's for authorization; use OIDC for auth).",
    "Using the Implicit grant type (now considered insecure) instead of Auth Code with PKCE.",
    "Failing to securely store client secrets or tokens."
  ],
  interviewTraps: [
    "Confusing the roles of the Authorization Server and Resource Server.",
    "Forgetting about token expiration and refresh token flows."
  ],
  tradeoffs: [
    "Security vs. UX: Requiring frequent re-authorization is secure but annoys users; long-lived tokens are convenient but risky.",
    "Stateless vs. Stateful Tokens: JWTs (stateless) are easy to verify but hard to revoke; Opaque tokens (stateful) are easy to revoke but require database lookups to verify."
  ],
  comparisonTable: {
    title: "OAuth 2.0 Grant Types",
    columns: ["Grant Type", "Client Type", "Use Case", "Security"],
    rows: [
      { label: "Authorization Code", values: ["Web Server", "Standard user login/auth", "High (uses client secret)"] },
      { label: "Implicit", values: ["SPA", "Legacy browser apps", "Low (tokens in URL, deprecated)"] },
      { label: "Client Credentials", values: ["Server/M2M", "Service-to-service communication", "High (no user involved)"] },
      { label: "Resource Owner Password", values: ["Trusted Apps", "First-party apps (legacy)", "Low (exposes credentials)"] }
    ]
  },
  memoryTrick: "OAuth opens the door for others (delegation) without giving them your keys (credentials).",
  realWorldExamples: [
    "Clicking 'Log in with Google' on a third-party website.",
    "A mobile app requesting access to your Spotify playlists."
  ],
  mermaidDiagram: `sequenceDiagram
    participant User
    participant Client
    participant AuthServer
    participant Resource
    User->>Client: Click Login
    Client->>AuthServer: Redirect to Auth
    AuthServer-->>User: Prompt for Consent
    User->>AuthServer: Grant Consent
    AuthServer-->>Client: Auth Code
    Client->>AuthServer: Exchange Code + Secret
    AuthServer-->>Client: Access Token
    Client->>Resource: API Request + Token
    Resource-->>Client: Data`,
  flashcards: Array.from({ length: 5 }, (_, i) => ({
    id: `oa-fc${i + 1}`,
    front: `OAuth Concept ${i + 1}`,
    back: `Explanation of OAuth concept ${i + 1}.`,
    topic: "Security",
    difficulty: "Advanced"
  })),
  cheatSheet: {
    title: "OAuth 2.0 Roles & Flows",
    sections: [
      {
        heading: "Roles",
        items: ["Resource Owner (User)", "Client (App)", "Authorization Server", "Resource Server"]
      },
      {
        heading: "Tokens",
        items: ["Access Token (Short-lived)", "Refresh Token (Long-lived)", "Scopes (Permissions)"]
      },
      {
        heading: "Best Flows",
        items: ["Auth Code (Web)", "Auth Code + PKCE (Mobile/SPA)", "Client Credentials (M2M)"]
      }
    ]
  },
  speedNotes: [
    "Delegated authorization.",
    "Access tokens, not passwords.",
    "Auth Code flow is best.",
    "Use PKCE for SPAs/Mobile.",
    "OIDC adds authentication layer."
  ]
};
