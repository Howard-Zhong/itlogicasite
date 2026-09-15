export type Service = {
  slug: string;
  name: string;
  kicker: string;
  blurb: string;
  body: string[];
  features: string[];
  icon: "delivery" | "managed" | "distributed" | "staff";
};

export const services: Service[] = [
  {
    slug: "solution-delivery",
    name: "Solution Delivery",
    kicker: "End-to-end, fixed horizon",
    blurb:
      "End-to-end projects delivered inside a defined time frame — from migrations and data conversions to custom application development.",
    body: [
      "“Speed to market” is an often-used phrase that invokes strong reactions when coupled with IT project delivery delays. Almost every IT organisation has faced projects where the ominous possibility of being over budget with missed deadlines looms.",
      "ITLogica's Solution Delivery offering pairs an extensive project management methodology with deep technical expertise to enable successful end-to-end delivery. Every engagement is executed for maximum quality, speed and value, and adheres to proven best practices for consistent outcomes.",
    ],
    features: [
      "Robust 7-phase methodology: Planning, Requirements, Design, Develop, Test, UAT and Deploy checkpoints",
      "Conversions, upgrades, release management and custom application development",
      "Clearly defined milestones, roles and responsibilities, standard documentation and deliverables at every phase",
      "Documentation templates and management tooling that keep quality consistent",
      "All the benefits of ITLogica's Distributed Delivery Model",
    ],
    icon: "delivery",
  },
  {
    slug: "managed-services",
    name: "Managed Services",
    kicker: "Your capability, extended",
    blurb:
      "Long-running outsourced initiatives where our team becomes a scalable, reliable extension of your own capability.",
    body: [
      "As application support and maintenance costs continue to rise due to an array of external and internal factors, IT organisations are seeking ways to manage cost while keeping services reliable and trustworthy.",
      "ITLogica's Managed Services offering is an innovative, cost-effective way to manage total cost of ownership and improve operational excellence across the application portfolio. In a short time frame we assess the outsourcing need, provide a comprehensive proposal and governance roadmap, and stand up a delivery team that becomes a fully scalable extension of your organisation.",
    ],
    features: [
      "Maintain and support both packaged and custom software systems",
      "Right-sized governance and RACI methodology, with clear accountability at every level",
      "Comprehensive account scorecard and dashboard metrics",
      "Key performance indicators and service-level metrics agreed up front",
      "All the benefits of ITLogica's Distributed Delivery Model",
    ],
    icon: "managed",
  },
  {
    slug: "distributed-delivery-model",
    name: "Distributed Delivery Model",
    kicker: "The engine underneath",
    blurb:
      "The outsourcing methodology behind Solution Delivery and Managed Services — the right mix of on-site and off-site, around the clock.",
    body: [
      "The Distributed Delivery Model is ITLogica's underlying outsourcing methodology, used for both our Solution Delivery and Managed Services offerings. It is a cost-effective, reliable and innovative approach built to ensure our clients' success.",
      "The model enables strategic innovation in the form of increased cost savings and speed to market, since many traditional IT services and back-office activities are executed at ITLogica's Delivery Center. A single client-facing Account Manager coordinates every ITLogica resource, giving you one point of contact across a distributed team.",
    ],
    features: [
      "24×7 delivery capability that increases speed of delivery",
      "Fully integrated Quality Management Program anchored by CMMI maturity principles",
      "Well-defined and comprehensive communication plan and approach",
      "Highly skilled consultants with industry-specific expertise",
      "Fully adaptable — projects executed onsite, offsite or offshore",
    ],
    icon: "distributed",
  },
  {
    slug: "staff-augmentation",
    name: "Staff Augmentation",
    kicker: "Right people, right place, right time",
    blurb:
      "One resource or a group, embedded in your team for a specific role — analysts, developers, PMs, infrastructure, QA and testers.",
    body: [
      "At ITLogica we realise that resource needs arise where you simply want a highly skilled individual to augment your existing staff. The ideal use of our Staff Augmentation offering is to engage one resource, or a group, for a specific role or need on your team.",
      "Needs run the gamut — accelerating a product launch, managing and configuring enterprise software, analysing or testing data for quality and efficiency. After gathering role requirements, ITLogica identifies the right people and delivers them to your location, in an accelerated fashion, to meet the need.",
    ],
    features: [
      "Staffing specialists averaging 20 years of successful recruiting experience",
      "Contract, contract-to-hire and direct hire engagements",
      "An extensive network of contacts beyond the standard candidate databases",
      "Assignments of any duration, typically under 18 months",
      "Low overhead keeps client fees low without sacrificing timeliness or quality",
    ],
    icon: "staff",
  },
];
