import { prisma } from "../../utils/prism.util.js";
import { CreateClientType, QueryType } from "./client.schema.js";

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

export async function getAllClientsService(query: QueryType) {
  const {
    search,
    sortBy = "created_at",
    order = "desc",
    page = 1,
    limit = 10,
  } = query;

  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      company_name: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),
  };

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      orderBy: { [sortBy]: order },
      skip,
      take: limit,
      select: {
        id: true,
        company_name: true,
        country: true,
        entity_type: true,
      },
    }),
    prisma.client.count({ where }),
  ]);

  return {
    data: clients,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}