/**
 * Dashboard page (server component).
 *
 * Structure mirrors the reference `platform-reference/index.html`:
 * - Sidebar
 * - Topbar
 * - Main content (overview)
 * - Modal overlay
 * - Client-side behavior module to wire interactions
 */

import { DashboardBehavior } from "./DashboardBehavior";
import { DashboardConnectedSystems } from "./DashboardConnectedSystems";
import { DashboardFrameworkProgress } from "./DashboardFrameworkProgress";
import { DashboardHeroGrid } from "./DashboardHeroGrid";
import { DashboardMidGrid } from "./DashboardMidGrid";
import { DashboardModal } from "./DashboardModal";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { dashboardCopy } from "./dashboardData";

export function DashboardPage() {
  return (
    <>
      <div className="app" id="appShell">
        <DashboardSidebar />

        <main className="main">
          <div className="content">
            <DashboardTopbar />

            <div className="page-title">{dashboardCopy.pageTitle}</div>
            <div className="subtitle">{dashboardCopy.pageSubtitle}</div>

            <DashboardHeroGrid />
            <DashboardMidGrid />
            <DashboardFrameworkProgress />
            <DashboardConnectedSystems />
          </div>
        </main>
      </div>

      <DashboardModal />

      {/*
        Client-only behavior module that attaches event listeners.
        It does not render any visible UI.
      */}
      <DashboardBehavior />
    </>
  );
}
