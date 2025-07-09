import { UserEntity } from "@/features/users/domain/entities/user.entity";

import { z } from "zod";

export const userResSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  name: z.string(),
  picture: z.string(),
  provider: z.string(),
  role: z.string(),
  apple_user_identifier: z.string().optional(),
});

export type UserDto = z.infer<typeof userResSchema>;

export function toUserEntity(dto: UserDto): UserEntity {
  const user = new UserEntity({
    id: dto.id,
    email: dto.email,
    nickname: dto.nickname,
    name: dto.name,
    picture: dto.picture,
    provider: dto.provider,
    role: dto.role,
    apple_user_identifier: dto.apple_user_identifier,
  });
  return user;
}
