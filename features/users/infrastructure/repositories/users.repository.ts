import { UsersRepository } from "../../domain/entities/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { UsersApi } from "../api/users.api";

export class HttpUsersRepository implements UsersRepository {
  async getMe(): Promise<UserEntity> {
    const userDto = await UsersApi.getMe();
    return userDto.toDomain();
  }
}
