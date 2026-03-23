/**
 * Route segment: `/vendors`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/vendors.html`.
 * - Keep class names + hierarchy aligned with the reference so global CSS
 *   in `src/app/dashboard.css` applies consistently across the prototype.
 * - Interactions (sidebar open/collapse + section toggles) come from
 *   `PlatformShell` → `PlatformBehavior` to match the reference inline script.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Vendors · LoopQA",
};

export default function VendorsPage() {
  return (
    <PlatformShell activeHref="/vendors">
      {/* Reference: <div class="page-title">Vendors</div> */}
      <div className="page-title">Vendors</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Coordinate vendor due diligence, reassessments, contract milestones, and
        corrective actions from one place.
      </div>

      {/* Reference: <div class="two-col">…</div> */}
      <div className="two-col">
        <section className="card">
          <div className="card-header">
            <span>Review pipeline</span>
            <span className="pill purple">36 vendors</span>
          </div>

          <div
            className="summary-grid"
            style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}
          >
            <div className="summary-item">
              <span className="pill green">Approved</span>
              <h4>22</h4>
              <p>Vendors with completed due diligence and acceptable residual risk.</p>
            </div>

            <div className="summary-item">
              <span className="pill amber">Reassessment due</span>
              <h4>7</h4>
              <p>Reviews expiring in the next 30 days and queued for follow-up.</p>
            </div>

            <div className="summary-item">
              <span className="pill red">Blocked</span>
              <h4>2</h4>
              <p>Security review paused pending documents or contract addenda.</p>
            </div>

            <div className="summary-item">
              <span className="pill purple">Critical services</span>
              <h4>9</h4>
              <p>High-impact vendors tied to production or customer-facing workflows.</p>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Current reviews</span>
            <span className="pill amber">Attention</span>
          </div>

          <div className="stack-list">
            <div className="task-item">
              <strong>Payment processor</strong>
              <p>
                Awaiting latest SOC report and subprocessor list before approval renewal.
              </p>
              <div className="task-meta">
                <span className="pill amber">Awaiting SOC</span>
                <span className="pill purple">Payments</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Cloud logging vendor</strong>
              <p>Questionnaire received; privacy addendum still under legal review.</p>
              <div className="task-meta">
                <span className="pill amber">Legal review</span>
                <span className="pill purple">Privacy</span>
              </div>
            </div>

            <div className="task-item">
              <strong>People analytics provider</strong>
              <p>Security contacts have not responded to evidence request in 5 days.</p>
              <div className="task-meta">
                <span className="pill red">No response</span>
                <span className="pill purple">Evidence</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
