/**
 * Route segment: `/participants`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/participants.html`.
 * - Keep class names + hierarchy aligned with the reference so global CSS
 *   in `src/app/dashboard.css` applies consistently across the prototype.
 * - Interactions (sidebar open/collapse + section toggles) come from
 *   `PlatformShell` → `PlatformBehavior` to match the reference inline script.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Participants · LoopQA",
};

export default function ParticipantsPage() {
  return (
    <PlatformShell activeHref="/participants">
      {/* Reference: <div class="page-title">Participants</div> */}
      <div className="page-title">Participants</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Understand who owns controls, who reviews evidence, and where team workload is
        concentrated across the program.
      </div>

      {/* Reference: <div class="three-col">…</div> */}
      <div className="three-col">
        <section className="card">
          <div className="card-header">
            <span>Owners</span>
            <span className="pill purple">27</span>
          </div>
          <div className="metric-value">27</div>
          <div className="metric-sub">
            People directly assigned as accountable owners for controls, policies, and
            risks.
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Reviewers</span>
            <span className="pill green">18</span>
          </div>
          <div className="metric-value">18</div>
          <div className="metric-sub">
            Reviewers approving evidence, tasks, forms, and exception decisions.
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Overloaded</span>
            <span className="pill amber">4</span>
          </div>
          <div className="metric-value">4</div>
          <div className="metric-sub">
            Participants with more than 10 active tasks or reviews assigned right now.
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
