/**
 * Top bar markup.
 *
 * Like the sidebar, this is server-rendered markup. A small client behavior
 * module wires up the mobile menu toggle.
 */

import { Icons } from "./icons";

export function DashboardTopbar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="mobile-sidebar-toggle" id="sidebarToggle" type="button">
          <span className="icon">
            <Icons.Menu />
          </span>
          <span>Menu</span>
        </button>

        <div className="search">
          <span className="icon">
            <Icons.Search />
          </span>
          <span>Search LoopQA</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="top-actions">
          <span className="icon">
            <Icons.Bell />
          </span>
          <span className="avatar" />
        </div>
      </div>
    </div>
  );
}
