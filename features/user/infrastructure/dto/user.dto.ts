import { z } from "zod";
import { UserEntity } from "../../domain/entities/user.entity";

export const userResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  name: z.string(),
  picture: z.string(),
  provider: z.string(),
  role: z.string(),
  apple_user_identifier: z.string().optional(),
});

//dto
export type UserDto = z.infer<typeof userResponseSchema>;

export function toEntity(dto: UserDto): UserEntity {
  return new UserEntity({
    id: dto.id,
    email: dto.email,
    nickname: dto.nickname,
    name: dto.name,
    picture: dto.picture,
    provider: dto.provider,
    role: dto.role,
    apple_user_identifier: dto.apple_user_identifier,
  });
}

export function toDto(user: UserEntity): UserDto {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    name: user.name,
    picture: user.picture,
    provider: user.provider,
    role: user.role,
    apple_user_identifier: user.apple_user_identifier,
  };
}

