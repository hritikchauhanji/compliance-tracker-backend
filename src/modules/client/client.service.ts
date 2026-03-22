import { prisma } from "../../utils/prism.util.js";
import { CreateClientType } from "./client.schema.js";

export async function createClientService(body: CreateClientType) {
  const { company_name, country, entity_type } = body;

  const client = await prisma.client.findFirst({
    where: { company_name },
    select: { id: true },
  });

  if (client) {
    throw new Error("Client already exists");
  }

  const createClient = await prisma.client.create({
    data: {
      company_name,
      country,
      entity_type,
    },
  });

  return createClient;
}