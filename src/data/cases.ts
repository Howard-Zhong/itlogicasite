export type CaseStat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  /** Short line used on cards. */
  summary: string;
  sector: string;
  tags: string[];
  year: string;
  /** Headline figure shown on the card. */
  headline: CaseStat;
  challenge: string;
  solution: string[];
  solutionIntro?: string;
  result: string[];
  resultStats?: CaseStat[];
  takeaway: string;
  /** Art direction seed for the generated cover visual. */
  art: "path" | "grid" | "vision" | "carbon" | "market" | "mobile" | "sensor" | "cloud";
};

export const cases: CaseStudy[] = [
  {
    slug: "intelligent-path-planning-shopping-malls",
    client: "Retail Complex Operator",
    title: "Intelligent Path Planning for Shopping Malls",
    summary:
      "Data-driven personalised routing that reshapes footfall and tenant productivity across a retail complex.",
    sector: "Retail",
    tags: ["Agentic AI", "LogicaAI", "Personalisation", "Simulation"],
    year: "2025",
    headline: { value: "+52%", label: "Increase in visitor dwell time" },
    challenge:
      "A large retail complex wanted to reshape how visitors move through the building — guiding them toward a wider set of tenants, lifting traffic in cold zones, and removing the sense of getting lost inside the mall. The goal was a better shopping experience and higher sales per square metre, but the data needed to do it sat in four disconnected systems: member profiles, tenant and product records, campaign and promotion schedules, and real-time facility and footfall density.",
    solutionIntro:
      "LogicaAI was used to build the path-planning agent and the simulation engine behind it, fusing four heterogeneous data sources into one live picture of the mall.",
    solution: [
      "Fused member profiles, promotions, tenant and product data, floor layout and real-time crowd density into a single operational view of the complex",
      "Generated personalised routes in real time — computing, for each visitor's profile and live position, the shopping path most likely to interest them",
      "Issued personalised rewards on the move: coupons and points triggered by location and purchase behaviour, closing a browse → buy → reward → buy again loop",
      "Layered gamification — missions, check-ins and stamp collecting — onto the route so wayfinding became something visitors chose to follow",
    ],
    result: [
      "Visitor dwell time up 52%, materially increasing the number of purchase opportunities per visit",
      "The first intelligent-routing deployment of its kind in a Chinese retail complex, setting the industry benchmark",
      "Tenant conversion rate and average transaction value rose together, lifting overall mall revenue",
      "Replaced experience-led operations with scientific, data-driven decision making",
    ],
    resultStats: [
      { value: "+52%", label: "Visitor dwell time" },
      { value: "1st", label: "Of its kind in China" },
      { value: "2", label: "Metrics up together: conversion & basket size" },
    ],
    takeaway:
      "When routing, rewards and game mechanics are driven by one live model of the building, footfall stops being random wandering and becomes precision traffic management.",
    art: "path",
  },
  {
    slug: "benchmark-eks-cattle-system",
    client: "Elanco — EKS",
    title: "Benchmark — EKS Cattle System",
    summary:
      "The data architecture behind the U.S. cattle benchmarking standard — 1,500+ feedyards, 30 years of history.",
    sector: "Animal Health · Data Analytics",
    tags: ["Data Pipeline", "Data Governance", "3rd Party Integration", "Databricks"],
    year: "2009 – present",
    headline: { value: "90%", label: "Of annual U.S. cattle harvest represented" },
    challenge:
      "Elanco's EKS team needed a system to both preserve nearly 30 years of historical feedyard data and continuously ingest real-time, in-process cattle data — daily feeding and management records demanding rigorous data cleaning and live reporting — while still delivering customised monthly and quarterly reports, exception alerts, and integration with third-party farm platforms.",
    solution: [
      "Built the automated data pipeline, ingesting batch cost, feed, health and cattle movement data directly from client accounting systems",
      "Established data governance with confidential multi-client isolation, keeping benchmarking data comparable but never cross-identifiable",
      "Delivered a customisable reporting engine with on-demand alerts and open APIs for third-party platform integration (PLA, Cattler and others)",
      "Currently modernising the architecture on Databricks with a microservices framework, built for scale and flexibility",
    ],
    result: [
      "Scaled to 1,500+ feedyards across 30+ states, representing 90% of annual U.S. cattle harvest",
      "Built a nearly 30-year historical dataset that became the industry-standard cattle benchmarking database",
      "Powered downstream analytics tools, reports and calculators, extending EKS data assets into new commercial use cases",
    ],
    resultStats: [
      { value: "1,500+", label: "Feedyards onboarded" },
      { value: "30+", label: "U.S. states covered" },
      { value: "~30 yrs", label: "Of historical data preserved" },
    ],
    takeaway:
      "A trusted, confidential data architecture built once at industry scale — now reusable across Elanco's Poultry, Swine and Dairy benchmarking programmes.",
    art: "grid",
  },
  {
    slug: "penpoint-computer-vision-sorting",
    client: "Elanco — PenPoint",
    title: "PenPoint — Computer Vision Sorting",
    summary:
      "Replacing manual cattle sorting with edge cameras and vision AI, from design through to production run.",
    sector: "Animal Health · Computer Vision",
    tags: ["AI Algorithm", "IoT", "Computer Vision", "Edge"],
    year: "2022",
    headline: { value: "9 months", label: "From kick-off to MVP launch" },
    challenge:
      "Elanco acquired a legacy solution for manually sorting cattle and wanted to transform it into vision-AI automated sorting technology, improving farm management and productivity without disrupting the operations already running on the floor.",
    solutionIntro:
      "ITLogica provided comprehensive IoT and AI services, covering the design, build and run of the Cattle Sorting System.",
    solution: [
      "Combined edge camera hardware with AI-based image recognition for real-time classification",
      "Integrated the solution directly into existing operations workflows for a smooth rollout",
      "Designed, built and ran the full stack — hardware, models and operations — as a single accountable team",
    ],
    result: [
      "MVP launched in 9 months",
      "Livestock management optimised with measurably higher throughput",
      "Efficiency and productivity improved while operating costs came down",
    ],
    resultStats: [
      { value: "9 mo", label: "To MVP" },
      { value: "Real-time", label: "On-device classification" },
    ],
    takeaway:
      "Our IoT and AI services enabled Elanco's Cattle Sorting System to optimise livestock management, improving efficiency and productivity while reducing costs.",
    art: "vision",
  },
  {
    slug: "uplook-carbon-inset-engine",
    client: "Elanco — UpLook",
    title: "UpLook — Carbon Inset Engine",
    summary:
      "Turning fragmented cattle data into a market-ready carbon accounting system trusted by a global marketplace.",
    sector: "Animal Health · Sustainability",
    tags: ["Cloud APIs", "Analytics Engine", "Carbon Modeling"],
    year: "2023",
    headline: { value: "$10M+", label: "In facilitated carbon payments enabled" },
    challenge:
      "Elanco's UpLook team needed to quantify livestock carbon emissions at industry scale, but millions of cattle records sat siloed across incompatible farm systems. Manual, unverified GHG calculations lacked the rigour required for global carbon markets, and real-time multi-variable sustainability modelling demanded heavy computational power.",
    solution: [
      "Built a proprietary analytics engine, using peer-reviewed science to automate emissions quantification",
      "Engineered cloud-native APIs for seamless, high-trust integration with the Athian Marketplace",
      "Developed a dynamic UX that turned a PhD-level carbon modelling exercise into a streamlined, error-checked workflow",
    ],
    result: [
      "2M+ cattle records processed through the platform",
      "$10M+ in facilitated carbon payments enabled",
      "11% of the U.S. dairy herd enrolled in its database",
    ],
    resultStats: [
      { value: "2M+", label: "Cattle records processed" },
      { value: "$10M+", label: "Carbon payments enabled" },
      { value: "11%", label: "Of the U.S. dairy herd enrolled" },
    ],
    takeaway:
      "Our proprietary analytics engine and cloud-native APIs turned fragmented cattle data into a trusted, market-ready carbon accounting system.",
    art: "carbon",
  },
  {
    slug: "cargill-pig-flash-model",
    client: "Cargill",
    title: "Cargill — Pig Flash Model",
    summary:
      "Re-platforming a trusted spreadsheet into an always-on, monetisable margin analytics product.",
    sector: "Agriculture & Animal Nutrition",
    tags: ["Data Analytics", "Web App", "Cloud Platform"],
    year: "2016",
    headline: { value: "24×7×365", label: "Cloud infrastructure replacing manual Excel" },
    challenge:
      "Cargill's Pig Flash Model helped producers benchmark profitability, but the tool depended entirely on manual Excel workflows — analysts hand-updated futures data and built, distributed and archived reports by hand, limiting scale and reliability.",
    solution: [
      "Re-platformed Pig Flash Model and Max Revenue into a state-of-the-art, Cargill-branded web application",
      "Automated real-time market data extraction, removing manual updates and errors",
      "Built a secure Animal Analytics Architecture and 24×7×365 cloud infrastructure to run the models",
    ],
    result: [
      "Eliminated manual spreadsheet updates, reporting and archiving",
      "Delivered real-time, reliable margin outlooks instead of static reports",
      "Recognised as a top digital innovation at the 2016 World Pork Expo",
    ],
    resultStats: [
      { value: "0", label: "Manual spreadsheet updates remaining" },
      { value: "Real-time", label: "Market data extraction" },
      { value: "2016", label: "World Pork Expo top innovation" },
    ],
    takeaway:
      "Re-platforming a trusted spreadsheet tool into a real-time web application let Cargill scale a manual process into a monetisable, always-on analytics product.",
    art: "market",
  },
  {
    slug: "lallemand-mobile-apps-analytics",
    client: "Lallemand",
    title: "Lallemand — Mobile Apps & Analytics",
    summary:
      "Three fragmented business-line apps unified onto one database, one analytics platform, one guide.",
    sector: "Agriculture & Animal Nutrition",
    tags: ["Common Database", "Data Analytics", "Mobile App"],
    year: "2021",
    headline: { value: "100%", label: "Of distributors said on-farm data tools win customers" },
    challenge:
      "Lallemand's Dairy, Beef and Silage teams each ran separate mobile apps on different technologies, fragmenting data and driving up maintenance costs — while over 30% of distributors weren't even aware the tools existed.",
    solution: [
      "Ran market research and surveys across internal teams and distributors before building anything",
      "Built a unified Lallemand Guide app with role- and region-based access for every business line",
      "Migrated all apps onto one common database for consistent, cost-effective analytics",
    ],
    result: [
      "91% of internal teams called data analytics vital to sales and service",
      "100% of distributors said on-farm data tools help win and retain customers",
      "77% of distributors intended to use the new tools directly with customers",
    ],
    resultStats: [
      { value: "91%", label: "Internal teams: analytics is vital" },
      { value: "100%", label: "Distributors: tools win customers" },
      { value: "77%", label: "Distributors adopting with customers" },
    ],
    takeaway:
      "By unifying Lallemand's fragmented apps onto one common database and analytics platform, ITLogica turned a maintenance burden into a scalable digital tool that strengthens customer relationships across every business line.",
    art: "mobile",
  },
  {
    slug: "vetrax-canine-behavior",
    client: "AgLogica — Vetrax",
    title: "Vetrax — Canine Behavior",
    summary:
      "Wearable IoT sensors and behaviour models that let vets catch canine health issues earlier.",
    sector: "Veterinary & Pet Health",
    tags: ["Mobile App", "Microsoft Azure", "IoT"],
    year: "2016",
    headline: { value: "24/7", label: "Real-time canine behaviour monitoring" },
    challenge:
      "A leading pet nutrition company needed a robust system to monitor and analyse canine behaviour in real time, in order to provide better health insights and improve veterinary care.",
    solutionIntro:
      "ITLogica provided end-to-end IoT and AI services for the Vetrax Canine Behavior System.",
    solution: [
      "Designed, built and ran an advanced monitoring system using IoT sensors to track canine movement",
      "Applied AI algorithms to analyse behaviour patterns and surface anomalies",
      "Alerted veterinarians to potential health issues as the signals emerged, not after the fact",
    ],
    result: [
      "Enhanced accuracy of behaviour analysis, leading to better treatment plans",
      "Earlier detection of health issues in monitored animals",
      "Improved veterinary care efficiency across the deployed base",
    ],
    resultStats: [
      { value: "Earlier", label: "Detection of health issues" },
      { value: "Azure", label: "Cloud backbone" },
    ],
    takeaway:
      "Our comprehensive IoT and AI services enabled AgLogica's Vetrax system to revolutionise canine health monitoring, improving early detection and veterinary care efficiency.",
    art: "sensor",
  },
  {
    slug: "eks-azure-cloud-modernization",
    client: "Elanco Animal Health",
    title: "Cloud Modernization — EKS Azure",
    summary:
      "A Fortune 500 Azure roadmap every department actually adopted — delivered inside 60 days.",
    sector: "Animal Health · Fortune 500",
    tags: ["Zero-Trust Security", "Cloud Architecture", "Microsoft Azure"],
    year: "2022",
    headline: { value: "60 days", label: "To a business-aligned Azure roadmap" },
    challenge:
      "Elanco Animal Health's data & analytics division, EKS, needed a future-state Azure architecture aligning a Fortune 500 org structure with its business vision — within 60 days, after an earlier Microsoft-led effort proved too generic to apply.",
    solution: [
      "Interviewed stakeholders from the C-suite through to cybersecurity, operations and analytics teams",
      "Ran a 3-day cross-department workshop to reconcile competing priorities into one roadmap",
      "Open-sourced wherever possible and redesigned around microservices to cut vendor lock-in",
      "Layered Zero-Trust security: API management, modern authN/authZ, and network segmentation",
    ],
    result: [
      "Automated ML workflows, cutting 4+ hours/day of manual data mining and troubleshooting",
      "Reduced code dependencies and vendor lock-in across a 70%+ ITLogica-built portfolio",
      "Delivered a business-aligned, ROI-driven roadmap within the 60-day deadline",
    ],
    resultStats: [
      { value: "4+ hrs", label: "Manual work removed per day" },
      { value: "70%+", label: "Of the portfolio ITLogica-built" },
      { value: "60 days", label: "End-to-end delivery" },
    ],
    takeaway:
      "Deep business-context understanding — not just technical upgrades — is what turned this cloud roadmap into one every department actually adopted.",
    art: "cloud",
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
