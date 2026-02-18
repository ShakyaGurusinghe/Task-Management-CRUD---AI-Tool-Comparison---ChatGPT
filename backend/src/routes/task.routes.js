import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask
} from "../controllers/task.controller.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

const statusEnum = ["pending", "in-progress", "completed"];
const priorityEnum = ["low", "medium", "high"];

router.post(
  "/",
  [
    body("title").isString().trim().notEmpty().withMessage("title is required").isLength({ max: 200 }),
    body("description").optional().isString().trim().isLength({ max: 2000 }),
    body("status").optional().isIn(statusEnum),
    body("priority").optional().isIn(priorityEnum),
    body("dueDate").optional({ nullable: true }).isISO8601().withMessage("dueDate must be ISO8601 date")
  ],
  validate,
  createTask
);

router.get(
  "/",
  [query("status").optional().isIn(statusEnum)],
  validate,
  getAllTasks
);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task id")],
  validate,
  getTaskById
);

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid task id"),
    body("title").optional().isString().trim().notEmpty().isLength({ max: 200 }),
    body("description").optional().isString().trim().isLength({ max: 2000 }),
    body("status").optional().isIn(statusEnum),
    body("priority").optional().isIn(priorityEnum),
    body("dueDate").optional({ nullable: true }).isISO8601().withMessage("dueDate must be ISO8601 date")
  ],
  validate,
  updateTask
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid task id")],
  validate,
  deleteTask
);

export default router;