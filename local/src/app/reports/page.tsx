/**
 * Route segment: `/reports`
 *
 * Markup mirrors `platform-reference/reports.html`.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Reports · LoopQA",
};

export default function ReportsPage() {
  return (
    <PlatformShell activeHref="/reports">
      <div className="page-title">Reports</div>
      <div className="subtitle">
        Build, schedule, and export audit and executive reports with trend summaries and
        evidence coverage.
      </div>

      <div className="kpi-grid">
        <section className="card">
          <div className="card-header">
            <span>Saved reports</span>
            <span className="pill purple">Templates</span>
          </div>
          <div className="metric-value">28</div>
          <div className="metric-sub">
            Reusable report definitions across executive, audit, and team views.
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <span>Scheduled</span>
            <span className="pill green">Healthy</span>
          </div>
          <div className="metric-value">9</div>
          <div className="metric-sub">
            Recurring reports sending weekly and monthly to program owners.
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <span>Exports this month</span>
            <span className="pill amber">Busy</span>
          </div>
          <div className="metric-value">41</div>
          <div className="metric-sub">
            PDF, CSV, and evidence package exports generated in the last 30 days.
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <span>Evidence completeness</span>
            <span className="pill purple">92%</span>
          </div>
          <div className="metric-value">92%</div>
          <div className="metric-sub">
            Average completeness for report sections pulling linked controls and
            documents.
          </div>
        </section>
      </div>

      <div className="two-col" style={{ marginTop: 14 }}>
        <section className="card">
          <div className="card-header">
            <span>Report templates</span>
            <span className="pill purple">Most used</span>
          </div>
          <div className="stack-list">
            <div className="task-item">
              <strong>Executive posture summary</strong>
              <p>
                Score trend, open findings, evidence freshness, and top business risks for
                leadership review.
              </p>
              <div className="task-meta">
                <span className="pill purple">Executive</span>
                <span className="pill green">Saved</span>
              </div>
            </div>
            <div className="task-item">
              <strong>SOC 2 audit package</strong>
              <p>
                Requirement mapping, missing evidence, and owner notes prepared for
                external auditors.
              </p>
              <div className="task-meta">
                <span className="pill amber">Audit</span>
                <span className="pill purple">SOC 2</span>
              </div>
            </div>
            <div className="task-item">
              <strong>Vendor due diligence export</strong>
              <p>
                Review history, questionnaires, and residual risk for procurement and
                security teams.
              </p>
              <div className="task-meta">
                <span className="pill purple">Vendors</span>
                <span className="pill amber">Export</span>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Upcoming deliveries</span>
            <span className="pill amber">3 due soon</span>
          </div>
          <div className="stack-list">
            <div className="task-item">
              <strong>Board monthly risk digest</strong>
              <p>Tuesday · 8 recipients · Includes residual risk and remediation aging</p>
              <div className="task-meta">
                <span className="pill amber">Tuesday</span>
                <span className="pill purple">8 recipients</span>
              </div>
            </div>
            <div className="task-item">
              <strong>Q2 customer trust packet</strong>
              <p>
                Thursday · 2 recipients · Pulls policies, certificates, and control
                snapshots
              </p>
              <div className="task-meta">
                <span className="pill amber">Thursday</span>
                <span className="pill purple">2 recipients</span>
              </div>
            </div>
            <div className="task-item">
              <strong>Internal readiness review</strong>
              <p>
                Friday · 6 recipients · Focused on stale evidence and owners with blockers
              </p>
              <div className="task-meta">
                <span className="pill amber">Friday</span>
                <span className="pill purple">6 recipients</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
