import { z } from "zod";

export const createTaskSchema = z.object({
  client_id: z.string().uuid("Invalid client id"),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["GST", "TAX", "AUDIT", "LEGAL", "OTHER"]),
  due_date: z.coerce.date(),
  priority: z.string().optional(),
});

export type CreateTaskType = z.infer<typeof createTaskSchema>