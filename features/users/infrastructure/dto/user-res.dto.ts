import { UserEntity } from "../../domain/entities/user.entity";

export class UserDto {
  id: number;
  email: string;
  nickname: string;
  name: string;
  picture: string;
  provider: string;
  role: string;
  apple_user_identifier?: string;

  constructor(params: {
    id: number;
    email: string;
    nickname: string;
    name: string;
    picture: string;
    provider: string;
    role: string;
    apple_user_identifier?: string;
  }) {
    this.id = params.id;
    this.email = params.email;
    this.nickname = params.nickname;
    this.name = params.name;
    this.picture = params.picture;
    this.provider = params.provider;
    this.role = params.role;
    this.apple_user_identifier = params.apple_user_identifier;
  }

  static fromDomain(user: UserEntity): UserDto {
    const dto = new UserDto({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      name: user.name,
      picture: user.picture,
      provider: user.provider,
      role: user.role,
      apple_user_identifier: user.apple_user_identifier,
    });
    return dto;
  }

  toDomain(): UserEntity {
    const user = new UserEntity({
      id: this.id,
      email: this.email,
      nickname: this.nickname,
      name: this.name,
      picture: this.picture,
      provider: this.provider,
      role: this.role,
      apple_user_identifier: this.apple_user_identifier,
    });
    return user;
  }
}
