import { UsersRepository } from "@/features/users/domain/entities/repositories/user.repository";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getMe(): Promise<UserEntity> {
    return this.usersRepository.getMe();
  }
  async updateMe(data: UserUpdateReqDto): Promise<UserEntity> {
    return this.usersRepository.updateMe(data);
  }

  // 추가적인 유저 관련 use case 메서드 작성 가능
}
