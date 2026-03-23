import type { FindingItem } from "./FindingsListModalContent";

type Props = {
  items: FindingItem[];
  onOpenItem: (item: FindingItem) => void;
  onCreateTask: () => void;
  onViewAll: () => void;
};

export function RecentFindingsCardModalContent({
  items,
  onOpenItem,
  onCreateTask,
  onViewAll,
}: Props) {
  return (
    <div>
      <div className="modal-list">
        {items.slice(0, 4).map((item) => (
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
        ))}
      </div>

      <div className="modal-actions">
        <button className="btn" type="button" onClick={onCreateTask}>
          Create task from selection
        </button>
        <button className="btn primary" type="button" onClick={onViewAll}>
          View all findings
        </button>
      </div>
    </div>
  );
}
