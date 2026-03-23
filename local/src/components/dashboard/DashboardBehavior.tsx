"use client";

/**
 * Dashboard behaviors (client-side only).
 *
 * This file mirrors the prototype's inline <script> behavior, but:
 * - keeps logic scoped to the dashboard page
 * - is written in TypeScript
 * - cleans up event listeners on unmount
 *
 * The goal is for the *markup* to remain server-rendered and componentized,
 * while the small interactive touches (sidebar toggle, modals) are hydrated.
 */

import { useEffect } from "react";

type Cleanup = () => void;

type FindingItem = {
  id: string;
  type: "Finding" | "Drift";
  severity: string;
  pill: "red" | "amber" | "green";
  title: string;
  detailText: string;
  detailHtml: string;
};

function normalizeText(value: unknown) {
  return (value ?? "").toString().trim();
}

function isInteractive(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("button,a,input,select,textarea,label"));
}

export function DashboardBehavior() {
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
        if (window.innerWidth <= 920) {
          app.classList.toggle("sidebar-open");
          return;
        }

        app.classList.toggle("sidebar-collapsed");
        try {
          localStorage.setItem(
            "loopqa_sidebar_collapsed",
            app.classList.contains("sidebar-collapsed") ? "1" : "0",
          );
        } catch {
          // ignore
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

    // --------------------------
    // Modal helpers
    // --------------------------
    const modalOverlay = document.getElementById("modalOverlay");
    const modalDialog = document.getElementById("modalDialog");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalBody = document.getElementById("modalBody");
    const modalClose = document.getElementById("modalClose");

    let lastFocus: Element | null = null;

    const setModalOpen = (open: boolean) => {
      if (!modalOverlay) return;
      modalOverlay.classList.toggle("is-open", open);
      modalOverlay.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    };

    const setModalSubtitle = (text: string) => {
      if (!modalSubtitle) return;
      const value = normalizeText(text);
      if (!value) {
        modalSubtitle.textContent = "";
        (modalSubtitle as HTMLElement).hidden = true;
        return;
      }
      modalSubtitle.textContent = value;
      (modalSubtitle as HTMLElement).hidden = false;
    };

    const closeModal = () => {
      if (!modalOverlay || !modalDialog || !modalBody) return;
      if (!modalOverlay.classList.contains("is-open")) return;

      setModalOpen(false);
      modalDialog.classList.remove("is-wide", "is-list");
      modalBody.innerHTML = "";
      setModalSubtitle("");

      if (
        lastFocus &&
        "focus" in lastFocus &&
        typeof (lastFocus as HTMLElement).focus === "function"
      ) {
        (lastFocus as HTMLElement).focus();
      }
      lastFocus = null;
    };

    const openModal = (options: {
      title: string;
      subtitle?: string;
      content: Node;
      wide?: boolean;
      list?: boolean;
    }) => {
      if (!modalTitle || !modalDialog || !modalBody) return;

      lastFocus = document.activeElement;
      modalTitle.textContent = options.title || "Details";
      setModalSubtitle(options.subtitle ?? "");
      modalBody.innerHTML = "";
      modalBody.appendChild(options.content);

      modalDialog.classList.toggle("is-wide", Boolean(options.wide));
      modalDialog.classList.toggle("is-list", Boolean(options.list));

      setModalOpen(true);
      requestAnimationFrame(() => (modalClose as HTMLElement | null)?.focus());
    };

    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
      cleanups.push(() => modalClose.removeEventListener("click", closeModal));
    }

    if (modalOverlay) {
      const onOverlayClick = (e: MouseEvent) => {
        if (e.target === modalOverlay) closeModal();
      };
      modalOverlay.addEventListener("click", onOverlayClick);
      cleanups.push(() => modalOverlay.removeEventListener("click", onOverlayClick));
    }

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onEsc);
    cleanups.push(() => document.removeEventListener("keydown", onEsc));

    // --------------------------
    // Findings modal
    // --------------------------
    const parseFindingsFromPanel = (): FindingItem[] => {
      const panel = document.querySelector(".findings-panel");
      if (!panel) return [];

      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(".finding"));
      return nodes.map((node, idx) => {
        const sevPill = node.querySelector<HTMLElement>(".pill");
        const severity = normalizeText(sevPill?.textContent) || "Medium";

        const textNode = node.querySelector<HTMLElement>("p");
        const detailHtml =
          normalizeText(textNode?.innerHTML) || normalizeText(node.innerHTML);
        const detailText =
          normalizeText(textNode?.textContent) || normalizeText(node.textContent);

        const type: FindingItem["type"] = detailText.toLowerCase().includes("drift")
          ? "Drift"
          : "Finding";
        const pill: FindingItem["pill"] = /critical|high/i.test(severity)
          ? "red"
          : /medium/i.test(severity)
            ? "amber"
            : "green";

        const title =
          detailText.length > 88 ? `${detailText.slice(0, 88).trim()}…` : detailText;

        return {
          id: `f_${idx + 1}`,
          type,
          severity,
          pill,
          title,
          detailText,
          detailHtml,
        };
      });
    };

    const openFindingDetailModal = (item: FindingItem) => {
      const wrap = document.createElement("div");

      const list = document.createElement("div");
      list.className = "modal-list";
      const card = document.createElement("div");
      card.className = "task-item";
      card.innerHTML = `<strong>Details</strong><p>${item.detailHtml}</p>`;
      list.appendChild(card);
      wrap.appendChild(list);

      const actions = document.createElement("div");
      actions.className = "modal-actions";

      const acknowledge = document.createElement("button");
      acknowledge.className = "btn";
      acknowledge.type = "button";
      acknowledge.textContent = "Mark acknowledged";
      acknowledge.addEventListener("click", closeModal);

      const createTask = document.createElement("button");
      createTask.className = "btn primary";
      createTask.type = "button";
      createTask.textContent = "Create task";
      createTask.addEventListener("click", closeModal);

      actions.appendChild(acknowledge);
      actions.appendChild(createTask);
      wrap.appendChild(actions);

      openModal({
        title: item.title,
        subtitle: `${item.type} · ${item.severity}`,
        content: wrap,
        wide: false,
      });
    };

    const openFindingsModal = () => {
      const items = parseFindingsFromPanel();

      const wrap = document.createElement("div");
      const list = document.createElement("div");
      list.className = "modal-list";

      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "task-item is-clickable";
        row.setAttribute("tabindex", "0");
        row.setAttribute("role", "button");
        row.innerHTML = `
          <strong>${item.title}</strong>
          <p>${item.detailText}</p>
          <div class="task-meta">
            <span class="pill ${item.pill}">${item.type}</span>
            <span class="pill ${item.pill}">${item.severity}</span>
          </div>
        `;

        const open = (e?: Event) => {
          e?.stopPropagation();
          openFindingDetailModal(item);
        };

        row.addEventListener("click", open);
        row.addEventListener("keydown", (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open(e);
          }
        });

        list.appendChild(row);
      });

      wrap.appendChild(list);

      const actions = document.createElement("div");
      actions.className = "modal-actions";

      const close = document.createElement("button");
      close.className = "btn primary";
      close.type = "button";
      close.textContent = "Done";
      close.addEventListener("click", closeModal);

      actions.appendChild(close);
      wrap.appendChild(actions);

      openModal({
        title: "Recent Findings & Drift",
        subtitle: `${items.length} active items requiring attention`,
        content: wrap,
        wide: false,
        list: true,
      });
    };

    const viewMore = document.getElementById("viewMoreFindings");
    if (viewMore) {
      const onClick = () => openFindingsModal();
      viewMore.addEventListener("click", onClick);
      cleanups.push(() => viewMore.removeEventListener("click", onClick));
    }

    // --------------------------
    // Connected Systems row modal
    // --------------------------
    const openSystemRowModal = (row: HTMLTableRowElement) => {
      const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>("td"));

      const nameCell = cells[0]?.querySelector<HTMLElement>(".name-cell");
      let source = "System";
      if (nameCell) {
        const tmp = nameCell.cloneNode(true) as HTMLElement;
        tmp.querySelector(".brand-icon")?.remove();
        source = normalizeText(tmp.textContent) || "System";
      }

      const scope = normalizeText(cells[1]?.textContent);
      const health = normalizeText(cells[2]?.textContent);
      const coverage = normalizeText(cells[3]?.textContent);
      const lastScan = normalizeText(cells[4]?.textContent);

      const wrap = document.createElement("div");

      const healthText = health.toLowerCase();
      const healthPill = healthText.includes("healthy")
        ? "green"
        : healthText.includes("stale")
          ? "red"
          : healthText.includes("review")
            ? "amber"
            : "";

      const grid = document.createElement("div");
      grid.className = "form-grid";
      (grid.style as CSSStyleDeclaration).gap = "12px";
      grid.innerHTML = `
        <div class="task-item"><strong>Asset scope</strong><p>${scope || "—"}</p></div>
        <div class="task-item"><strong>Coverage</strong><p>${coverage || "—"}</p></div>
        <div class="task-item"><strong>Health</strong><p>${healthPill ? `<span class="pill ${healthPill}">${health || "—"}</span>` : health || "—"}</p></div>
        <div class="task-item"><strong>Last scan</strong><p>${lastScan || "—"}</p></div>
      `;

      wrap.appendChild(grid);

      const actions = document.createElement("div");
      actions.className = "modal-actions";

      const resync = document.createElement("button");
      resync.className = "btn";
      resync.type = "button";
      resync.textContent = "Run sync";
      resync.addEventListener("click", closeModal);

      const manage = document.createElement("button");
      manage.className = "btn primary";
      manage.type = "button";
      manage.textContent = "Manage connection";
      manage.addEventListener("click", closeModal);

      actions.appendChild(resync);
      actions.appendChild(manage);
      wrap.appendChild(actions);

      openModal({
        title: `Connected System: ${source}`,
        subtitle: "Connection health, coverage, and sync status.",
        content: wrap,
        wide: false,
      });
    };

    const table = document.getElementById(
      "connectedSystemsTable",
    ) as HTMLTableElement | null;
    if (table) {
      const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>("tbody tr"));
      rows.forEach((row) => {
        const onRowClick = (e: MouseEvent) => {
          if (isInteractive(e.target)) return;
          openSystemRowModal(row);
        };
        row.addEventListener("click", onRowClick);
        cleanups.push(() => row.removeEventListener("click", onRowClick));
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
