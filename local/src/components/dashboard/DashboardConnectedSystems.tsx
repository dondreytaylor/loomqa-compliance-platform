/**
 * Connected Systems table.
 *
 * The client behavior module binds row-click handlers to open a details modal.
 */

import { connectedSystems } from "./dashboardData";

export function DashboardConnectedSystems() {
  return (
    <section className="card table-card" id="connectedSystemsCard">
      <div className="table-head">
        <div className="table-head-left">
          <div style={{ fontSize: 15, fontWeight: 760 }}>Connected Systems</div>
          <div className="table-refresh">
            Last refresh <span className="pill green">6 min ago</span>
          </div>
        </div>

        <div className="table-tools" aria-label="Connected systems tools">
          <input
            className="table-search"
            id="connectedSystemsSearch"
            placeholder="Search connected systems"
            aria-label="Search connected systems"
          />
          <button className="btn" type="button" id="addSystemBtn">
            Add system
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table id="connectedSystemsTable">
          <thead>
            <tr>
              <th>Source</th>
              <th>Asset Scope</th>
              <th>Health</th>
              <th>Coverage</th>
              <th>Last Scan</th>
            </tr>
          </thead>
          <tbody>
            {connectedSystems.map((sys) => (
              <tr key={sys.source}>
                <td>
                  <div className="name-cell">
                    <span className="brand-icon">{sys.short}</span>
                    {sys.source}
                  </div>
                </td>
                <td>{sys.scope}</td>
                <td>
                  <span className={`pill ${sys.health.pillClass}`}>
                    {sys.health.text}
                  </span>
                </td>
                <td>{sys.coverage}</td>
                <td>{sys.lastScan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
