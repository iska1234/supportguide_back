import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(["user", "admin"]).default("user"),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type UserData = z.infer<typeof userSchema>;
export type Users = UserData & { id: number; password: string };