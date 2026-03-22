import { FastifyReply, FastifyRequest } from "fastify";
import { createTaskService } from "./task.service.js";
import { createTaskSchema } from "./task.schema.js";


export async function createTaskController(req:FastifyRequest, res: FastifyReply) {

    const parsed = createTaskSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).send({
            success: false,
            message: "Invalid request body",
            errors: parsed.error.flatten().fieldErrors
        })
    }

    try {
        const task = await createTaskService(parsed.data);

        return res.status(201).send({
            success: true,
            message: "Task is created successfully.",
            data: task
        })
    } catch (error:any) {
        if(error.message === "Client not found"){
            return res.status(404).send({
            success: false,
            message: error.message
            })  
        }
        if(error.message === "Task already exists"){
            return res.status(409).send({
            success: false,
            message: error.message
            })
        }
        return res.status(500).send({
            success: false,
            message: error.message || "Internal Server Error"
        }) 
    }
}