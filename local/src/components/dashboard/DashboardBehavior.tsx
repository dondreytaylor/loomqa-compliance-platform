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
import type { ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";

import { ConnectSystemModalContent } from "./modals/ConnectSystemModalContent";
import { FindingDetailModalContent } from "./modals/FindingDetailModalContent";
import {
  FindingsListModalContent,
  type FindingItem,
} from "./modals/FindingsListModalContent";
import { ConnectedSystemDetailsModalContent } from "./modals/ConnectedSystemDetailsModalContent";
import { RecentFindingsCardModalContent } from "./modals/RecentFindingsCardModalContent";
import { RecommendedActionModalContent } from "./modals/RecommendedActionModalContent";
import { SearchTableModalContent } from "./modals/SearchTableModalContent";

type Cleanup = () => void;

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

    // --------------------------
    // Modal helpers
    // --------------------------
    const modalOverlay = document.getElementById("modalOverlay");
    const modalDialog = document.getElementById("modalDialog");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalHeadSearch = document.getElementById(
      "modalHeadSearch",
    ) as HTMLInputElement | null;
    const modalBody = document.getElementById("modalBody") as HTMLElement | null;
    const modalClose = document.getElementById("modalClose");

    let lastFocus: Element | null = null;
    let modalSearchCleanup: Cleanup | null = null;
    let modalRoot: Root | null = null;

    const renderModalBody = (node: ReactNode) => {
      if (!modalBody) return;
      if (!modalRoot) modalRoot = createRoot(modalBody);
      modalRoot.render(node);
    };

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

    const configureModalSearch = (
      search: {
        placeholder?: string;
        ariaLabel?: string;
        value?: string;
        onInput?: (value: string) => void;
      } | null,
    ) => {
      if (!modalHeadSearch) return;
      if (modalSearchCleanup) {
        modalSearchCleanup();
        modalSearchCleanup = null;
      }

      if (!search) {
        modalHeadSearch.value = "";
        modalHeadSearch.hidden = true;
        return;
      }

      modalHeadSearch.hidden = false;
      modalHeadSearch.placeholder = search.placeholder || "Search";
      modalHeadSearch.setAttribute(
        "aria-label",
        search.ariaLabel || search.placeholder || "Search",
      );
      modalHeadSearch.value = search.value || "";

      const stop = (e: Event) => e.stopPropagation();
      const onInput = () => search.onInput?.(modalHeadSearch.value);

      modalHeadSearch.addEventListener("input", onInput);
      modalHeadSearch.addEventListener("keydown", stop);
      modalHeadSearch.addEventListener("click", stop);

      modalSearchCleanup = () => {
        modalHeadSearch.removeEventListener("input", onInput);
        modalHeadSearch.removeEventListener("keydown", stop);
        modalHeadSearch.removeEventListener("click", stop);
      };
    };

    const closeModal = () => {
      if (!modalOverlay || !modalDialog) return;
      if (!modalOverlay.classList.contains("is-open")) return;

      setModalOpen(false);
      modalDialog.classList.remove("is-wide", "is-list");
      renderModalBody(null);
      setModalSubtitle("");

      if (modalSearchCleanup) {
        modalSearchCleanup();
        modalSearchCleanup = null;
      }
      if (modalHeadSearch) {
        modalHeadSearch.value = "";
        modalHeadSearch.hidden = true;
      }

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
      content: ReactNode;
      wide?: boolean;
      list?: boolean;
      search?: {
        placeholder?: string;
        ariaLabel?: string;
        value?: string;
        onInput?: (value: string) => void;
      } | null;
      focus?: "close" | "search";
    }) => {
      if (!modalTitle || !modalDialog) return;

      lastFocus = document.activeElement;
      modalTitle.textContent = options.title || "Details";
      setModalSubtitle(options.subtitle ?? "");
      configureModalSearch(options.search ?? null);
      renderModalBody(options.content);

      modalDialog.classList.toggle("is-wide", Boolean(options.wide));
      modalDialog.classList.toggle("is-list", Boolean(options.list));

      setModalOpen(true);
      requestAnimationFrame(() => {
        if (options.focus === "search" && modalHeadSearch && !modalHeadSearch.hidden) {
          modalHeadSearch.focus();
          return;
        }

        (modalClose as HTMLElement | null)?.focus();
      });
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
    const parseFindingsFromCard = (): FindingItem[] => {
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

    const syncFindingsCount = () => {
      const panel = document.querySelector(".findings-panel");
      if (!panel) return;
      const pill = panel.querySelector<HTMLElement>(".card-header .pill");
      if (!pill) return;
      const count = panel.querySelectorAll(".finding").length;
      pill.textContent = `${count} active`;
    };

    const openFindingDetailModal = (item: FindingItem) => {
      openModal({
        title: item.title,
        subtitle: `${item.type} · ${item.severity}`,
        content: <FindingDetailModalContent item={item} onClose={closeModal} />,
        wide: false,
        list: false,
        search: null,
        focus: "close",
      });
    };

    const openFindingsModal = () => {
      const data = parseFindingsFromCard();

      const state = { q: "", page: 1, pageSize: 5 };

      const render = () => {
        const filtered = data.filter((item) => {
          const blob =
            `${item.type} ${item.severity} ${item.title} ${item.detailText}`.toLowerCase();
          return !state.q || blob.includes(state.q);
        });

        const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
        state.page = Math.min(state.page, totalPages);
        const start = (state.page - 1) * state.pageSize;
        const pageItems = filtered.slice(start, start + state.pageSize);

        setModalSubtitle(`Search across findings and drift · ${filtered.length} items`);
        renderModalBody(
          <FindingsListModalContent
            items={pageItems}
            empty={!pageItems.length}
            page={state.page}
            totalPages={totalPages}
            onPrev={() => {
              state.page = Math.max(1, state.page - 1);
              render();
            }}
            onNext={() => {
              state.page += 1;
              render();
            }}
            onOpenItem={(item) => openFindingDetailModal(item)}
          />,
        );
      };

      openModal({
        title: "Recent Findings & Drift",
        subtitle: "Search across findings and drift",
        content: null,
        wide: true,
        list: true,
        search: {
          placeholder: "Search findings and drift",
          ariaLabel: "Search findings and drift",
          onInput: (value) => {
            state.q = value.trim().toLowerCase();
            state.page = 1;
            render();
          },
        },
        focus: "search",
      });

      render();
    };

    const viewMore = document.getElementById("viewMoreFindings");
    if (viewMore) {
      const onClick = (e: Event) => {
        e.stopPropagation();
        openFindingsModal();
      };
      viewMore.addEventListener("click", onClick);
      cleanups.push(() => viewMore.removeEventListener("click", onClick));
    }

    const addSystemBtn = document.getElementById("addSystemBtn");
    if (addSystemBtn) {
      const onClick = (e: Event) => {
        e.stopPropagation();
        openConnectSystemModal();
      };
      addSystemBtn.addEventListener("click", onClick);
      cleanups.push(() => addSystemBtn.removeEventListener("click", onClick));
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

      const healthText = health.toLowerCase();
      const healthPill = healthText.includes("healthy")
        ? "green"
        : healthText.includes("stale")
          ? "red"
          : healthText.includes("review")
            ? "amber"
            : "";

      openModal({
        title: `Connected System: ${source}`,
        subtitle: "Connection health, coverage, and sync status.",
        content: (
          <ConnectedSystemDetailsModalContent
            scope={scope}
            coverage={coverage}
            health={health}
            healthPill={healthPill as "green" | "amber" | "red" | ""}
            lastScan={lastScan}
            onClose={closeModal}
          />
        ),
        wide: false,
        list: false,
        search: null,
        focus: "close",
      });
    };

    const bindConnectedSystems = () => {
      const input = document.getElementById(
        "connectedSystemsSearch",
      ) as HTMLInputElement | null;
      const table = document.getElementById(
        "connectedSystemsTable",
      ) as HTMLTableElement | null;
      if (!input || !table) return;

      const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>("tbody tr"));
      const run = () => {
        const q = input.value.trim().toLowerCase();
        rows.forEach((row) => {
          const ms = !q || normalizeText(row.textContent).toLowerCase().includes(q);
          row.style.display = ms ? "" : "none";
        });
      };
      input.addEventListener("input", run);
      cleanups.push(() => input.removeEventListener("input", run));

      // Item-level system modal
      rows.forEach((row) => {
        if (row.dataset.modalBound === "1") return;
        row.dataset.modalBound = "1";
        row.style.cursor = "pointer";
        const onClick = (e: MouseEvent) => {
          e.stopPropagation();
          openSystemRowModal(row);
        };
        row.addEventListener("click", onClick);
        cleanups.push(() => row.removeEventListener("click", onClick));
      });
    };

    const openConnectSystemModal = () => {
      openModal({
        title: "Connect a system",
        subtitle: "Connect a system to start collecting evidence and drift signals.",
        content: <ConnectSystemModalContent onClose={closeModal} />,
        wide: false,
        list: false,
        search: null,
        focus: "close",
      });
    };

    // --------------------------
    // Search-table modal helpers
    // --------------------------
    const openSearchTableModal = (options: {
      title: string;
      subtitle: string;
      columns: Array<{ key: string; label: string; wrap?: boolean }>;
      rows: Array<Record<string, unknown>>;
      wide?: boolean;
    }) => {
      const state = { q: "" };
      const computeCount = () => {
        const q = state.q;
        return options.rows.filter((r) => {
          const blob = options.columns
            .map((c) => normalizeText(r[c.key]))
            .join(" ")
            .toLowerCase();
          return !q || blob.includes(q);
        }).length;
      };

      const render = () => {
        const count = computeCount();
        const base = normalizeText(options.subtitle);
        setModalSubtitle(base ? `${base} · ${count} items` : `${count} items`);
        renderModalBody(
          <SearchTableModalContent
            columns={options.columns}
            rows={options.rows}
            query={state.q}
          />,
        );
      };

      openModal({
        title: options.title,
        subtitle: options.subtitle || "",
        content: null,
        wide: options.wide ?? true,
        list: true,
        search: {
          placeholder: `Search ${options.title.toLowerCase()}`,
          ariaLabel: `Search ${options.title}`,
          onInput: (value) => {
            state.q = value.trim().toLowerCase();
            render();
          },
        },
        focus: "search",
      });

      render();
    };

    const openOpenFindingsListModal = () => {
      const rows = [
        {
          severity: "Critical",
          area: "Identity",
          source: "Okta + GitHub",
          finding: "Terminated user still active in production orgs",
          status: "Open",
          detected: "Today",
        },
        {
          severity: "High",
          area: "Access Reviews",
          source: "AWS IAM",
          finding: "Privileged access review evidence missing for 25 admins",
          status: "Open",
          detected: "Yesterday",
        },
        {
          severity: "Medium",
          area: "Kubernetes",
          source: "Kubernetes",
          finding: "3 clusters missing CIS admission policy updates",
          status: "In progress",
          detected: "2 days ago",
        },
        {
          severity: "Medium",
          area: "Endpoint",
          source: "MDM",
          finding: "2 encryption attestations older than 30 days",
          status: "Open",
          detected: "3 days ago",
        },
        {
          severity: "High",
          area: "Cloud Storage",
          source: "AWS S3",
          finding: "Public access block disabled on 1 bucket (non-prod)",
          status: "Open",
          detected: "4 days ago",
        },
        {
          severity: "Medium",
          area: "Vulnerability",
          source: "Scanner",
          finding: "Critical patch window exceeded for 6 workloads",
          status: "Open",
          detected: "4 days ago",
        },
        {
          severity: "Low",
          area: "Logging",
          source: "CloudTrail",
          finding: "One account missing log integrity validation",
          status: "Open",
          detected: "Last week",
        },
        {
          severity: "Medium",
          area: "Backups",
          source: "RDS",
          finding: "Backup retention below policy for 2 databases",
          status: "In progress",
          detected: "Last week",
        },
        {
          severity: "High",
          area: "Secrets",
          source: "GitHub",
          finding: "Leaked token detected in one repo history",
          status: "Open",
          detected: "Last week",
        },
        {
          severity: "Medium",
          area: "Network",
          source: "Cloud",
          finding: "Two security groups allow 0.0.0.0/0 on admin ports",
          status: "Open",
          detected: "2 weeks ago",
        },
        {
          severity: "Low",
          area: "Docs",
          source: "GRC",
          finding: "Policy acknowledgment pending for 7 users",
          status: "Open",
          detected: "2 weeks ago",
        },
        {
          severity: "Medium",
          area: "SSO",
          source: "Okta",
          finding: "MFA not enforced for one legacy app integration",
          status: "Open",
          detected: "2 weeks ago",
        },
      ];

      openSearchTableModal({
        title: "Open Findings",
        subtitle: "All open items requiring remediation or evidence refresh.",
        columns: [
          { key: "severity", label: "Severity" },
          { key: "area", label: "Area" },
          { key: "source", label: "Source" },
          { key: "finding", label: "Finding", wrap: true },
          { key: "status", label: "Status" },
          { key: "detected", label: "Detected" },
        ],
        rows,
        wide: true,
      });
    };

    const openPassingControlsListModal = () => {
      const rows = [
        {
          id: "CC6.1",
          control: "Logical access provisioning",
          framework: "SOC 2",
          owner: "Identity",
          evidence: "Okta user lifecycle report",
          age: "8m",
        },
        {
          id: "CC6.2",
          control: "MFA enforced for admin access",
          framework: "SOC 2",
          owner: "Security",
          evidence: "Okta MFA policy snapshot",
          age: "12m",
        },
        {
          id: "CC7.2",
          control: "Vulnerability remediation process",
          framework: "SOC 2",
          owner: "Platform",
          evidence: "Scanner SLA export",
          age: "18m",
        },
        {
          id: "A.5.1",
          control: "Information security policies",
          framework: "ISO 27001",
          owner: "GRC",
          evidence: "Policy approval record",
          age: "1d",
        },
        {
          id: "A.9.2",
          control: "User access management",
          framework: "ISO 27001",
          owner: "Identity",
          evidence: "Okta group membership delta",
          age: "10m",
        },
        {
          id: "A.12.4",
          control: "Logging and monitoring",
          framework: "ISO 27001",
          owner: "Security",
          evidence: "CloudTrail integrity report",
          age: "22m",
        },
        {
          id: "CC8.1",
          control: "Change management approvals",
          framework: "SOC 2",
          owner: "Engineering",
          evidence: "GitHub protected branch settings",
          age: "15m",
        },
        {
          id: "A.14.2",
          control: "Secure development lifecycle",
          framework: "ISO 27001",
          owner: "Engineering",
          evidence: "CI security checks status",
          age: "20m",
        },
        {
          id: "CC3.2",
          control: "Incident response readiness",
          framework: "SOC 2",
          owner: "Security",
          evidence: "Pager escalation audit",
          age: "2d",
        },
        {
          id: "A.8.1",
          control: "Asset inventory maintained",
          framework: "ISO 27001",
          owner: "IT",
          evidence: "MDM inventory snapshot",
          age: "35m",
        },
        {
          id: "CC5.2",
          control: "Risk assessment cadence",
          framework: "SOC 2",
          owner: "GRC",
          evidence: "Risk register export",
          age: "6d",
        },
        {
          id: "A.10.1",
          control: "Cryptographic controls",
          framework: "ISO 27001",
          owner: "Platform",
          evidence: "KMS key rotation log",
          age: "3h",
        },
      ];

      openSearchTableModal({
        title: "Passing Controls",
        subtitle:
          "Controls currently passing with linked evidence and no open exceptions.",
        columns: [
          { key: "id", label: "Control ID" },
          { key: "control", label: "Control", wrap: true },
          { key: "framework", label: "Framework" },
          { key: "owner", label: "Owner" },
          { key: "evidence", label: "Evidence", wrap: true },
          { key: "age", label: "Age" },
        ],
        rows,
        wide: true,
      });
    };

    const openMonitoringCoverageListModal = () => {
      const rows = [
        {
          monitor: "Okta: Terminated users deprovisioned",
          system: "Okta",
          coverage: "Users",
          cadence: "Every 15m",
          lastRun: "6m ago",
          status: "Healthy",
        },
        {
          monitor: "GitHub: Admin role changes monitored",
          system: "GitHub",
          coverage: "Org roles",
          cadence: "Every 30m",
          lastRun: "15m ago",
          status: "Reviewing",
        },
        {
          monitor: "AWS: CloudTrail enabled in all accounts",
          system: "AWS",
          coverage: "Accounts",
          cadence: "Every 60m",
          lastRun: "32m ago",
          status: "Healthy",
        },
        {
          monitor: "AWS: S3 public access blocks enforced",
          system: "AWS",
          coverage: "Buckets",
          cadence: "Every 60m",
          lastRun: "41m ago",
          status: "Healthy",
        },
        {
          monitor: "Kubernetes: CIS admission policies present",
          system: "Kubernetes",
          coverage: "Clusters",
          cadence: "Every 30m",
          lastRun: "12h ago",
          status: "Stale",
        },
        {
          monitor: "MDM: Disk encryption enforced",
          system: "MDM",
          coverage: "Endpoints",
          cadence: "Daily",
          lastRun: "8h ago",
          status: "Healthy",
        },
        {
          monitor: "Scanner: Critical vulnerabilities tracked",
          system: "Scanner",
          coverage: "Workloads",
          cadence: "Daily",
          lastRun: "20h ago",
          status: "Healthy",
        },
        {
          monitor: "HRIS: Terminations synced to identity",
          system: "HRIS",
          coverage: "Employees",
          cadence: "Every 4h",
          lastRun: "2h ago",
          status: "Healthy",
        },
        {
          monitor: "SIEM: Alert routing and escalation",
          system: "SIEM",
          coverage: "Alerts",
          cadence: "Hourly",
          lastRun: "55m ago",
          status: "Healthy",
        },
        {
          monitor: "Backups: Retention policy compliance",
          system: "Cloud",
          coverage: "Datastores",
          cadence: "Daily",
          lastRun: "16h ago",
          status: "Healthy",
        },
      ];

      openSearchTableModal({
        title: "Monitoring Coverage",
        subtitle: "Monitors feeding evidence and drift signals across connected systems.",
        columns: [
          { key: "monitor", label: "Monitor", wrap: true },
          { key: "system", label: "System" },
          { key: "coverage", label: "Coverage" },
          { key: "cadence", label: "Cadence" },
          { key: "lastRun", label: "Last Run" },
          { key: "status", label: "Status" },
        ],
        rows,
        wide: true,
      });
    };

    const openEvidenceFreshnessListModal = () => {
      const rows = [
        {
          evidence: "Okta MFA policy snapshot",
          system: "Okta",
          control: "CC6.2",
          age: "12m",
          status: "Fresh",
        },
        {
          evidence: "Okta user lifecycle report",
          system: "Okta",
          control: "CC6.1",
          age: "8m",
          status: "Fresh",
        },
        {
          evidence: "GitHub org admin audit log export",
          system: "GitHub",
          control: "CC6.3",
          age: "15m",
          status: "Fresh",
        },
        {
          evidence: "AWS CloudTrail enabled report",
          system: "AWS",
          control: "A.12.4",
          age: "22m",
          status: "Fresh",
        },
        {
          evidence: "S3 public access settings snapshot",
          system: "AWS",
          control: "CC7.1",
          age: "41m",
          status: "Fresh",
        },
        {
          evidence: "MDM encryption compliance export",
          system: "MDM",
          control: "A.8.1",
          age: "8h",
          status: "Fresh",
        },
        {
          evidence: "Kubernetes inventory + policy sync",
          system: "Kubernetes",
          control: "CC7.2",
          age: "12h",
          status: "Stale",
        },
        {
          evidence: "Risk register export",
          system: "GRC",
          control: "CC5.2",
          age: "6d",
          status: "Fresh",
        },
        {
          evidence: "Privileged access review attestation",
          system: "GRC",
          control: "CC6.4",
          age: "34d",
          status: "Stale",
        },
        {
          evidence: "Key rotation audit log",
          system: "KMS",
          control: "A.10.1",
          age: "3h",
          status: "Fresh",
        },
      ];

      openSearchTableModal({
        title: "Evidence Freshness",
        subtitle: "Evidence items and their collection age across connected systems.",
        columns: [
          { key: "evidence", label: "Evidence", wrap: true },
          { key: "system", label: "System" },
          { key: "control", label: "Control" },
          { key: "age", label: "Age" },
          { key: "status", label: "Status" },
        ],
        rows,
        wide: true,
      });
    };

    // --------------------------
    // Section-card modals (match prototype)
    // --------------------------
    const getSectionTitle = (card: Element) => {
      const header = card.querySelector(".card-header");
      if (header) {
        const spans = header.querySelectorAll("span");
        if (spans && spans[0]) return normalizeText(spans[0].textContent);
      }
      const strong = card.querySelector("strong");
      if (strong) return normalizeText(strong.textContent);
      return "Details";
    };

    const getMetricValueText = (card: Element) => {
      const v = card.querySelector(".metric-value");
      return v ? normalizeText(v.textContent) : "";
    };

    const openSectionDetails = (card: Element) => {
      const title = getSectionTitle(card);
      const value = getMetricValueText(card);

      if (title === "Recent Findings & Drift") {
        const items = parseFindingsFromCard();
        openModal({
          title: "Recent Findings & Drift",
          subtitle: `${items.length} active items requiring attention`,
          content: (
            <RecentFindingsCardModalContent
              items={items}
              onOpenItem={(item) => openFindingDetailModal(item)}
              onCreateTask={closeModal}
              onViewAll={() => {
                closeModal();
                openFindingsModal();
              }}
            />
          ),
          wide: false,
          list: false,
          search: null,
          focus: "close",
        });
        return;
      }

      if (title === "Open Findings") {
        openOpenFindingsListModal();
        return;
      }

      if (title === "Passing Controls") {
        openPassingControlsListModal();
        return;
      }

      if (title === "Monitoring Coverage") {
        openMonitoringCoverageListModal();
        return;
      }

      if (title === "Evidence Freshness") {
        openEvidenceFreshnessListModal();
        return;
      }

      const subtitle = value
        ? `Current value: ${value}`
        : "More details and recommended actions.";
      const bodyText =
        card.querySelector(".metric-sub")?.textContent?.trim() ||
        "Review details and take action as needed.";

      openModal({
        title,
        subtitle,
        content: (
          <div>
            <p>{bodyText}</p>
            <div className="modal-actions">
              <button className="btn" type="button" onClick={closeModal}>
                Create task
              </button>
              <button className="btn primary" type="button" onClick={closeModal}>
                View details
              </button>
            </div>
          </div>
        ),
        wide: false,
        list: false,
        search: null,
        focus: "close",
      });
    };

    const bindSectionModals = () => {
      const cards = [
        ...document.querySelectorAll(".hero-grid > section.card"),
        ...document.querySelectorAll(".mid-grid > section.card"),
        ...document.querySelectorAll(".content > section.card"),
      ];

      cards.forEach((card) => {
        const el = card as HTMLElement;
        if (el.dataset.modalBound === "1") return;
        if (el.dataset.noModal === "1") return;
        if (el.id === "connectedSystemsCard") return;

        const t = getSectionTitle(el);
        if (
          t === "Security Summary" ||
          t === "Recommended Actions" ||
          t === "Framework Progress" ||
          t === "Connected Systems"
        ) {
          return;
        }

        el.dataset.modalBound = "1";
        el.classList.add("is-clickable");
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", "button");

        const onClick = (e: MouseEvent) => {
          if (isInteractive(e.target)) return;
          openSectionDetails(el);
        };
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openSectionDetails(el);
          }
        };

        el.addEventListener("click", onClick);
        el.addEventListener("keydown", onKeyDown);
        cleanups.push(() => el.removeEventListener("click", onClick));
        cleanups.push(() => el.removeEventListener("keydown", onKeyDown));
      });
    };

    const bindNestedSectionModals = () => {
      // Security Summary: each tile opens its own modal.
      const summaryCard = Array.from(
        document.querySelectorAll(".mid-grid > section.card"),
      ).find((c) => getSectionTitle(c) === "Security Summary");

      const summaryItems = summaryCard
        ? Array.from(summaryCard.querySelectorAll<HTMLElement>(".summary-item"))
        : [];

      summaryItems.forEach((item) => {
        if (item.dataset.modalBound === "1") return;
        item.dataset.modalBound = "1";
        item.classList.add("is-clickable");
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");

        const label =
          normalizeText(item.querySelector(".pill")?.textContent) || "Summary";

        const open = () => {
          if (label === "Passing Controls") return openPassingControlsListModal();
          if (label === "Last Evidence Sync") return openEvidenceFreshnessListModal();
          if (label === "Needs Review") {
            return openSearchTableModal({
              title: "Needs Review",
              subtitle:
                "Controls pending review due to stale attestations or incomplete ownership.",
              columns: [
                { key: "id", label: "Control ID" },
                { key: "control", label: "Control", wrap: true },
                { key: "reason", label: "Reason", wrap: true },
                { key: "owner", label: "Owner" },
                { key: "due", label: "Due" },
              ],
              rows: [
                {
                  id: "CC6.4",
                  control: "Periodic access reviews completed",
                  reason: "Attestation older than 30 days",
                  owner: "GRC",
                  due: "In 2 days",
                },
                {
                  id: "A.9.2",
                  control: "User access management",
                  reason: "Owner missing for 1 scoped system",
                  owner: "Identity",
                  due: "This week",
                },
                {
                  id: "CC7.1",
                  control: "Configuration baselines monitored",
                  reason: "Kubernetes source stale (12h)",
                  owner: "Platform",
                  due: "Today",
                },
                {
                  id: "A.12.1",
                  control: "Operational procedures documented",
                  reason: "Policy reference needs update",
                  owner: "GRC",
                  due: "Next week",
                },
                {
                  id: "CC8.1",
                  control: "Change approvals enforced",
                  reason: "Exception pending renewal",
                  owner: "Engineering",
                  due: "In 5 days",
                },
              ],
              wide: true,
            });
          }

          if (label === "Assets At Risk") {
            return openSearchTableModal({
              title: "Assets At Risk",
              subtitle: "Assets tied to critical/high findings that require attention.",
              columns: [
                { key: "asset", label: "Asset", wrap: true },
                { key: "type", label: "Type" },
                { key: "system", label: "System" },
                { key: "risk", label: "Risk", wrap: true },
                { key: "severity", label: "Severity" },
              ],
              rows: [
                {
                  asset: "john.doe@company.com",
                  type: "User",
                  system: "Okta/GitHub",
                  risk: "Deprovisioning gap (still active in prod orgs)",
                  severity: "Critical",
                },
                {
                  asset: "prod-org-admins",
                  type: "Role Set",
                  system: "AWS",
                  risk: "Privileged access review evidence missing",
                  severity: "High",
                },
                {
                  asset: "k8s-cluster-3",
                  type: "Cluster",
                  system: "Kubernetes",
                  risk: "Admission policy drift vs CIS baseline",
                  severity: "Medium",
                },
                {
                  asset: "s3-bucket-nonprod-logs",
                  type: "Bucket",
                  system: "AWS",
                  risk: "Public access block disabled",
                  severity: "High",
                },
                {
                  asset: "sg-admin-ssh",
                  type: "Security Group",
                  system: "AWS",
                  risk: "0.0.0.0/0 allowed on admin port",
                  severity: "Medium",
                },
              ],
              wide: true,
            });
          }

          openModal({
            title: label,
            subtitle: "",
            content: <p>Details for this indicator are coming soon.</p>,
            wide: false,
            list: false,
            search: null,
            focus: "close",
          });
        };

        const onClick = (e: MouseEvent) => {
          if (isInteractive(e.target)) return;
          e.stopPropagation();
          open();
        };
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        };

        item.addEventListener("click", onClick);
        item.addEventListener("keydown", onKeyDown);
        cleanups.push(() => item.removeEventListener("click", onClick));
        cleanups.push(() => item.removeEventListener("keydown", onKeyDown));
      });

      // Recommended Actions: each task item opens its own modal.
      const actionsCard = Array.from(
        document.querySelectorAll(".mid-grid > section.card"),
      ).find((c) => getSectionTitle(c) === "Recommended Actions");

      const tasks = actionsCard
        ? Array.from(actionsCard.querySelectorAll<HTMLElement>(".task-item"))
        : [];

      tasks.forEach((task) => {
        if (task.dataset.modalBound === "1") return;
        task.dataset.modalBound = "1";
        task.classList.add("is-clickable");
        task.setAttribute("tabindex", "0");
        task.setAttribute("role", "button");

        const open = () => {
          const title =
            normalizeText(task.querySelector("strong")?.textContent) ||
            "Recommended Action";
          const desc = normalizeText(task.querySelector("p")?.textContent);
          const metaHtml = task.querySelector<HTMLElement>(".task-meta")?.innerHTML || "";

          openModal({
            title,
            subtitle: desc || "",
            content: (
              <RecommendedActionModalContent
                desc={desc}
                metaHtml={metaHtml}
                onClose={closeModal}
              />
            ),
            wide: false,
            list: false,
            search: null,
            focus: "close",
          });
        };

        const onClick = (e: MouseEvent) => {
          if (isInteractive(e.target)) return;
          e.stopPropagation();
          open();
        };
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        };

        task.addEventListener("click", onClick);
        task.addEventListener("keydown", onKeyDown);
        cleanups.push(() => task.removeEventListener("click", onClick));
        cleanups.push(() => task.removeEventListener("keydown", onKeyDown));
      });
    };

    if (modalHeadSearch) {
      const onClick = (e: MouseEvent) => e.stopPropagation();
      modalHeadSearch.addEventListener("click", onClick);
      cleanups.push(() => modalHeadSearch.removeEventListener("click", onClick));
    }

    const csSearch = document.getElementById("connectedSystemsSearch");
    if (csSearch) {
      const onClick = (e: MouseEvent) => e.stopPropagation();
      csSearch.addEventListener("click", onClick);
      cleanups.push(() => csSearch.removeEventListener("click", onClick));
    }

    syncFindingsCount();
    bindConnectedSystems();
    bindSectionModals();
    bindNestedSectionModals();

    if (app) {
      const onResize = () => {
        if (window.innerWidth > 920) app.classList.remove("sidebar-open");
      };
      window.addEventListener("resize", onResize);
      cleanups.push(() => window.removeEventListener("resize", onResize));
    }

    return () => {
      if (modalRoot) modalRoot.unmount();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
