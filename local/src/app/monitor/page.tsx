/**
 * Route segment: `/monitor`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/monitor.html`.
 * - Keep class names + hierarchy aligned with the reference so global CSS
 *   in `src/app/dashboard.css` applies consistently across the prototype.
 * - Interactions (sidebar open/collapse + section toggles) come from
 *   `PlatformShell` → `PlatformBehavior` to match the reference inline script.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Monitor · LoopQA",
};

export default function MonitorPage() {
  return (
    <PlatformShell activeHref="/monitor">
      {/* Reference: <div class="page-title">Monitor</div> */}
      <div className="page-title">Monitor</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Observe drift, evidence freshness, and failing signals across connected systems so
        teams can respond before audit readiness slips.
      </div>

      {/* Reference: <div class="kpi-grid">…</div> */}
      <div className="kpi-grid">
        <section className="card">
          <div className="card-header">
            <span>Open alerts</span>
            <span className="pill red">9</span>
          </div>
          <div className="metric-value">9</div>
          <div className="metric-sub">
            Critical and high-priority system or evidence alerts that need attention.
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Fresh syncs</span>
            <span className="pill green">43</span>
          </div>
          <div className="metric-value">43</div>
          <div className="metric-sub">
            Connected systems reporting within their expected data collection window.
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Stale sources</span>
            <span className="pill amber">3</span>
          </div>
          <div className="metric-value">3</div>
          <div className="metric-sub">
            Sources whose evidence snapshots are delayed beyond threshold.
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Resolved today</span>
            <span className="pill purple">5</span>
          </div>
          <div className="metric-value">5</div>
          <div className="metric-sub">
            Alerts closed today after validation or remediation completion.
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
