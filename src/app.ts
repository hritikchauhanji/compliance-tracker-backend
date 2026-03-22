import fastify, { FastifyInstance } from "fastify";

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
})

app.get("/", async () => {
    return {
        success: true,
        message: "Server is running"
    }
})

export { app }