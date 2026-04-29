import { Router } from "express";
import {
  updateTask,
  toggleComplete,
  deleteTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.put("/:id", updateTask);
router.patch("/:id/complete", toggleComplete);
router.delete("/:id", deleteTask);

export default router;
