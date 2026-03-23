/*
 * Dashboard (Overview) renderer.
 *
 * This is a structured port of the local dashboard sections:
 * - Hero grid (score + metrics + findings panel)
 * - Mid grid (summary + recommended actions)
 * - Framework progress
 * - Connected systems table
 */

import {
	connectedSystems,
	dashboardCopy,
	findings,
	frameworks,
	heroMetrics,
	integrityScore,
	recommendedActions,
	securitySummary
} from '../data/dashboardData';
import {Icons} from '../icons/icons';
import {MODAL_KIND} from './state';

function Pill({className, children}) {
	return <span className={`pill ${className}`.trim()}>{children}</span>;
}

function MetricCard({title, value, pillText, pillClass, description, className}) {
	return (
		<section className={`card metric-card ${className}`.trim()}>
			<div className="card-header">
				<span>{title}</span>
				<span className={`pill ${pillClass ?? ''}`.trim()}>{pillText}</span>
			</div>
			<div className="metric-value">{value}</div>
			<div className="metric-sub">{description}</div>
		</section>
	);
}

function ControlGrid({done, warn, fail}) {
	const total = done + warn + fail;

	return (
		<div className="control-grid" aria-label="Control status grid">
			{Array.from({length: total}).map((_, idx) => {
				const cls = idx < done ? 'done' : idx < done + warn ? 'warn' : 'fail';
				return <span key={idx} className={cls} />;
			})}
		</div>
	);
}

export function renderDashboard(state, {updateState}) {
	// Filters
	const connectedSystemsQuery = (state.connectedSystemsQuery || '').trim().toLowerCase();
	const filteredSystems = connectedSystemsQuery
		? connectedSystems.filter((sys) => {
				const haystack = `${sys.source} ${sys.scope} ${sys.coverage} ${sys.lastScan}`.toLowerCase();
				return haystack.includes(connectedSystemsQuery);
			})
		: connectedSystems;

	const openFindingsListModal = () => {
		updateState({
			modal: {
				...state.modal,
				kind: MODAL_KIND.FINDINGS_LIST,
				title: 'Recent Findings & Drift',
				subtitle: '',
				searchEnabled: true,
				searchQuery: '',
				page: 1,
				selectedFindingId: null
			}
		});
	};

	const openConnectSystemModal = () => {
		updateState({
			modal: {
				...state.modal,
				kind: MODAL_KIND.CONNECT_SYSTEM,
				title: 'Connect system',
				subtitle: 'Add a new evidence source',
				searchEnabled: false,
				searchQuery: ''
			}
		});
	};

	const openSystemDetailsModal = (sys) => {
		updateState({
			modal: {
				...state.modal,
				kind: MODAL_KIND.CONNECTED_SYSTEM_DETAILS,
				title: sys.source,
				subtitle: sys.scope,
				searchEnabled: false,
				searchQuery: '',
				selectedSystemSource: sys.source
			}
		});
	};

	return (
		<>
			<div className="page-title">{dashboardCopy.pageTitle}</div>
			<div className="subtitle">{dashboardCopy.pageSubtitle}</div>

			<div className="hero-grid">
				<section className="card score-card score-span" attr-data-no-modal="1">
					<div className="ring-wrap">
						<div className="ring" />
						<div className="ring-value">
							<strong>{integrityScore.score}</strong>
							<span>/ 100</span>
						</div>
					</div>

					<div className="score-copy">
						<div className="card-header" style={{marginBottom: 6, paddingTop: 2}}>
							<span style={{display: 'flex', alignItems: 'center', gap: 8}}>
								<span className="icon">
									<Icons.Risk />
								</span>
								Integrity Score
							</span>
						</div>

						<h3>{integrityScore.heading}</h3>
						<p>{integrityScore.description}</p>

						<div style={{display: 'grid', gap: 10, marginTop: 12}}>
							{integrityScore.signals.map((signal) => (
								<div
									key={signal.pillText}
									style={{display: 'flex', alignItems: 'flex-start', gap: 10}}
								>
									<Pill className={signal.pillClass}>{signal.pillText}</Pill>
									<p className="metric-sub" style={{margin: 0}}>
										{signal.text}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{heroMetrics.map((metric) => (
					<MetricCard
						key={metric.title}
						title={metric.title}
						value={metric.value}
						pillText={metric.pillText}
						pillClass={metric.pillClass}
						description={metric.description}
						className={metric.className}
					/>
				))}

				<section className="card findings-panel">
					<div className="card-header">
						<span>Recent Findings &amp; Drift</span>
						<span className="pill amber">7 active</span>
					</div>

					<div className="findings-list">
						{findings.map((f) => (
							<div key={f.id} className={`finding ${f.variantClass}`.trim()}>
								<span className={`pill ${f.pillClass}`.trim()}>
									{f.severity}
								</span>
								<p>{f.text}</p>
							</div>
						))}
					</div>

					<div className="card-footer-row">
						<button className="btn" type="button" on-click={openFindingsListModal}>
							View more
						</button>
					</div>
				</section>
			</div>

			<div className="mid-grid">
				<section className="card">
					<div className="card-header">
						<span>Security Summary</span>
						<span className="pill green">Healthy trend</span>
					</div>

					<div className="summary-grid">
						{securitySummary.map((tile) => (
							<div key={tile.pillText} className="summary-item">
								<span className={`pill ${tile.pillClass}`.trim()}>
									{tile.pillText}
								</span>
								<h4>{tile.value}</h4>
								<p>{tile.description}</p>
							</div>
						))}
					</div>
				</section>

				<section className="card">
					<div className="card-header">
						<span>Recommended Actions</span>
						<span className="pill purple">Prioritized</span>
					</div>

					<div className="findings-list">
						{recommendedActions.map((item) => (
							<div key={item.title} className="task-item">
								<strong>{item.title}</strong>
								<p>{item.meta}</p>
								<div className="task-meta">
									{item.pills.map((pill) => (
										<span
											key={`${pill.text}-${pill.pillClass}`}
											className={`pill ${pill.pillClass}`.trim()}
										>
											{pill.text}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			</div>

			<section className="card" style={{marginTop: 14}}>
				<div className="card-header">
					<span>Framework Progress</span>
					<span className="pill purple">4 active frameworks</span>
				</div>

				<div className="framework-grid">
					{frameworks.map((fw) => (
						<section key={fw.name} className="card" style={{padding: 14}}>
							<div className="framework-top">
								<div className="left">
									<span className="mini-stat">{fw.short}</span>
									<div>
										<div>{fw.name}</div>
										<div
											style={{
												fontSize: 11.5,
												color: 'var(--muted)',
												marginTop: 4
											}}
										>
											{fw.subtext}
										</div>
									</div>
								</div>
								<span className="pill purple">{fw.completionPill}</span>
							</div>

							<div className="legend">
								<span>
									<span className="dot" style={{background: '#9e93ff'}} />
									Passing
								</span>
								<span>
									<span className="dot" style={{background: '#f7c870'}} />
									Pending
								</span>
								<span>
									<span className="dot" style={{background: '#f09696'}} />
									Failing
								</span>
							</div>

							<ControlGrid done={fw.done} warn={fw.warn} fail={fw.fail} />

							<div className="framework-progress">
								<div className="card-header" style={{margin: 0}}>
									<span>Mapped requirements</span>
									<span>{fw.mappedPercent}%</span>
								</div>
								<div className="progress-track">
									<span style={{width: `${fw.mappedPercent}%`}} />
								</div>
							</div>
						</section>
					))}
				</div>
			</section>

			<section className="card table-card" id="connectedSystemsCard">
				<div className="table-head">
					<div className="table-head-left">
						<div style={{fontSize: 15, fontWeight: 760}}>Connected Systems</div>
						<div className="table-refresh">
							Last refresh <span className="pill green">6 min ago</span>
						</div>
					</div>

					<div className="table-tools" aria-label="Connected systems tools">
						<input
							className="table-search"
							placeholder="Search connected systems"
							aria-label="Search connected systems"
							value={state.connectedSystemsQuery}
							on-input={(e) =>
								updateState({connectedSystemsQuery: e.target.value})
							}
						/>
						<button className="btn" type="button" on-click={openConnectSystemModal}>
							Add system
						</button>
					</div>
				</div>

				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>Source</th>
								<th>Asset Scope</th>
								<th>Health</th>
								<th>Coverage</th>
								<th>Last Scan</th>
							</tr>
						</thead>
						<tbody>
							{filteredSystems.map((sys) => (
								<tr
									key={sys.source}
									className="is-clickable"
									tabIndex={0}
									role="button"
									on-click={() => openSystemDetailsModal(sys)}
									on-keydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											openSystemDetailsModal(sys);
										}
									}}
								>
									<td>
										<div className="name-cell">
											<span className="brand-icon">{sys.short}</span>
											{sys.source}
										</div>
									</td>
									<td>{sys.scope}</td>
									<td>
										<span className={`pill ${sys.health.pillClass}`.trim()}>
											{sys.health.text}
										</span>
									</td>
									<td>{sys.coverage}</td>
									<td>{sys.lastScan}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
}
