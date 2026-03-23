/**
 * Route segment: `/tasks`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/tasks.html`.
 * - Keep class names + hierarchy aligned with the reference so global CSS
 *   in `src/app/dashboard.css` applies consistently across the prototype.
 * - Interactions (sidebar open/collapse + section toggles) come from
 *   `PlatformShell` → `PlatformBehavior` to match the reference inline script.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Tasks · LoopQA",
};

export default function TasksPage() {
  return (
    <PlatformShell activeHref="/tasks">
      {/* Reference: <div class="page-title">Tasks</div> */}
      <div className="page-title">Tasks</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Run remediation like an operations team: prioritize blockers, track ownership, and
        move work from triage to verification.
      </div>

      {/* Reference: <section class="task-board">…</section> */}
      <section className="task-board">
        {/* Column 1: Triage */}
        <div className="task-column triage">
          <div className="col-head">
            <h3>Triage</h3>
            <span className="task-count">3</span>
          </div>
          <div className="task-item">
            <strong>Review stale Kubernetes evidence</strong>
            <p>Need root cause and ETA from platform team.</p>
            <div className="task-meta">
              <span className="pill amber">High</span>
              <span className="pill purple">Platform</span>
            </div>
          </div>
          <div className="task-item">
            <strong>Validate HR offboarding feed</strong>
            <p>Investigate mismatch with GitHub account revocation.</p>
            <div className="task-meta">
              <span className="pill red">Critical</span>
              <span className="pill purple">Identity</span>
            </div>
          </div>
          <div className="task-item">
            <strong>Check endpoint attestation gaps</strong>
            <p>
              Confirm whether missing device proofs are collection or ownership issues.
            </p>
            <div className="task-meta">
              <span className="pill amber">Medium</span>
              <span className="pill purple">IT Ops</span>
            </div>
          </div>
        </div>

        {/* Column 2: In progress */}
        <div className="task-column progress">
          <div className="col-head">
            <h3>In progress</h3>
            <span className="task-count">4</span>
          </div>
          <div className="task-item">
            <strong>Privileged access review collection</strong>
            <p>Waiting on reviewers for 8 admin groups.</p>
            <div className="task-meta">
              <span className="pill amber">Due soon</span>
              <span className="pill purple">GRC</span>
            </div>
          </div>
          <div className="task-item">
            <strong>ISO asset inventory cleanup</strong>
            <p>Cloud inventory normalization script is running.</p>
            <div className="task-meta">
              <span className="pill purple">Automation</span>
              <span className="pill green">On track</span>
            </div>
          </div>
          <div className="task-item">
            <strong>Refresh vendor evidence packet</strong>
            <p>Need updated SOC letter and security questionnaire attachments.</p>
            <div className="task-meta">
              <span className="pill amber">Blocked</span>
              <span className="pill purple">Procurement</span>
            </div>
          </div>
          <div className="task-item">
            <strong>Policy acknowledgement resend</strong>
            <p>Reminder batch is sending to remaining employees.</p>
            <div className="task-meta">
              <span className="pill green">Running</span>
              <span className="pill purple">People Ops</span>
            </div>
          </div>
        </div>

        {/* Column 3: Verification */}
        <div className="task-column verify">
          <div className="col-head">
            <h3>Verification</h3>
            <span className="task-count">2</span>
          </div>
          <div className="task-item">
            <strong>Endpoint encryption attestations</strong>
            <p>Fresh exports attached and awaiting reviewer sign-off.</p>
            <div className="task-meta">
              <span className="pill green">Ready</span>
              <span className="pill purple">IT Ops</span>
            </div>
          </div>
          <div className="task-item">
            <strong>Cluster hardening export</strong>
            <p>Collector rerun completed; validating evidence against control mapping.</p>
            <div className="task-meta">
              <span className="pill green">Review</span>
              <span className="pill purple">Platform</span>
            </div>
          </div>
        </div>
      </section>
    </PlatformShell>
  );
}
