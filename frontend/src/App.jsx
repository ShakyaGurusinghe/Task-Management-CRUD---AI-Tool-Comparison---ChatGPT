import { useEffect, useMemo, useState } from "react";
import { api, apiErrorMessage } from "./api/client.js";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskFilter from "./components/TaskFilter.jsx";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    if (!statusFilter) return tasks;
    return tasks.filter((t) => t.status === statusFilter);
  }, [tasks, statusFilter]);

  async function fetchTasks() {
    setError("");
    try {
      const res = await api.get("/api/tasks");
      setTasks(res.data.data || []);
    } catch (err) {
      setError(apiErrorMessage(err));
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleSubmit(form, reset) {
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null
      };

      if (editingTask?._id) {
        const res = await api.put(`/api/tasks/${editingTask._id}`, payload);
        const updated = res.data.data;
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTask(null);
      } else {
        const res = await api.post("/api/tasks", payload);
        const created = res.data.data;
        setTasks((prev) => [created, ...prev]);
      }

      reset();
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    setDeletingId(id);
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Task Manager</h1>
        <p className="muted">CRUD • Validation • Filters • MongoDB</p>
      </header>

      {error ? <div className="alert">{error}</div> : null}

      <div className="layout">
        <div>
          <TaskForm
            onSubmit={handleSubmit}
            loading={loading}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />

          <div className="card">
            <TaskFilter status={statusFilter} setStatus={setStatusFilter} />
            <button className="secondary full" onClick={fetchTasks}>
              Refresh
            </button>
          </div>
        </div>

        <div>
          <TaskList
            tasks={filtered}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        </div>
      </div>
    </div>
  );
}