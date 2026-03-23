/**
 * Framework Progress section.
 *
 * The control grid is purely presentational in the prototype. This component
 * keeps it data-driven so you can later plug in real control states.
 */

import { frameworks } from "./dashboardData";

function ControlGrid({ done, warn, fail }: { done: number; warn: number; fail: number }) {
  const total = done + warn + fail;

  return (
    <div className="control-grid" aria-label="Control status grid">
      {Array.from({ length: total }).map((_, idx) => {
        const cls = idx < done ? "done" : idx < done + warn ? "warn" : "fail";
        return <span key={idx} className={cls} />;
      })}
    </div>
  );
}

export function DashboardFrameworkProgress() {
  return (
    <section className="card" style={{ marginTop: 14 }}>
      <div className="card-header">
        <span>Framework Progress</span>
        <span className="pill purple">4 active frameworks</span>
      </div>

      <div className="framework-grid">
        {frameworks.map((fw) => (
          <section key={fw.name} className="card" style={{ padding: 14 }}>
            <div className="framework-top">
              <div className="left">
                <span className="mini-stat">{fw.short}</span>
                <div>
                  <div>{fw.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>
                    {fw.subtext}
                  </div>
                </div>
              </div>
              <span className="pill purple">{fw.completionPill}</span>
            </div>

            <div className="legend">
              <span>
                <span className="dot" style={{ background: "#9e93ff" }} />
                Passing
              </span>
              <span>
                <span className="dot" style={{ background: "#f7c870" }} />
                Pending
              </span>
              <span>
                <span className="dot" style={{ background: "#f09696" }} />
                Failing
              </span>
            </div>

            <ControlGrid done={fw.done} warn={fw.warn} fail={fw.fail} />

            <div className="framework-progress">
              <div className="card-header" style={{ margin: 0 }}>
                <span>Mapped requirements</span>
                <span>{fw.mappedPercent}%</span>
              </div>
              <div className="progress-track">
                <span style={{ width: `${fw.mappedPercent}%` }} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
