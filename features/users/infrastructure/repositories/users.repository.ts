import { UsersRepository } from "@/features/users/domain/entities/repositories/user.repository";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UsersApi } from "@/features/users/infrastructure/api/users.api";
import { toUserEntity } from "@/features/users/infrastructure/dto/user-res.dto";

export class HttpUsersRepository implements UsersRepository {
  async getMe(): Promise<UserEntity> {
    const userDto = await UsersApi.getMe();
    return toUserEntity(userDto);
  }
}
