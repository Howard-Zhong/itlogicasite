export type Industry = {
  slug: string;
  name: string;
  kicker: string;
  blurb: string;
  /** 16:9 art band shown on the detail page. */
  image: string;
  icon: string;
  /** What we are actually asked to build in this sector. */
  focus: string[];
  /** Capability slugs most often drawn on here. */
  capabilities: string[];
  /** Case study slugs from src/data/cases.ts. */
  cases: string[];
  /** Clients from this sector we have worked with. */
  clients?: string[];
};

export const industries: Industry[] = [
  {
    slug: "animal-health",
    image: "/industries/animal-health.webp",
    name: "Animal Health",
    kicker: "Two decades, one industry",
    blurb:
      "Two decades inside the industry — benchmarking, sorting, sustainability and analytics for the largest players in global protein.",
    icon: "data",
    focus: [
      "Industry-scale benchmarking databases built on confidential, multi-party data",
      "Computer vision on the farm floor for sorting, weighing and welfare monitoring",
      "Carbon and sustainability accounting wired into global reporting programmes",
      "Cloud modernisation of legacy analytics estates without interrupting the season",
    ],
    capabilities: ["data-analytics", "artificial-intelligence", "cloud"],
    cases: [
      "benchmark-eks-cattle-system",
      "penpoint-computer-vision-sorting",
      "uplook-carbon-inset-engine",
      "eks-azure-cloud-modernization",
    ],
    clients: ["Elanco", "Zoetis", "Bayer", "Merial", "Ivy Animal Health", "AgriLabs"],
  },
  {
    slug: "agribusiness",
    image: "/industries/agribusiness.webp",
    name: "Agribusiness",
    kicker: "From data to decision",
    blurb:
      "Moving data forward to information, to knowledge, to decision-making, to competitive advantage across the protein supply chain.",
    icon: "layers",
    focus: [
      "Nutrition and performance models that put a prediction in the hands of the field team",
      "Field-force mobile apps that work where the connectivity does not",
      "Feed, herd and production data consolidated out of incompatible farm systems",
      "Analytics that follow the animal through the whole supply chain, not one stage of it",
    ],
    capabilities: ["data-analytics", "mobile-web-development", "artificial-intelligence"],
    cases: ["cargill-pig-flash-model", "lallemand-mobile-apps-analytics"],
    clients: ["Cargill", "Lallemand", "United Animal Health", "Turnkey Computer Systems"],
  },
  {
    slug: "health",
    image: "/industries/health.webp",
    name: "Health & Veterinary",
    kicker: "Evidence you can act on",
    blurb:
      "Reliable and trustworthy solutions for healthcare and veterinary providers handling unprecedented volumes of patient and clinical data.",
    icon: "shield",
    focus: [
      "Wearable and sensor data turned into clinical signal rather than noise",
      "Behaviour and outcome analytics that a practitioner will actually trust",
      "Patient and clinical data handled under security and privacy obligations",
      "Interfaces designed for people who are mid-consultation, not mid-report",
    ],
    capabilities: ["iot", "artificial-intelligence", "data-analytics"],
    cases: ["vetrax-canine-behavior"],
    clients: ["AgLogica", "Hill's Pet Nutrition"],
  },
  {
    slug: "utilities",
    image: "/industries/utilities.webp",
    name: "Utilities",
    kicker: "Mission-critical by definition",
    blurb:
      "Mission-critical CIS platforms: SmartGrid integration, complex billing, mobile field force management and regulatory change.",
    icon: "iot",
    focus: [
      "Customer Information System implementation, upgrade and long-run support",
      "SmartGrid and meter data integration into billing and settlement",
      "Complex rate and regulatory change delivered against immovable dates",
      "Mobile field-force management for crews working outside coverage",
    ],
    capabilities: ["cloud", "data-analytics", "mobile-web-development"],
    cases: [],
    clients: ["NV Energy", "Hansen", "IFS"],
  },
  {
    slug: "retail",
    image: "/industries/retail.webp",
    name: "Retail",
    kicker: "Agentic AI on the floor",
    blurb:
      "Agentic AI applied to footfall, personalisation and campaign planning inside large retail complexes.",
    icon: "ai",
    focus: [
      "Agentic routing and path planning across a live retail complex",
      "Footfall and dwell analytics tied back to tenancy and campaign decisions",
      "Personalisation that respects what the shopper actually came in to do",
      "Customer-facing apps that hold up on a Saturday afternoon",
    ],
    capabilities: ["artificial-intelligence", "mobile-web-development", "cloud"],
    cases: ["intelligent-path-planning-shopping-malls"],
  },
  {
    slug: "cross-industry",
    image: "/industries/cross-industry.webp",
    name: "Cross Industry",
    kicker: "Where the pattern repeats",
    blurb:
      "Cloud, data and application engineering that transfers cleanly wherever complex operational data needs to become decisions.",
    icon: "globe",
    focus: [
      "Legacy platform modernisation onto Azure and modern data stacks",
      "Data platforms that consolidate operational systems nobody wants to replace",
      "Enterprise web and mobile applications built to be maintained for a decade",
      "Forward Deployed Engineers embedded where the business problem actually sits",
    ],
    capabilities: ["cloud", "data-analytics", "mobile-web-development"],
    cases: ["eks-azure-cloud-modernization"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
