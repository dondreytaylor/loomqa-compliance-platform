/*
 * Modal overlay renderer.
 *
 * The local prototype uses a single overlay with dynamic title/subtitle/body.
 * Here we keep the same structure, but render the body based on state.
 */

import {connectedSystems, findings} from '../data/dashboardData';
import {MODAL_KIND} from './state';

const FINDINGS_PAGE_SIZE = 6;

function getFindingItems() {
	// The local prototype has richer data and HTML snippets.
	// For the Now Experience port we derive a basic list from `findings`.
	return findings.map((f) => ({
		id: f.id,
		type: 'Finding',
		severity: f.severity,
		pill: f.pillClass,
		title: f.text,
		detailText: f.text,
		detailHtml: f.text
	}));
}

function renderFindingsList(state, {updateState}) {
	const items = getFindingItems();
	const query = (state.modal.searchQuery || '').trim().toLowerCase();
	const filtered = query
		? items.filter((i) => `${i.title} ${i.detailText}`.toLowerCase().includes(query))
		: items;

	const totalPages = Math.max(1, Math.ceil(filtered.length / FINDINGS_PAGE_SIZE));
	const page = Math.min(Math.max(1, state.modal.page || 1), totalPages);
	const start = (page - 1) * FINDINGS_PAGE_SIZE;
	const pageItems = filtered.slice(start, start + FINDINGS_PAGE_SIZE);

	const openItem = (item) => {
		updateState({
			modal: {
				...state.modal,
				kind: MODAL_KIND.FINDING_DETAIL,
				title: item.title,
				subtitle: `${item.type} · ${item.severity}`,
				searchEnabled: false,
				selectedFindingId: item.id
			}
		});
	};

	return (
		<div style={{display: 'flex', flexDirection: 'column', flex: '1', minHeight: 0}}>
			<div className="modal-scroll" style={{minHeight: 0}}>
				<div className="modal-list">
					{pageItems.length === 0 ? (
						<div className="task-item">
							<strong>No matches</strong>
							<p>Try a different search term.</p>
						</div>
					) : (
						pageItems.map((item) => (
							<div
								key={item.id}
								className="task-item is-clickable"
								tabIndex={0}
								role="button"
								on-click={(e) => {
									e.stopPropagation();
									openItem(item);
								}}
								on-keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										openItem(item);
									}
								}}
							>
								<strong>{item.title}</strong>
								<p>{item.detailText}</p>
								<div className="task-meta">
									<span className={`pill ${item.pill}`.trim()}>{item.type}</span>
									<span className={`pill ${item.pill}`.trim()}>{item.severity}</span>
								</div>
							</div>
						))
					)}
				</div>
			</div>

			<div className="pager">
				<button
					className="btn"
					type="button"
					on-click={() =>
						updateState({modal: {...state.modal, page: Math.max(1, page - 1)}})
					}
					disabled={page <= 1}
				>
					Prev
				</button>
				<div className="page-label">Page {page} of {totalPages}</div>
				<button
					className="btn"
					type="button"
					on-click={() =>
						updateState({
							modal: {...state.modal, page: Math.min(totalPages, page + 1)}
						})
					}
					disabled={page >= totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}

function renderFindingDetail(state, {updateState}) {
	const items = getFindingItems();
	const item = items.find((i) => i.id === state.modal.selectedFindingId) || items[0];

	return (
		<div>
			<div className="task-item">
				<strong>{item?.title ?? 'Finding'}</strong>
				<p>{item?.detailText ?? ''}</p>
				<div className="task-meta">
					<span className={`pill ${item?.pill ?? ''}`.trim()}>{item?.type}</span>
					<span className={`pill ${item?.pill ?? ''}`.trim()}>{item?.severity}</span>
				</div>
			</div>

			<div className="modal-actions">
				<button
					className="btn"
					type="button"
					on-click={() =>
						updateState({
							modal: {
								...state.modal,
								kind: MODAL_KIND.FINDINGS_LIST,
								title: 'Recent Findings & Drift',
								subtitle: '',
								searchEnabled: true
							}
						})
					}
				>
					Back
				</button>
				<button className="btn primary" type="button" on-click={() => updateState({modal: {...state.modal, kind: MODAL_KIND.NONE}})}>
					Acknowledge
				</button>
			</div>
		</div>
	);
}

function renderConnectedSystemDetails(state, {updateState}) {
	const sys = connectedSystems.find((s) => s.source === state.modal.selectedSystemSource);

	return (
		<div>
			<div className="form-grid" style={{gap: 12, marginTop: 2}}>
				<div className="task-item">
					<strong>Asset scope</strong>
					<p>{sys?.scope || '—'}</p>
				</div>
				<div className="task-item">
					<strong>Coverage</strong>
					<p>{sys?.coverage || '—'}</p>
				</div>
				<div className="task-item">
					<strong>Health</strong>
					<p>
						{sys?.health?.pillClass ? (
							<span className={`pill ${sys.health.pillClass}`.trim()}>
								{sys.health.text || '—'}
							</span>
						) : (
							sys?.health?.text || '—'
						)}
					</p>
				</div>
				<div className="task-item">
					<strong>Last scan</strong>
					<p>{sys?.lastScan || '—'}</p>
				</div>
			</div>

			<div className="modal-actions">
				<button className="btn" type="button" on-click={() => updateState({modal: {...state.modal, kind: MODAL_KIND.NONE}})}>
					Run sync
				</button>
				<button className="btn primary" type="button" on-click={() => updateState({modal: {...state.modal, kind: MODAL_KIND.NONE}})}>
					Manage connection
				</button>
			</div>
		</div>
	);
}

function renderConnectSystem(state, {updateState}) {
	return (
		<div>
			<div style={{display: 'grid', gap: 10, marginTop: 2}}>
				<div>
					<div style={{fontSize: 12, fontWeight: 750, marginBottom: 6}}>System</div>
					<select className="select" aria-label="System" defaultValue="okta">
						<option value="okta">Okta</option>
						<option value="github">GitHub</option>
						<option value="aws">AWS</option>
						<option value="kubernetes">Kubernetes</option>
					</select>
				</div>

				<div>
					<div style={{fontSize: 12, fontWeight: 750, marginBottom: 6}}>
						Workspace / Org
					</div>
					<input className="input" placeholder="e.g. company-prod" aria-label="Workspace or org" />
				</div>

				<div>
					<div style={{fontSize: 12, fontWeight: 750, marginBottom: 6}}>Access token</div>
					<input className="input" placeholder="Paste token" aria-label="Access token" />
				</div>
			</div>

			<div className="modal-actions">
				<button className="btn" type="button" on-click={() => updateState({modal: {...state.modal, kind: MODAL_KIND.NONE}})}>
					Cancel
				</button>
				<button className="btn primary" type="button" on-click={() => updateState({modal: {...state.modal, kind: MODAL_KIND.NONE}})}>
					Connect system
				</button>
			</div>
		</div>
	);
}

export function renderModalOverlay(state, {updateState}) {
	if (!state.modal || state.modal.kind === MODAL_KIND.NONE) return null;

	const close = () => updateState({modal: {...state.modal, kind: MODAL_KIND.NONE}});

	let body = null;
	if (state.modal.kind === MODAL_KIND.FINDINGS_LIST) body = renderFindingsList(state, {updateState});
	if (state.modal.kind === MODAL_KIND.FINDING_DETAIL) body = renderFindingDetail(state, {updateState});
	if (state.modal.kind === MODAL_KIND.CONNECTED_SYSTEM_DETAILS)
		body = renderConnectedSystemDetails(state, {updateState});
	if (state.modal.kind === MODAL_KIND.CONNECT_SYSTEM) body = renderConnectSystem(state, {updateState});

	const modalClassName =
		'modal' +
		(state.modal.kind === MODAL_KIND.FINDINGS_LIST ? ' is-wide is-list' : '');

	return (
		<div
			className="modal-overlay is-open"
			aria-hidden="false"
			on-click={(e) => {
				// Click-away closes only when clicking the overlay backdrop.
				if (e.target && e.target.classList && e.target.classList.contains('modal-overlay')) {
					close();
				}
			}}
		>
			<div className={modalClassName} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
				<div className="modal-head">
					<div className="modal-head-left">
						<div className="modal-title" id="modalTitle">
							{state.modal.title || 'Details'}
						</div>
						{state.modal.subtitle ? (
							<div className="modal-subtitle">{state.modal.subtitle}</div>
						) : (
							<div className="modal-subtitle" hidden />
						)}
					</div>

					<div className="modal-head-right">
						{state.modal.searchEnabled ? (
							<input
								className="table-search modal-head-search"
								placeholder={state.modal.searchPlaceholder || 'Search'}
								aria-label="Search"
								value={state.modal.searchQuery}
								on-input={(e) =>
									updateState({modal: {...state.modal, searchQuery: e.target.value, page: 1}})
								}
							/>
						) : (
							<input className="table-search modal-head-search" hidden />
						)}
						<button className="icon-btn" type="button" aria-label="Close modal" on-click={close}>
							✕
						</button>
					</div>
				</div>

				<div className="modal-body">{body}</div>
			</div>
		</div>
	);
}
