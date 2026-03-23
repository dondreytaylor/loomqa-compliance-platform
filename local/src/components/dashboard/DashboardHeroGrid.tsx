/**
 * The "hero" section at the top of the overview page.
 *
 * This is split out so it can be reused across future dashboard variants
 * (e.g. per-framework dashboards).
 */

import { heroMetrics, integrityScore, findings } from "./dashboardData";
import { Icons } from "./icons";

function Pill({ className, children }: { className: string; children: React.ReactNode }) {
  return <span className={`pill ${className}`}>{children}</span>;
}

function MetricCard({
  title,
  value,
  pillText,
  pillClass,
  description,
  className,
}: {
  title: string;
  value: string;
  pillText: string;
  pillClass?: string;
  description: string;
  className: string;
}) {
  return (
    <section className={`card metric-card ${className}`}>
      <div className="card-header">
        <span>{title}</span>
        <span className={`pill ${pillClass ?? ""}`.trim()}>{pillText}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-sub">{description}</div>
    </section>
  );
}

export function DashboardHeroGrid() {
  return (
    <div className="hero-grid">
      <section className="card score-card score-span" data-no-modal="1">
        <div className="ring-wrap">
          <div className="ring" />
          <div className="ring-value">
            <strong>{integrityScore.score}</strong>
            <span>/ 100</span>
          </div>
        </div>

        <div className="score-copy">
          <div className="card-header" style={{ marginBottom: 6, paddingTop: 2 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="icon">
                <Icons.Risk />
              </span>
              Integrity Score
            </span>
          </div>

          <h3>{integrityScore.heading}</h3>
          <p>{integrityScore.description}</p>

          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {integrityScore.signals.map((signal) => (
              <div
                key={signal.pillText}
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <Pill className={signal.pillClass}>{signal.pillText}</Pill>
                <p className="metric-sub" style={{ margin: 0 }}>
                  {signal.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {heroMetrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          pillText={metric.pillText}
          pillClass={metric.pillClass}
          description={metric.description}
          className={metric.className}
        />
      ))}

      <section className="card findings-panel">
        <div className="card-header">
          <span>Recent Findings &amp; Drift</span>
          <span className="pill amber">7 active</span>
        </div>

        <div className="findings-list">
          {findings.map((f) => (
            <div key={f.id} className={`finding ${f.variantClass}`}>
              <span className={`pill ${f.pillClass}`}>{f.severity}</span>
              {/*
                The prototype uses a small amount of inline HTML (bold email)
                for the finding description. This is demo-only content.
              */}
              <p dangerouslySetInnerHTML={{ __html: f.html }} />
            </div>
          ))}
        </div>

        <div className="card-footer-row">
          <button className="btn" type="button" id="viewMoreFindings">
            View more
          </button>
        </div>
      </section>
    </div>
  );
}
