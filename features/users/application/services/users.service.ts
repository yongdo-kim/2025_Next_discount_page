import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UsersRepository } from "@/features/users/domain/entities/repositories/user.repository";

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getMe(): Promise<UserEntity> {
    return this.usersRepository.getMe();
  }

  // 추가적인 유저 관련 use case 메서드 작성 가능
}
