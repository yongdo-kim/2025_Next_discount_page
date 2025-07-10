import { z } from "zod";

// 사용자 프로필 수정 요청 DTO zod 스키마
export const userUpdateReqSchema = z.object({
  nickname: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export type UserUpdateReqDto = z.infer<typeof userUpdateReqSchema>;
