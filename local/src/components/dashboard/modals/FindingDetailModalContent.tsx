import type { FindingItem } from "./FindingsListModalContent";

type Props = {
  item: FindingItem;
  onClose: () => void;
};

export function FindingDetailModalContent({ item, onClose }: Props) {
  return (
    <div>
      <div className="modal-list">
        <div className="task-item">
          <strong>Details</strong>
          <p dangerouslySetInnerHTML={{ __html: item.detailHtml }} />
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn" type="button" onClick={onClose}>
          Mark acknowledged
        </button>
        <button className="btn primary" type="button" onClick={onClose}>
          Create task
        </button>
      </div>
    </div>
  );
}
