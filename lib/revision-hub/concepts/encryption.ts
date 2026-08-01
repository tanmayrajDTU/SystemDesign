import type { ConceptRevisionContent } from "./types";

export const encryption: ConceptRevisionContent = {
  slug: "encryption",
  title: "Encryption",
  topic: "Security",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Encryption", href: "/docs/security/encryption" },
    { label: "HTTPS", href: "/docs/security/https" }
  ],
  summary: [
    "Encryption is the process of converting plaintext into ciphertext to prevent unauthorized access.",
    "It ensures data confidentiality both at rest (stored data) and in transit (network communication).",
    "Symmetric encryption uses a single key for both encryption and decryption (fast, good for bulk data).",
    "Asymmetric encryption uses a public/private key pair (slower, good for key exchange and digital signatures).",
    "Modern systems often use a hybrid approach, like TLS/HTTPS."
  ],
  whyAsked: [
    "To evaluate your understanding of securing sensitive data.",
    "To check if you know the difference between data at rest vs in transit.",
    "To see if you understand how TLS/HTTPS establishes a secure connection."
  ],
  thirtySecondAnswer: "Encryption protects data by transforming it into an unreadable format using algorithms and keys. Symmetric encryption uses the same key to encrypt and decrypt, making it fast and suitable for bulk data (e.g., AES). Asymmetric encryption uses a public key to encrypt and a private key to decrypt (e.g., RSA), which is slower but solves the key distribution problem. In practice, protocols like HTTPS use asymmetric encryption to securely exchange a symmetric session key, which is then used for the actual data transfer.",
  detailedAnswer: [
    "Symmetric Encryption: Single shared key (e.g., AES). Extremely fast, but sharing the key securely is difficult.",
    "Asymmetric Encryption: Public and private keys (e.g., RSA, ECC). Public key encrypts, private key decrypts. Solves key distribution but is computationally expensive.",
    "Data in Transit: Protected by TLS/HTTPS. Prevents man-in-the-middle attacks.",
    "Data at Rest: Protected by encrypting disks, databases, or object storage (e.g., AES-256).",
    "Hashing vs Encryption: Encryption is two-way (reversible with a key). Hashing is one-way (used for passwords)."
  ],
  questions: [
    { id: "enc-q1", question: "What is encryption?", answer: "The process of converting readable data (plaintext) into an unreadable format (ciphertext) using an algorithm and a key.", topic: "Security", difficulty: "Beginner" },
    { id: "enc-q2", question: "What is symmetric encryption?", answer: "Encryption where the same key is used for both encrypting and decrypting the data.", topic: "Security", difficulty: "Beginner" },
    { id: "enc-q3", question: "What is the main challenge with symmetric encryption?", answer: "Key distribution. Both parties must securely share the single key without it being intercepted.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-q4", question: "What is asymmetric encryption?", answer: "Encryption that uses two mathematically linked keys: a public key for encryption and a private key for decryption.", topic: "Security", difficulty: "Beginner" },
    { id: "enc-q5", question: "Why don't we use asymmetric encryption for everything?", answer: "It is computationally expensive and much slower than symmetric encryption, making it unsuitable for bulk data transfer.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-q6", question: "Name a common symmetric encryption algorithm.", answer: "AES (Advanced Encryption Standard).", topic: "Security", difficulty: "Beginner" },
    { id: "enc-q7", question: "Name a common asymmetric encryption algorithm.", answer: "RSA (Rivest-Shamir-Adleman) or ECC (Elliptic Curve Cryptography).", topic: "Security", difficulty: "Beginner" },
    { id: "enc-q8", question: "How does HTTPS (TLS) combine both encryption types?", answer: "It uses asymmetric encryption during the initial handshake to securely exchange a symmetric 'session key', then uses the symmetric key for the rest of the communication.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-q9", question: "What is 'Encryption in Transit'?", answer: "Protecting data as it moves across a network (e.g., over the internet) using protocols like TLS.", topic: "Security", difficulty: "Beginner" },
    { id: "enc-q10", question: "What is 'Encryption at Rest'?", answer: "Protecting data while it is stored on physical media like hard drives, databases, or cloud storage.", topic: "Security", difficulty: "Beginner" },
    { id: "enc-q11", question: "What is a Digital Signature?", answer: "A cryptographic mechanism using asymmetric encryption where data is 'signed' with a private key and verified with a public key to ensure authenticity and integrity.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-q12", question: "What is the difference between encryption and hashing?", answer: "Encryption is reversible (two-way) if you have the key. Hashing is irreversible (one-way) and meant for verification (e.g., passwords).", topic: "Security", difficulty: "Beginner" },
    { id: "enc-q13", question: "What is End-to-End Encryption (E2EE)?", answer: "A system where only the communicating users can read the messages. The servers relaying the data cannot decrypt it.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-q14", question: "What is Forward Secrecy (Perfect Forward Secrecy)?", answer: "A feature of some key agreement protocols ensuring that if long-term private keys are compromised, past session keys remain secure.", topic: "Security", difficulty: "Advanced" },
    { id: "enc-q15", question: "What is Key Rotation?", answer: "The practice of periodically changing encryption keys to limit the amount of data protected by a single key.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-q16", question: "What is Envelope Encryption?", answer: "Encrypting plaintext data with a data key, and then encrypting the data key itself with a master key.", topic: "Security", difficulty: "Advanced" },
    { id: "enc-q17", question: "Why use Envelope Encryption?", answer: "It improves performance (data keys are local) and simplifies key management, as only the master key needs to be highly protected by a KMS.", topic: "Security", difficulty: "Advanced" },
    { id: "enc-q18", question: "What is a Certificate Authority (CA)?", answer: "A trusted third party that issues digital certificates, verifying the ownership of a public key by the named subject.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-q19", question: "How do you securely store user passwords?", answer: "Passwords should NEVER be encrypted. They should be hashed using a strong, salted algorithm like bcrypt or Argon2.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-q20", question: "What is a Man-in-the-Middle (MitM) attack and how is it prevented?", answer: "An attack where an adversary intercepts communication. It is prevented by TLS/HTTPS which encrypts the channel and authenticates the server via certificates.", topic: "Security", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How does TLS/HTTPS handshake work step-by-step?",
    "Explain Envelope Encryption and how a Key Management Service (KMS) fits in.",
    "Why shouldn't you encrypt passwords?"
  ],
  commonMistakes: [
    "Confusing encryption with hashing or encoding (like Base64).",
    "Suggesting asymmetric encryption for encrypting large databases (too slow).",
    "Assuming internal network traffic doesn't need encryption in a modern zero-trust architecture."
  ],
  interviewTraps: [
    "Storing encryption keys alongside the encrypted data without proper access controls.",
    "Failing to mention certificate verification in HTTPS."
  ],
  tradeoffs: [
    "Symmetric vs Asymmetric: Symmetric is fast but hard to share keys; Asymmetric solves key sharing but is slow.",
    "Security vs Performance: Encrypting everything adds latency and CPU overhead, but ensures data confidentiality."
  ],
  comparisonTable: {
    title: "Symmetric vs Asymmetric Encryption",
    columns: ["Feature", "Symmetric Encryption", "Asymmetric Encryption"],
    rows: [
      { label: "Keys", values: ["One shared key", "Public and Private key pair"] },
      { label: "Speed", values: ["Very fast", "Slow and computationally heavy"] },
      { label: "Primary Use", values: ["Bulk data encryption (Data at rest/transit)", "Key exchange, Digital Signatures"] },
      { label: "Key Distribution", values: ["Difficult (must share key securely)", "Easy (Public key is open)"] },
      { label: "Example Algorithm", values: ["AES, DES", "RSA, ECC"] }
    ]
  },
  memoryTrick: "Symmetric = Same key (Speedy). Asymmetric = A pair of keys (Secure sharing).",
  realWorldExamples: [
    "WhatsApp uses the Signal protocol for End-to-End asymmetric encryption.",
    "Amazon S3 offers Server-Side Encryption (SSE-S3) using AES-256 for data at rest."
  ],
  mermaidDiagram: "flowchart LR\\n  Client -- Client Hello --> Server\\n  Server -- Server Hello + Certificate --> Client\\n  Client -- Key Exchange (Asymmetric) --> Server\\n  Server -- Secure Data Transfer (Symmetric) --> Client",
  flashcards: [
    { id: "enc-fc1", front: "Symmetric Encryption", back: "Uses the same key for encryption and decryption. Fast. Example: AES.", topic: "Security", difficulty: "Beginner" },
    { id: "enc-fc2", front: "Asymmetric Encryption", back: "Uses a public/private key pair. Solves key distribution. Example: RSA.", topic: "Security", difficulty: "Beginner" },
    { id: "enc-fc3", front: "Envelope Encryption", back: "Encrypting data with a data key, then encrypting the data key with a master key.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-fc4", front: "TLS Handshake", back: "Uses asymmetric encryption to securely negotiate a symmetric session key.", topic: "Security", difficulty: "Intermediate" },
    { id: "enc-fc5", front: "Encryption vs Hashing", back: "Encryption is two-way (reversible). Hashing is one-way (irreversible).", topic: "Security", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Encryption Fundamentals",
    sections: [
      { heading: "Types", items: ["Symmetric: Fast, 1 key, AES", "Asymmetric: Slow, 2 keys, RSA"] },
      { heading: "States of Data", items: ["At Rest: On disk/DB", "In Transit: Over network (TLS)"] },
      { heading: "Key Concepts", items: ["Envelope Encryption", "Key Rotation", "Perfect Forward Secrecy"] }
    ]
  },
  speedNotes: [
    "Symmetric: One key, fast.",
    "Asymmetric: Two keys, slow.",
    "HTTPS combines both.",
    "Use KMS for key management.",
    "Don't encrypt passwords, hash them."
  ]
};
