import { FastifyInstance } from "fastify";
import { createClientController } from "./client.controller.js";

export async function clientRoutes(app: FastifyInstance) {
  app.post("/", createClientController);
}