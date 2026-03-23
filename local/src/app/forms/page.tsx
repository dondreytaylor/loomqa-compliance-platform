/**
 * Route segment: `/forms`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/forms.html`.
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
  title: "Forms · LoopQA",
};

export default function FormsPage() {
  const uiState = getGlobalUiState();
  if (uiState !== "NORMAL") {
    return <GlobalUiStateScreen uiState={uiState} activeHref="/forms" />;
  }

  return (
    <PlatformShell activeHref="/forms">
      {/* Reference: <div class="page-title">Forms</div> */}
      <div className="page-title">Forms</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Use forms for access requests, evidence intake, exception requests, and vendor
        questionnaires with clear workflow steps.
      </div>

      {/* Reference: <div class="two-col">…</div> */}
      <div className="two-col">
        <section className="card">
          <div className="card-header">
            <span>Create intake</span>
            <span className="pill purple">Draft</span>
          </div>

          <div className="form-grid">
            <input className="input" defaultValue="New exception request" />

            {/*
             * Reference HTML uses <option selected>…</option>.
             * In React, use defaultValue to keep identical initial selection.
             */}
            <select className="select" defaultValue="Exception request">
              <option>Exception request</option>
              <option>Access request</option>
            </select>

            <input className="input" defaultValue="Compliance Ops" />
            <input className="input" defaultValue="3 business days" />
          </div>

          <textarea
            className="textarea"
            style={{ marginTop: 14 }}
            defaultValue={
              "Describe the business justification, expected duration, affected systems, and compensating controls for this exception."
            }
          />

          <div className="cta-row" style={{ marginTop: 14 }}>
            <button className="btn primary">Save form</button>
            <button className="btn">Preview workflow</button>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Submission pipeline</span>
            <span className="pill amber">24 open</span>
          </div>

          <div className="stack-list">
            <div className="task-item">
              <strong>Exception requests</strong>
              <p>8 open · 2 waiting for reviewer input</p>
              <div className="task-meta">
                <span className="pill amber">8 open</span>
                <span className="pill purple">Exceptions</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Vendor questionnaires</strong>
              <p>11 open · 4 missing attachments</p>
              <div className="task-meta">
                <span className="pill amber">11 open</span>
                <span className="pill red">4 missing</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Access requests</strong>
              <p>5 open · average turnaround 1.2 days</p>
              <div className="task-meta">
                <span className="pill amber">5 open</span>
                <span className="pill green">1.2 days</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
