/*
 * Dashboard demo data (ServiceNow Now Experience)
 *
 * This file is the Now Experience equivalent of:
 *   platform/local/src/components/dashboard/dashboardData.ts
 *
 * Keeping data in one place lets the UI remain purely presentational and makes
 * it easy to swap the demo content for real instance-backed APIs later.
 */

export const dashboardCopy = {
	sidebarOrgName: 'LoopQA',
	sidebarTag: 'Compliance Workspace',
	pageTitle: 'Overview',
	pageSubtitle:
		'Track integrity posture, audit readiness, recent drift, and the next remediation steps across controls, frameworks, and integrated systems.'
};

/**
 * Sidebar navigation model.
 *
 * NOTE: In the local Next.js app these are href routes.
 * In Now Experience, we treat them as *internal* routes and prevent default
 * navigation; clicking changes component state and updates the visible page.
 */
export const navSections = [
	{
		items: [
			{label: 'Dashboard', href: '/', icon: 'Dashboard'},
			{label: 'Reports', href: '/reports', icon: 'Reports'}
		]
	},
	{
		title: 'Compliance',
		collapsible: true,
		items: [
			{label: 'Frameworks', href: '/frameworks', icon: 'Frameworks'},
			{label: 'Controls', href: '/controls', icon: 'Controls'},
			{label: 'Policies', href: '/policies', icon: 'Policies'},
			{label: 'Tasks', href: '/tasks', icon: 'Tasks'},
			{label: 'Documents', href: '/documents', icon: 'Documents'}
		]
	},
	{
		title: 'Operations',
		collapsible: true,
		items: [
			{label: 'Monitor', href: '/monitor', icon: 'Monitor'},
			{label: 'Integrations', href: '/integrations', icon: 'Integrations'},
			{label: 'Risk Management', href: '/risk-management', icon: 'Risk'},
			{label: 'Forms', href: '/forms', icon: 'Forms'},
			{label: 'Vendors', href: '/vendors', icon: 'Vendors'},
			{label: 'Participants', href: '/participants', icon: 'Participants'}
		]
	}
];

export const sidebarFooterItems = [
	{label: 'Settings', href: '/settings', icon: 'Settings'},
	{label: 'Help Center', href: '/help-center', icon: 'Help'},
	{label: 'Visit Website', href: '#', icon: 'External', hint: '↗'}
];

export const integrityScore = {
	score: 92,
	heading: 'Strong posture',
	description:
		'Control health remains high overall, with a few identity and Kubernetes drift issues requiring attention this week.',
	signals: [
		{
			pillText: 'Evidence',
			pillClass: 'purple',
			text: 'Average freshness is 12m across connected systems; Kubernetes is the only source flagged stale.'
		},
		{
			pillText: 'Controls',
			pillClass: 'green',
			text: '93% of controls are passing with linked evidence; 5 controls are pending review due to older attestations.'
		},
		{
			pillText: 'Drift',
			pillClass: 'amber',
			text: 'This week’s integrity drag is primarily IAM offboarding and cluster policy drift. Next refresh in ~6 minutes.'
		}
	]
};

export const heroMetrics = [
	{
		title: 'Open Findings',
		pillText: '2 critical',
		pillClass: 'red',
		value: '17',
		description:
			'Critical, high, and medium findings currently requiring remediation or evidence refresh.',
		className: 'open-findings-card'
	},
	{
		title: 'Passing Controls',
		pillText: '93% pass',
		pillClass: 'green',
		value: '124',
		description:
			'Controls fully passing with linked evidence, assigned ownership, and no open exceptions.',
		className: 'passing-controls-card'
	},
	{
		title: 'Monitoring Coverage',
		pillText: '86%',
		pillClass: 'purple',
		value: '48',
		description:
			'Integrated sources feeding evidence and drift signals. One Kubernetes source is 12 hours stale.',
		className: 'monitoring-card'
	},
	{
		title: 'Evidence Freshness',
		pillText: '12m avg',
		value: '12m',
		description:
			'Average automated evidence age across connected systems. One source is stale (> 6h) and should be resynced.',
		className: 'evidence-card'
	}
];

export const findings = [
	{
		id: 'revoke-github-access-john-doe',
		severity: 'Critical',
		variantClass: 'critical',
		pillClass: 'red',
		text:
			'Revoke GitHub access for john.doe@company.com. User is terminated in HRIS but still active in production orgs.'
	},
	{
		id: 'collect-q4-privileged-access-review',
		severity: 'High',
		variantClass: 'high',
		pillClass: 'red',
		text: 'Collect Q4 privileged-access review evidence for 25 admin accounts across AWS and GCP.'
	},
	{
		id: 'kubernetes-drift-cis-admission-policy',
		severity: 'Medium',
		variantClass: 'medium',
		pillClass: 'amber',
		text: 'Kubernetes drift detected: 3 clusters missing CIS-aligned admission policy updates.'
	},
	{
		id: 'endpoint-encryption-attestations-stale',
		severity: 'Medium',
		variantClass: 'medium',
		pillClass: 'amber',
		text: 'Two endpoint encryption attestations are older than 30 days and need fresh proof.'
	}
];

export const securitySummary = [
	{
		pillText: 'Passing Controls',
		pillClass: 'green',
		value: '124',
		description: 'Fully passing controls with linked evidence and no open exceptions.'
	},
	{
		pillText: 'Needs Review',
		pillClass: 'amber',
		value: '5',
		description: 'Controls with stale attestations, incomplete ownership, or pending review cycles.'
	},
	{
		pillText: 'Assets At Risk',
		pillClass: 'red',
		value: '12',
		description: 'Assets tied to critical or high findings, mostly IAM and cloud infrastructure.'
	},
	{
		pillText: 'Last Evidence Sync',
		pillClass: 'purple',
		value: '12m',
		description: 'Average freshness for automated evidence. Kubernetes inventory sync trails the rest.'
	}
];

export const recommendedActions = [
	{
		title: 'Close terminated-user access gap across GitHub and AWS org accounts.',
		meta: 'Owner: Identity team · Due today · 3 linked systems',
		pills: [
			{text: 'Due today', pillClass: 'amber'},
			{text: 'Identity', pillClass: 'purple'}
		]
	},
	{
		title: 'Refresh privileged access review evidence before auditor checkpoint on Friday.',
		meta: 'Owner: GRC · Due in 2 days · Evidence bundle missing',
		pills: [
			{text: 'Due in 2 days', pillClass: 'amber'},
			{text: 'GRC', pillClass: 'purple'}
		]
	}
];

export const frameworks = [
	{
		short: 'SOC 2',
		name: 'SOC 2 Type II',
		subtext: 'Q1 audit readiness',
		completionPill: '74% mapped',
		done: 21,
		warn: 5,
		fail: 2,
		mappedPercent: 74
	},
	{
		short: 'ISO',
		name: 'ISO 27001',
		subtext: 'Evidence collection',
		completionPill: '68% mapped',
		done: 18,
		warn: 6,
		fail: 4,
		mappedPercent: 68
	},
	{
		short: 'HIPAA',
		name: 'HIPAA',
		subtext: 'Security rule',
		completionPill: '82% mapped',
		done: 24,
		warn: 3,
		fail: 1,
		mappedPercent: 82
	},
	{
		short: 'PCI',
		name: 'PCI DSS',
		subtext: 'Card data scope',
		completionPill: '59% mapped',
		done: 15,
		warn: 8,
		fail: 5,
		mappedPercent: 59
	}
];

export const connectedSystems = [
	{
		short: 'GH',
		source: 'GitHub',
		scope: 'Repos + org members',
		health: {text: 'Healthy', pillClass: 'green'},
		coverage: '214 repos',
		lastScan: '6 min ago'
	},
	{
		short: 'AWS',
		source: 'AWS',
		scope: 'Org accounts + IAM',
		health: {text: 'Healthy', pillClass: 'green'},
		coverage: '42 accounts',
		lastScan: '12 min ago'
	},
	{
		short: 'K8',
		source: 'Kubernetes',
		scope: 'Clusters + policies',
		health: {text: 'Stale', pillClass: 'amber'},
		coverage: '3 clusters',
		lastScan: '12 hours ago'
	},
	{
		short: 'HR',
		source: 'HRIS',
		scope: 'Users + terminations',
		health: {text: 'Healthy', pillClass: 'green'},
		coverage: '1,204 users',
		lastScan: '4 min ago'
	}
];
