/**
 * Route segment: `/documents`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/documents.html`.
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
  title: "Documents · LoopQA",
};

export default function DocumentsPage() {
  const uiState = getGlobalUiState();
  if (uiState !== "NORMAL") {
    return <GlobalUiStateScreen uiState={uiState} activeHref="/documents" />;
  }

  return (
    <PlatformShell activeHref="/documents">
      {/* Reference: <div class="page-title">Documents</div> */}
      <div className="page-title">Documents</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Centralize audit evidence, working papers, policy artifacts, and screenshots with
        fast access to freshness and ownership.
      </div>

      {/* Reference: <div class="two-col">…</div> */}
      <div className="two-col">
        {/* Left card: Evidence library */}
        <section className="card">
          <div className="card-header">
            <span>Evidence library</span>
            <span className="pill purple">1,248 files</span>
          </div>

          {/*
           * Reference uses the shared `.summary-grid` styles but overrides to 2 columns:
           *   <div class="summary-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">
           */}
          <div
            className="summary-grid"
            style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
          >
            <div className="summary-item">
              <span className="pill green">Fresh</span>
              <h4>1,102</h4>
              <p>Artifacts updated within their expected review period.</p>
            </div>

            <div className="summary-item">
              <span className="pill amber">Stale soon</span>
              <h4>94</h4>
              <p>Files that will need replacement in the next 14 days.</p>
            </div>

            <div className="summary-item">
              <span className="pill red">Stale</span>
              <h4>52</h4>
              <p>Missing or expired evidence tied to active controls or reports.</p>
            </div>

            <div className="summary-item">
              <span className="pill purple">Linked</span>
              <h4>89%</h4>
              <p>Documents currently attached to frameworks, controls, or tasks.</p>
            </div>
          </div>
        </section>

        {/* Right card: Upload queue */}
        <section className="card">
          <div className="card-header">
            <span>Upload queue</span>
            <span className="pill amber">7 pending</span>
          </div>

          <div className="stack-list">
            <div className="task-item">
              <strong>Q4 admin review screenshots</strong>
              <p>Awaiting upload from Identity · report due tomorrow</p>
              <div className="task-meta">
                <span className="pill amber">Due tomorrow</span>
                <span className="pill purple">Identity</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Vendor SOC 2 letter</strong>
              <p>Requested from payment processor · overdue 5 days</p>
              <div className="task-meta">
                <span className="pill red">Overdue</span>
                <span className="pill purple">Vendor</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Cluster hardening export</strong>
              <p>Pending from platform automation run · ETA 2 hours</p>
              <div className="task-meta">
                <span className="pill amber">ETA 2h</span>
                <span className="pill purple">Platform</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
