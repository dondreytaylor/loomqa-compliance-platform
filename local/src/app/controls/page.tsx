/**
 * Route segment: `/controls`
 *
 * Markup mirrors `platform-reference/controls.html`.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Controls · LoopQA",
};

export default function ControlsPage() {
  return (
    <PlatformShell activeHref="/controls">
      <div className="page-title">Controls</div>
      <div className="subtitle">
        Operate your control library with clear ownership, automation visibility, testing
        cadence, and open exceptions.
      </div>

      <div className="kpi-grid">
        <section className="card">
          <div className="card-header">
            <span>Total controls</span>
            <span className="pill purple">Library</span>
          </div>
          <div className="metric-value">133</div>
          <div className="metric-sub">
            Preventive, detective, and administrative controls across all programs.
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <span>Automated</span>
            <span className="pill green">61%</span>
          </div>
          <div className="metric-value">81</div>
          <div className="metric-sub">
            Controls with recurring evidence collection or sync-based validation in place.
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <span>Manual reviews</span>
            <span className="pill amber">18 due</span>
          </div>
          <div className="metric-value">29</div>
          <div className="metric-sub">
            Controls dependent on reviewer checklists, screenshots, or attestations.
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <span>Exceptions</span>
            <span className="pill red">5 active</span>
          </div>
          <div className="metric-value">5</div>
          <div className="metric-sub">
            Open control exceptions currently accepted with treatment plans.
          </div>
        </section>
      </div>

      <section className="card table-card">
        <div className="table-head">
          <div className="table-head-left">
            <div style={{ fontSize: 15, fontWeight: 760 }}>Control library details</div>
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
            />
            <select className="table-filter" id="controlsFilter">
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
              <tr data-filter="passing">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">AC</span>Access reviews
                  </div>
                </td>
                <td>Detective</td>
                <td>Identity Team</td>
                <td>Okta + HRIS</td>
                <td>
                  <span className="pill green">Passing</span>
                </td>
                <td>Apr 3</td>
              </tr>
              <tr data-filter="review">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">LG</span>Logging coverage
                  </div>
                </td>
                <td>Preventive</td>
                <td>Platform Security</td>
                <td>AWS + SIEM</td>
                <td>
                  <span className="pill amber">Needs review</span>
                </td>
                <td>Mar 28</td>
              </tr>
              <tr data-filter="exception">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">VE</span>Vendor reassessment cadence
                  </div>
                </td>
                <td>Administrative</td>
                <td>Procurement + Security</td>
                <td>Questionnaire workflow</td>
                <td>
                  <span className="pill red">Exception</span>
                </td>
                <td className="wrap">Open exception until May</td>
              </tr>
              <tr data-filter="passing">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">BK</span>Backup verification
                  </div>
                </td>
                <td>Detective</td>
                <td>Infrastructure</td>
                <td>Snapshot attestations</td>
                <td>
                  <span className="pill green">Passing</span>
                </td>
                <td>Apr 10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </PlatformShell>
  );
}
