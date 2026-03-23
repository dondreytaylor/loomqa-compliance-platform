export type FindingItem = {
  id: string;
  type: "Finding" | "Drift";
  severity: string;
  pill: "red" | "amber" | "green";
  title: string;
  detailText: string;
  detailHtml: string;
};

type Props = {
  items: FindingItem[];
  empty: boolean;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenItem: (item: FindingItem) => void;
};

export function FindingsListModalContent({
  items,
  empty,
  page,
  totalPages,
  onPrev,
  onNext,
  onOpenItem,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1",
        minHeight: 0,
      }}
    >
      <div className="modal-scroll" style={{ minHeight: 0 }}>
        <div className="modal-list">
          {empty ? (
            <div className="task-item">
              <strong>No matches</strong>
              <p>Try a different search term.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="task-item is-clickable"
                tabIndex={0}
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenItem(item);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenItem(item);
                  }
                }}
              >
                <strong>{item.title}</strong>
                <p>{item.detailText}</p>
                <div className="task-meta">
                  <span className={`pill ${item.pill}`}>{item.type}</span>
                  <span className={`pill ${item.pill}`}>{item.severity}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pager">
        <button
          className="btn"
          type="button"
          id="findingsPrev"
          onClick={onPrev}
          disabled={page <= 1}
        >
          Prev
        </button>
        <div className="page-label" id="findingsPageLabel">
          Page {page} of {totalPages}
        </div>
        <button
          className="btn"
          type="button"
          id="findingsNext"
          onClick={onNext}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
