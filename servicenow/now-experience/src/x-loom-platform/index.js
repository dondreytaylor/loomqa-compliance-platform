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

import {renderAppShell} from './ui/appShell';
import {INITIAL_STATE} from './ui/state';

/**
 * JSX runtime shim
 *
 * Some ServiceNow / webpack toolchains compile JSX to `React.createElement(...)`
 * (classic runtime) even though Next Experience components are not React apps.
 *
 * When that happens, you’ll see a runtime error like: "React is not defined"
 * and nothing renders.
 *
 * The Snabbdom renderer already provides the correct JSX factory function
 * (`createElement`) and a `Fragment` implementation. We expose a minimal global
 * `React` object so the compiled output can run without adding React as a
 * dependency.
 */
if (typeof globalThis !== 'undefined') {
	const existing = globalThis.React;
	if (!existing) {
		globalThis.React = {
			createElement: snabbdom.createElement,
			Fragment: snabbdom.Fragment
		};
	} else {
		if (!existing.createElement) existing.createElement = snabbdom.createElement;
		if (!existing.Fragment) existing.Fragment = snabbdom.Fragment;
	}
}

/**
 * View function (UI Framework pattern).
 *
 * - `state` is your component state.
 * - The second argument includes helpers provided by the framework.
 * - `updateState(partial)` merges state and triggers a re-render.
 */
const view = (state, helpers) => renderAppShell(state, helpers);

/**
 * Component registration.
 *
 * The tag name here must match the one referenced in now-ui.json.
 */
createCustomElement('x-1962763-loom-platform', {
	renderer: {type: snabbdom},
	view,
	initialState: INITIAL_STATE,
	styles
});
