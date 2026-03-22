import { FastifyRequest, FastifyReply } from "fastify";
import { createClientSchema } from "./client.schema.js";
import { createClientService } from "./client.service.js";

export async function createClientController(
  req: FastifyRequest,
  res: FastifyReply
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