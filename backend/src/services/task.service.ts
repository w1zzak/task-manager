import { prisma } from "../lib/prisma";

const verifyMembership = async (teamId: string, userId: string) => {
  const membership = await prisma.membership.findUnique({
    where: { userId_teamId: { userId, teamId } },
  });
  if (!membership) {
    throw new Error("Access denied. You are not a member of this team.");
  }
};

export const taskService = {
  createTask: async (
    teamId: string,
    userId: string,
    title: string,
    description?: string,
    assignedToId?: string,
  ) => {
    await verifyMembership(teamId, userId);
    return await prisma.task.create({
      data: {
        title,
        description,
        teamId,
        assignedToId,
      },
    });
  },

  getTasks: async (teamId: string, userId: string) => {
    await verifyMembership(teamId, userId);
    return await prisma.task.findMany({
      where: { teamId },
      orderBy: { createdAt: "desc" },
    });
  },

  updateTask: async (
    id: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      status?: string;
      assignedToId?: string;
    },
  ) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new Error("Task not found");

    await verifyMembership(task.teamId, userId);

    return await prisma.task.update({
      where: { id },
      data,
    });
  },

  toggleComplete: async (id: string, userId: string) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new Error("Task not found");

    await verifyMembership(task.teamId, userId);

    const newStatus = task.status === "Done" ? "Todo" : "Done";

    return await prisma.task.update({
      where: { id },
      data: { status: newStatus },
    });
  },

  deleteTask: async (id: string, userId: string) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new Error("Task not found");

    await verifyMembership(task.teamId, userId);

    await prisma.task.delete({ where: { id } });
    return { message: "Task deleted successfully" };
  },
};
