import { UsersRepository } from "../../domain/entities/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";

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
}
