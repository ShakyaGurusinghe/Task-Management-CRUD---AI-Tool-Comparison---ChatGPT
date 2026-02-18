export default function TaskFilter({ status, setStatus }) {
  return (
    <div className="row">
      <label className="label">Filter by status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}