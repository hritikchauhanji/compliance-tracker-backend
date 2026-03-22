import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify({
    logger: true
})

app.get("/", async () => {
    return {
        success: true,
        message: "Server is running"
    }
})

export { app }