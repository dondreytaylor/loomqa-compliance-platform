/**
 * Sidebar markup.
 *
 * This is intentionally a server component (no hooks) and closely matches the
 * reference HTML structure/classes.
 */

import Image from "next/image";

import { Icons } from "./icons";
import { dashboardCopy, navSections, sidebarFooterItems } from "./dashboardData";

function SidebarNavItem({
  label,
  href,
  icon,
  hint,
  active,
}: {
  label: string;
  href: string;
  icon: keyof typeof Icons;
  hint?: string;
  active?: boolean;
}) {
  const Icon = Icons[icon];

  return (
    <a className={`nav-item${active ? " active" : ""}`} href={href}>
      <span className="icon">
        <Icon />
      </span>
      <span className="label">{label}</span>
      {hint ? <span className="hint">{hint}</span> : null}
    </a>
  );
}

function SidebarNavSection({
  title,
  collapsible,
  children,
}: {
  title?: string;
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  // When `collapsible` is true, the client-side behavior module toggles the
  // `.is-collapsed` class and updates aria-expanded.
  if (!title) {
    return <section className="nav-section">{children}</section>;
  }

  return (
    <section className="nav-section">
      <button
        className="nav-section-title"
        type="button"
        aria-expanded={collapsible ? "true" : undefined}
      >
        <span>{title}</span>
        <span className="chev">
          <Icons.ChevronDown />
        </span>
      </button>
      {children}
    </section>
  );
}

export function DashboardSidebar() {
  // This component is shared across dashboard + all sidebar-linked pages.
  // We intentionally keep it server-rendered and pass the active route
  // from each page to avoid introducing client-side routing dependencies.
  return <DashboardSidebarWithActiveHref activeHref="/" />;
}

export function DashboardSidebarWithActiveHref({
  activeHref,
}: {
  /** The sidebar link `href` that should receive the `.active` class. */
  activeHref: string;
}) {
  return (
    <aside className="sidebar">
      <div className="brand-row">
        <button
          className="sidebar-mini-toggle"
          id="desktopCollapse"
          type="button"
          aria-label="Collapse sidebar"
        >
          <span className="mini-toggle" />
          <span className="chev">
            <Icons.ChevronDown />
          </span>
        </button>
      </div>

      <div className="account">
        <div className="logo-box">
          {/* The prototype logo is shipped via /public so it can be referenced by URL. */}
          <Image src="/svgexport-1.svg" alt="LoopQA logo" width={28} height={28} />
        </div>
        <div className="account-copy">
          <h1>{dashboardCopy.sidebarOrgName}</h1>
          <span className="tag">{dashboardCopy.sidebarTag}</span>
        </div>
      </div>

      {navSections.map((section, idx) => (
        <SidebarNavSection
          key={section.title ?? `section-${idx}`}
          title={section.title}
          collapsible={section.collapsible}
        >
          <nav className="nav">
            {section.items.map((item) => (
              <SidebarNavItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                hint={item.hint}
                active={item.href === activeHref}
              />
            ))}
          </nav>
        </SidebarNavSection>
      ))}

      <div className="sidebar-footer">
        {sidebarFooterItems.map((item) => (
          <SidebarNavItem
            key={item.label}
            label={item.label}
            href={item.href}
            icon={item.icon}
            hint={item.hint}
            active={item.href === activeHref}
          />
        ))}
      </div>
    </aside>
  );
}
