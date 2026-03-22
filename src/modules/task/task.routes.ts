import { FastifyInstance } from "fastify";
import { createTaskController } from "./task.controller.js";


export async function taskroutes(app:FastifyInstance) {
    app.post("/", createTaskController);
}