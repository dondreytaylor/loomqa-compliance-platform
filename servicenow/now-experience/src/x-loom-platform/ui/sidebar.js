/*
 * Sidebar renderer.
 *
 * This is a Now Experience / UI Framework-friendly translation of the local
 * Next.js dashboard sidebar (`platform/local/src/components/dashboard/DashboardSidebar.tsx`).
 *
 * Key differences vs local:
 * - Links are treated as *internal routes* in component state.
 * - Collapsing/expanding sections is state-driven (no DOM listeners).
 */

import {Icons} from '../icons/icons';
import {dashboardCopy, navSections, sidebarFooterItems} from '../data/dashboardData';

function SidebarNavItem({
	label,
	href,
	icon,
	hint,
	active,
	onNavigate
}) {
	const Icon = Icons[icon] || Icons.Dashboard;

	return (
		<a
			className={`nav-item${active ? ' active' : ''}`}
			href={href}
			on-click={(e) => {
				// In UI Builder we keep navigation inside the component.
				e.preventDefault();
				onNavigate(href);
			}}
		>
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
	collapsed,
	onToggle,
	children
}) {
	if (!title) {
		return <section className="nav-section">{children}</section>;
	}

	return (
		<section className={`nav-section${collapsed ? ' is-collapsed' : ''}`}
		>
			<button
				className="nav-section-title"
				type="button"
				aria-expanded={collapsible ? String(!collapsed) : undefined}
				on-click={() => {
					if (!collapsible) return;
					onToggle(!collapsed);
				}}
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

export function renderSidebar(state, {updateState}) {
	const {activeHref, sidebarCollapsed, mobileSidebarOpen} = state;

	const handleNavigate = (href) => {
		updateState({
			activeHref: href,
			mobileSidebarOpen: false
		});
	};

	const toggleDesktopCollapse = () =>
		updateState({sidebarCollapsed: !sidebarCollapsed});

	return (
		<aside className={`sidebar${mobileSidebarOpen ? ' is-open' : ''}`}>
			<div className="brand-row">
				<button
					className="sidebar-mini-toggle"
					type="button"
					aria-label="Collapse sidebar"
					on-click={toggleDesktopCollapse}
				>
					<span className="mini-toggle" />
					<span className="chev">
						<Icons.ChevronDown />
					</span>
				</button>
			</div>

			<div className="account">
				<div className="logo-box" aria-hidden="true">
					<span className="logo-mark">
						{Icons.LogoMark ? <Icons.LogoMark /> : <span>L</span>}
					</span>
				</div>
				<div className="account-copy">
					<h1>{dashboardCopy.sidebarOrgName}</h1>
					<span className="tag">{dashboardCopy.sidebarTag}</span>
				</div>
			</div>

			{navSections.map((section, idx) => {
				const title = section.title;
				const isCollapsible = Boolean(section.collapsible && title);
				const collapsed = title
					? Boolean(state.navSectionCollapsed?.[title])
					: false;

				return (
					<SidebarNavSection
						key={title ?? `section-${idx}`}
						title={title}
						collapsible={isCollapsible}
						collapsed={collapsed}
						onToggle={(nextCollapsed) => {
							if (!title) return;
							updateState({
								navSectionCollapsed: {
									...state.navSectionCollapsed,
									[title]: nextCollapsed
								}
							});
						}}
					>
						{collapsed ? null : (
							<nav className="nav">
								{section.items.map((item) => (
									<SidebarNavItem
										key={item.label}
										label={item.label}
										href={item.href}
										icon={item.icon}
										hint={item.hint}
										active={item.href === activeHref}
										onNavigate={handleNavigate}
									/>
								))}
							</nav>
						)}
					</SidebarNavSection>
				);
			})}

			<div className="sidebar-footer">
				{sidebarFooterItems.map((item) => (
					<SidebarNavItem
						key={item.label}
						label={item.label}
						href={item.href}
						icon={item.icon}
						hint={item.hint}
						active={item.href === activeHref}
						onNavigate={handleNavigate}
					/>
				))}
			</div>
		</aside>
	);
}
