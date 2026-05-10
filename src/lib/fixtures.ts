// Single source of truth for all hardcoded copy & demo data.
// Components must import from here — no inline strings or numbers.

export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions", dropdown: true },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const

export const SOLUTION_LINKS = [
  { label: "PE Deal Teams", href: "/due-diligence" },
  { label: "CFO Office", href: "/fractional-cfo" },
  { label: "Portfolio Companies", href: "/governance" },
] as const

export type Source = {
  id: string
  badge: string
  badgeBg: string
  name: string
  sub: string
  count: string
  dot: "green" | "amber" | "red"
}

export const SOURCES: Source[] = [
  { id: "ns", badge: "NS", badgeBg: "#4A6CF7", name: "NetSuite", sub: "GL + AR/AP", count: "2.4M rows", dot: "green" },
  { id: "sf", badge: "SF", badgeBg: "#00A1E0", name: "Salesforce", sub: "CRM + Pipeline", count: "11K opps", dot: "green" },
  { id: "dr", badge: "DR", badgeBg: "#7C3AED", name: "DocuSend VDR", sub: "4,612 docs", count: "parsed", dot: "green" },
  { id: "sl", badge: "SL", badgeBg: "#4A154B", name: "Slack", sub: "14mo history", count: "282K msgs", dot: "green" },
  { id: "m3", badge: "M3", badgeBg: "#0078D4", name: "Microsoft 365", sub: "Mail + Drive", count: "indexed", dot: "green" },
  { id: "rp", badge: "RP", badgeBg: "#C0392B", name: "Rippling", sub: "HRIS + Payroll", count: "214 records", dot: "green" },
  { id: "st", badge: "ST", badgeBg: "#1A73E8", name: "Stripe", sub: "Billing & subscriptions", count: "live", dot: "amber" },
]

export const INGESTION_STATS = [
  { label: "Citations", value: "38,914", sub: "verifiable" },
  { label: "Coverage", value: "100%", sub: "full population" },
  { label: "Time to graph", value: "3h 42m", sub: "from ingest" },
  { label: "Manual hours avoided", value: "~840h", sub: "per engagement" },
] as const

export const AGENT_QUERIES = [
  "What drove the EBITDA variance in Q3?",
  "Show all contracts with CPI uplift provisions",
  "Which portfolio company has lowest cash runway?",
  "Flag revenue recognition issues in the VDR",
] as const

export type AgentStep = { text: string; state: "done" | "running" | "waiting" }

export const AGENT_STEPS: AgentStep[] = [
  { text: "Graph traversal complete · 312 MSAs indexed", state: "done" },
  { text: "CPI escalator playbook · 18 contracts flagged", state: "done" },
  { text: "Quantifying ARR leakage · cross-referencing invoice history…", state: "running" },
  { text: "EV impact calculation · pending", state: "waiting" },
]

export const AGENT_FINDING = {
  label: "FINDING",
  body: 'of 312 active MSAs contain a mandated 5% annual CPI uplift that was not applied at renewal over the trailing 24 months. Identified ARR leakage: $1.24M, approximately $14.6M EV impact at current multiple.',
  citation: "Cited: MSA_Renewal_Archive.zip · rows 14-31 · NetSuite AR export · col G",
} as const

export type Severity = "high" | "medium" | "low"
export type Category = "Financial" | "Legal" | "Commercial" | "Operational"

export type Finding = {
  id: string
  module: string
  category: Category
  title: string
  body: string
  impact: string
  impactTone: "red" | "amber"
  severity: Severity
  source: string
}

export const FINDINGS: Finding[] = [
  {
    id: "f-cpi",
    module: "Module 1 · Financial · Contractual Uplift Failure",
    category: "Financial",
    title: "Revenue leakage from un-applied CPI escalators",
    body: "The Inflation Enforcer playbook parsed all 312 active MSAs and detected 18 contracts with a mandated 5% annual uplift renewed at flat invoiced rates over the trailing 24 months. Net Revenue Retention overstated by ~3.1pts.",
    impact: "Quantified leakage · $1.24M ARR · multiplied: $14.6M EV",
    impactTone: "red",
    severity: "high",
    source: "MSA_Renewal_Archive.zip · rows 14-31",
  },
  {
    id: "f-606",
    module: "Module 1 · Financial · ASC 606 / Pro-Forma Fluff",
    category: "Financial",
    title: "Setup & onboarding fees recognised at invoice, not deferred",
    body: "$680K of one-time implementation fees recognised immediately upon billing across 41 Q3-Q4 enterprise deals. Add-back schedule includes $1.2M in synergy adjustments tied to a 2024 reorg lacking GL substantiation.",
    impact: "EBITDA overstatement: 14.2% · Restate: -$1.88M",
    impactTone: "red",
    severity: "high",
    source: "QoE_Adjustments.xlsx",
  },
  {
    id: "f-nwc",
    module: "Module 1 · Financial · NWC Manipulation",
    category: "Financial",
    title: "DSO collapsed 22% in pre-LOI quarters, cash drained from balance sheet",
    body: "3-month rolling DSO dropped from 58 to 45 days across Q3-Q4 2025, while DPO simultaneously expanded from 32 to 47 days. Pattern indicates aggressive collection discounts and stretched vendor payments to inflate cash at close.",
    impact: "NWC peg revised upward by $1.7M",
    impactTone: "amber",
    severity: "medium",
    source: "NetSuite · AR aging export",
  },
]

export const FINDING_TABS: { label: string; value: "All" | Category }[] = [
  { label: "All", value: "All" },
  { label: "Financial", value: "Financial" },
  { label: "Legal", value: "Legal" },
  { label: "Commercial", value: "Commercial" },
  { label: "Operational", value: "Operational" },
]

export const FINDING_SUMMARY = {
  total: "17 material findings",
  highCount: 7,
  mediumCount: 6,
  lowCount: 4,
} as const

export type Kpi = {
  label: string
  value: string
  sub: string
  valueTone?: "default" | "amber" | "red"
  subTone?: "default" | "amber" | "red"
  featured?: boolean
}

export const CONTROL_TOWER_KPIS: Kpi[] = [
  { label: "Target ARR", value: "$45.2M", sub: "+12% YoY vs benchmark", featured: true },
  { label: "EBITDA (reported)", value: "$8.4M", sub: "Multiple: 12.4x" },
  { label: "Adjusted EBITDA", value: "$6.8M", sub: "-18.4% variance identified", valueTone: "red", subTone: "red" },
  { label: "Net Revenue Retention", value: "92%", sub: "Benchmark: 105%", valueTone: "amber" },
]

export const CHART_DATA_WATERFALL = {
  labels: [
    "Reported",
    "M&A fees",
    "Expense add-back",
    "Pro-forma fluff",
    "Bonus accrual",
    "Rev leakage",
    "Adjusted",
  ],
  // [base (transparent floor), bar value]
  // Convention: positives stacked atop running total, negatives subtracted from running total.
  // For the floating bar visual we precompute per-step base + delta values.
  steps: [
    { kind: "total", value: 8.4, label: "Reported" },
    { kind: "pos", value: 0.5, label: "M&A fees" },
    { kind: "pos", value: 0.05, label: "Expense add-back" },
    { kind: "neg", value: 0.8, label: "Pro-forma fluff" },
    { kind: "neg", value: 0.2, label: "Bonus accrual" },
    { kind: "neg", value: 0.25, label: "Rev leakage" },
    { kind: "total", value: 6.8, label: "Adjusted" },
  ] as { kind: "total" | "pos" | "neg"; value: number; label: string }[],
}

export const CHART_DATA_BOOKINGS = {
  labels: ["Q1-24", "Q2-24", "Q3-24", "Q4-24"],
  bookings: [12.5, 14.1, 11.8, 15.2],
  conversion: [89, 87, 91, 83],
}

export const CFO_KPIS: Kpi[] = [
  { label: "Total billed", value: "₪267,927", sub: "Jul-Dec 2025" },
  { label: "Hours reported", value: "301.2h", sub: "6 months" },
  { label: "Peak employees", value: "5", sub: "Oct 2025" },
  { label: "Billing vs agreement", value: "-₪39,012", sub: "HR underbilled", valueTone: "red", subTone: "red" },
]

export const CFO_BILLING_CHART = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  billed: [3740, 3260, 66458, 50995, 74498, 68975],
  hours: [4, 10, 35, 89, 93, 70],
}

export type Employee = { name: string; hours: number; pct: number; team: "Gush" | "Nitzan" }

export const CFO_EMPLOYEES: Employee[] = [
  { name: "Doras", hours: 99, pct: 100, team: "Gush" },
  { name: "Sigal Nissim", hours: 79, pct: 79.8, team: "Gush" },
  { name: "Batya David", hours: 65.7, pct: 66.4, team: "Gush" },
  { name: "Re'ut Dana", hours: 54, pct: 54.5, team: "Nitzan" },
  { name: "Sima", hours: 3.5, pct: 3.5, team: "Gush" },
]

export const CFO_HEADCOUNT = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  active: [3, 2, 4, 5, 4, 4],
}

export type PortfolioStatus = "ok" | "warn" | "err"

export type PortfolioCompany = {
  name: string
  status: PortfolioStatus
  metrics: { label: string; value: string; tone: "default" | "ok" | "warn" | "err" }[]
  alert?: { tone: "warn" | "err"; text: string }
}

export const PORTFOLIO_COMPANIES: PortfolioCompany[] = [
  {
    name: "Meridian Digital",
    status: "ok",
    metrics: [
      { label: "ARR growth", value: "+18% YoY", tone: "ok" },
      { label: "Cash runway", value: "14 months", tone: "ok" },
      { label: "Covenant headroom", value: "32%", tone: "default" },
      { label: "NRR", value: "108%", tone: "ok" },
    ],
  },
  {
    name: "Vestra Logistics",
    status: "warn",
    metrics: [
      { label: "ARR growth", value: "+4% YoY", tone: "warn" },
      { label: "Cash runway", value: "6 months", tone: "warn" },
      { label: "Covenant headroom", value: "11%", tone: "warn" },
      { label: "NRR", value: "94%", tone: "warn" },
    ],
    alert: { tone: "warn", text: "Covenant headroom below 15% threshold" },
  },
  {
    name: "Aurum Health",
    status: "err",
    metrics: [
      { label: "ARR growth", value: "-3% YoY", tone: "err" },
      { label: "Cash runway", value: "3 months", tone: "err" },
      { label: "Covenant headroom", value: "4%", tone: "err" },
      { label: "NRR", value: "81%", tone: "err" },
    ],
    alert: { tone: "err", text: "Critical: runway <90 days · GP escalation required" },
  },
  {
    name: "Stonegate Media",
    status: "ok",
    metrics: [
      { label: "ARR growth", value: "+24% YoY", tone: "ok" },
      { label: "Cash runway", value: "22 months", tone: "ok" },
      { label: "Covenant headroom", value: "45%", tone: "default" },
      { label: "NRR", value: "112%", tone: "ok" },
    ],
  },
  {
    name: "Celero Payments",
    status: "ok",
    metrics: [
      { label: "ARR growth", value: "+31% YoY", tone: "ok" },
      { label: "Cash runway", value: "18 months", tone: "ok" },
      { label: "Covenant headroom", value: "28%", tone: "default" },
      { label: "NRR", value: "119%", tone: "ok" },
    ],
  },
  {
    name: "Nexon Industrial",
    status: "warn",
    metrics: [
      { label: "ARR growth", value: "+7% YoY", tone: "warn" },
      { label: "Cash runway", value: "9 months", tone: "default" },
      { label: "Covenant headroom", value: "18%", tone: "warn" },
      { label: "NRR", value: "97%", tone: "warn" },
    ],
    alert: { tone: "warn", text: "Customer concentration: top 3 clients = 68% of ARR" },
  },
]

export const SOLUTION_CARDS = [
  {
    number: "01",
    title: "Due Diligence",
    desc: "A complete VDR-to-brief pipeline. 48 hours. Fully cited. Every finding traceable to its source document.",
    href: "/due-diligence",
  },
  {
    number: "02",
    title: "Fractional CFOs",
    desc: "The analyst that never sleeps. Built for lean finance functions carrying a full executive workload.",
    href: "/fractional-cfo",
  },
  {
    number: "03",
    title: "Governance",
    desc: "Perpetual portfolio and operational monitoring. Early warning signals before they appear in the monthly pack.",
    href: "/governance",
  },
] as const
