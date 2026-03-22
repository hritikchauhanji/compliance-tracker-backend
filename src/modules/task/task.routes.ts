import { FastifyInstance } from "fastify";
import {
  createTaskController,
  getTasksByClientController,
} from "./task.controller.js";

export async function taskroutes(app: FastifyInstance) {
  app.post("/", createTaskController);
  app.get("/:clientId", getTasksByClientController);
}
