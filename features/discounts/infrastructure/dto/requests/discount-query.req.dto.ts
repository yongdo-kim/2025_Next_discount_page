import { z } from "zod";

export const discountQueryReqSchema = z.object({
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  categoryId: z.number().optional(),
  sortBy: z.enum(["newest", "discount", "price"]).optional().default("newest"),
  query: z.string().optional(),
});

export type DiscountQueryReqDto = z.infer<typeof discountQueryReqSchema>;
