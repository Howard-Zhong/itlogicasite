import type { IconName } from "@/components/Icon";

/* ---------------------------------------------------------------- the trap */

/*
 * Three reasons AI stalls — answers, not more questions.
 *
 * Each card leads with the answer, explains it, and only then shows the
 * industry figure as evidence with its source. The earlier version put the
 * figure between the question and the answer, and readers took the figure
 * for the answer.
 */
export const pilotTrap = [
  {
    answer: "The integration was never anyone's job",
    body: "A pilot proves a model. Production needs that model wired into the systems the business already runs on, and kept there — work that rarely has an owner.",
    stat: "95%",
    fact: "of enterprise AI pilots never reach production",
    source: "MIT, 2025",
  },
  {
    answer: "The data was not ready before the model was",
    body: "Data readiness predicts success better than the model, the framework or the infrastructure does. Garbage in, garbage out still decides the outcome.",
    stat: "#1",
    fact: "predictor of AI success is data readiness",
    source: "Stanford Digital Economy Lab, 2026",
  },
  {
    answer: "Nobody designed what the return would look like",
    body: "If the measurement is not built before the work starts, no result reads as a win — and the next round of funding quietly goes somewhere else.",
    stat: "42%",
    fact: "of AI projects show no measurable return",
    source: "Enterprise AI survey, 2026",
  },
] as const;

/* ------------------------------------------------------------- why ITLogica */

/* Order matters: the section headline is about the twenty years of
   foundations, so that answer comes first. LogicaAI follows as what we built
   on top of it, and the platform itself gets its own section further down. */
export const whyItl = [
  {
    icon: "data" as IconName,
    t: "Two decades inside data-heavy industries",
    b: "For two decades our engineers have lived inside data-heavy industries — a benchmarking platform spanning the majority of U.S. cattle harvest volume, a re-platformed margin engine for a global commodities trader, a unified on-farm data layer for a multinational animal-nutrition group, and modernized billing and field systems for regional utilities.",
  },
  {
    icon: "layers" as IconName,
    t: "And a platform built on top of it",
    b: "LogicaAI carries the integration, the guardrails and the monitoring, so the pilot and the production system are the same thing — governed, integrated, owned by your team.",
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
