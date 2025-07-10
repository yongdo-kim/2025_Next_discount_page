import { UsersRepository } from "@/features/users/domain/entities/repositories/user.repository";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";

export class MockUsersRepository implements UsersRepository {
  async getMe(): Promise<UserEntity> {
    // 실제 개발 환경에 맞게 더미 데이터 작성
    return {
      id: 1,
      email: "mock@user.com",
      name: "Mock User",
      nickname: "Mock User",
      picture: "",
      provider: "mock",
      role: "user",
      apple_user_identifier: "mock",
    };
  }
  async updateMe(data: UserUpdateReqDto): Promise<UserEntity> {
    return {
      id: 1,
      email: "mock@user.com",
      name: "Mock User",
      nickname: data.nickname || "Mock User",
      picture: "",
      provider: "mock",
      role: "user",
      apple_user_identifier: "mock",
    };
  }
}
