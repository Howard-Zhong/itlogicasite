import type { IconName } from "@/components/Icon";

/* ---------------------------------------------------------------- the trap */

/** Three questions prospects arrive with, each with the answer on hover. */
export const pilotTrap = [
  {
    q: "Why doesn't your AI reach production?",
    stat: "95%",
    statLabel: "of enterprise AI pilots never ship",
    a: "Not because the model is weak. Because nothing ever integrated it with the systems the business actually runs on.",
  },
  {
    q: "Why isn't your AI accurate?",
    stat: "#1",
    statLabel: "predictor of AI success is data readiness",
    a: "Ahead of the model, the framework and the infrastructure. Garbage in, garbage out — and most projects start before the data is ready.",
  },
  {
    q: "Why can't you see the ROI?",
    stat: "42%",
    statLabel: "of AI projects show zero measurable return",
    a: "The measurement was never built in. If success isn't defined before the work starts, no result will look like one.",
  },
] as const;

/* ------------------------------------------------------------- why ITLogica */

export const whyItl = [
  {
    icon: "layers" as IconName,
    t: "LogicaAI takes it to production",
    b: "Our own platform handles the integration and the deployment, so the pilot and the production system are the same thing — governed, integrated, owned by your team.",
  },
  {
    icon: "data" as IconName,
    t: "Twenty years of data engineering under it",
    b: "Before a model can run, the data has to be found, cleaned, joined and kept current. That is the work we have done for enterprises since 2002 — so we already know why your data is messy and how to fix it.",
  },
];

export const whyItlProof = [
  { value: "1,500+", label: "sites running on data architecture we built" },
  { value: "30 yrs", label: "of industry history kept query-ready in production" },
  { value: "$10M+", label: "in carbon payments facilitated from fragmented data" },
];

/* ------------------------------------------------------------ LogicaAI flow */

export type FlowLayer = {
  key: string;
  kicker: string;
  title: string;
  note: string;
  items: { name: string; icon: IconName }[];
};

/** Left to right: what you hand over, what we do with it, what you get back. */
export const flowLayers: FlowLayer[] = [
  {
    key: "yours",
    kicker: "You bring",
    title: "What you already have",
    note: "No migration project first.",
    items: [
      { name: "Databases", icon: "data" },
      { name: "Documents", icon: "layers" },
      { name: "Your systems", icon: "apps" },
    ],
  },
  {
    key: "prep",
    kicker: "We prepare",
    title: "Made decision-ready",
    note: "Cleaned, structured, connected.",
    items: [
      { name: "Clean & structure", icon: "managed" },
      { name: "Connect the sources", icon: "handover" },
    ],
  },
  {
    key: "logica",
    kicker: "LogicaAI",
    title: "The platform does the rest",
    note: "One place, end to end.",
    items: [
      { name: "Build agents", icon: "ai" },
      { name: "Knowledge base", icon: "data" },
      { name: "Guardrails", icon: "shield" },
      { name: "Lifecycle monitoring", icon: "eye" },
    ],
  },
  {
    key: "out",
    kicker: "You get",
    title: "In production, not in a demo",
    note: "Governed, integrated, yours to own.",
    items: [
      { name: "Agents", icon: "ai" },
      { name: "Assistants", icon: "staff" },
      { name: "Automated workflows", icon: "compass" },
    ],
  },
  {
    key: "value",
    kicker: "It pays back",
    title: "Measured from day one",
    note: "ROI tracked, not assumed.",
    items: [
      { name: "Value delivered", icon: "target" },
      { name: "ROI monitored", icon: "clock" },
    ],
  },
];

export const flowPromises = [
  "Quick to start",
  "Easy to use",
  "Low-hanging fruit first",
  "Just plug in your data",
];

/* --------------------------------------------------------------- AI cases */

export type AiCaseArt = "report" | "path" | "campaign";

/* Same shape as a case study, so the cards can share one stylesheet with the
   rail further down the page. */
export const aiCases: {
  art: AiCaseArt;
  sector: string;
  title: string;
  blurb: string;
  headline: { value: string; label: string };
}[] = [
  {
    art: "report",
    sector: "Animal health",
    title: "Animal Health Report Agent",
    blurb:
      "Reads lab and health reports and answers customer questions from the enterprise knowledge base.",
    headline: { value: "70%", label: "enquiries proactively filtered" },
  },
  {
    art: "path",
    sector: "Retail",
    title: "Mall Path Planning",
    blurb:
      "Reads foot traffic, visitor profiles and tenant layout, then plans the route worth walking.",
    headline: { value: "+52%", label: "increase in visitor dwell time" },
  },
  {
    art: "campaign",
    sector: "Retail marketing",
    title: "Campaign Planning Platform",
    blurb:
      "Plans the campaign, the offer and the creative across the full promotional cycle, for every tenant.",
    headline: { value: "400+", label: "merchants and brands active" },
  },
];

/* ------------------------------------------------------- the other services */

export const otherServices: { name: string; blurb: string; icon: IconName; href: string }[] = [
  {
    name: "Data & Analytics",
    blurb: "Enterprise data platforms and analytics on Databricks — the AI-ready foundation.",
    icon: "data",
    href: "/capabilities",
  },
  {
    name: "Cloud",
    blurb: "Secure, scalable architecture and migration across Azure, AWS and Google Cloud.",
    icon: "cloud",
    href: "/capabilities",
  },
  {
    name: "IoT",
    blurb: "Wearable sensors and edge devices for real-time monitoring in the field.",
    icon: "iot",
    href: "/capabilities",
  },
  {
    name: "Mobile & Web",
    blurb: "Native iOS and Android apps and modern web applications, portals to internal tools.",
    icon: "apps",
    href: "/capabilities",
  },
];
