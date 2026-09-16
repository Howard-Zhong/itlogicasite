export type Capability = {
  slug: string;
  name: string;
  kicker: string;
  blurb: string;
  stack: string[];
  detail: string[];
  icon: "ai" | "data" | "cloud" | "iot" | "apps";
};

export const capabilities: Capability[] = [
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    kicker: "From raw operational data to automated decisions",
    blurb:
      "Agentic AI, machine learning, computer vision and sound recognition that turn raw operational data into automated decisions.",
    stack: ["Agents", "Machine Learning", "Computer Vision", "Sound Recognition", "LogicaAI", "MCP"],
    detail: [
      "Agent development and orchestration — visually composed, multi-agent, deployed at enterprise scale",
      "Enterprise knowledge base integration so every agent actually understands your business",
      "MCP integration for standardised access to external tools, data sources and applications",
      "GuardRail safety controls on input and output, keeping agent behaviour safe, compliant and auditable",
      "Computer vision on the edge — real-time classification on camera hardware in production environments",
      "Full lifecycle management from development and testing through deployment and operations",
    ],
    icon: "ai",
  },
  {
    slug: "data-analytics",
    name: "Data Analytics",
    kicker: "Data → information → knowledge → decisions",
    blurb:
      "Enterprise-scale data platforms and advanced analytics built on Databricks, from ingestion pipelines to predictive dashboards.",
    stack: ["Databricks", "Power BI", "Python", "Common Data Model", "Azure SQL", "Microservices"],
    detail: [
      "Scalable, adaptable data acquisition, transformation, integration and analysis",
      "Automated ingestion pipelines pulling directly from client accounting and operational systems",
      "Data governance with confidential multi-client isolation for benchmarking programmes",
      "Custom reporting, scorecards and dashboard creation with on-demand exception alerts",
      "Open APIs so third-party platforms can consume your data assets safely",
      "Data mining and analysis of field data to increase market and product understanding",
    ],
    icon: "data",
  },
  {
    slug: "cloud",
    name: "Cloud",
    kicker: "Architecture, migration and Zero-Trust security",
    blurb:
      "Secure, scalable cloud architecture, migration and Zero-Trust security design across Azure, AWS and Google Cloud.",
    stack: ["Microsoft Azure", "AWS", "Google Cloud", "Azure DevOps", "Containers", "Zero Trust"],
    detail: [
      "Cloud architecture consulting, migration assessment and strategy, database migration",
      "Re-architecting legacy applications into cloud-native services; lift-and-shift where it makes sense",
      "Azure App Services & Containers, Azure DevOps, Service Bus, Storage, Power Apps, Dynamics 365",
      "Zero-Trust security layering: API management, modern authN/authZ and network segmentation",
      "Managed cloud services — infrastructure, application management, security monitoring, cost optimisation",
      "DevOps and automation across the application development lifecycle",
    ],
    icon: "cloud",
  },
  {
    slug: "iot",
    name: "IoT",
    kicker: "Sensors, edge devices and connected hardware",
    blurb:
      "Wearable sensors, edge devices and connected hardware for real-time monitoring in agriculture, health and industry.",
    stack: ["Jetson Nano", "Sensors", "Cameras", "Microphones", "Azure IoT Edge", "Embedded"],
    detail: [
      "Convergence of web and wireless applications, analytics, machine learning, sensors and embedded systems",
      "Wearable sensor design for animal and asset monitoring, proven in commercial deployment",
      "Edge inference on constrained hardware, keeping decisions local and latency low",
      "Device fleet management, provisioning and over-the-air update strategy",
      "Distributed computing and distributed application architectures",
      "End-to-end design, build and run — hardware, firmware, models and operations under one team",
    ],
    icon: "iot",
  },
  {
    slug: "mobile-web-development",
    name: "Mobile & Web Development",
    kicker: "Customer portals to internal operations tools",
    blurb:
      "Native iOS and Android apps and modern web applications, from customer portals to internal operations tools.",
    stack: ["iOS", "Android", "Next.js", "React", "TypeScript", ".NET"],
    detail: [
      "Superior UI/UX design expertise applied to complex operational workflows",
      "Cross-device and cross-platform solutions on one shared data foundation",
      "Custom software development where packaged products don't fit the process",
      "Role- and region-based access models for multi-business-line organisations",
      "Continuous improvement through release management and ongoing maintenance",
      "Integration-first builds that sit cleanly beside your existing application estate",
    ],
    icon: "apps",
  },
];
