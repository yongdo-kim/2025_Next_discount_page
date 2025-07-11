import { UsersRepository } from "@/features/users/domain/entities/repositories/user.repository";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getMe(accessToken?: string): Promise<UserEntity> {
    return this.usersRepository.getMe(accessToken);
  }
  async updateMe(data: UserUpdateReqDto): Promise<UserEntity> {
    return this.usersRepository.updateMe(data);
  }
}
