import { Router } from "express";
import {
  createTeam,
  getMyTeams,
  getTeamDetails,
  joinTeam,
  deleteTeam,
  removeMember,
} from "../controllers/team.controller";
import { createTask, getTasks } from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// All team routes are protected
router.use(authMiddleware);

router.post("/", createTeam);
router.get("/", getMyTeams);
router.get("/:id", getTeamDetails);
router.post("/join", joinTeam);
router.delete("/:id", deleteTeam);
router.delete("/:teamId/members/:userId", removeMember);

// Task routes specific to a team
router.post("/:teamId/tasks", createTask);
router.get("/:teamId/tasks", getTasks);

export default router;
