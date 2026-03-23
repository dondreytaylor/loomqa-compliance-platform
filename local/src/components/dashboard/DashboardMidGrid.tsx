/**
 * The mid-page two column grid (Security Summary + Recommended Actions).
 */

import { recommendedActions, securitySummary } from "./dashboardData";

export function DashboardMidGrid() {
  return (
    <div className="mid-grid">
      <section className="card">
        <div className="card-header">
          <span>Security Summary</span>
          <span className="pill green">Healthy trend</span>
        </div>

        <div className="summary-grid">
          {securitySummary.map((tile) => (
            <div key={tile.pillText} className="summary-item">
              <span className={`pill ${tile.pillClass}`}>{tile.pillText}</span>
              <h4>{tile.value}</h4>
              <p>{tile.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <span>Recommended Actions</span>
          <span className="pill purple">Prioritized</span>
        </div>

        <div className="findings-list">
          {recommendedActions.map((item) => (
            <div key={item.title} className="task-item">
              <strong>{item.title}</strong>
              <p>{item.meta}</p>
              <div className="task-meta">
                {item.pills.map((pill) => (
                  <span
                    key={`${pill.text}-${pill.pillClass}`}
                    className={`pill ${pill.pillClass}`}
                  >
                    {pill.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
