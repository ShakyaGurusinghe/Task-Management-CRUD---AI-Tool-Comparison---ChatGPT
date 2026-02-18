import { useEffect, useMemo, useState } from "react";

const initialState = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: ""
};

export default function TaskForm({ onSubmit, loading, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(initialState);
  const isEditing = useMemo(() => Boolean(editingTask?._id), [editingTask]);

  useEffect(() => {
    if (editingTask?._id) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "pending",
        priority: editingTask.priority || "medium",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : ""
      });
    } else {
      setForm(initialState);
    }
  }, [editingTask]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form, () => setForm(initialState));
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>

      <div className="row">
        <label className="label">Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g., Finish report"
          required
          maxLength={200}
        />
      </div>

      <div className="row">
        <label className="label">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional details..."
          maxLength={2000}
          rows={3}
        />
      </div>

      <div className="grid">
        <div className="row">
          <label className="label">Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="row">
          <label className="label">Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="row">
          <label className="label">Due Date</label>
          <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        </div>
      </div>

      <div className="actions">
        <button disabled={loading} type="submit">
          {loading ? "Saving..." : isEditing ? "Update" : "Create"}
        </button>

        {isEditing && (
          <button disabled={loading} type="button" className="secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}