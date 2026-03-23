/**
 * Route segment: `/help-center`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/help-center.html`.
 * - Keep class names + hierarchy aligned with the reference so global CSS
 *   in `src/app/dashboard.css` applies consistently across the prototype.
 * - Interactions (sidebar open/collapse + section toggles) come from
 *   `PlatformShell` → `PlatformBehavior` to match the reference inline script.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Help Center · LoopQA",
};

export default function HelpCenterPage() {
  return (
    <PlatformShell activeHref="/help-center">
      {/* Reference: <div class="page-title">Help Center</div> */}
      <div className="page-title">Help Center</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Find answers fast with workflow guides, audit prep articles, troubleshooting
        notes, and common setup references.
      </div>

      {/* Reference: <div class="two-col">…</div> */}
      <div className="two-col">
        <section className="card">
          <div className="card-header">
            <span>Popular articles</span>
            <span className="pill purple">Knowledge base</span>
          </div>

          <div className="stack-list">
            <div className="stack-row">
              <strong>Preparing for SOC 2 fieldwork</strong>
              <p>
                Checklist for evidence freshness, owner readiness, and report exports.
              </p>
            </div>

            <div className="stack-row">
              <strong>Understanding integrity score inputs</strong>
              <p>
                How scoring weights respond to findings, drift, stale evidence, and
                exceptions.
              </p>
            </div>

            <div className="stack-row">
              <strong>Repairing a stale connector</strong>
              <p>
                Troubleshooting OAuth issues, credential rotation, and scope validation.
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Resources</span>
            <span className="pill green">Available</span>
          </div>

          <div className="stack-list">
            <div className="task-item">
              <strong>Chat with product support</strong>
              <p>Average response time: 18 minutes during business hours</p>
              <div className="task-meta">
                <span className="pill green">Support</span>
                <span className="pill purple">Chat</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Open implementation ticket</strong>
              <p>Route setup and integration issues to technical onboarding</p>
              <div className="task-meta">
                <span className="pill purple">Onboarding</span>
                <span className="pill amber">Ticket</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Book audit-readiness session</strong>
              <p>Review controls, evidence, and reporting setup with an expert</p>
              <div className="task-meta">
                <span className="pill green">Available</span>
                <span className="pill purple">Session</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
