import { z } from "zod";

export const entityTypes = [
  "PVT_LTD",
  "PUBLIC_LTD",
  "LLP",
  "PARTNERSHIP",
  "SOLE_PROP",
  "OPC",
] as const;

export const createClientSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Country is required"),
  entity_type: z.enum(entityTypes),
});

export type CreateClientType = z.infer<typeof createClientSchema>;