/**
 * Route segment: `/policies`
 *
 * Markup mirrors `platform-reference/policies.html`.
 */

import type { Metadata } from "next";

import { GlobalUiStateScreen } from "../../components/platform/GlobalUiStateScreen";
import { PlatformShell } from "../../components/platform/PlatformShell";
import { getGlobalUiState } from "../../lib/uiState";

export const metadata: Metadata = {
  title: "Policies · LoopQA",
};

export default function PoliciesPage() {
  const uiState = getGlobalUiState();
  if (uiState !== "NORMAL") {
    return <GlobalUiStateScreen uiState={uiState} activeHref="/policies" />;
  }

  return (
    <PlatformShell activeHref="/policies">
      <div className="page-title">Policies</div>
      <div className="subtitle">
        Keep policies current, approved, and acknowledged, while linking each document to
        frameworks, controls, and evidence.
      </div>

      <div className="two-col">
        <section className="card">
          <div className="card-header">
            <span>Policy lifecycle</span>
            <span className="pill purple">12 active</span>
          </div>

          <div
            className="summary-grid"
            style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
          >
            <div className="summary-item">
              <span className="pill green">Published</span>
              <h4>12</h4>
              <p>Policies currently approved and visible to employees.</p>
            </div>
            <div className="summary-item">
              <span className="pill amber">Pending review</span>
              <h4>3</h4>
              <p>Drafts awaiting legal, privacy, or security sign-off.</p>
            </div>
            <div className="summary-item">
              <span className="pill red">Outdated</span>
              <h4>2</h4>
              <p>Policies older than review SLA and due for refresh.</p>
            </div>
            <div className="summary-item">
              <span className="pill purple">Acknowledgements</span>
              <h4>94%</h4>
              <p>Staff completion on required annual policy attestations.</p>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Recently changed</span>
            <span className="pill amber">Attention</span>
          </div>

          <div className="stack-list">
            <div className="stack-row">
              <strong>Access Control Policy</strong>
              <p>
                Updated reviewer cadence for administrative privileges and linked to new
                access recertification control.
              </p>
            </div>
            <div className="stack-row">
              <strong>Vendor Management Standard</strong>
              <p>
                Added annual reassessment language and clarified security questionnaire
                requirements.
              </p>
            </div>
            <div className="stack-row">
              <strong>Acceptable Use Policy</strong>
              <p>
                Awaiting legal review on AI tooling and customer data handling language.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="card table-card">
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
            />
            <select className="table-filter" id="policiesFilter">
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
              <tr data-filter="published">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">AC</span>Access Control Policy
                  </div>
                </td>
                <td>
                  <span className="pill green">Published</span>
                </td>
                <td>Security Team</td>
                <td>12</td>
                <td>96%</td>
                <td>Annual review due Apr 14</td>
              </tr>
              <tr data-filter="review">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">AU</span>Acceptable Use Policy
                  </div>
                </td>
                <td>
                  <span className="pill amber">Pending review</span>
                </td>
                <td>Legal + Security</td>
                <td>5</td>
                <td>93%</td>
                <td className="wrap">Finalize AI tooling language</td>
              </tr>
              <tr data-filter="stale">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">VR</span>Vendor Management Standard
                  </div>
                </td>
                <td>
                  <span className="pill red">Outdated</span>
                </td>
                <td>Procurement</td>
                <td>8</td>
                <td>88%</td>
                <td className="wrap">Refresh reassessment requirements</td>
              </tr>
              <tr data-filter="published">
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">IR</span>Incident Response Policy
                  </div>
                </td>
                <td>
                  <span className="pill green">Published</span>
                </td>
                <td>Security Ops</td>
                <td>9</td>
                <td>98%</td>
                <td>Tabletop update in May</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </PlatformShell>
  );
}
