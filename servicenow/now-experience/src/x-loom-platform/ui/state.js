/*
 * UI state helpers.
 *
 * ServiceNow UI Framework components keep their state in a plain object.
 * The `updateState(partial)` helper performs a shallow merge.
 */

export const ROUTES = {
	DASHBOARD: '/',
	REPORTS: '/reports',
	FRAMEWORKS: '/frameworks',
	CONTROLS: '/controls',
	POLICIES: '/policies',
	TASKS: '/tasks',
	DOCUMENTS: '/documents',
	MONITOR: '/monitor',
	INTEGRATIONS: '/integrations',
	RISK_MANAGEMENT: '/risk-management',
	FORMS: '/forms',
	VENDORS: '/vendors',
	PARTICIPANTS: '/participants',
	SETTINGS: '/settings',
	HELP_CENTER: '/help-center'
};

export const MODAL_KIND = {
	NONE: 'NONE',
	FINDINGS_LIST: 'FINDINGS_LIST',
	FINDING_DETAIL: 'FINDING_DETAIL',
	CONNECTED_SYSTEM_DETAILS: 'CONNECTED_SYSTEM_DETAILS',
	CONNECT_SYSTEM: 'CONNECT_SYSTEM'
};

export const INITIAL_STATE = {
	activeHref: ROUTES.DASHBOARD,

	// Sidebar layout state
	sidebarCollapsed: false,
	mobileSidebarOpen: false,

	// Collapsible nav-section state (keyed by section title)
	navSectionCollapsed: {
		Compliance: false,
		Operations: false
	},

	// Table/search state
	connectedSystemsQuery: '',

	// Modal state (matches the prototype's single overlay)
	modal: {
		kind: MODAL_KIND.NONE,
		title: 'Details',
		subtitle: '',
		searchPlaceholder: 'Search',
		searchEnabled: false,
		searchQuery: '',
		page: 1,
		selectedFindingId: null,
		selectedSystemSource: null
	}
};

export function withUpdatedModal(state, partialModal) {
	return {
		...state,
		modal: {
			...state.modal,
			...partialModal
		}
	};
}
