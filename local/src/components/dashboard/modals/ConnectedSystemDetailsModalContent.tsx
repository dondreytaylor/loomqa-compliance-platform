type Props = {
  scope: string;
  coverage: string;
  health: string;
  healthPill: "green" | "amber" | "red" | "";
  lastScan: string;
  onClose: () => void;
};

export function ConnectedSystemDetailsModalContent({
  scope,
  coverage,
  health,
  healthPill,
  lastScan,
  onClose,
}: Props) {
  return (
    <div>
      <div
        className="form-grid"
        style={{
          gap: 12,
          marginTop: 2,
        }}
      >
        <div className="task-item">
          <strong>Asset scope</strong>
          <p>{scope || "—"}</p>
        </div>
        <div className="task-item">
          <strong>Coverage</strong>
          <p>{coverage || "—"}</p>
        </div>
        <div className="task-item">
          <strong>Health</strong>
          <p>
            {healthPill ? (
              <span className={`pill ${healthPill}`}>{health || "—"}</span>
            ) : (
              health || "—"
            )}
          </p>
        </div>
        <div className="task-item">
          <strong>Last scan</strong>
          <p>{lastScan || "—"}</p>
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn" type="button" onClick={onClose}>
          Run sync
        </button>
        <button className="btn primary" type="button" onClick={onClose}>
          Manage connection
        </button>
      </div>
    </div>
  );
}
