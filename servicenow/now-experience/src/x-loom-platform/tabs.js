/**
 * Loom sections (left navigation)
 *
 * ServiceNow Next Experience components are custom elements. We keep the
 * navigation model as a simple data structure so it’s easy to:
 * - render the sidebar
 * - map state -> active section
 * - later connect each section to its own view/data loader
 */

export const DEFAULT_TAB_KEY = 'dashboard';

export const TABS = [
	{key: 'dashboard', label: 'Dashboard'},
	{key: 'controls', label: 'Controls'},
	{key: 'documents', label: 'Documents'},
	{key: 'forms', label: 'Forms'},
	{key: 'frameworks', label: 'Frameworks'},
	{key: 'help-center', label: 'Help Center'},
	{key: 'integrations', label: 'Integrations'},
	{key: 'monitor', label: 'Monitor'},
	{key: 'participants', label: 'Participants'},
	{key: 'policies', label: 'Policies'},
	{key: 'reports', label: 'Reports'},
	{key: 'risk-management', label: 'Risk Management'},
	{key: 'settings', label: 'Settings'},
	{key: 'tasks', label: 'Tasks'},
	{key: 'vendors', label: 'Vendors'}
];
