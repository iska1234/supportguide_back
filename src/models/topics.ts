import { z } from "zod";

export const topics = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  isCompleted: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type TopicsData = z.infer<typeof topics>;
export type Topics = TopicsData;
