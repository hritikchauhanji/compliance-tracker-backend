import fastify, { FastifyInstance } from "fastify";
import prismaPlugin from "./config/prisma.js";
import { taskroutes } from "./modules/task/task.routes.js";
import { clientRoutes } from "./modules/client/client.routes.js";
import cors from "@fastify/cors";
import { env } from "./config/env.js";

const app: FastifyInstance = fastify({
  logger: true,
});

app.register(cors, {
  origin: env.frontendUrl,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.register(prismaPlugin);
app.register(taskroutes, { prefix: "/api/v1/task" });
app.register(clientRoutes, { prefix: "/api/v1/client" });

app.get("/", async () => {
  return {
    success: true,
    message: "Server is running",
  };
});

export { app };
