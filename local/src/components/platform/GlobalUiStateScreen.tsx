import type { GlobalUiState } from "../../lib/uiState";

import { PlatformShell } from "./PlatformShell";

const LOADING_MARKUP = String.raw`
<div class="page-title">Overview</div>
<div class="subtitle">Track integrity posture, audit readiness, recent drift, and the next remediation steps across controls, frameworks, and integrated systems.</div>
<div class="hero-grid">
  <section class="card score-card score-span" data-no-modal="1">
    <div class="ring-wrap"><div class="skeleton" style="width:100%;height:100%;border-radius:50%"></div><div class="ring-value"><strong><span class="skeleton skel-line lg" style="width:54px;display:inline-block"></span></strong><span><span class="skeleton skel-line" style="width:96px;display:inline-block;margin-top:6px"></span></span></div></div>
    <div class="score-copy">
      <div class="card-header" style="margin-bottom:6px;padding-top:2px;"><span style="display:flex;align-items:center;gap:8px;"><span class="icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 4 5 7v5c0 4.4 3.1 7.8 7 8 3.9-.2 7-3.6 7-8V7l-7-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></span>Integrity Score</span></div>
      <h3><span class="skeleton skel-line lg" style="width:220px;display:inline-block"></span></h3>
      <p><span class="skeleton skel-line" style="width:94%;display:block"></span><span class="skeleton skel-line" style="width:78%;display:block;margin-top:8px"></span></p>
      <div style="display:grid;gap:10px;margin-top:12px">
        <div class="skel-row" style="align-items:flex-start">
          <span class="skeleton" style="width:84px;height:22px;border-radius:999px"></span>
          <div style="flex:1;min-width:0">
            <span class="skeleton skel-line" style="width:92%;display:block"></span>
            <span class="skeleton skel-line" style="width:64%;display:block;margin-top:8px"></span>
          </div>
        </div>
        <div class="skel-row" style="align-items:flex-start">
          <span class="skeleton" style="width:84px;height:22px;border-radius:999px"></span>
          <div style="flex:1;min-width:0">
            <span class="skeleton skel-line" style="width:90%;display:block"></span>
            <span class="skeleton skel-line" style="width:70%;display:block;margin-top:8px"></span>
          </div>
        </div>
        <div class="skel-row" style="align-items:flex-start">
          <span class="skeleton" style="width:84px;height:22px;border-radius:999px"></span>
          <div style="flex:1;min-width:0">
            <span class="skeleton skel-line" style="width:86%;display:block"></span>
            <span class="skeleton skel-line" style="width:62%;display:block;margin-top:8px"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="card metric-card open-findings-card"><div class="card-header"><span>Open Findings</span><span class="pill">Loading</span></div><div class="metric-value"><span class="skeleton skel-line xl" style="width:68%;display:block"></span></div><div class="metric-sub"><span class="skeleton skel-line" style="width:92%;display:block"></span><span class="skeleton skel-line" style="width:70%;display:block;margin-top:8px"></span></div></section>
  <section class="card metric-card passing-controls-card"><div class="card-header"><span>Passing Controls</span><span class="pill">Loading</span></div><div class="metric-value"><span class="skeleton skel-line xl" style="width:58%;display:block"></span></div><div class="metric-sub"><span class="skeleton skel-line" style="width:90%;display:block"></span><span class="skeleton skel-line" style="width:62%;display:block;margin-top:8px"></span></div></section>
  <section class="card metric-card monitoring-card"><div class="card-header"><span>Monitoring Coverage</span><span class="pill">Loading</span></div><div class="metric-value"><span class="skeleton skel-line xl" style="width:64%;display:block"></span></div><div class="metric-sub"><span class="skeleton skel-line" style="width:88%;display:block"></span><span class="skeleton skel-line" style="width:66%;display:block;margin-top:8px"></span></div></section>
  <section class="card metric-card evidence-card"><div class="card-header"><span>Evidence Freshness</span><span class="pill">Loading</span></div><div class="metric-value"><span class="skeleton skel-line xl" style="width:52%;display:block"></span></div><div class="metric-sub"><span class="skeleton skel-line" style="width:92%;display:block"></span><span class="skeleton skel-line" style="width:74%;display:block;margin-top:8px"></span></div></section>
  <section class="card findings-panel"><div class="card-header"><span>Recent Findings & Drift</span><span class="pill">Loading</span></div><div class="findings-list" aria-busy="true" aria-live="polite">
    <div class="finding"><div class="skeleton" style="width:78px;height:22px;border-radius:999px"></div><div style="margin-top:10px"><span class="skeleton skel-line" style="width:94%;display:block"></span><span class="skeleton skel-line" style="width:70%;display:block;margin-top:8px"></span></div></div>
    <div class="finding"><div class="skeleton" style="width:78px;height:22px;border-radius:999px"></div><div style="margin-top:10px"><span class="skeleton skel-line" style="width:90%;display:block"></span><span class="skeleton skel-line" style="width:64%;display:block;margin-top:8px"></span></div></div>
    <div class="finding"><div class="skeleton" style="width:78px;height:22px;border-radius:999px"></div><div style="margin-top:10px"><span class="skeleton skel-line" style="width:92%;display:block"></span><span class="skeleton skel-line" style="width:72%;display:block;margin-top:8px"></span></div></div>
    <div class="finding"><div class="skeleton" style="width:78px;height:22px;border-radius:999px"></div><div style="margin-top:10px"><span class="skeleton skel-line" style="width:88%;display:block"></span><span class="skeleton skel-line" style="width:60%;display:block;margin-top:8px"></span></div></div>
  </div><div class="card-footer-row"><button class="btn" type="button" id="viewMoreFindings" disabled aria-disabled="true">Loading…</button></div></section>
</div>

<div class="mid-grid">
  <section class="card"><div class="card-header"><span>Security Summary</span><span class="pill">Loading</span></div><div class="summary-grid" aria-busy="true" aria-live="polite"><div class="summary-item"><span class="pill"><span class="skeleton skel-line" style="width:96px;display:inline-block"></span></span><h4><span class="skeleton skel-line lg" style="width:72%;display:inline-block"></span></h4><p><span class="skeleton skel-line" style="width:92%;display:block"></span><span class="skeleton skel-line" style="width:72%;display:block;margin-top:8px"></span></p></div><div class="summary-item"><span class="pill"><span class="skeleton skel-line" style="width:90px;display:inline-block"></span></span><h4><span class="skeleton skel-line lg" style="width:58%;display:inline-block"></span></h4><p><span class="skeleton skel-line" style="width:88%;display:block"></span><span class="skeleton skel-line" style="width:64%;display:block;margin-top:8px"></span></p></div><div class="summary-item"><span class="pill"><span class="skeleton skel-line" style="width:92px;display:inline-block"></span></span><h4><span class="skeleton skel-line lg" style="width:64%;display:inline-block"></span></h4><p><span class="skeleton skel-line" style="width:90%;display:block"></span><span class="skeleton skel-line" style="width:60%;display:block;margin-top:8px"></span></p></div><div class="summary-item"><span class="pill"><span class="skeleton skel-line" style="width:104px;display:inline-block"></span></span><h4><span class="skeleton skel-line lg" style="width:52%;display:inline-block"></span></h4><p><span class="skeleton skel-line" style="width:92%;display:block"></span><span class="skeleton skel-line" style="width:66%;display:block;margin-top:8px"></span></p></div></div></section>
  <section class="card"><div class="card-header"><span>Recommended Actions</span><span class="pill">Loading</span></div><div class="findings-list" aria-busy="true" aria-live="polite">
    <div class="task-item"><strong><span class="skeleton skel-line lg" style="width:86%;display:inline-block"></span></strong><p><span class="skeleton skel-line" style="width:72%;display:block"></span></p><div class="task-meta"><span class="pill"><span class="skeleton skel-line" style="width:68px;display:inline-block"></span></span><span class="pill"><span class="skeleton skel-line" style="width:56px;display:inline-block"></span></span></div></div>
    <div class="task-item"><strong><span class="skeleton skel-line lg" style="width:80%;display:inline-block"></span></strong><p><span class="skeleton skel-line" style="width:66%;display:block"></span></p><div class="task-meta"><span class="pill"><span class="skeleton skel-line" style="width:74px;display:inline-block"></span></span><span class="pill"><span class="skeleton skel-line" style="width:52px;display:inline-block"></span></span></div></div>
    <div class="task-item"><strong><span class="skeleton skel-line lg" style="width:76%;display:inline-block"></span></strong><p><span class="skeleton skel-line" style="width:62%;display:block"></span></p><div class="task-meta"><span class="pill"><span class="skeleton skel-line" style="width:62px;display:inline-block"></span></span><span class="pill"><span class="skeleton skel-line" style="width:70px;display:inline-block"></span></span></div></div>
  </div></section>
</div>

<section class="card" style="margin-top:14px"><div class="card-header"><span>Framework Progress</span><span class="pill">Loading</span></div><div class="framework-grid" aria-busy="true" aria-live="polite">
  <section class="card" style="padding:14px"><div class="framework-top"><div class="left"><span class="mini-stat"><span class="skeleton skel-line" style="width:18px;display:inline-block"></span></span><div><div><span class="skeleton skel-line" style="width:110px;display:inline-block"></span></div><div style="font-size:11.5px;color:var(--muted);margin-top:4px"><span class="skeleton skel-line" style="width:150px;display:inline-block"></span></div></div></div><span class="pill"><span class="skeleton skel-line" style="width:86px;display:inline-block"></span></span></div><div class="legend"><span><span class="dot" style="background:#ededf4"></span><span class="skeleton skel-line" style="width:58px;display:inline-block"></span></span><span><span class="dot" style="background:#ededf4"></span><span class="skeleton skel-line" style="width:58px;display:inline-block"></span></span><span><span class="dot" style="background:#ededf4"></span><span class="skeleton skel-line" style="width:58px;display:inline-block"></span></span></div><div class="skeleton" style="height:10px;border-radius:999px"></div><div class="framework-progress"><div class="card-header" style="margin:0"><span>Mapped requirements</span><span><span class="skeleton skel-line" style="width:34px;display:inline-block"></span></span></div><div class="progress-track"><span class="skeleton" style="width:62%;height:100%;display:block;border:0"></span></div></div></section>
  <section class="card" style="padding:14px"><div class="framework-top"><div class="left"><span class="mini-stat"><span class="skeleton skel-line" style="width:18px;display:inline-block"></span></span><div><div><span class="skeleton skel-line" style="width:120px;display:inline-block"></span></div><div style="font-size:11.5px;color:var(--muted);margin-top:4px"><span class="skeleton skel-line" style="width:160px;display:inline-block"></span></div></div></div><span class="pill"><span class="skeleton skel-line" style="width:86px;display:inline-block"></span></span></div><div class="legend"><span><span class="dot" style="background:#ededf4"></span><span class="skeleton skel-line" style="width:58px;display:inline-block"></span></span><span><span class="dot" style="background:#ededf4"></span><span class="skeleton skel-line" style="width:58px;display:inline-block"></span></span><span><span class="dot" style="background:#ededf4"></span><span class="skeleton skel-line" style="width:58px;display:inline-block"></span></span></div><div class="skeleton" style="height:10px;border-radius:999px"></div><div class="framework-progress"><div class="card-header" style="margin:0"><span>Mapped requirements</span><span><span class="skeleton skel-line" style="width:34px;display:inline-block"></span></span></div><div class="progress-track"><span class="skeleton" style="width:58%;height:100%;display:block;border:0"></span></div></div></section>
</div></section>

<section class="card table-card" id="connectedSystemsCard"><div class="table-head"><div class="table-head-left"><div style="font-size:15px;font-weight:760">Connected Systems</div><div class="table-refresh">Last refresh <span class="pill">Loading</span></div></div><div class="table-tools" aria-label="Connected systems tools"><input class="table-search" id="connectedSystemsSearch" placeholder="Search connected systems" aria-label="Search connected systems" /><button class="btn" type="button" id="addSystemBtn" disabled aria-disabled="true">Add system</button></div></div><div class="table-wrap"><table id="connectedSystemsTable"><thead><tr><th>Source</th><th>Asset Scope</th><th>Health</th><th>Coverage</th><th>Last Scan</th></tr></thead><tbody aria-busy="true" aria-live="polite">
  <tr><td><div class="name-cell"><span class="brand-icon"><span class="skeleton skel-circle" style="width:28px;height:28px;display:inline-block"></span></span><span class="skeleton skel-line" style="width:92px;display:inline-block"></span></div></td><td><span class="skeleton skel-line" style="width:180px;display:inline-block"></span></td><td><span class="skeleton" style="width:86px;height:22px;border-radius:999px;display:inline-block"></span></td><td><span class="skeleton skel-line" style="width:120px;display:inline-block"></span></td><td><span class="skeleton skel-line" style="width:110px;display:inline-block"></span></td></tr>
  <tr><td><div class="name-cell"><span class="brand-icon"><span class="skeleton skel-circle" style="width:28px;height:28px;display:inline-block"></span></span><span class="skeleton skel-line" style="width:86px;display:inline-block"></span></div></td><td><span class="skeleton skel-line" style="width:168px;display:inline-block"></span></td><td><span class="skeleton" style="width:86px;height:22px;border-radius:999px;display:inline-block"></span></td><td><span class="skeleton skel-line" style="width:132px;display:inline-block"></span></td><td><span class="skeleton skel-line" style="width:104px;display:inline-block"></span></td></tr>
  <tr><td><div class="name-cell"><span class="brand-icon"><span class="skeleton skel-circle" style="width:28px;height:28px;display:inline-block"></span></span><span class="skeleton skel-line" style="width:78px;display:inline-block"></span></div></td><td><span class="skeleton skel-line" style="width:156px;display:inline-block"></span></td><td><span class="skeleton" style="width:86px;height:22px;border-radius:999px;display:inline-block"></span></td><td><span class="skeleton skel-line" style="width:114px;display:inline-block"></span></td><td><span class="skeleton skel-line" style="width:118px;display:inline-block"></span></td></tr>
  <tr><td><div class="name-cell"><span class="brand-icon"><span class="skeleton skel-circle" style="width:28px;height:28px;display:inline-block"></span></span><span class="skeleton skel-line" style="width:110px;display:inline-block"></span></div></td><td><span class="skeleton skel-line" style="width:176px;display:inline-block"></span></td><td><span class="skeleton" style="width:86px;height:22px;border-radius:999px;display:inline-block"></span></td><td><span class="skeleton skel-line" style="width:126px;display:inline-block"></span></td><td><span class="skeleton skel-line" style="width:96px;display:inline-block"></span></td></tr>
</tbody></table></div></section>
`;

const EMPTY_MARKUP = String.raw`
<div class="page-title">Overview</div>
<div class="subtitle">Track integrity posture, audit readiness, recent drift, and the next remediation steps across controls, frameworks, and integrated systems.</div>
<div class="hero-grid">
  <section class="card score-card score-span" data-no-modal="1">
    <div class="ring-wrap"><div class="ring"></div><div class="ring-value"><strong>—</strong><span>no data yet</span></div></div>
    <div class="score-copy">
      <div class="card-header" style="margin-bottom:6px;padding-top:2px;"><span style="display:flex;align-items:center;gap:8px;"><span class="icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 4 5 7v5c0 4.4 3.1 7.8 7 8 3.9-.2 7-3.6 7-8V7l-7-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></span>Integrity Score</span></div>
      <h3>No integrity data yet</h3>
      <p>There’s nothing to score until systems and frameworks are connected for this workspace.</p>
      <div style="margin-top:12px">
        <div class="state state-empty" role="status" aria-live="polite">
          <div class="state-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7h16v10H4V7Z" stroke="currentColor" stroke-width="1.7"/><path d="M8 7V5h8v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M9 12h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
          </div>
          <div style="min-width:0">
            <h4>Waiting for data</h4>
            <p>Connect sources to begin generating evidence freshness, drift, and control health metrics.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="card metric-card open-findings-card"><div class="card-header"><span>Open Findings</span><span class="pill">No data</span></div><div class="metric-value">—</div><div class="metric-sub"><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 8h8M8 12h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M7 4h6l4 4v12H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M13 4v4h4" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></div><div><h4>No findings returned</h4><p>There are no findings to show for the selected workspace.</p></div></div></div></section>
  <section class="card metric-card passing-controls-card"><div class="card-header"><span>Passing Controls</span><span class="pill">No data</span></div><div class="metric-value">—</div><div class="metric-sub"><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9.5 12.5 11.2 14 14.8 10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4 5 7v5c0 4.4 3.1 7.8 7 8 3.9-.2 7-3.6 7-8V7l-7-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></div><div><h4>No control status yet</h4><p>Connect control mappings to populate pass/fail counts.</p></div></div></div></section>
  <section class="card metric-card monitoring-card"><div class="card-header"><span>Monitoring Coverage</span><span class="pill">No data</span></div><div class="metric-value">—</div><div class="metric-sub"><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 15 9 11l3 3 7-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 19h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></div><div><h4>No coverage to report</h4><p>Add integrations to start tracking monitoring coverage.</p></div></div></div></section>
  <section class="card metric-card evidence-card"><div class="card-header"><span>Evidence Freshness</span><span class="pill">No data</span></div><div class="metric-value">—</div><div class="metric-sub"><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 5h7l4 4v10H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 5v4h4" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 13h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></div><div><h4>No evidence signals yet</h4><p>Once sources are connected, freshness and staleness checks will appear here.</p></div></div></div></section>
  <section class="card findings-panel"><div class="card-header"><span>Recent Findings & Drift</span><span class="pill">No data</span></div><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.7"/><path d="M20 20l-4.2-4.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></div><div style="min-width:0"><h4>No recent activity</h4><p>No findings or drift signals were returned. Once monitoring is enabled, updates will appear here.</p></div></div><div class="card-footer-row"><button class="btn" type="button" id="viewMoreFindings" disabled aria-disabled="true">View findings</button></div></section>
</div>

<div class="mid-grid">
  <section class="card"><div class="card-header"><span>Security Summary</span><span class="pill">No data</span></div><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 13h7V4H4v9Zm9 7h7V4h-7v16ZM4 20h7v-5H4v5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></div><div style="min-width:0"><h4>No summary metrics yet</h4><p>This section will populate after control mappings and evidence signals are available.</p></div></div></section>
  <section class="card"><div class="card-header"><span>Recommended Actions</span><span class="pill">No data</span></div><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 7h11M8 12h11M8 17h11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="5" cy="7" r="1.6" stroke="currentColor" stroke-width="1.7"/><circle cx="5" cy="12" r="1.6" stroke="currentColor" stroke-width="1.7"/><circle cx="5" cy="17" r="1.6" stroke="currentColor" stroke-width="1.7"/></svg></div><div style="min-width:0"><h4>No actions returned</h4><p>Once findings and ownership data are available, recommended actions will appear here.</p></div></div></section>
</div>

<section class="card" style="margin-top:14px"><div class="card-header"><span>Framework Progress</span><span class="pill">No data</span></div><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="4" rx="2" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="14" width="16" height="4" rx="2" stroke="currentColor" stroke-width="1.7"/></svg></div><div style="min-width:0"><h4>No active frameworks</h4><p>Framework progress will show once at least one framework is enabled and mapped.</p></div></div></section>

<section class="card table-card" id="connectedSystemsCard"><div class="table-head"><div class="table-head-left"><div style="font-size:15px;font-weight:760">Connected Systems</div><div class="table-refresh">Last refresh <span class="pill">No data</span></div></div><div class="table-tools" aria-label="Connected systems tools"><input class="table-search" id="connectedSystemsSearch" placeholder="Search connected systems" aria-label="Search connected systems" /><button class="btn" type="button" id="addSystemBtn">Add system</button></div></div><div class="table-wrap"><table id="connectedSystemsTable"><thead><tr><th>Source</th><th>Asset Scope</th><th>Health</th><th>Coverage</th><th>Last Scan</th></tr></thead><tbody><tr><td colspan="5" class="wrap"><div class="state state-empty" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7h16v10H4V7Z" stroke="currentColor" stroke-width="1.7"/><path d="M8 7V5h8v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M8 17h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></div><div style="min-width:0"><h4>No connected systems</h4><p>Add a system to start collecting evidence, scans, and drift signals.</p></div></div></td></tr></tbody></table></div></section>
`;

const ERRORED_MARKUP = String.raw`
<div class="page-title">Overview</div>
<div class="subtitle">Track integrity posture, audit readiness, recent drift, and the next remediation steps across controls, frameworks, and integrated systems.</div>
<div class="hero-grid">
  <section class="card score-card score-span" data-no-modal="1">
    <div class="ring-wrap"><div class="ring"></div><div class="ring-value"><strong>—</strong></div></div>
    <div class="score-copy">
      <div class="card-header" style="margin-bottom:6px;padding-top:2px;"><span style="display:flex;align-items:center;gap:8px;"><span class="icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 4 5 7v5c0 4.4 3.1 7.8 7 8 3.9-.2 7-3.6 7-8V7l-7-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></span>Integrity Score</span></div>
      <h3>Unable to load posture</h3>
      <p>We couldn’t retrieve integrity metrics for this workspace right now.</p>
      <div style="margin-top:12px">
        <div class="state state-error" role="status" aria-live="polite">
          <div class="state-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          </div>
          <div style="min-width:0">
            <h4>Integrity score unavailable</h4>
            <p>Metrics and freshness signals failed to load. Check your connection or try again.</p>
            <div class="state-actions"><button class="btn" type="button">Retry</button></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="card metric-card open-findings-card"><div class="card-header"><span>Open Findings</span><span class="pill red">Unavailable</span></div><div class="metric-value">—</div><div class="metric-sub"><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div><h4>Couldn’t load findings</h4><p>Finding totals and severity breakdown are temporarily unavailable.</p></div></div></div></section>
  <section class="card metric-card passing-controls-card"><div class="card-header"><span>Passing Controls</span><span class="pill red">Unavailable</span></div><div class="metric-value">—</div><div class="metric-sub"><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div><h4>Couldn’t load control status</h4><p>Passing/failed counts and trend data failed to load.</p></div></div></div></section>
  <section class="card metric-card monitoring-card"><div class="card-header"><span>Monitoring Coverage</span><span class="pill red">Unavailable</span></div><div class="metric-value">—</div><div class="metric-sub"><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div><h4>Coverage unavailable</h4><p>We couldn’t load integrated source coverage for this workspace.</p></div></div></div></section>
  <section class="card metric-card evidence-card"><div class="card-header"><span>Evidence Freshness</span><span class="pill red">Unavailable</span></div><div class="metric-value">—</div><div class="metric-sub"><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div><h4>Freshness unavailable</h4><p>Evidence age and stale-source checks failed to load.</p></div></div></div></section>
  <section class="card findings-panel"><div class="card-header"><span>Recent Findings & Drift</span><span class="pill red">Unavailable</span></div><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div style="min-width:0"><h4>Couldn’t load recent drift</h4><p>The findings feed didn’t return data. Try again in a moment.</p><div class="state-actions"><button class="btn" type="button" id="viewMoreFindings">Retry</button></div></div></div></section>
</div>

<div class="mid-grid">
  <section class="card"><div class="card-header"><span>Security Summary</span><span class="pill red">Unavailable</span></div><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div style="min-width:0"><h4>Summary metrics failed to load</h4><p>Control counts, risk totals, and evidence freshness couldn’t be retrieved.</p><div class="state-actions"><button class="btn" type="button">Retry</button></div></div></div></section>
  <section class="card"><div class="card-header"><span>Recommended Actions</span><span class="pill red">Unavailable</span></div><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div style="min-width:0"><h4>Couldn’t load recommended actions</h4><p>Action items and prioritization signals failed to load.</p><div class="state-actions"><button class="btn" type="button">Retry</button></div></div></div></section>
</div>

<section class="card" style="margin-top:14px"><div class="card-header"><span>Framework Progress</span><span class="pill red">Unavailable</span></div><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div style="min-width:0"><h4>Couldn’t load framework progress</h4><p>Framework mapping and control coverage didn’t return data.</p><div class="state-actions"><button class="btn" type="button">Retry</button></div></div></div></section>

<section class="card table-card" id="connectedSystemsCard"><div class="table-head"><div class="table-head-left"><div style="font-size:15px;font-weight:760">Connected Systems</div><div class="table-refresh">Last refresh <span class="pill red">Unavailable</span></div></div><div class="table-tools" aria-label="Connected systems tools"><input class="table-search" id="connectedSystemsSearch" placeholder="Search connected systems" aria-label="Search connected systems" /><button class="btn" type="button" id="addSystemBtn">Add system</button></div></div><div class="table-wrap"><table id="connectedSystemsTable"><thead><tr><th>Source</th><th>Asset Scope</th><th>Health</th><th>Coverage</th><th>Last Scan</th></tr></thead><tbody><tr><td colspan="5" class="wrap"><div class="state state-error" role="status" aria-live="polite"><div class="state-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div><div style="min-width:0"><h4>Couldn’t load connected systems</h4><p>Sources and scan timestamps failed to load. This may resolve after a retry.</p><div class="state-actions"><button class="btn" type="button">Retry</button></div></div></div></td></tr></tbody></table></div></section>
`;

type RouteMeta = {
  title: string;
  subtitle: string;
};

const DASHBOARD_META: RouteMeta = {
  title: "Overview",
  subtitle:
    "Track integrity posture, audit readiness, recent drift, and the next remediation steps across controls, frameworks, and integrated systems.",
};

const ROUTE_META: Record<string, RouteMeta> = {
  "/": DASHBOARD_META,
  "/controls": {
    title: "Controls",
    subtitle:
      "Operate your control library with clear ownership, automation visibility, testing cadence, and open exceptions.",
  },
  "/documents": {
    title: "Documents",
    subtitle:
      "Centralize audit evidence, working papers, policy artifacts, and screenshots with fast access to freshness and ownership.",
  },
  "/forms": {
    title: "Forms",
    subtitle:
      "Use forms for access requests, evidence intake, exception requests, and vendor questionnaires with clear workflow steps.",
  },
  "/frameworks": {
    title: "Frameworks",
    subtitle:
      "See how every active framework is progressing, where control coverage is thin, and what evidence still needs attention.",
  },
  "/help-center": {
    title: "Help Center",
    subtitle:
      "Find answers fast with workflow guides, audit prep articles, troubleshooting notes, and common setup references.",
  },
  "/integrations": {
    title: "Integrations",
    subtitle:
      "Manage connectors, sync scopes, authentication, and evidence collection health across the systems that power LoopQA.",
  },
  "/monitor": {
    title: "Monitor",
    subtitle:
      "Observe drift, evidence freshness, and failing signals across connected systems so teams can respond before audit readiness slips.",
  },
  "/participants": {
    title: "Participants",
    subtitle:
      "Understand who owns controls, who reviews evidence, and where team workload is concentrated across the program.",
  },
  "/policies": {
    title: "Policies",
    subtitle:
      "Keep policies current, approved, and acknowledged, while linking each document to frameworks, controls, and evidence.",
  },
  "/reports": {
    title: "Reports",
    subtitle:
      "Build, schedule, and export audit and executive reports with trend summaries and evidence coverage.",
  },
  "/risk-management": {
    title: "Risk Management",
    subtitle:
      "Maintain a living risk register with ownership, treatment plans, and residual impact visible across the business.",
  },
  "/settings": {
    title: "Settings",
    subtitle:
      "Tune notifications, scoring behavior, default workflows, and workspace settings without changing your overall design language.",
  },
  "/tasks": {
    title: "Tasks",
    subtitle:
      "Run remediation like an operations team: prioritize blockers, track ownership, and move work from triage to verification.",
  },
  "/vendors": {
    title: "Vendors",
    subtitle:
      "Coordinate vendor due diligence, reassessments, contract milestones, and corrective actions from one place.",
  },
};

function normalizePathname(activeHref: string) {
  const value = (activeHref ?? "").trim();
  if (!value) return "/";
  if (!value.startsWith("/")) return `/${value}`;
  return value;
}

function dashboardMarkupForState(uiState: GlobalUiState) {
  switch (uiState) {
    case "LOADING":
      return LOADING_MARKUP;
    case "EMPTY_DATA":
      return EMPTY_MARKUP;
    case "ERRORED":
      return ERRORED_MARKUP;
    case "NORMAL":
    default:
      return "";
  }
}

function SkeletonMetricCard({ label }: { label: string }) {
  return (
    <section className="card metric-card">
      <div className="card-header">
        <span>{label}</span>
        <span className="pill">Loading</span>
      </div>
      <div className="metric-value">
        <span
          className="skeleton skel-line xl"
          style={{ width: "62%", display: "block" }}
        />
      </div>
      <div className="metric-sub">
        <span className="skeleton skel-line" style={{ width: "92%", display: "block" }} />
        <span
          className="skeleton skel-line"
          style={{ width: "70%", display: "block", marginTop: 8 }}
        />
      </div>
    </section>
  );
}

function SkeletonCard({ title }: { title: string }) {
  return (
    <section className="card">
      <div className="card-header">
        <span>{title}</span>
        <span className="pill">Loading</span>
      </div>
      <div className="skel-stack" aria-hidden="true">
        <span
          className="skeleton skel-line lg"
          style={{ width: "76%", display: "block" }}
        />
        <span className="skeleton skel-line" style={{ width: "92%", display: "block" }} />
        <span className="skeleton skel-line" style={{ width: "84%", display: "block" }} />
        <span className="skeleton skel-line" style={{ width: "68%", display: "block" }} />
      </div>
    </section>
  );
}

function SkeletonTableCard({ title }: { title: string }) {
  return (
    <section className="card table-card" style={{ marginTop: 14 }}>
      <div className="table-head">
        <div className="table-head-left">
          <div style={{ fontSize: 15, fontWeight: 760 }}>{title}</div>
          <div className="table-refresh">
            Last refresh <span className="pill">Loading</span>
          </div>
        </div>
        <div className="table-tools">
          <span
            className="skeleton"
            style={{ width: 220, height: 36, borderRadius: 12 }}
          />
          <span
            className="skeleton"
            style={{ width: 110, height: 36, borderRadius: 12 }}
          />
        </div>
      </div>
      <div className="table-wrap" aria-hidden="true">
        <div className="skel-stack" style={{ padding: 18 }}>
          <span
            className="skeleton"
            style={{ width: "100%", height: 18, borderRadius: 10 }}
          />
          <span
            className="skeleton"
            style={{ width: "100%", height: 18, borderRadius: 10 }}
          />
          <span
            className="skeleton"
            style={{ width: "100%", height: 18, borderRadius: 10 }}
          />
          <span
            className="skeleton"
            style={{ width: "100%", height: 18, borderRadius: 10 }}
          />
        </div>
      </div>
    </section>
  );
}

function StatePanel({ uiState }: { uiState: Exclude<GlobalUiState, "NORMAL"> }) {
  if (uiState === "LOADING") {
    return (
      <div className="state state-loading" role="status" aria-live="polite">
        <div className="state-icon" aria-hidden="true">
          <span className="skeleton skel-circle" style={{ width: 18, height: 18 }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h4>Loading…</h4>
          <p>Fetching the latest data for this view.</p>
        </div>
      </div>
    );
  }

  if (uiState === "EMPTY_DATA") {
    return (
      <div className="state state-empty" role="status" aria-live="polite">
        <div className="state-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16v10H4V7Z" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M8 7V5h8v2"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M9 12h6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <h4>No data yet</h4>
          <p>
            This page is ready, but there’s nothing to show for the current workspace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="state state-error" role="status" aria-live="polite">
      <div className="state-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 9v5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 17h.01"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <h4>Unable to load</h4>
        <p>This view failed to load. Try again in a moment.</p>
        <div className="state-actions">
          <button className="btn" type="button">
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

function statePill(uiState: "EMPTY_DATA" | "ERRORED") {
  return uiState === "EMPTY_DATA"
    ? { label: "No data", className: "pill" }
    : { label: "Unavailable", className: "pill red" };
}

function StateBlurb({
  uiState,
  title,
  description,
}: {
  uiState: "EMPTY_DATA" | "ERRORED";
  title: string;
  description: string;
}) {
  const className = uiState === "EMPTY_DATA" ? "state state-empty" : "state state-error";

  return (
    <div className={className} role="status" aria-live="polite">
      <div className="state-icon" aria-hidden="true">
        {uiState === "EMPTY_DATA" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16v10H4V7Z" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M8 7V5h8v2"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M9 12h6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 9v5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M12 17h.01"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M10.2 4.8h3.6l7.4 13.1a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3L10.2 4.8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

function NonLoadingContentForRoute(pathname: string, uiState: "EMPTY_DATA" | "ERRORED") {
  const pill = statePill(uiState);

  switch (pathname) {
    case "/tasks":
      return (
        <section className="task-board" aria-live="polite">
          {[
            { label: "Triage", className: "triage" },
            { label: "In progress", className: "progress" },
            { label: "Verification", className: "verify" },
          ].map((column) => (
            <div className={`task-column ${column.className}`} key={column.label}>
              <div className="col-head">
                <h3>{column.label}</h3>
                <span className="task-count">—</span>
              </div>
              <StatePanel uiState={uiState} />
            </div>
          ))}
        </section>
      );

    case "/participants":
      return (
        <div className="three-col" aria-live="polite">
          {["Owners", "Reviewers", "Overloaded"].map((label) => (
            <section className="card" key={label}>
              <div className="card-header">
                <span>{label}</span>
                <span className={pill.className}>{pill.label}</span>
              </div>
              <div className="metric-value">—</div>
              <div className="metric-sub">
                <StateBlurb
                  uiState={uiState}
                  title={
                    uiState === "EMPTY_DATA"
                      ? "No participants yet"
                      : "Participants unavailable"
                  }
                  description={
                    uiState === "EMPTY_DATA"
                      ? "Ownership and reviewer assignments will appear once controls and workflows are configured."
                      : "We couldn’t load participant ownership and workload data right now."
                  }
                />
              </div>
            </section>
          ))}
        </div>
      );

    case "/monitor":
    case "/risk-management":
    case "/reports":
    case "/controls":
      return (
        <>
          <div className="kpi-grid" aria-live="polite">
            {pathname === "/controls" && (
              <>
                {["Total controls", "Automated", "Manual reviews", "Exceptions"].map(
                  (label) => (
                    <section className="card" key={label}>
                      <div className="card-header">
                        <span>{label}</span>
                        <span className={pill.className}>{pill.label}</span>
                      </div>
                      <div className="metric-value">—</div>
                      <div className="metric-sub">
                        <StateBlurb
                          uiState={uiState}
                          title={
                            uiState === "EMPTY_DATA"
                              ? "No control metrics yet"
                              : "Control metrics unavailable"
                          }
                          description={
                            uiState === "EMPTY_DATA"
                              ? "Connect frameworks and map controls to begin tracking automation and review status."
                              : "We couldn’t load control library totals and health signals for this workspace."
                          }
                        />
                      </div>
                    </section>
                  ),
                )}
              </>
            )}

            {pathname === "/reports" && (
              <>
                {[
                  "Saved reports",
                  "Scheduled",
                  "Exports this month",
                  "Evidence completeness",
                ].map((label) => (
                  <section className="card" key={label}>
                    <div className="card-header">
                      <span>{label}</span>
                      <span className={pill.className}>{pill.label}</span>
                    </div>
                    <div className="metric-value">—</div>
                    <div className="metric-sub">
                      <StateBlurb
                        uiState={uiState}
                        title={
                          uiState === "EMPTY_DATA"
                            ? "No report data yet"
                            : "Report metrics unavailable"
                        }
                        description={
                          uiState === "EMPTY_DATA"
                            ? "Saved templates and scheduled deliveries will appear once reporting is configured."
                            : "We couldn’t load report counts and evidence completeness signals right now."
                        }
                      />
                    </div>
                  </section>
                ))}
              </>
            )}

            {pathname === "/monitor" && (
              <>
                {["Open alerts", "Fresh syncs", "Stale sources", "Resolved today"].map(
                  (label) => (
                    <section className="card" key={label}>
                      <div className="card-header">
                        <span>{label}</span>
                        <span className={pill.className}>{pill.label}</span>
                      </div>
                      <div className="metric-value">—</div>
                      <div className="metric-sub">
                        <StateBlurb
                          uiState={uiState}
                          title={
                            uiState === "EMPTY_DATA"
                              ? "No monitoring signals yet"
                              : "Monitoring signals unavailable"
                          }
                          description={
                            uiState === "EMPTY_DATA"
                              ? "Add integrations to start generating alerts, freshness checks, and drift signals."
                              : "We couldn’t load alert and sync status for connected systems right now."
                          }
                        />
                      </div>
                    </section>
                  ),
                )}
              </>
            )}

            {pathname === "/risk-management" && (
              <>
                {[
                  "Total risks",
                  "High residual",
                  "Treatment plans",
                  "Reviewed this month",
                ].map((label) => (
                  <section className="card" key={label}>
                    <div className="card-header">
                      <span>{label}</span>
                      <span className={pill.className}>{pill.label}</span>
                    </div>
                    <div className="metric-value">—</div>
                    <div className="metric-sub">
                      <StateBlurb
                        uiState={uiState}
                        title={
                          uiState === "EMPTY_DATA"
                            ? "No risks yet"
                            : "Risk register unavailable"
                        }
                        description={
                          uiState === "EMPTY_DATA"
                            ? "Create a risk record to begin tracking treatment plans and residual impact."
                            : "We couldn’t load risk register totals and review metrics right now."
                        }
                      />
                    </div>
                  </section>
                ))}
              </>
            )}
          </div>

          {pathname === "/reports" && (
            <div className="two-col" style={{ marginTop: 14 }}>
              {[
                { title: "Report templates", blurb: "Saved templates will appear here." },
                {
                  title: "Upcoming deliveries",
                  blurb: "Scheduled deliveries will appear here.",
                },
              ].map((card) => (
                <section className="card" key={card.title}>
                  <div className="card-header">
                    <span>{card.title}</span>
                    <span className={pill.className}>{pill.label}</span>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <StatePanel uiState={uiState} />
                  </div>
                </section>
              ))}
            </div>
          )}

          {pathname === "/controls" && (
            <section className="card table-card" style={{ marginTop: 14 }}>
              <div className="table-head">
                <div className="table-head-left">
                  <div style={{ fontSize: 15, fontWeight: 760 }}>
                    Control library details
                  </div>
                  <div className="table-refresh">
                    Search controls and filter by current health.
                  </div>
                </div>
                <div className="table-tools">
                  <input
                    className="table-search"
                    id="controlsSearch"
                    type="search"
                    placeholder="Search controls"
                    disabled
                    aria-disabled="true"
                  />
                  <select
                    className="table-filter"
                    id="controlsFilter"
                    disabled
                    aria-disabled="true"
                  >
                    <option value="all">All health</option>
                    <option value="passing">Passing</option>
                    <option value="review">Needs review</option>
                    <option value="exception">Exceptions</option>
                  </select>
                </div>
              </div>

              <div className="table-wrap">
                <table id="controlsTable">
                  <thead>
                    <tr>
                      <th>Control</th>
                      <th>Type</th>
                      <th>Owner</th>
                      <th>Evidence Source</th>
                      <th>Health</th>
                      <th>Next Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="wrap">
                        <StatePanel uiState={uiState} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      );

    case "/frameworks":
      return (
        <>
          <div className="three-col" aria-live="polite">
            {["SOC 2", "ISO 27001", "HIPAA"].map((label) => (
              <section className="card" key={label}>
                <div className="card-header">
                  <span>{label}</span>
                  <span className={pill.className}>{pill.label}</span>
                </div>
                <div className="metric-value">—</div>
                <div className="metric-sub">
                  <StateBlurb
                    uiState={uiState}
                    title={
                      uiState === "EMPTY_DATA"
                        ? "No progress yet"
                        : "Progress unavailable"
                    }
                    description={
                      uiState === "EMPTY_DATA"
                        ? "Enable a framework and map controls to start tracking completion."
                        : "We couldn’t load framework completion and mapping signals right now."
                    }
                  />
                </div>
                <div className="progress-track" aria-hidden="true">
                  <span className="skeleton" style={{ width: "100%", border: 0 }} />
                </div>
              </section>
            ))}
          </div>

          <section className="card table-card" style={{ marginTop: 14 }}>
            <div className="table-head">
              <div className="table-head-left">
                <div style={{ fontSize: 15, fontWeight: 760 }}>Framework inventory</div>
                <div className="table-refresh">
                  Search frameworks and filter by status or audit stage.
                </div>
              </div>
              <div className="table-tools">
                <input
                  className="table-search"
                  id="frameworksSearch"
                  type="search"
                  placeholder="Search frameworks"
                  disabled
                  aria-disabled="true"
                />
                <select
                  className="table-filter"
                  id="frameworksFilter"
                  disabled
                  aria-disabled="true"
                >
                  <option value="all">All statuses</option>
                  <option value="active">Active</option>
                  <option value="attention">Needs attention</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            <div className="table-wrap">
              <table id="frameworksTable">
                <thead>
                  <tr>
                    <th>Framework</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Mapped Controls</th>
                    <th>Completion</th>
                    <th>Next Milestone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="wrap">
                      <StatePanel uiState={uiState} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      );

    case "/policies":
      return (
        <>
          <div className="two-col" aria-live="polite">
            <section className="card">
              <div className="card-header">
                <span>Policy lifecycle</span>
                <span className={pill.className}>{pill.label}</span>
              </div>
              <div
                className="summary-grid"
                style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
              >
                {["Published", "Pending review", "Outdated", "Acknowledgements"].map(
                  (label) => (
                    <div className="summary-item" key={label}>
                      <span className={pill.className}>{label}</span>
                      <h4>—</h4>
                      <p>
                        {uiState === "EMPTY_DATA"
                          ? "No policy data has been added for this workspace yet."
                          : "Policy lifecycle metrics failed to load."}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="card">
              <div className="card-header">
                <span>Recently changed</span>
                <span className={pill.className}>{pill.label}</span>
              </div>
              <div style={{ marginTop: 12 }}>
                <StatePanel uiState={uiState} />
              </div>
            </section>
          </div>

          <section className="card table-card" style={{ marginTop: 14 }}>
            <div className="table-head">
              <div className="table-head-left">
                <div style={{ fontSize: 15, fontWeight: 760 }}>Policy register</div>
                <div className="table-refresh">
                  Search policy documents and filter by lifecycle state.
                </div>
              </div>
              <div className="table-tools">
                <input
                  className="table-search"
                  id="policiesSearch"
                  type="search"
                  placeholder="Search policies"
                  disabled
                  aria-disabled="true"
                />
                <select
                  className="table-filter"
                  id="policiesFilter"
                  disabled
                  aria-disabled="true"
                >
                  <option value="all">All states</option>
                  <option value="published">Published</option>
                  <option value="review">Pending review</option>
                  <option value="stale">Outdated</option>
                </select>
              </div>
            </div>

            <div className="table-wrap">
              <table id="policiesTable">
                <thead>
                  <tr>
                    <th>Policy</th>
                    <th>State</th>
                    <th>Owner</th>
                    <th>Linked Controls</th>
                    <th>Acknowledgement</th>
                    <th>Next Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="wrap">
                      <StatePanel uiState={uiState} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      );

    case "/documents":
    case "/vendors":
      return (
        <div className="two-col" aria-live="polite">
          <section className="card">
            <div className="card-header">
              <span>
                {pathname === "/documents" ? "Evidence library" : "Review pipeline"}
              </span>
              <span className={pill.className}>{pill.label}</span>
            </div>
            <div
              className="summary-grid"
              style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
            >
              {[0, 1, 2, 3].map((index) => (
                <div className="summary-item" key={index}>
                  <span className={pill.className}>{pill.label}</span>
                  <h4>—</h4>
                  <p>
                    {uiState === "EMPTY_DATA"
                      ? "This workspace doesn’t have any records yet."
                      : "We couldn’t load summary metrics for this view."}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <span>
                {pathname === "/documents" ? "Upload queue" : "Current reviews"}
              </span>
              <span className={pill.className}>{pill.label}</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <StatePanel uiState={uiState} />
            </div>
          </section>
        </div>
      );

    case "/help-center":
    case "/integrations":
      return (
        <div className="two-col" aria-live="polite">
          <section className="card">
            <div className="card-header">
              <span>
                {pathname === "/help-center" ? "Popular articles" : "Connector health"}
              </span>
              <span className={pill.className}>{pill.label}</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <StatePanel uiState={uiState} />
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <span>
                {pathname === "/help-center" ? "Resources" : "Provisioning actions"}
              </span>
              <span className={pill.className}>{pill.label}</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <StatePanel uiState={uiState} />
            </div>
          </section>
        </div>
      );

    case "/forms":
    case "/settings":
      return (
        <div className="two-col" aria-live="polite">
          <section className="card">
            <div className="card-header">
              <span>
                {pathname === "/forms" ? "Create intake" : "Workspace defaults"}
              </span>
              <span className={pill.className}>{pill.label}</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <StatePanel uiState={uiState} />
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <span>
                {pathname === "/forms" ? "Submission pipeline" : "Notifications"}
              </span>
              <span className={pill.className}>{pill.label}</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <StatePanel uiState={uiState} />
            </div>
          </section>
        </div>
      );

    default:
      return null;
  }
}

function LoadingContentForRoute(pathname: string) {
  switch (pathname) {
    case "/tasks":
      return (
        <section className="task-board" aria-busy="true" aria-live="polite">
          {[
            { label: "Triage", className: "triage" },
            { label: "In progress", className: "progress" },
            { label: "Verify", className: "verify" },
          ].map((column) => (
            <div className={`task-column ${column.className}`} key={column.label}>
              <div className="col-head">
                <h3>
                  <span
                    className="skeleton skel-line"
                    style={{ width: 90, display: "inline-block" }}
                  />
                </h3>
                <span className="task-count">
                  <span
                    className="skeleton skel-line"
                    style={{ width: 14, display: "inline-block" }}
                  />
                </span>
              </div>

              {[0, 1, 2].map((index) => (
                <div className="task-item" key={index}>
                  <strong>
                    <span
                      className="skeleton skel-line lg"
                      style={{ width: "88%", display: "inline-block" }}
                    />
                  </strong>
                  <p>
                    <span
                      className="skeleton skel-line"
                      style={{ width: "76%", display: "block" }}
                    />
                  </p>
                  <div className="task-meta">
                    <span className="pill">
                      <span
                        className="skeleton skel-line"
                        style={{ width: 44, display: "inline-block" }}
                      />
                    </span>
                    <span className="pill">
                      <span
                        className="skeleton skel-line"
                        style={{ width: 54, display: "inline-block" }}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      );

    case "/participants":
      return (
        <div className="three-col" aria-busy="true" aria-live="polite">
          <SkeletonMetricCard label="Owners" />
          <SkeletonMetricCard label="Reviewers" />
          <SkeletonMetricCard label="Overloaded" />
        </div>
      );

    case "/frameworks":
      return (
        <>
          <div className="three-col" aria-busy="true" aria-live="polite">
            <SkeletonMetricCard label="SOC 2" />
            <SkeletonMetricCard label="ISO 27001" />
            <SkeletonMetricCard label="HIPAA" />
          </div>
          <SkeletonTableCard title="Framework mapping" />
        </>
      );

    case "/documents":
    case "/forms":
    case "/help-center":
    case "/integrations":
    case "/policies":
    case "/settings":
    case "/vendors":
      return (
        <div className="two-col" aria-busy="true" aria-live="polite">
          <SkeletonCard title="Loading" />
          <SkeletonCard title="Loading" />
        </div>
      );

    case "/reports":
      return (
        <>
          <div className="kpi-grid" aria-busy="true" aria-live="polite">
            <SkeletonMetricCard label="Saved reports" />
            <SkeletonMetricCard label="Scheduled" />
            <SkeletonMetricCard label="Exports" />
            <SkeletonMetricCard label="Evidence" />
          </div>
          <div className="two-col" style={{ marginTop: 14 }}>
            <SkeletonCard title="Templates" />
            <SkeletonCard title="Upcoming" />
          </div>
        </>
      );

    default:
      return (
        <>
          <div className="kpi-grid" aria-busy="true" aria-live="polite">
            <SkeletonMetricCard label="Loading" />
            <SkeletonMetricCard label="Loading" />
            <SkeletonMetricCard label="Loading" />
            <SkeletonMetricCard label="Loading" />
          </div>
          <SkeletonTableCard title="Loading" />
        </>
      );
  }
}

export function GlobalUiStateScreen({
  uiState,
  activeHref,
}: {
  uiState: GlobalUiState;
  activeHref: string;
}) {
  const pathname = normalizePathname(activeHref);
  const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];

  if (pathname === "/") {
    const markup = dashboardMarkupForState(uiState);
    return (
      <PlatformShell activeHref={pathname}>
        <div dangerouslySetInnerHTML={{ __html: markup }} />
      </PlatformShell>
    );
  }

  if (uiState === "NORMAL") {
    return (
      <PlatformShell activeHref={pathname}>
        <div className="page-title">{meta.title}</div>
        <div className="subtitle">{meta.subtitle}</div>
      </PlatformShell>
    );
  }

  return (
    <PlatformShell activeHref={pathname}>
      <div className="page-title">{meta.title}</div>
      <div className="subtitle">{meta.subtitle}</div>

      {uiState === "LOADING" ? (
        <div style={{ marginTop: 14 }}>{LoadingContentForRoute(pathname)}</div>
      ) : (
        <div style={{ marginTop: 14 }}>
          {NonLoadingContentForRoute(pathname, uiState) ?? (
            <section className="card">
              <div className="card-header">
                <span>Status</span>
                <span className={`pill ${uiState === "ERRORED" ? "red" : "purple"}`}>
                  {uiState === "EMPTY_DATA" ? "No data" : "Unavailable"}
                </span>
              </div>
              <StatePanel uiState={uiState} />
            </section>
          )}
        </div>
      )}
    </PlatformShell>
  );
}
