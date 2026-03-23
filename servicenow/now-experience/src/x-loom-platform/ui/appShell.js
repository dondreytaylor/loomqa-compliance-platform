/*
 * App shell renderer.
 *
 * This mirrors the local dashboard page structure:
 *   <div class="app">
 *     <Sidebar />
 *     <main>
 *       <div class="content">
 *         <Topbar />
 *         <RouteContent />
 *       </div>
 *     </main>
 *   </div>
 *   <ModalOverlay />
 */

import {renderSidebar} from './sidebar';
import {renderTopbar} from './topbar';
import {renderDashboard} from './dashboard';
import {renderModalOverlay} from './modal';

import {dashboardCopy, navSections, sidebarFooterItems} from '../data/dashboardData';

function getRouteLabel(href) {
	const all = [...navSections.flatMap((s) => s.items), ...sidebarFooterItems];
	const match = all.find((i) => i.href === href);
	return match?.label || 'Overview';
}

function renderPlaceholderPage(state) {
	const label = getRouteLabel(state.activeHref);

	return (
		<>
			<div className="page-title">{label}</div>
			<div className="subtitle">
				This section is scaffolded in the Now Experience port. Wire it to real
				instance data/API calls as you build out the product.
			</div>

			<section className="card" style={{marginTop: 14}}>
				<div className="card-header">
					<span>Next steps</span>
					<span className="pill purple">UI Builder</span>
				</div>
				<div className="metric-sub" style={{marginTop: 10}}>
					Start by mapping this route to a UI Builder page or keep it as an
					internal view in this single custom element.
				</div>
			</section>
		</>
	);
}

export function renderAppShell(state, helpers) {
	const {updateState} = helpers;

	const appClassName =
		'app' +
		(state.sidebarCollapsed ? ' sidebar-collapsed' : '') +
		(state.mobileSidebarOpen ? ' sidebar-open' : '');

	const isDashboard = state.activeHref === '/';

	return (
		<>
			<div className={appClassName} id="appShell">
				{renderSidebar(state, helpers)}

				<main
					className="main"
					on-click={() => {
						// Close mobile sidebar when interacting with content.
						if (state.mobileSidebarOpen) updateState({mobileSidebarOpen: false});
					}}
				>
					<div className="content">
						{renderTopbar(state, helpers)}

						{isDashboard ? renderDashboard(state, helpers) : renderPlaceholderPage(state)}
					</div>
				</main>
			</div>

			{renderModalOverlay(state, helpers)}
		</>
	);
}
