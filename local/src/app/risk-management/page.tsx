/**
 * Route segment: `/risk-management`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/risk-management.html`.
 * - Keep class names + hierarchy aligned with the reference so global CSS
 *   in `src/app/dashboard.css` applies consistently across the prototype.
 * - Interactions (sidebar open/collapse + section toggles) come from
 *   `PlatformShell` → `PlatformBehavior` to match the reference inline script.
 */

import type { Metadata } from "next";

import { GlobalUiStateScreen } from "../../components/platform/GlobalUiStateScreen";
import { PlatformShell } from "../../components/platform/PlatformShell";
import { getGlobalUiState } from "../../lib/uiState";

export const metadata: Metadata = {
  title: "Risk Management · LoopQA",
};

export default function RiskManagementPage() {
  const uiState = getGlobalUiState();
  if (uiState !== "NORMAL") {
    return <GlobalUiStateScreen uiState={uiState} activeHref="/risk-management" />;
  }

  return (
    <PlatformShell activeHref="/risk-management">
      {/* Reference: <div class="page-title">Risk Management</div> */}
      <div className="page-title">Risk Management</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Maintain a living risk register with ownership, treatment plans, and residual
        impact visible across the business.
      </div>

      {/* Reference: <div class="kpi-grid">…</div> */}
      <div className="kpi-grid">
        <section className="card">
          <div className="card-header">
            <span>Total risks</span>
            <span className="pill purple">Register</span>
          </div>
          <div className="metric-value">37</div>
          <div className="metric-sub">
            Active strategic, operational, security, and vendor risks under review.
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>High residual</span>
            <span className="pill red">6</span>
          </div>
          <div className="metric-value">6</div>
          <div className="metric-sub">
            Risks still assessed as high after current controls or mitigations.
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Treatment plans</span>
            <span className="pill amber">11 open</span>
          </div>
          <div className="metric-value">11</div>
          <div className="metric-sub">
            Open mitigation workstreams tied to accepted or reducing risks.
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Reviewed this month</span>
            <span className="pill green">18</span>
          </div>
          <div className="metric-value">18</div>
          <div className="metric-sub">
            Risk records reviewed with fresh commentary and business impact notes.
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
