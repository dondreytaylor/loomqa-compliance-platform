/**
 * Modal overlay markup.
 *
 * The prototype implements modal behavior with imperative DOM logic.
 * In the Next app we keep the same DOM structure/ids so the behavior module can
 * remain small and focused.
 */

export function DashboardModal() {
  return (
    <div className="modal-overlay" id="modalOverlay" aria-hidden="true">
      <div
        className="modal"
        id="modalDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="modal-head">
          <div className="modal-head-left">
            <div className="modal-title" id="modalTitle">
              Details
            </div>
            <div className="modal-subtitle" id="modalSubtitle" hidden />
          </div>

          <div className="modal-head-right">
            <input
              className="table-search modal-head-search"
              id="modalHeadSearch"
              placeholder="Search"
              aria-label="Search"
              hidden
            />
            <button
              className="icon-btn"
              type="button"
              id="modalClose"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body" id="modalBody" />
      </div>
    </div>
  );
}
