import { z } from "zod";

export const categoryCreateReqSchema = z.object({
  name: z.string(),
});

//dto
export type CategoryCreateReqDto = z.infer<typeof categoryCreateReqSchema>;
