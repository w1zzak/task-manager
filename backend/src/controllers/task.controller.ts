import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/task.service";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { teamId } = req.params;
    const { title, description, assignedToId } = req.body;
    const userId = req.user!.id;

    if (!title)
      return res.status(400).json({ error: "Task title is required" });

    const task = await taskService.createTask(
      teamId,
      userId,
      title,
      description,
      assignedToId,
    );
    res.status(201).json(task);
  } catch (error: any) {
    if (error.message.includes("Access denied"))
      return res.status(403).json({ error: error.message });
    next(error);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { teamId } = req.params;
    const userId = req.user!.id;
    const tasks = await taskService.getTasks(teamId, userId);
    res.status(200).json(tasks);
  } catch (error: any) {
    if (error.message.includes("Access denied"))
      return res.status(403).json({ error: error.message });
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const { title, description, status, assignedToId } = req.body;

    const task = await taskService.updateTask(id, userId, {
      title,
      description,
      status,
      assignedToId,
    });
    res.status(200).json(task);
  } catch (error: any) {
    if (error.message.includes("Access denied"))
      return res.status(403).json({ error: error.message });
    if (error.message.includes("not found"))
      return res.status(404).json({ error: error.message });
    next(error);
  }
};

export const toggleComplete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const task = await taskService.toggleComplete(id, userId);
    res.status(200).json(task);
  } catch (error: any) {
    if (error.message.includes("Access denied"))
      return res.status(403).json({ error: error.message });
    if (error.message.includes("not found"))
      return res.status(404).json({ error: error.message });
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const result = await taskService.deleteTask(id, userId);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message.includes("Access denied"))
      return res.status(403).json({ error: error.message });
    if (error.message.includes("not found"))
      return res.status(404).json({ error: error.message });
    next(error);
  }
};
