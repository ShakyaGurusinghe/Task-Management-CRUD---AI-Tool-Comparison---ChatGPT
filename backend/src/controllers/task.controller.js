import Task from "../models/Task.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate: dueDate ? new Date(dueDate) : null
  });

  res.status(201).json({ success: true, data: task });
});

export const getAllTasks = asyncHandler(async (req, res) => {
  // Optional filter: ?status=pending
  const { status } = req.query;
  const query = {};
  if (status) query.status = status;

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  res.json({ success: true, data: tasks });
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new AppError("Task not found", 404);

  res.json({ success: true, data: task });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null
    },
    { new: true, runValidators: true }
  );

  if (!updated) throw new AppError("Task not found", 404);

  res.json({ success: true, data: updated });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);
  if (!deleted) throw new AppError("Task not found", 404);

  res.json({ success: true, data: deleted });
});