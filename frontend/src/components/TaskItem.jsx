export default function TaskItem({ task, onEdit, onDelete, deletingId }) {
  return (
    <div className="task">
      <div className="task-main">
        <div className="task-title">
          <strong>{task.title}</strong>
          <span className="pill">{task.status}</span>
          <span className="pill">{task.priority}</span>
        </div>

        {task.description ? <div className="muted">{task.description}</div> : null}

        <div className="muted small">
          Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"} •
          Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : "—"}
        </div>
      </div>

      <div className="task-actions">
        <button className="secondary" onClick={() => onEdit(task)}>Edit</button>
        <button
          className="danger"
          onClick={() => onDelete(task._id)}
          disabled={deletingId === task._id}
        >
          {deletingId === task._id ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}