import { FastifyRequest, FastifyReply } from "fastify";
import { createClientSchema, querySchema } from "./client.schema.js";
import { createClientService, getAllClientsService } from "./client.service.js";

export async function createClientController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = createClientSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).send({
      success: false,
      message: "Invalid request body",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const client = await createClientService(parsed.data);

    return res.status(201).send({
      success: true,
      message: "Client created successfully",
      data: client,
    });
  } catch (error: any) {
    if (error.message === "Client already exists") {
      return res.status(409).send({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

export async function getAllClientsController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const parsed = querySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).send({
      success: false,
      message: "Invalid query params",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const result = await getAllClientsService(parsed.data);

    return res.status(200).send({
      success: true,
      message: "Fetch all clients.",
      ...result,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}
