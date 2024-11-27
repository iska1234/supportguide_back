import { z } from "zod";

export const companySettings = z.object({
    id: z.number().optional(),
    userId: z.number(),
    isIntroCheck: z.boolean().default(false),
    isDedicatoryAvaliable: z.boolean().default(false),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  });

export type CompanySettingsData = z.infer<typeof companySettings>;
export type CompanySettings = CompanySettingsData