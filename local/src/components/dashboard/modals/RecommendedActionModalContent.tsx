type Props = {
  desc: string;
  metaHtml: string;
  onClose: () => void;
};

export function RecommendedActionModalContent({ desc, metaHtml, onClose }: Props) {
  return (
    <div>
      <div className="modal-list">
        <div className="task-item">
          <strong>Context</strong>
          <p>{desc || "—"}</p>
          {metaHtml ? (
            <div className="task-meta" dangerouslySetInnerHTML={{ __html: metaHtml }} />
          ) : null}
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn" type="button" id="actSnooze" onClick={onClose}>
          Snooze
        </button>
        <button className="btn primary" type="button" id="actTask" onClick={onClose}>
          Create task
        </button>
      </div>
    </div>
  );
}
