/**
 * Shared shell for all sidebar-linked pages (except the dashboard).
 *
 * Each reference HTML page repeats the same DOM structure:
 * - <div class="app" id="appShell">
 *   - <aside class="sidebar">…</aside>
 *   - <main class="main"><div class="content">…</div></main>
 *
 * We keep that structure identical so the global CSS from `src/app/dashboard.css`
 * applies consistently, and then we slot in page-specific content.
 */

import type { ReactNode } from "react";

import { DashboardTopbar } from "../dashboard/DashboardTopbar";
import { DashboardSidebarWithActiveHref } from "../dashboard/DashboardSidebar";
import { PlatformBehavior } from "./PlatformBehavior";

type PlatformShellProps = {
  /** The sidebar link `href` that should receive the `.active` class. */
  activeHref: string;
  /** The page-specific markup from the reference HTML (inside `.content`). */
  children: ReactNode;
};

export function PlatformShell({ activeHref, children }: PlatformShellProps) {
  return (
    <>
      <div className="app" id="appShell">
        <DashboardSidebarWithActiveHref activeHref={activeHref} />

        <main className="main">
          <div className="content">
            <DashboardTopbar />
            {children}
          </div>
        </main>
      </div>

      <PlatformBehavior />
    </>
  );
}
