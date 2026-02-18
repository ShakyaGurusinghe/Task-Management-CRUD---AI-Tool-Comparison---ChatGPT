import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onEdit, onDelete, deletingId }) {
  if (!tasks.length) {
    return <div className="card">No tasks found.</div>;
  }

  return (
    <div className="card">
      <h2>Tasks</h2>
      <div className="list">
        {tasks.map((t) => (
          <TaskItem key={t._id} task={t} onEdit={onEdit} onDelete={onDelete} deletingId={deletingId} />
        ))}
      </div>
    </div>
  );
}