/*
 * Loom (ServiceNow UI Builder / Next Experience) — scaffold component
 *
 * IMPORTANT:
 * - UI Builder / Next Experience components are NOT React apps.
 * - They are custom elements created with ServiceNow's UI Framework
 *   (`@servicenow/ui-core`) and rendered using a supported renderer
 *   (here: Snabbdom via `@servicenow/ui-renderer-snabbdom`).
 *
 * This file is intentionally verbose and heavily commented so it’s easy to
 * extend into a real app while staying within ServiceNow’s Next Experience
 * patterns.
 */

import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

import {DEFAULT_TAB_KEY, TABS} from './tabs';

// Sidebar navigation model lives in ./tabs.js to keep this file focused on
// rendering and behavior.

/**
 * Small helper to map state -> current tab model.
 */
const getActiveTab = (activeTabKey) =>
	TABS.find((tab) => tab.key === activeTabKey) || TABS[0];

/**
 * View function (UI Framework pattern).
 *
 * - `state` is your component state.
 * - The second argument includes helpers provided by the framework.
 * - `updateState(partial)` merges state and triggers a re-render.
 */
const view = (state, {updateState}) => {
	// Persist the selected section in state.
	const activeTabKey = state.activeTab || DEFAULT_TAB_KEY;
	const activeTab = getActiveTab(activeTabKey);

	return (
		<div className="loom">
			{/* Left sidebar navigation */}
			<aside className="loom__sidebar">
				<div className="loom__brand">
					<div className="loom__brandTitle">Loom</div>
					<div className="loom__brandSubtitle">Next Experience</div>
				</div>

				<nav className="loom__nav" aria-label="Loom sections">
					{TABS.map((tab) => {
						const isActive = tab.key === activeTabKey;
						const className =
							'loom__navButton' +
							(isActive ? ' loom__navButton--active' : '');

						return (
							<button
								key={tab.key}
								type="button"
								className={className}
								// Snabbdom/ServiceNow UI Framework event binding
								on-click={() => updateState({activeTab: tab.key})}
							>
								{tab.label}
							</button>
						);
					})}
				</nav>
			</aside>

			{/* Main content area */}
			<main className="loom__main">
				<header className="loom__header">
					<h1 className="loom__title">{activeTab.label}</h1>
					<div className="loom__meta">This is a UI Builder component scaffold.</div>
				</header>

				<section className="loom__content" aria-label="Section content">
					<p className="loom__paragraph">
						Replace this content with your Next Experience implementation for{' '}
						<strong>{activeTab.label}</strong>.
					</p>

					<div className="loom__card">
						<div className="loom__cardTitle">Next steps</div>
						<ul className="loom__list">
							<li>Install SNC (`snc`) on your machine</li>
							<li>Deploy with `@servicenow/cli`</li>
							<li>Add the component to a UI Builder page</li>
							<li>Wire real data via instance APIs</li>
						</ul>
					</div>
				</section>
			</main>
		</div>
	);
};

/**
 * Component registration.
 *
 * The tag name here must match the one referenced in now-ui.json.
 */
createCustomElement('x-loom-platform', {
	renderer: {type: snabbdom},
	view,
	styles
});
