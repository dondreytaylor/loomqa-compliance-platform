/**
 * Route segment: `/integrations`
 *
 * IMPORTANT
 * - This page is a direct port of `platform-reference/integrations.html`.
 * - Keep class names + hierarchy aligned with the reference so global CSS
 *   in `src/app/dashboard.css` applies consistently across the prototype.
 * - Interactions (sidebar open/collapse + section toggles) come from
 *   `PlatformShell` → `PlatformBehavior` to match the reference inline script.
 */

import type { Metadata } from "next";

import { PlatformShell } from "../../components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Integrations · LoopQA",
};

export default function IntegrationsPage() {
  return (
    <PlatformShell activeHref="/integrations">
      {/* Reference: <div class="page-title">Integrations</div> */}
      <div className="page-title">Integrations</div>

      {/* Reference: <div class="subtitle">…</div> */}
      <div className="subtitle">
        Manage connectors, sync scopes, authentication, and evidence collection health
        across the systems that power LoopQA.
      </div>

      {/* Reference: <div class="two-col">…</div> */}
      <div className="two-col">
        <section className="card">
          <div className="card-header">
            <span>Connector health</span>
            <span className="pill green">12 healthy</span>
          </div>

          <div className="stack-list">
            <div className="task-item">
              <strong>Okta</strong>
              <p>
                User sync, group sync, and admin-role export completed in the last 10
                minutes.
              </p>
              <div className="task-meta">
                <span className="pill green">Healthy</span>
                <span className="pill purple">Okta</span>
              </div>
            </div>

            <div className="task-item">
              <strong>AWS</strong>
              <p>
                CloudTrail, IAM, and account baseline checks all refreshed successfully.
              </p>
              <div className="task-meta">
                <span className="pill green">Healthy</span>
                <span className="pill purple">AWS</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Kubernetes</strong>
              <p>
                One cluster inventory collector is stale after the last certificate
                rotation.
              </p>
              <div className="task-meta">
                <span className="pill red">Stale</span>
                <span className="pill purple">Kubernetes</span>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <span>Provisioning actions</span>
            <span className="pill purple">Admin</span>
          </div>

          <div className="stack-list">
            <div className="task-item">
              <strong>Rotate GitHub app credentials</strong>
              <p>Recommended in 9 days · impact low</p>
              <div className="task-meta">
                <span className="pill amber">Due soon</span>
                <span className="pill purple">GitHub</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Expand Okta group scope</strong>
              <p>Would increase access review coverage by 6%</p>
              <div className="task-meta">
                <span className="pill green">+6% coverage</span>
                <span className="pill purple">Okta</span>
              </div>
            </div>

            <div className="task-item">
              <strong>Repair Kubernetes collector certificate</strong>
              <p>Required to restore evidence freshness on 1 cluster</p>
              <div className="task-meta">
                <span className="pill red">Required</span>
                <span className="pill purple">Kubernetes</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
