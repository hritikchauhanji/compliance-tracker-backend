import { FastifyInstance } from "fastify";
import {
  createClientController,
  getAllClientsController,
} from "./client.controller.js";

export async function clientRoutes(app: FastifyInstance) {
  app.post("/", createClientController);
  app.get("/", getAllClientsController);
}
