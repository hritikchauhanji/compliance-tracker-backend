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

export const querySchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(["company_name", "created_at"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),

  page: z.coerce.number().int().positive().min(1).default(1),
  limit: z.coerce.number().int().positive().min(1).max(100).default(10),
});
export type QueryType = z.infer<typeof querySchema>;