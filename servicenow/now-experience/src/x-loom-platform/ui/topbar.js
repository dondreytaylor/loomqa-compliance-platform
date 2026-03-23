/*
 * Topbar renderer.
 *
 * Mirrors the local dashboard top bar (`DashboardTopbar.tsx`) but is fully
 * state-driven (mobile menu toggle toggles `state.mobileSidebarOpen`).
 */

import {Icons} from '../icons/icons';

export function renderTopbar(state, {updateState}) {
	return (
		<div className="topbar">
			<div className="topbar-left">
				<button
					className="mobile-sidebar-toggle"
					type="button"
					on-click={() =>
						updateState({mobileSidebarOpen: !state.mobileSidebarOpen})
					}
				>
					<span className="icon">
						<Icons.Menu />
					</span>
					<span>Menu</span>
				</button>

				<div className="search" role="search">
					<span className="icon">
						<Icons.Search />
					</span>
					<span>Search LoopQA</span>
				</div>
			</div>

			<div className="topbar-right">
				<div className="top-actions">
					<span className="icon" aria-hidden="true">
						<Icons.Bell />
					</span>
					<span className="avatar" aria-hidden="true" />
				</div>
			</div>
		</div>
	);
}
