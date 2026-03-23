/**
 * Route segment: `/settings`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/settings.html`.
 * - Keep class names + hierarchy aligned with the reference so global CSS
 *   in `src/app/dashboard.css` applies consistently across the prototype.
 * - Interactions (sidebar open/collapse + section toggles) come from
 *   `PlatformShell` → `PlatformBehavior` to match the reference inline script.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Settings · LoopQA",
};

export default function SettingsPage() {
  return (
    <PlatformShell activeHref="/settings">
      {/* Reference: <div class="page-title">Settings</div> */}
      <div className="page-title">Settings</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Tune notifications, scoring behavior, default workflows, and workspace settings
        without changing your overall design language.
      </div>

      {/* Reference: <div class="two-col">…</div> */}
      <div className="two-col">
        <section className="card">
          <div className="card-header">
            <span>Workspace defaults</span>
            <span className="pill purple">Config</span>
          </div>

          <div className="form-grid">
            {/* Reference HTML uses `value="…"`; React uses `defaultValue`. */}
            <input className="input" defaultValue="LoopQA Workspace" />
            <input className="input" defaultValue="America/New_York" />
            <input className="input" defaultValue="Monday 9:00 AM" />
            <input className="input" defaultValue="Weighted score model" />
          </div>

          <div className="cta-row" style={{ marginTop: 14 }}>
            <button className="btn primary">Save settings</button>
            <button className="btn">Reset defaults</button>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Notifications</span>
            <span className="pill amber">Custom</span>
          </div>

          <div className="stack-list">
            <div className="task-item">
              <strong>Critical findings</strong>
              <p>Email + Slack alerts enabled immediately</p>
              <div className="task-meta">
                <span className="pill red">Immediate</span>
                <span className="pill purple">Slack</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Stale evidence</strong>
              <p>Digest to owners every morning at 8:30 AM</p>
              <div className="task-meta">
                <span className="pill amber">Daily digest</span>
                <span className="pill purple">8:30 AM</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Task reminders</strong>
              <p>Send 3 days before due date, then daily when overdue</p>
              <div className="task-meta">
                <span className="pill amber">Due soon</span>
                <span className="pill red">Overdue</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
