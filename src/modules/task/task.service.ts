import { prisma } from "../../utils/prism.util.js";
import { CreateTaskType } from "./task.schema.js";

export async function createTaskService(body: CreateTaskType) {
    const {title,category,client_id,due_date,description,priority} = body;

    const client = await prisma.client.findUnique({
        where: {
            id: client_id
        },
        select: {
            id: true
        }
    })

    if(!client) {
        throw new Error("Client not found");
    }

    const task = await prisma.task.findFirst({
        where: { title, client_id },
        select: {
            id: true
        }
    })

    if(task) {
        throw new Error("Task already exists");
    }

    const createTask = await prisma.task.create({
        data: {
            client_id,
            title,
            description,
            category,
            due_date,
            priority,
        }
    })

    return createTask;
}