import { prisma } from "../lib/prisma";
import crypto from "crypto";

const generateInviteCode = async (): Promise<string> => {
  let isUnique = false;
  let code = "";

  while (!isUnique) {
    code = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6 chars alphanumeric
    const existing = await prisma.team.findUnique({
      where: { inviteCode: code },
    });
    if (!existing) {
      isUnique = true;
    }
  }
  return code;
};

export const teamService = {
  createTeam: async (name: string, userId: string) => {
    const inviteCode = await generateInviteCode();

    const team = await prisma.team.create({
      data: {
        name,
        inviteCode,
        members: {
          create: {
            userId,
            role: "creator",
          },
        },
      },
      include: {
        members: true,
      },
    });

    return team;
  },

  getMyTeams: async (userId: string) => {
    return await prisma.team.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        _count: {
          select: { members: true, tasks: true },
        },
      },
    });
  },

  getTeamDetails: async (teamId: string, userId: string) => {
    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        tasks: true,
      },
    });

    if (!team) throw new Error("Team not found or access denied");
    return team;
  },

  joinTeam: async (inviteCode: string, userId: string) => {
    const team = await prisma.team.findUnique({ where: { inviteCode } });
    if (!team) throw new Error("Invalid invite code");

    const existingMembership = await prisma.membership.findUnique({
      where: {
        userId_teamId: { userId, teamId: team.id },
      },
    });

    if (existingMembership) throw new Error("Already a member of this team");

    const membership = await prisma.membership.create({
      data: {
        userId,
        teamId: team.id,
        role: "member",
      },
    });

    return { message: "Joined team successfully", teamId: team.id };
  },

  deleteTeam: async (teamId: string, userId: string) => {
    const membership = await prisma.membership.findUnique({
      where: { userId_teamId: { userId, teamId } },
    });

    if (!membership || membership.role !== "creator") {
      throw new Error("Access denied. Only creator can delete.");
    }

    await prisma.$transaction([
      prisma.task.deleteMany({ where: { teamId } }),
      prisma.membership.deleteMany({ where: { teamId } }),
      prisma.team.delete({ where: { id: teamId } }),
    ]);

    return { message: "Team deleted successfully" };
  },

  removeMember: async (
    teamId: string,
    memberId: string,
    requestUserId: string,
  ) => {
    if (memberId === requestUserId)
      throw new Error("Cannot remove yourself this way");

    const requestMembership = await prisma.membership.findUnique({
      where: { userId_teamId: { userId: requestUserId, teamId } },
    });

    if (!requestMembership || requestMembership.role !== "creator") {
      throw new Error("Access denied. Only creator can remove members.");
    }

    await prisma.membership.delete({
      where: { userId_teamId: { userId: memberId, teamId } },
    });

    return { message: "Member removed successfully" };
  },
};
