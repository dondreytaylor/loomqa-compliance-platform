type Props = {
  onClose: () => void;
};

export function ConnectSystemModalContent({ onClose }: Props) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gap: 10,
          marginTop: 2,
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 750, marginBottom: 6 }}>System</div>
          <select
            className="select"
            id="connectSystemType"
            aria-label="System"
            defaultValue="okta"
          >
            <option value="okta">Okta</option>
            <option value="github">GitHub</option>
            <option value="aws">AWS</option>
            <option value="kubernetes">Kubernetes</option>
          </select>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 750, marginBottom: 6 }}>
            Workspace / Org
          </div>
          <input
            className="input"
            id="connectSystemOrg"
            placeholder="e.g. company-prod"
            aria-label="Workspace or org"
          />
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 750, marginBottom: 6 }}>
            Access token
          </div>
          <input
            className="input"
            id="connectSystemToken"
            placeholder="Paste token"
            aria-label="Access token"
          />
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="btn primary" type="button" onClick={onClose}>
          Connect system
        </button>
      </div>
    </div>
  );
}
