/**
 * Dashboard sample data.
 *
 * The reference HTML is a static prototype; this file keeps the demo content
 * in one place so components remain purely presentational.
 */

import { Icons } from "./icons";

export type NavItem = {
  label: string;
  href: string;
  icon: keyof typeof Icons;
  /** Optional hint shown on the right edge (e.g. ↗). */
  hint?: string;
  /** Mark the current route. */
  active?: boolean;
};

export type NavSection = {
  title?: string;
  collapsible?: boolean;
  items: NavItem[];
};

export type FindingSeverity = "Critical" | "High" | "Medium";

export type Finding = {
  id: string;
  severity: FindingSeverity;
  variantClass: "critical" | "high" | "medium";
  pillClass: "red" | "amber";
  html: string;
};

export type Metric = {
  title: string;
  pillText: string;
  pillClass?: "green" | "amber" | "red" | "purple";
  value: string;
  description: string;
  className: string;
};

export type SummaryTile = {
  pillText: string;
  pillClass: "green" | "amber" | "red" | "purple";
  value: string;
  description: string;
};

export type ActionItem = {
  title: string;
  meta: string;
  pills: Array<{ text: string; pillClass: "green" | "amber" | "purple" }>;
};

export type Framework = {
  short: string;
  name: string;
  subtext: string;
  completionPill: string;
  done: number;
  warn: number;
  fail: number;
  mappedPercent: number;
};

export type ConnectedSystem = {
  short: string;
  source: string;
  scope: string;
  health: { text: string; pillClass: "green" | "amber" | "red" };
  coverage: string;
  lastScan: string;
};

export const dashboardCopy = {
  sidebarOrgName: "LoopQA",
  sidebarTag: "Compliance Workspace",
  pageTitle: "Overview",
  pageSubtitle:
    "Track integrity posture, audit readiness, recent drift, and the next remediation steps across controls, frameworks, and integrated systems.",
} as const;

export const navSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/", icon: "Dashboard", active: true },
      { label: "Reports", href: "/reports", icon: "Reports" },
    ],
  },
  {
    title: "Compliance",
    collapsible: true,
    items: [
      { label: "Frameworks", href: "/frameworks", icon: "Frameworks" },
      { label: "Controls", href: "/controls", icon: "Controls" },
      { label: "Policies", href: "/policies", icon: "Policies" },
      { label: "Tasks", href: "/tasks", icon: "Tasks" },
      { label: "Documents", href: "/documents", icon: "Documents" },
    ],
  },
  {
    title: "Operations",
    collapsible: true,
    items: [
      { label: "Monitor", href: "/monitor", icon: "Monitor" },
      { label: "Integrations", href: "/integrations", icon: "Integrations" },
      { label: "Risk Management", href: "/risk-management", icon: "Risk" },
      { label: "Forms", href: "/forms", icon: "Forms" },
      { label: "Vendors", href: "/vendors", icon: "Vendors" },
      { label: "Participants", href: "/participants", icon: "Participants" },
    ],
  },
];

export const sidebarFooterItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: "Settings" },
  { label: "Help Center", href: "/help-center", icon: "Help" },
  { label: "Visit Website", href: "#", icon: "External", hint: "↗" },
];

export const integrityScore = {
  score: 92,
  heading: "Strong posture",
  description:
    "Control health remains high overall, with a few identity and Kubernetes drift issues requiring attention this week.",
  signals: [
    {
      pillText: "Evidence",
      pillClass: "purple",
      text: "Average freshness is 12m across connected systems; Kubernetes is the only source flagged stale.",
    },
    {
      pillText: "Controls",
      pillClass: "green",
      text: "93% of controls are passing with linked evidence; 5 controls are pending review due to older attestations.",
    },
    {
      pillText: "Drift",
      pillClass: "amber",
      text: "This week’s integrity drag is primarily IAM offboarding and cluster policy drift. Next refresh in ~6 minutes.",
    },
  ],
} as const;

export const heroMetrics: Metric[] = [
  {
    title: "Open Findings",
    pillText: "2 critical",
    pillClass: "red",
    value: "17",
    description:
      "Critical, high, and medium findings currently requiring remediation or evidence refresh.",
    className: "open-findings-card",
  },
  {
    title: "Passing Controls",
    pillText: "93% pass",
    pillClass: "green",
    value: "124",
    description:
      "Controls fully passing with linked evidence, assigned ownership, and no open exceptions.",
    className: "passing-controls-card",
  },
  {
    title: "Monitoring Coverage",
    pillText: "86%",
    pillClass: "purple",
    value: "48",
    description:
      "Integrated sources feeding evidence and drift signals. One Kubernetes source is 12 hours stale.",
    className: "monitoring-card",
  },
  {
    title: "Evidence Freshness",
    pillText: "12m avg",
    value: "12m",
    description:
      "Average automated evidence age across connected systems. One source is stale (> 6h) and should be resynced.",
    className: "evidence-card",
  },
];

export const findings: Finding[] = [
  {
    id: "revoke-github-access-john-doe",
    severity: "Critical",
    variantClass: "critical",
    pillClass: "red",
    html: "Revoke GitHub access for <strong>john.doe@company.com</strong>. User is terminated in HRIS but still active in production orgs.",
  },
  {
    id: "collect-q4-privileged-access-review",
    severity: "High",
    variantClass: "high",
    pillClass: "red",
    html: "Collect Q4 privileged-access review evidence for 25 admin accounts across AWS and GCP.",
  },
  {
    id: "kubernetes-drift-cis-admission-policy",
    severity: "Medium",
    variantClass: "medium",
    pillClass: "amber",
    html: "Kubernetes drift detected: 3 clusters missing CIS-aligned admission policy updates.",
  },
  {
    id: "endpoint-encryption-attestations-stale",
    severity: "Medium",
    variantClass: "medium",
    pillClass: "amber",
    html: "Two endpoint encryption attestations are older than 30 days and need fresh proof.",
  },
];

export const securitySummary: SummaryTile[] = [
  {
    pillText: "Passing Controls",
    pillClass: "green",
    value: "124",
    description: "Fully passing controls with linked evidence and no open exceptions.",
  },
  {
    pillText: "Needs Review",
    pillClass: "amber",
    value: "5",
    description:
      "Controls with stale attestations, incomplete ownership, or pending review cycles.",
  },
  {
    pillText: "Assets At Risk",
    pillClass: "red",
    value: "12",
    description:
      "Assets tied to critical or high findings, mostly IAM and cloud infrastructure.",
  },
  {
    pillText: "Last Evidence Sync",
    pillClass: "purple",
    value: "12m",
    description:
      "Average freshness for automated evidence. Kubernetes inventory sync trails the rest.",
  },
];

export const recommendedActions: ActionItem[] = [
  {
    title: "Close terminated-user access gap across GitHub and AWS org accounts.",
    meta: "Owner: Identity team · Due today · 3 linked systems",
    pills: [
      { text: "Due today", pillClass: "amber" },
      { text: "Identity", pillClass: "purple" },
    ],
  },
  {
    title:
      "Refresh privileged access review evidence before auditor checkpoint on Friday.",
    meta: "Owner: GRC · Due in 2 days · Evidence bundle missing",
    pills: [
      { text: "Due in 2 days", pillClass: "amber" },
      { text: "GRC", pillClass: "purple" },
    ],
  },
  {
    title: "Re-run cluster policy sync after admission-controller rollout completes.",
    meta: "Owner: Platform security · Watchlist only",
    pills: [
      { text: "Watchlist", pillClass: "green" },
      { text: "Platform", pillClass: "purple" },
    ],
  },
];

export const frameworks: Framework[] = [
  {
    short: "SO",
    name: "SOC 2",
    subtext: "22 / 27 controls mapped",
    completionPill: "81% complete",
    done: 24,
    warn: 4,
    fail: 3,
    mappedPercent: 67,
  },
  {
    short: "IS",
    name: "ISO 27001",
    subtext: "31 / 42 controls ready",
    completionPill: "74% complete",
    done: 23,
    warn: 5,
    fail: 3,
    mappedPercent: 58,
  },
];

export const connectedSystems: ConnectedSystem[] = [
  {
    short: "OK",
    source: "Okta",
    scope: "Users, groups, admin roles",
    health: { text: "Healthy", pillClass: "green" },
    coverage: "98% collection",
    lastScan: "8 minutes ago",
  },
  {
    short: "GH",
    source: "GitHub",
    scope: "Repos, teams, org access",
    health: { text: "Reviewing", pillClass: "amber" },
    coverage: "84% collection",
    lastScan: "15 minutes ago",
  },
  {
    short: "AWS",
    source: "AWS",
    scope: "IAM, CloudTrail, buckets",
    health: { text: "Healthy", pillClass: "green" },
    coverage: "92% collection",
    lastScan: "5 minutes ago",
  },
  {
    short: "K8",
    source: "Kubernetes",
    scope: "Clusters, policies, workloads",
    health: { text: "Stale", pillClass: "red" },
    coverage: "69% collection",
    lastScan: "12 hours ago",
  },
];
