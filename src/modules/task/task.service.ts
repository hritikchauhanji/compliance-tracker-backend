import { prisma } from "../../utils/prism.util.js";
import {
  ClientIdType,
  CreateTaskType,
  QueryType,
  TaskIdType,
  UpdateTaskType,
} from "./task.schema.js";

export async function createTaskService(body: CreateTaskType) {
  const { title, category, client_id, due_date, description, priority } = body;

  const client = await prisma.client.findUnique({
    where: {
      id: client_id,
    },
    select: {
      id: true,
    },
  });

  if (!client) {
    throw new Error("Client not found");
  }

  const task = await prisma.task.findFirst({
    where: { title, client_id },
    select: {
      id: true,
    },
  });

  if (task) {
    throw new Error("Task already exists");
  }

  const createTask = await prisma.task.create({
    data: {
      client_id,
      title,
      description,
      category,
      due_date,
      priority,
    },
  });

  return createTask;
}

export async function getTasksByClientService(
  param: ClientIdType,
  query: QueryType,
) {
  const { clientId } = param;
  const { status, category } = query;

  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
    select: {
      id: true,
    },
  });

  if (!client) {
    throw new Error("Client not found");
  }

  const tasks = await prisma.task.findMany({
    where: {
      client_id: clientId,
      ...(status && { status }),
      ...(category && { category }),
    },
    orderBy: {
      due_date: "asc",
    },
  });

  const now = new Date();

  const stats = {
    total: tasks.length,
    pending: 0,
    completed: 0,
    overdue: 0,
  };

  const data = tasks.map((task) => {
    const isOverdue =
      task.status === "PENDING" && new Date(task.due_date) < now;

    if (task.status === "PENDING") stats.pending++;
    if (task.status === "COMPLETED") stats.completed++;
    if (isOverdue) stats.overdue++;

    return {
      ...task,
      isOverdue,
    };
  });

  return {
    tasks,
    stats,
  };
}

export async function updateTaskStatusService(
  param: TaskIdType,
  body: UpdateTaskType,
) {
  const { taskId } = param;
  const { status } = body;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { id: true },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const udpatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      status,
    },
  });

  return udpatedTask;
}
