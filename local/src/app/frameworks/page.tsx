/**
 * Route segment: `/frameworks`
 *
 * Markup mirrors `platform-reference/frameworks.html`.
 */

import type { Metadata } from "next";

import { GlobalUiStateScreen } from "../../components/platform/GlobalUiStateScreen";
import { PlatformShell } from "../../components/platform/PlatformShell";
import { getGlobalUiState } from "../../lib/uiState";

export const metadata: Metadata = {
  title: "Frameworks · LoopQA",
};

export default function FrameworksPage() {
  const uiState = getGlobalUiState();
  if (uiState !== "NORMAL") {
    return <GlobalUiStateScreen uiState={uiState} activeHref="/frameworks" />;
  }

  return (
    <PlatformShell activeHref="/frameworks">
      <div className="page-title">Frameworks</div>
      <div className="subtitle">
        See how every active framework is progressing, where control coverage is thin, and
        what evidence still needs attention.
      </div>

      <div className="three-col">
        <section className="card">
          <div className="card-header">
            <span>SOC 2</span>
            <span className="pill purple">81%</span>
          </div>
          <div className="metric-value">27</div>
          <div className="metric-sub">
            Controls mapped. 3 gaps need evidence or reviewer confirmation.
          </div>
          <div className="progress-track">
            <span style={{ width: "81%" }} />
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>ISO 27001</span>
            <span className="pill purple">74%</span>
          </div>
          <div className="metric-value">42</div>
          <div className="metric-sub">
            Requirements tracked. 7 gaps currently need owner updates.
          </div>
          <div className="progress-track">
            <span style={{ width: "74%" }} />
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>HIPAA</span>
            <span className="pill purple">63%</span>
          </div>
          <div className="metric-value">29</div>
          <div className="metric-sub">
            Safeguards tracked. 8 are pending evidence or review.
          </div>
          <div className="progress-track">
            <span style={{ width: "63%" }} />
          </div>
        </section>
      </div>

      <section className="card table-card">
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
            />
            <select className="table-filter" id="frameworksFilter">
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
              <tr data-filter="active">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">SO</span>SOC 2
                  </div>
                </td>
                <td>
                  <span className="pill purple">Active</span>
                </td>
                <td>GRC Team</td>
                <td>27 mapped</td>
                <td>81%</td>
                <td>Fieldwork prep · Apr 9</td>
              </tr>
              <tr data-filter="active">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">IS</span>ISO 27001
                  </div>
                </td>
                <td>
                  <span className="pill purple">Active</span>
                </td>
                <td>Security Program</td>
                <td>42 tracked</td>
                <td>74%</td>
                <td className="wrap">Statement of applicability refresh</td>
              </tr>
              <tr data-filter="attention">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">HI</span>HIPAA
                  </div>
                </td>
                <td>
                  <span className="pill amber">Needs attention</span>
                </td>
                <td>Privacy Office</td>
                <td>29 tracked</td>
                <td>63%</td>
                <td className="wrap">Complete access-control evidence bundle</td>
              </tr>
              <tr data-filter="planned">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">GD</span>GDPR
                  </div>
                </td>
                <td>
                  <span className="pill green">Planned</span>
                </td>
                <td>Privacy Office</td>
                <td>14 mapped</td>
                <td>31%</td>
                <td className="wrap">Add retention and DSAR workflows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </PlatformShell>
  );
}
