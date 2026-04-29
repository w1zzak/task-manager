import { Request, Response, NextFunction } from "express";
import { teamService } from "../services/team.service";

export const createTeam = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const userId = req.user!.id;

    if (!name) return res.status(400).json({ error: "Team name is required" });

    const team = await teamService.createTeam(name, userId);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

export const getMyTeams = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const teams = await teamService.getMyTeams(userId);
    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

export const getTeamDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const team = await teamService.getTeamDetails(id, userId);
    res.status(200).json(team);
  } catch (error: any) {
    if (error.message.includes("not found"))
      return res.status(404).json({ error: error.message });
    next(error);
  }
};

export const joinTeam = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { inviteCode } = req.body;
    const userId = req.user!.id;

    if (!inviteCode)
      return res.status(400).json({ error: "Invite code is required" });

    const result = await teamService.joinTeam(inviteCode, userId);
    res.status(200).json(result);
  } catch (error: any) {
    if (
      error.message.includes("Invalid") ||
      error.message.includes("Already")
    ) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const result = await teamService.deleteTeam(id, userId);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message.includes("Access denied"))
      return res.status(403).json({ error: error.message });
    next(error);
  }
};

export const removeMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { teamId, userId: memberId } = req.params;
    const requestUserId = req.user!.id;
    const result = await teamService.removeMember(
      teamId,
      memberId,
      requestUserId,
    );
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message.includes("Access denied"))
      return res.status(403).json({ error: error.message });
    if (error.message.includes("yourself"))
      return res.status(400).json({ error: error.message });
    next(error);
  }
};
