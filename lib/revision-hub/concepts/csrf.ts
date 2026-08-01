import type { ConceptRevisionContent } from "./types";

export const csrf: ConceptRevisionContent = {
  slug: "csrf",
  title: "CSRF (Cross-Site Request Forgery)",
  topic: "Security",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "CSRF", href: "/docs/security/csrf" },
    { label: "Cookies", href: "/docs/security/cookies" },
    { label: "CORS", href: "/docs/security/cors" },
  ],
  summary: [
    "CSRF is an attack that forces an authenticated user to execute unwanted actions on a web application.",
    "It exploits the browser's behavior of automatically sending ambient credentials (like cookies) with cross-site requests.",
    "An attacker tricks the victim into clicking a link or loading a page that triggers a forged request.",
    "Common mitigations include Anti-CSRF tokens, SameSite cookie attributes, and checking the Referer/Origin headers.",
    "CSRF targets state-changing requests, not data theft (the attacker cannot read the response).",
  ],
  whyAsked: [
    "To test your understanding of web security vulnerabilities.",
    "To see if you understand how browser cookie mechanics can be weaponized.",
    "To evaluate your knowledge of modern security defenses like SameSite cookies and synchronizer tokens.",
  ],
  thirtySecondAnswer: "Cross-Site Request Forgery (CSRF) is a vulnerability where a malicious site tricks a user's browser into making an unintended, state-changing request to a trusted site where the user is already authenticated. Because browsers automatically include cookies (like session IDs) with requests to the target domain, the trusted site believes the user intended the action. Defenses include using anti-CSRF tokens, configuring cookies with the SameSite attribute, and validating Origin or Referer headers.",
  detailedAnswer: [
    "For CSRF to work, a user must be authenticated on the target site with an active session cookie.",
    "The attacker creates a malicious webpage containing a request to the target site (e.g., an invisible form submitting to a 'transfer money' endpoint).",
    "When the victim visits the malicious page, their browser executes the request.",
    "The browser automatically attaches the victim's session cookies to the target domain.",
    "The target server processes the request, believing it is legitimate since it has valid session cookies.",
    "Crucially, the attacker cannot read the response due to the Same Origin Policy, but the state-changing action is already completed.",
    "Mitigation using tokens involves the server generating a unique, unguessable token included in the HTML form, which the attacker cannot predict.",
  ],
  questions: [
    { id: "csrf-q1", question: "What does CSRF stand for?", answer: "Cross-Site Request Forgery.", topic: "Security", difficulty: "Beginner" },
    { id: "csrf-q2", question: "What is the main goal of a CSRF attack?", answer: "To force a user to perform an unwanted state-changing action (like transferring funds or changing a password).", topic: "Security", difficulty: "Beginner" },
    { id: "csrf-q3", question: "Why does CSRF work?", answer: "Because browsers automatically send cookies associated with a domain on cross-site requests.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q4", question: "Can a CSRF attacker read the data returned by the server?", answer: "No, the Same Origin Policy (SOP) prevents the attacker from reading the response.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q5", question: "What is the most common defense against CSRF?", answer: "Synchronizer Token Pattern (Anti-CSRF Tokens).", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q6", question: "How does an Anti-CSRF token work?", answer: "The server provides a random token to the client. The client must include this token in state-changing requests, proving the request originated from the legitimate app.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q7", question: "What cookie attribute helps prevent CSRF?", answer: "The `SameSite` attribute (set to Lax or Strict).", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q8", question: "How does `SameSite=Lax` mitigate CSRF?", answer: "It prevents cookies from being sent on cross-site POST requests, which are typically used for state changes.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q9", question: "What is the Double Submit Cookie pattern?", answer: "A stateless CSRF defense where a random value is sent both in a cookie and as a request parameter; the server verifies they match.", topic: "Security", difficulty: "Advanced" },
    { id: "csrf-q10", question: "Why is checking the `Referer` or `Origin` header useful?", answer: "It allows the server to verify that the request originated from a trusted domain.", topic: "Security", difficulty: "Advanced" },
    { id: "csrf-q11", question: "Does CORS protect against CSRF?", answer: "No, CORS relaxes the Same Origin Policy to allow reading data. It does not stop a browser from sending a CSRF request.", topic: "Security", difficulty: "Advanced" },
    { id: "csrf-q12", question: "Are APIs using JWTs in `Authorization` headers vulnerable to CSRF?", answer: "Generally no, because the browser doesn't automatically attach custom headers like it does with cookies.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q13", question: "If a JWT is stored in an HttpOnly cookie, is it vulnerable to CSRF?", answer: "Yes, because the browser will automatically send the cookie.", topic: "Security", difficulty: "Advanced" },
    { id: "csrf-q14", question: "What types of HTTP requests should not be vulnerable to CSRF?", answer: "Safe methods like GET, HEAD, and OPTIONS, assuming they don't change state.", topic: "Security", difficulty: "Beginner" },
    { id: "csrf-q15", question: "What is a blind CSRF attack?", answer: "Another term for CSRF, highlighting that the attacker fires the request blindly and cannot see the result.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q16", question: "Can XSS be used to bypass CSRF protections?", answer: "Yes, if an attacker executes JS on your site (XSS), they can read CSRF tokens and forge requests.", topic: "Security", difficulty: "Advanced" },
    { id: "csrf-q17", question: "How might an attacker trigger a GET-based CSRF?", answer: "By using an image tag like `<img src='http://bank.com/transfer?amount=1000'>`.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q18", question: "Does logging out prevent CSRF?", answer: "Yes, if the session is destroyed, the ambient credentials are no longer valid.", topic: "Security", difficulty: "Beginner" },
    { id: "csrf-q19", question: "What is the difference between XSS and CSRF?", answer: "XSS injects malicious scripts to run in the victim's browser; CSRF tricks the victim's browser into executing an unwanted request.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-q20", question: "What happens if a CSRF token is predictable?", answer: "The attacker can guess it and forge requests, defeating the protection.", topic: "Security", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "If we implement SameSite=Lax, do we still need CSRF tokens?",
    "Explain the Double Submit Cookie pattern and its potential weaknesses.",
    "How does an API that only accepts JSON payloads provide some inherent CSRF protection?",
  ],
  commonMistakes: [
    "Thinking CORS prevents CSRF. CORS is for reading cross-origin responses; CSRF is about sending cross-origin requests.",
    "Assuming GET requests are immune. If a GET request changes state (bad practice), it is highly vulnerable to CSRF.",
    "Believing that storing tokens in cookies inherently prevents CSRF.",
  ],
  interviewTraps: [
    "Not understanding that CSRF relies on the automatic transmission of cookies.",
    "Failing to mention that attackers cannot read the response of a CSRF request.",
  ],
  tradeoffs: [
    "Anti-CSRF Tokens provide robust security but require server-side state (or careful cryptography).",
    "SameSite cookies are easy to implement but might break legitimate cross-site integrations.",
  ],
  memoryTrick: "CSRF is like a forged signature on a check; the bank (server) sees your valid signature (cookie) and cashes it, not knowing you didn't write it.",
  realWorldExamples: [
    "An attacker sends an email with a hidden form that, when opened, changes the victim's router DNS settings (assuming default admin login).",
    "A forum post contains an invisible image that likes a specific page on a social media site where the user is currently logged in.",
  ],
  mermaidDiagram: `sequenceDiagram
    participant Victim
    participant Attacker Site
    participant Bank Server
    
    Victim->>Bank Server: Log in
    Bank Server-->>Victim: Set-Cookie: session=xyz
    
    Note over Victim,Bank Server: Victim is now authenticated
    
    Victim->>Attacker Site: Visit malicious page
    Attacker Site-->>Victim: HTML with hidden form POSTing to Bank
    
    Victim->>Bank Server: POST /transfer (Browser attaches session=xyz)
    Bank Server->>Bank Server: Validates session, processes transfer
    Bank Server-->>Victim: Transfer complete (Attacker cannot read this)`,
  flashcards: [
    { id: "csrf-fc1", front: "What is CSRF?", back: "An attack forcing a user to execute unwanted actions on a trusted site.", topic: "Security", difficulty: "Beginner" },
    { id: "csrf-fc2", front: "What browser feature enables CSRF?", back: "The automatic inclusion of cookies in cross-site requests.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-fc3", front: "Can an attacker read a CSRF response?", back: "No, the Same Origin Policy (SOP) blocks reading the response.", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-fc4", front: "What is the primary defense against CSRF?", back: "Anti-CSRF Tokens (Synchronizer Token Pattern).", topic: "Security", difficulty: "Intermediate" },
    { id: "csrf-fc5", front: "What cookie attribute mitigates CSRF?", back: "SameSite (Lax or Strict).", topic: "Security", difficulty: "Beginner" },
  ],
  cheatSheet: {
    title: "CSRF Cheat Sheet",
    sections: [
      {
        heading: "The Attack",
        items: [
          "Target: Authenticated users",
          "Mechanism: Forged cross-site request",
          "Goal: State-changing action (not data theft)",
        ],
      },
      {
        heading: "Primary Defenses",
        items: [
          "Anti-CSRF Tokens (hidden fields in forms)",
          "SameSite=Lax or Strict on cookies",
          "Double Submit Cookie pattern",
        ],
      },
      {
        heading: "Secondary Defenses",
        items: [
          "Verify Origin / Referer headers",
          "Require custom headers (e.g., X-Requested-With)",
          "Use stateless tokens (JWT) in Auth headers instead of cookies",
        ],
      },
    ],
  },
  speedNotes: [
    "Cross-Site Request Forgery",
    "Exploits automatic cookie sending",
    "Attacker cannot see response",
    "Mitigate with Anti-CSRF tokens",
    "SameSite cookie flag helps",
  ],
};
