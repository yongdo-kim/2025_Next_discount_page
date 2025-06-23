import { z } from "zod";
import { UserEntity } from "../../domain/entities/user.entity";

export const userResponseSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string(),
});

//dto
export type UserDto = z.infer<typeof userResponseSchema>;

export function toEntity(dto: UserDto): UserEntity {
  return new UserEntity({
    id: dto.id,
    nickname: dto.nickname,
    profileImageUrl: dto.profileImageUrl,
  });
}
