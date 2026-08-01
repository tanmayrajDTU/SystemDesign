import type { ConceptRevisionContent } from "./types";

export const cors: ConceptRevisionContent = {
  slug: "cors",
  title: "CORS (Cross-Origin Resource Sharing)",
  topic: "Security",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "CORS", href: "/docs/security/cors" },
    { label: "CSRF", href: "/docs/security/csrf" },
  ],
  summary: [
    "CORS is an HTTP-header based mechanism that allows a server to indicate any origins other than its own from which a browser should permit loading resources.",
    "It is a relaxation of the Same-Origin Policy (SOP), which strictly restricts cross-origin HTTP requests.",
    "Browsers use CORS to determine if a frontend JavaScript application can read the response from a cross-origin API.",
    "For complex requests, browsers send a 'preflight' OPTIONS request to check if the actual request is safe to send.",
    "CORS is enforced by the browser, not the server; tools like curl are not restricted by CORS.",
  ],
  whyAsked: [
    "CORS errors are one of the most common issues faced by full-stack and frontend developers.",
    "To test your understanding of web security boundaries and the Same-Origin Policy.",
    "To see if you know how to correctly configure an API to safely serve clients on different domains.",
  ],
  thirtySecondAnswer: "By default, browsers enforce the Same-Origin Policy, preventing JavaScript from reading responses from a different domain. CORS (Cross-Origin Resource Sharing) is a standard that allows servers to explicitly bypass this restriction. The server sends headers like `Access-Control-Allow-Origin` to tell the browser it's okay to expose the response to the client. For state-changing requests, the browser first sends an automatic `OPTIONS` request called a 'preflight' to ensure the server permits the actual request.",
  detailedAnswer: [
    "An origin consists of the scheme (protocol), host (domain), and port. A mismatch in any of these makes a request cross-origin.",
    "When a browser makes a cross-origin request (e.g., via fetch or XMLHttpRequest), it includes an `Origin` header.",
    "If the server allows the request, it responds with the `Access-Control-Allow-Origin` header matching the origin (or `*`).",
    "If the browser doesn't see a matching CORS header in the response, it blocks JavaScript from reading the data and throws a CORS error.",
    "Simple requests (GET/POST with standard headers) are sent directly, but the response is blocked if CORS headers are missing.",
    "Preflighted requests (e.g., PUT, DELETE, or requests with custom headers) trigger the browser to first send an HTTP OPTIONS request.",
    "The server must respond to the preflight with allowed methods and headers before the browser sends the actual request.",
  ],
  questions: [
    { id: "cors-q1", question: "What does CORS stand for?", answer: "Cross-Origin Resource Sharing.", topic: "Security", difficulty: "Beginner" },
    { id: "cors-q2", question: "What problem does CORS solve?", answer: "It allows safe relaxation of the Same-Origin Policy so modern web apps can request resources from different domains.", topic: "Security", difficulty: "Beginner" },
    { id: "cors-q3", question: "What defines an 'Origin'?", answer: "The combination of Scheme (e.g., https), Host (domain), and Port.", topic: "Security", difficulty: "Beginner" },
    { id: "cors-q4", question: "Are `http://example.com` and `https://example.com` the same origin?", answer: "No, they have different schemes (http vs https).", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q5", question: "Who enforces CORS?", answer: "The web browser enforces CORS.", topic: "Security", difficulty: "Beginner" },
    { id: "cors-q6", question: "Does CORS block the request from reaching the server?", answer: "Usually not for simple requests; the request reaches the server, but the browser blocks the script from reading the response.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q7", question: "What is a CORS preflight request?", answer: "An HTTP OPTIONS request sent by the browser before the actual request to check if the server permits it.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q8", question: "What triggers a preflight request?", answer: "Using methods other than GET, HEAD, POST, or using custom headers like `Authorization` or `Content-Type: application/json`.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q9", question: "What header does the server use to allow all origins?", answer: "`Access-Control-Allow-Origin: *`", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q10", question: "Can you use `*` with `Access-Control-Allow-Credentials: true`?", answer: "No, the spec forbids using a wildcard when credentials (cookies) are involved. A specific origin must be specified.", topic: "Security", difficulty: "Advanced" },
    { id: "cors-q11", question: "If I make a request using `curl`, will I get a CORS error?", answer: "No, because curl is not a web browser and does not enforce the Same-Origin Policy.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q12", question: "What header does the browser send to indicate its origin?", answer: "The `Origin` header.", topic: "Security", difficulty: "Beginner" },
    { id: "cors-q13", question: "How can you cache a preflight request?", answer: "Using the `Access-Control-Max-Age` header returned by the server.", topic: "Security", difficulty: "Advanced" },
    { id: "cors-q14", question: "What does `Access-Control-Expose-Headers` do?", answer: "It allows the browser to read specific non-standard headers from the server's response.", topic: "Security", difficulty: "Advanced" },
    { id: "cors-q15", question: "Does CORS protect the server?", answer: "No, it protects the client. A malicious script can still send a request to a server, but CORS prevents it from reading the answer.", topic: "Security", difficulty: "Advanced" },
    { id: "cors-q16", question: "Why do mobile apps not have CORS issues?", answer: "Because mobile apps are not web browsers and do not enforce the Same-Origin Policy.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q17", question: "How can a proxy bypass CORS during development?", answer: "A backend proxy makes the request to the target API server-to-server (bypassing CORS) and serves it to the frontend from the same origin.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q18", question: "What is a 'simple request' in CORS?", answer: "A GET, HEAD, or POST request with specific safe headers that doesn't trigger a preflight.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-q19", question: "Does CORS prevent CSRF?", answer: "No. In fact, a simple cross-origin POST request might trigger a state change on the server even if CORS blocks the response.", topic: "Security", difficulty: "Advanced" },
    { id: "cors-q20", question: "What happens if a preflight request fails?", answer: "The browser will not send the actual request and will throw a CORS error in the console.", topic: "Security", difficulty: "Intermediate" },
  ],
  commonFollowUps: [
    "How would you securely configure CORS for an API that needs to be accessed by multiple specific client domains?",
    "Explain why a frontend might see a CORS error even if a backend logs a successful 200 OK for the request.",
    "How do credentials (like cookies) change the way CORS headers must be configured?",
  ],
  commonMistakes: [
    "Thinking CORS is a backend security feature to block malicious requests. It is a browser mechanism to protect clients.",
    "Using `Access-Control-Allow-Origin: *` in production for sensitive APIs.",
    "Confusing CORS with CSRF. CORS is about reading responses; CSRF is about executing unauthorized requests.",
  ],
  interviewTraps: [
    "Believing that a CORS error means the request never reached the server (for simple requests, it does reach the server!).",
    "Trying to 'fix' CORS by just adding headers in the frontend fetch request. CORS must be configured on the server.",
  ],
  tradeoffs: [
    "Strict CORS policies increase security vs. Development friction and complexity.",
    "Preflight requests ensure safety vs. They add network latency (an extra round trip).",
  ],
  memoryTrick: "CORS is the bouncer at the club (browser). You (script) can yell at someone inside (send request), but the bouncer won't let you hear their reply unless they are on the guest list (Allow-Origin).",
  realWorldExamples: [
    "A React frontend hosted on `app.example.com` needs to fetch data from an API at `api.example.com`. CORS headers must allow `app.example.com`.",
    "Loading custom web fonts from a CDN requires the CDN server to return `Access-Control-Allow-Origin: *`.",
  ],
  mermaidDiagram: `sequenceDiagram
    participant Browser
    participant Server
    
    Note over Browser,Server: Preflight Request (e.g. for PUT)
    Browser->>Server: OPTIONS /api/data (Origin: https://app.com)
    Server-->>Browser: 204 No Content (Allow-Origin: https://app.com, Allow-Methods: PUT)
    
    Note over Browser,Server: Actual Request
    Browser->>Server: PUT /api/data
    Server-->>Browser: 200 OK (Data updated)
    Browser->>Browser: JavaScript receives response`,
  flashcards: [
    { id: "cors-fc1", front: "What is CORS?", back: "A mechanism that allows servers to specify which origins can access its resources.", topic: "Security", difficulty: "Beginner" },
    { id: "cors-fc2", front: "What defines an Origin?", back: "Protocol, Domain (Host), and Port.", topic: "Security", difficulty: "Beginner" },
    { id: "cors-fc3", front: "Who enforces the Same-Origin Policy and CORS?", back: "The web browser.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-fc4", front: "What is a Preflight request?", back: "An OPTIONS request sent by the browser to verify if the server accepts the actual request.", topic: "Security", difficulty: "Intermediate" },
    { id: "cors-fc5", front: "Can you use `*` for Origin when sending credentials?", back: "No, a specific origin must be returned if credentials are involved.", topic: "Security", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "CORS Cheat Sheet",
    sections: [
      {
        heading: "Important Headers (Response)",
        items: [
          "Access-Control-Allow-Origin: Who can read this?",
          "Access-Control-Allow-Methods: What HTTP verbs are allowed?",
          "Access-Control-Allow-Credentials: Are cookies permitted?",
        ],
      },
      {
        heading: "Preflight Triggers",
        items: [
          "Methods other than GET, POST, HEAD",
          "Custom headers (e.g., Authorization, X-My-Header)",
          "Content-Type other than text/plain, multipart/form-data, or application/x-www-form-urlencoded",
        ],
      },
      {
        heading: "Debugging Tips",
        items: [
          "Check if API responds correctly to OPTIONS requests",
          "Ensure trailing slashes match exactly in Origins",
          "Use a dev proxy to bypass browser restrictions locally",
        ],
      },
    ],
  },
  speedNotes: [
    "Cross-Origin Resource Sharing",
    "Relaxes Same-Origin Policy",
    "Enforced by the browser",
    "Uses OPTIONS for preflight",
    "Protects client, not server",
  ],
};
