import { z } from "zod";

export const postCreateReqSchema = z.object({
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
});

//dto
export type PostCreateReqDto = z.infer<typeof postCreateReqSchema>;
