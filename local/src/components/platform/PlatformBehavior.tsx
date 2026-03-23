"use client";

/**
 * Shared client-side behaviors for all *non-dashboard* sidebar-linked pages.
 *
 * The HTML prototypes in `platform-reference/*.html` ship a small inline script that:
 * - restores persisted desktop sidebar collapse state
 * - toggles mobile sidebar open/closed
 * - toggles desktop sidebar collapsed/expanded (and persists it)
 * - supports collapsible nav sections
 * - optionally binds table search + filter controls for specific pages
 *
 * The goal here is parity with that prototype script while keeping the page markup
 * server-rendered.
 */

import { useEffect } from "react";

type Cleanup = () => void;

function bindTable(prefix: string) {
  const search = document.getElementById(prefix + "Search") as HTMLInputElement | null;
  const filter = document.getElementById(prefix + "Filter") as HTMLSelectElement | null;
  const table = document.getElementById(prefix + "Table") as HTMLTableElement | null;

  if (!search || !filter || !table) return () => {};

  const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>("tbody tr"));

  const run = () => {
    const query = search.value.trim().toLowerCase();
    const filterValue = filter.value;

    rows.forEach((row) => {
      const matchesFilter = filterValue === "all" || row.dataset.filter === filterValue;
      const matchesSearch =
        !query || (row.textContent ?? "").toLowerCase().includes(query);
      row.style.display = matchesFilter && matchesSearch ? "" : "none";
    });
  };

  search.addEventListener("input", run);
  filter.addEventListener("change", run);

  return () => {
    search.removeEventListener("input", run);
    filter.removeEventListener("change", run);
  };
}

export function PlatformBehavior() {
  useEffect(() => {
    const cleanups: Cleanup[] = [];

    const app = document.getElementById("appShell");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const desktopCollapse = document.getElementById("desktopCollapse");

    if (app) {
      // Persist desktop collapse state (reference behavior).
      try {
        const savedCollapsed = localStorage.getItem("loopqa_sidebar_collapsed") === "1";
        if (savedCollapsed && window.innerWidth > 920) {
          app.classList.add("sidebar-collapsed");
        }
      } catch {
        // If localStorage is blocked, we still render fine; we simply won't persist.
      }
    }

    if (sidebarToggle && app) {
      const onClick = () => app.classList.toggle("sidebar-open");
      sidebarToggle.addEventListener("click", onClick);
      cleanups.push(() => sidebarToggle.removeEventListener("click", onClick));
    }

    if (desktopCollapse && app) {
      const onClick = () => {
        if (window.innerWidth <= 920) app.classList.toggle("sidebar-open");
        else {
          app.classList.toggle("sidebar-collapsed");
          try {
            localStorage.setItem(
              "loopqa_sidebar_collapsed",
              app.classList.contains("sidebar-collapsed") ? "1" : "0",
            );
          } catch {
            // ignore
          }
        }
      };

      desktopCollapse.addEventListener("click", onClick);
      cleanups.push(() => desktopCollapse.removeEventListener("click", onClick));
    }

    // Collapsible nav sections.
    document.querySelectorAll<HTMLButtonElement>(".nav-section-title").forEach((btn) => {
      const onClick = () => {
        const section = btn.closest(".nav-section");
        if (!section) return;

        const collapsed = section.classList.toggle("is-collapsed");
        btn.setAttribute("aria-expanded", collapsed ? "false" : "true");

        const nav = section.querySelector<HTMLElement>(".nav");
        if (nav) nav.style.display = collapsed ? "none" : "flex";
      };

      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    // Optional table bindings used by specific pages.
    ["frameworks", "controls", "policies"].forEach((prefix) => {
      cleanups.push(bindTable(prefix));
    });

    // Reference behavior: closing the sidebar when resizing up to desktop width.
    if (app) {
      const onResize = () => {
        if (window.innerWidth > 920) app.classList.remove("sidebar-open");
      };
      window.addEventListener("resize", onResize);
      cleanups.push(() => window.removeEventListener("resize", onResize));
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
