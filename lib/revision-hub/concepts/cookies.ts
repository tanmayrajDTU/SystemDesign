import type { ConceptRevisionContent } from "./types";

export const cookies: ConceptRevisionContent = {
  slug: "cookies",
  title: "Cookies",
  topic: "Security",
  difficulty: "Beginner",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Cookies", href: "/docs/security/cookies" },
    { label: "Sessions", href: "/docs/security/sessions" },
    { label: "CSRF", href: "/docs/security/csrf" },
  ],
  summary: [
    "Cookies are small pieces of data stored on the user's web browser by a web server.",
    "They are sent back to the server with every subsequent HTTP request to that domain.",
    "Cookies are primarily used for session management, personalization, and tracking.",
    "Security flags like HttpOnly, Secure, and SameSite dictate how and when cookies are transmitted.",
    "They are subject to size limits (usually 4KB per cookie).",
  ],
  whyAsked: [
    "To ensure you understand how the web maintains state.",
    "To test your knowledge of frontend/backend data exchange.",
    "To evaluate your awareness of web security vulnerabilities (XSS, CSRF) and their mitigations.",
  ],
  thirtySecondAnswer: "Cookies are small key-value pairs sent by a server via the `Set-Cookie` header and stored by the browser. The browser automatically includes these cookies in the `Cookie` header on subsequent requests to the same domain. They are fundamental for maintaining state, such as keeping users logged in (session management). Because they can be targeted by attacks, securing them with flags like `HttpOnly` (prevents JavaScript access) and `Secure` (restricts to HTTPS) is crucial.",
  detailedAnswer: [
    "A server initiates a cookie by sending a `Set-Cookie` HTTP header in its response.",
    "The browser parses this header and stores the cookie locally.",
    "For every subsequent request to the domain that set the cookie, the browser automatically attaches a `Cookie` header.",
    "Cookies can have expiration dates; if not set, they act as 'session cookies' and are deleted when the browser closes.",
    "The `HttpOnly` flag prevents client-side scripts from accessing the cookie, mitigating Cross-Site Scripting (XSS) attacks.",
    "The `Secure` flag ensures the cookie is only sent over encrypted HTTPS connections.",
    "The `SameSite` attribute (Strict, Lax, or None) controls cross-site request behavior to mitigate Cross-Site Request Forgery (CSRF).",
  ],
  questions: [
    { id: "cki-q1", question: "What is an HTTP cookie?", answer: "A small piece of data sent from a server and stored on the user's web browser.", topic: "Security", difficulty: "Beginner" },
    { id: "cki-q2", question: "How does a server set a cookie?", answer: "By sending the `Set-Cookie` header in an HTTP response.", topic: "Security", difficulty: "Beginner" },
    { id: "cki-q3", question: "What is the maximum size of a cookie?", answer: "Typically around 4KB.", topic: "Security", difficulty: "Beginner" },
    { id: "cki-q4", question: "What is the difference between a session cookie and a persistent cookie?", answer: "Session cookies expire when the browser closes; persistent cookies have an explicit expiration date.", topic: "Security", difficulty: "Beginner" },
    { id: "cki-q5", question: "What does the `HttpOnly` flag do?", answer: "It prevents client-side JavaScript from accessing the cookie (e.g., via `document.cookie`).", topic: "Security", difficulty: "Beginner" },
    { id: "cki-q6", question: "Why is `HttpOnly` important?", answer: "It mitigates the risk of token theft via Cross-Site Scripting (XSS) attacks.", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q7", question: "What does the `Secure` flag do?", answer: "It ensures the cookie is only transmitted over encrypted (HTTPS) connections.", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q8", question: "What is the `SameSite` attribute?", answer: "It controls whether a cookie is sent with cross-site requests, providing protection against CSRF attacks.", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q9", question: "What are the values for the `SameSite` attribute?", answer: "Strict (never sent cross-site), Lax (sent on top-level navigations), and None (always sent).", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q10", question: "If `SameSite=None` is used, what other flag is required?", answer: "The `Secure` flag is mandatory for `SameSite=None`.", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q11", question: "What is a third-party cookie?", answer: "A cookie set by a domain other than the one the user is currently visiting (often used for tracking).", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q12", question: "What are first-party cookies?", answer: "Cookies created by the host domain the user is visiting.", topic: "Security", difficulty: "Beginner" },
    { id: "cki-q13", question: "Can cookies be shared across subdomains?", answer: "Yes, if the `Domain` attribute is set to the parent domain (e.g., `Domain=.example.com`).", topic: "Security", difficulty: "Advanced" },
    { id: "cki-q14", question: "What is the `Path` attribute in a cookie?", answer: "It restricts the cookie to a specific URL path on the server.", topic: "Security", difficulty: "Advanced" },
    { id: "cki-q15", question: "Are cookies automatically sent with fetch/XHR requests?", answer: "Yes, for same-origin requests. For cross-origin, `credentials: 'include'` must be set.", topic: "Security", difficulty: "Advanced" },
    { id: "cki-q16", question: "How do you delete a cookie from the server?", answer: "Set the cookie again with the same name but an expiration date in the past.", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q17", question: "Can a user tamper with cookie data?", answer: "Yes, unless the cookie is cryptographically signed or encrypted by the server.", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q18", question: "What is a signed cookie?", answer: "A cookie that includes a cryptographic signature to detect if the client altered its value.", topic: "Security", difficulty: "Advanced" },
    { id: "cki-q19", question: "Why not use `localStorage` instead of cookies for auth tokens?", answer: "`localStorage` is vulnerable to XSS attacks since it cannot be hidden from JavaScript.", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-q20", question: "What happens if you have too many cookies for a domain?", answer: "The browser may evict older cookies, and large headers can degrade performance or cause server errors.", topic: "Security", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "How does a browser decide which cookies to send in a request?",
    "Explain how `SameSite=Lax` differs from `SameSite=Strict` in a practical scenario.",
    "What are the implications of browsers phasing out third-party cookies?",
  ],
  commonMistakes: [
    "Storing sensitive data (like passwords or PII) in plain text cookies.",
    "Forgetting to set `HttpOnly` on session identifiers, leaving them vulnerable to XSS.",
    "Confusing cookies (the storage mechanism) with sessions (the state management concept).",
  ],
  interviewTraps: [
    "Assuming cookies are perfectly secure. They can still be stolen via network sniffing if HTTPS isn't used or strict transport security isn't enforced.",
    "Believing `SameSite` completely eliminates CSRF. It's defense-in-depth, not a silver bullet (older browsers might ignore it).",
  ],
  tradeoffs: [
    "Automatic transmission vs. Vulnerability to CSRF attacks.",
    "Small size (4KB) vs. Easy to use for simple identifiers.",
  ],
  memoryTrick: "Cookies are sticky notes the server slaps on your browser; every time you visit, you show them your sticky notes.",
  realWorldExamples: [
    "An e-commerce site remembers your language preference across visits using a persistent cookie.",
    "An analytics company uses a third-party cookie to track a user's behavior across multiple different websites.",
  ],
  mermaidDiagram: `sequenceDiagram
    participant Browser
    participant Server
    
    Browser->>Server: GET /login
    Server-->>Browser: 200 OK
    
    Browser->>Server: POST /login (username, password)
    Server->>Server: Validate credentials
    Server-->>Browser: 302 Found, Set-Cookie: auth=xyz; HttpOnly; Secure
    
    Note over Browser,Server: Browser saves cookie
    
    Browser->>Server: GET /dashboard (Cookie: auth=xyz)
    Server->>Server: Read auth cookie
    Server-->>Browser: 200 OK (Dashboard Data)`,
  flashcards: [
    { id: "cki-fc1", front: "What does the HttpOnly flag do?", back: "Prevents JavaScript from accessing the cookie.", topic: "Security", difficulty: "Beginner" },
    { id: "cki-fc2", front: "What does the Secure flag do?", back: "Ensures the cookie is only sent over HTTPS.", topic: "Security", difficulty: "Beginner" },
    { id: "cki-fc3", front: "How do you mitigate CSRF with cookies?", back: "Use the SameSite attribute (Lax or Strict).", topic: "Security", difficulty: "Intermediate" },
    { id: "cki-fc4", front: "How are cookies transmitted?", back: "Via the Set-Cookie response header and Cookie request header.", topic: "Security", difficulty: "Beginner" },
    { id: "cki-fc5", front: "What is the size limit of a cookie?", back: "Approximately 4KB.", topic: "Security", difficulty: "Intermediate" },
  ],
  cheatSheet: {
    title: "Cookies Cheat Sheet",
    sections: [
      {
        heading: "Crucial Flags",
        items: [
          "HttpOnly: Blocks document.cookie access (mitigates XSS)",
          "Secure: Requires HTTPS connection",
          "SameSite: Controls cross-origin sending (mitigates CSRF)",
        ],
      },
      {
        heading: "Attributes",
        items: [
          "Domain: Specifies hosts that can receive the cookie",
          "Path: Specifies URL paths that can receive the cookie",
          "Expires / Max-Age: Dictates when the cookie is deleted",
        ],
      },
      {
        heading: "Use Cases",
        items: [
          "Session identifiers",
          "User preferences (theme, language)",
          "Tracking and analytics",
        ],
      },
    ],
  },
  speedNotes: [
    "Stores data in browser",
    "Sent on every request",
    "HttpOnly prevents XSS theft",
    "SameSite prevents CSRF",
    "Size limited to 4KB",
  ],
};
