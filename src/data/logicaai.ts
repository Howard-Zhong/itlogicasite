export type LogicaArt =
  | "orchestration"
  | "knowledge"
  | "mcp"
  | "guardrail"
  | "lifecycle";

export type LogicaCapability = {
  slug: string;
  name: string;
  kicker: string;
  blurb: string;
  art: LogicaArt;
};

/** The five modules of the LogicaAI platform (ai.itlogica.com). */
export const logicaCapabilities: LogicaCapability[] = [
  {
    slug: "agent-development-orchestration",
    name: "Agent Development & Orchestration",
    kicker: "Build visually",
    blurb:
      "Compose agents on a visual canvas and let several of them collaborate on one job — no framework to learn before the first useful result.",
    art: "orchestration",
  },
  {
    slug: "enterprise-knowledge-base",
    name: "Enterprise Knowledge Base",
    kicker: "Plug in your data",
    blurb:
      "Point LogicaAI at the documents, databases and wikis you already keep. Every agent answers from your business, not from the open internet.",
    art: "knowledge",
  },
  {
    slug: "mcp-integration",
    name: "MCP Integration",
    kicker: "Standard connections",
    blurb:
      "Model Context Protocol gives agents a standardised way to reach external tools, data sources and the applications your teams run on.",
    art: "mcp",
  },
  {
    slug: "guardrail-safety",
    name: "GuardRail Safety",
    kicker: "Compliant by design",
    blurb:
      "Controls on both input and output keep agent behaviour inside your policy, with every decision logged and traceable for audit.",
    art: "guardrail",
  },
  {
    slug: "full-lifecycle-management",
    name: "Full Lifecycle Management",
    kicker: "One platform, end to end",
    blurb:
      "Development, testing, deployment, monitoring and maintenance in one place — so an agent that works in a pilot survives in production.",
    art: "lifecycle",
  },
];

/** The two ways an engagement starts, adapted from ai.itlogica.com. */
export const startPaths = [
  {
    key: "remote",
    label: "Remote Light",
    timing: "A working solution in 2–3 days",
    blurb:
      "Online sessions with the people who actually do the work. We interview across roles, gather the requirements, and come back with a tailored AI solution design.",
    points: [
      "Online workshops, no travel and no disruption",
      "Interviews across every role that touches the process",
      "Requirements captured and prioritised by value",
    ],
    icon: "distributed",
  },
  {
    key: "onsite",
    label: "On-Site Deep Dive",
    timing: "A working solution in one week",
    blurb:
      "An engineer joins you on site, sits inside the daily operation and finds the pain points nobody writes into a brief — then designs against what they saw.",
    points: [
      "An engineer embedded in your operation",
      "Pain points found by observation, not by survey",
      "Solution designed against the real process",
    ],
    icon: "staff",
  },
] as const;

export const startPromise =
  "Either way you finish with more than a slide deck: a verified, high-value MVP starting point you can put in front of the business.";
