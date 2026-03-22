import { z } from "zod";

export const createTaskSchema = z.object({
  client_id: z.string().uuid("Invalid client id"),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["GST", "TAX", "AUDIT", "LEGAL", "OTHER"]),
  due_date: z.coerce.date(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type CreateTaskType = z.infer<typeof createTaskSchema>;

export const querySchema = z.object({
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
  category: z.enum(["GST", "TAX", "AUDIT", "LEGAL", "OTHER"]).optional(),
});

export type QueryType = z.infer<typeof querySchema>;

export const clientIdSchema = z.object({
  clientId: z.string().uuid("Invalid client id"),
});

export type ClientIdType = z.infer<typeof clientIdSchema>;
