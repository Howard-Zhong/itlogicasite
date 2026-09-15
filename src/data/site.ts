export const site = {
  name: "ITLogica",
  legalName: "ITLogica, Inc.",
  tagline: "20+ Years Experience, Always on Time, Always on Budget",
  description:
    "ITLogica is an information technology services firm delivering enterprise solutions across animal health, agribusiness, utilities and cross-industry — from Atlanta and Nanjing, since 2002.",
  url: "https://itlogica.com",
  aiSiteUrl: "https://ai.itlogica.com",
  founded: 2002,
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Case Studies", href: "/cases" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type OfficeKey = "atlanta" | "nanjing";

export const offices: Record<
  OfficeKey,
  {
    key: OfficeKey;
    label: string;
    city: string;
    region: string;
    country: string;
    role: string;
    address: string[];
    phone?: string;
    fax?: string;
    email: string;
    timezone: string;
    /** Percentage position on the world map SVG viewBox (0–100). */
    map: { x: number; y: number };
  }
> = {
  atlanta: {
    key: "atlanta",
    label: "Atlanta, USA",
    city: "Atlanta",
    region: "Georgia",
    country: "United States",
    role: "Global Headquarters",
    address: ["ITLogica", "5555 Triangle Parkway, Suite 130", "Peachtree Corners, GA 30092"],
    phone: "+1.678.570.5598",
    fax: "+1.678.317.2538",
    email: "yhanam@itlogica.com",
    timezone: "EST · UTC−5",
    map: { x: 25.6, y: 40.5 },
  },
  nanjing: {
    key: "nanjing",
    label: "Nanjing, China",
    city: "Nanjing",
    region: "Jiangsu",
    country: "China",
    role: "R&D and Solution Delivery Center",
    address: ["ITLogica Delivery Center", "Nanjing, Jiangsu", "China"],
    email: "jay.fang@itlogica.com",
    timezone: "CST · UTC+8",
    map: { x: 78.5, y: 41.5 },
  },
};

export const officeList = [offices.atlanta, offices.nanjing];

export const generalEmails = [
  { label: "General enquiries", email: "info@itlogica.com" },
  { label: "Sales", email: "sales@itlogica.com" },
  { label: "Careers", email: "HR@itlogica.com" },
];

export const keyMetrics = [
  { value: "20+", label: "Years Experience", detail: "Continuous enterprise delivery since 2002" },
  {
    value: "Fortune 500",
    label: "Tier 1 Solution Provider",
    detail: "Trusted with mission-critical programmes",
  },
  { value: "2002", label: "Founded", detail: "Atlanta, Georgia — privately held" },
];
