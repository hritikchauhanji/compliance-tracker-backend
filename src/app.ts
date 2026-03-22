import fastify, { FastifyInstance } from "fastify";
import prismaPlugin from "./config/prisma.js";
import { taskroutes } from "./modules/task/task.routes.js";
import { clientRoutes } from "./modules/client/client.routes.js";
import cors from "@fastify/cors";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const app: FastifyInstance = fastify({
  logger: envToLogger.development ?? true,
});

app.register(cors, {
  origin: "http://localhost:5173",
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
