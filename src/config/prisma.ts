
import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import type { FastifyPluginAsync } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const prisma = new PrismaClient();

  await prisma.$connect();
  fastify.log.info("Prisma plugin connected");

  fastify.decorate("prisma", prisma);
  fastify.addHook("onClose", async (fastify) => {
    fastify.log.info("Prisma disconnected");
    await fastify.prisma.$disconnect();
  });
});

export default prismaPlugin;