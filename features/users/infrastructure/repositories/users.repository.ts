import { UsersRepository } from "@/features/users/domain/entities/repositories/user.repository";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UsersApi } from "@/features/users/infrastructure/api/users.api";
import { toUserEntity } from "@/features/users/infrastructure/dto/user-res.dto";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";
  
export class HttpUsersRepository implements UsersRepository {
  async getMe(accessToken?: string): Promise<UserEntity> {
    const userDto = await UsersApi.getMe(accessToken);
    return toUserEntity(userDto);
  }

  async updateMe(data: UserUpdateReqDto): Promise<UserEntity> {
    const userDto = await UsersApi.updateMe(data);
    return toUserEntity(userDto);
  }
}
