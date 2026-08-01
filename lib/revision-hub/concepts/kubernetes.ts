import type { ConceptRevisionContent } from "./types";

export const kubernetes: ConceptRevisionContent = {
  slug: "kubernetes",
  title: "Kubernetes",
  topic: "Cloud & Infrastructure",
  difficulty: "Advanced",
  estimatedMinutes: 25,
  docLinks: [
    { label: "Kubernetes", href: "/docs/cloud/kubernetes" },
    { label: "Containers Overview", href: "/docs/cloud/containers" },
  ],
  summary: [
    "Kubernetes (K8s) is an open-source container orchestration system for automating deployment, scaling, and management of containerized applications.",
    "It abstracts underlying infrastructure, providing an API to manage clusters of compute nodes.",
    "K8s operates on a declarative model: you define the desired state, and K8s continuously works to maintain it.",
    "It provides core features like service discovery, load balancing, self-healing, and secret management.",
    "Originally designed by Google, it is now maintained by the Cloud Native Computing Foundation (CNCF).",
  ],
  whyAsked: [
    "To evaluate your understanding of production-grade container deployment.",
    "To see if you can design scalable, self-healing systems.",
    "To test your knowledge of microservices orchestration and modern cloud infrastructure.",
  ],
  thirtySecondAnswer: "Kubernetes is an orchestration platform that manages clusters of containerized applications. You give it a declarative manifest describing how many replicas of an app you want running, what resources they need, and how they communicate. Kubernetes then handles scheduling those containers onto nodes, restarting them if they crash, scaling them under load, and routing traffic to them.",
  detailedAnswer: [
    "The Control Plane (master node) manages the cluster, including the API Server, etcd (state store), Scheduler, and Controller Manager.",
    "Worker Nodes run the application workloads. They contain a Kubelet (node agent), Kube-proxy (network proxy), and a Container Runtime.",
    "Pods are the smallest deployable units in K8s, containing one or more containers that share network and storage.",
    "Deployments manage stateless apps, ensuring a specified number of Pod replicas are always running.",
    "Services provide stable network identities and load balancing across dynamic Pod IPs.",
  ],
  questions: [
    { id: "k8s-q1", question: "What is Kubernetes?", answer: "An open-source container orchestration platform for automating deployment, scaling, and operations of application containers.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "k8s-q2", question: "What is a Pod?", answer: "The smallest deployable unit in K8s. A Pod encapsulates one or more containers, storage resources, a unique network IP, and options that govern how the containers should run.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "k8s-q3", question: "What is the role of the Kubelet?", answer: "An agent that runs on each node. It makes sure that containers are running in a Pod by communicating with the API server.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q4", question: "What does the Kube-proxy do?", answer: "A network proxy running on each node that maintains network rules and allows network communication to Pods from inside or outside the cluster.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q5", question: "What is etcd in Kubernetes?", answer: "A highly available key-value store used as Kubernetes' backing store for all cluster data and state.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q6", question: "Explain a Deployment in K8s.", answer: "A resource that provides declarative updates for Pods and ReplicaSets. It allows rolling updates, scaling, and rollbacks.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "k8s-q7", question: "What is a Kubernetes Service?", answer: "An abstraction which defines a logical set of Pods and a policy by which to access them. It provides a stable IP and DNS name.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "k8s-q8", question: "What is a StatefulSet?", answer: "A workload API object used to manage stateful applications. It provides guarantees about the ordering and uniqueness of a set of Pods.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "k8s-q9", question: "What is a DaemonSet?", answer: "Ensures that all (or some) Nodes run a copy of a Pod. Useful for logging or monitoring agents on every node.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q10", question: "How does Kubernetes handle self-healing?", answer: "If a container fails, Kubernetes restarts it. If a node fails, it reschedules the Pods on other nodes based on ReplicaSet definitions.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q11", question: "What is an Ingress in K8s?", answer: "An API object that manages external access to the services in a cluster, typically HTTP/HTTPS. It provides load balancing, SSL termination, and name-based virtual hosting.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q12", question: "What is a ConfigMap?", answer: "An API object used to store non-confidential data in key-value pairs, which can be consumed as environment variables, command-line arguments, or configuration files in a volume.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "k8s-q13", question: "How are Secrets different from ConfigMaps?", answer: "Secrets are similar to ConfigMaps but are specifically intended to hold confidential data like passwords or keys, stored in base64 encoding (and ideally encrypted at rest).", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q14", question: "What is the role of the Scheduler?", answer: "A control plane component that watches for newly created Pods with no assigned node, and selects a node for them to run on based on resource requirements and constraints.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q15", question: "What are Liveness and Readiness probes?", answer: "Liveness probes determine if a container is running (if not, it's restarted). Readiness probes determine if a container is ready to accept traffic (if not, it's removed from Service endpoints).", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "k8s-q16", question: "What is a Helm chart?", answer: "A package format for Kubernetes used by Helm (a package manager) to template, deploy, and version complex K8s applications.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "k8s-q17", question: "Explain Horizontal Pod Autoscaler (HPA).", answer: "Automatically scales the number of Pods in a replication controller, deployment, or replica set based on observed CPU utilization or other custom metrics.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "k8s-q18", question: "What are Namespaces in K8s?", answer: "A mechanism to partition resources created in a cluster into logically separated virtual clusters. Useful for multi-tenant environments.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-q19", question: "What is a PersistentVolume (PV) and PersistentVolumeClaim (PVC)?", answer: "PV is a piece of storage in the cluster. PVC is a request for storage by a user. Pods use PVCs to mount PVs.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "k8s-q20", question: "What is a Controller in Kubernetes?", answer: "A control loop that watches the shared state of the cluster through the API server and makes changes attempting to move the current state towards the desired state.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "How would you securely expose a Kubernetes service to the public internet?",
    "How does Kubernetes handle stateful applications like databases compared to stateless ones?",
    "Explain the difference between a ClusterIP, NodePort, and LoadBalancer service.",
  ],
  commonMistakes: [
    "Confusing a Pod with a Container. (A Pod can contain multiple containers).",
    "Running stateful databases in K8s without understanding StatefulSets and persistent storage nuances.",
    "Failing to set resource requests and limits, leading to noisy neighbor problems or node starvation.",
  ],
  interviewTraps: [
    "Assuming Kubernetes solves all problems. It introduces significant operational complexity.",
    "Not understanding that Pod IPs are ephemeral and one should always route traffic via Services.",
  ],
  tradeoffs: [
    "Automation & Scalability vs. Complexity: K8s automates massively complex infrastructure but has a very steep learning curve.",
    "Portability vs. Cloud-Native Lock-in: K8s itself is portable, but relying on managed cloud services (EKS, GKE, AKS) integrations can tie you to a provider.",
  ],
  memoryTrick: "Think of K8s as an orchestra conductor. The containers are instruments. You tell the conductor what sheet music (manifest) to play, and they make sure everyone plays perfectly together.",
  realWorldExamples: [
    "Spotify managing thousands of microservices across multiple clusters for global scale.",
    "Pokemon Go using GKE (Google Kubernetes Engine) to handle massive, unpredictable traffic spikes during launch.",
  ],
  mermaidDiagram: `flowchart LR
    subgraph Control Plane
        API[API Server]
        Etcd[etcd]
        Sched[Scheduler]
        Ctrl[Controller Manager]
        API --- Etcd
        API --- Sched
        API --- Ctrl
    end
    subgraph Node 1
        Kubelet1[Kubelet]
        Pod1[Pod]
        Pod2[Pod]
    end
    subgraph Node 2
        Kubelet2[Kubelet]
        Pod3[Pod]
    end
    API -.-> Kubelet1
    API -.-> Kubelet2
  `,
  flashcards: [
    { id: "k8s-fc1", front: "Smallest unit of deployment in Kubernetes?", back: "Pod", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "k8s-fc2", front: "Database used by Kubernetes to store cluster state?", back: "etcd", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-fc3", front: "Which agent runs on every node to manage containers?", back: "Kubelet", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "k8s-fc4", front: "Which resource provides a stable IP for ephemeral Pods?", back: "Service", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "k8s-fc5", front: "Which probe determines if a container should receive traffic?", back: "Readiness Probe", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "Kubernetes Cheat Sheet",
    sections: [
      {
        heading: "Workloads",
        items: [
          "Pod: Smallest deployable unit.",
          "Deployment: Manages stateless Pod replicas.",
          "StatefulSet: Manages stateful Pods (stable IDs).",
          "DaemonSet: One Pod per Node."
        ]
      },
      {
        heading: "Networking",
        items: [
          "ClusterIP: Internal service IP.",
          "NodePort: Exposes service on a static port on each Node.",
          "LoadBalancer: Provisions external cloud load balancer.",
          "Ingress: HTTP/HTTPS routing to services."
        ]
      },
      {
        heading: "Configuration",
        items: [
          "ConfigMap: Key-value store for plain text configs.",
          "Secret: Key-value store for sensitive data.",
          "Volumes: Directory containing data accessible to containers."
        ]
      }
    ]
  },
  speedNotes: [
    "K8s orchestrates containers.",
    "Declarative desired state model.",
    "Control plane manages worker nodes.",
    "Pods are ephemeral; Services are stable.",
    "etcd stores all cluster state."
  ]
};
