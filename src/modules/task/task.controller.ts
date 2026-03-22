import { FastifyReply, FastifyRequest } from "fastify";
import { createTaskService, getTasksByClientService } from "./task.service.js";
import {
  clientIdSchema,
  createTaskSchema,
  querySchema,
} from "./task.schema.js";

export async function createTaskController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).send({
      success: false,
      message: "Invalid request body",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const task = await createTaskService(parsed.data);

    return res.status(201).send({
      success: true,
      message: "Task is created successfully.",
      data: task,
    });
  } catch (error: any) {
    if (error.message === "Client not found") {
      return res.status(404).send({
        success: false,
        message: error.message,
      });
    }
    if (error.message === "Task already exists") {
      return res.status(409).send({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

export async function getTasksByClientController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed_param = clientIdSchema.safeParse(req.params);

  if (!parsed_param.success) {
    return res.status(400).send({
      success: false,
      message: "Invalid query params",
      errors: parsed_param.error.flatten().fieldErrors,
    });
  }

  const parsed = querySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).send({
      success: false,
      message: "Invalid query params",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const tasks = await getTasksByClientService(parsed_param.data, parsed.data);

    return res.status(200).send({
      success: true,
      message: "Get tasks by client id",
      data: tasks,
    });
  } catch (error: any) {
    if (error.message === "Client not found") {
      return res.status(404).send({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
