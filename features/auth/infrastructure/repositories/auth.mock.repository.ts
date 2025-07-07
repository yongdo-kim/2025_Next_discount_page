import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";
import { AuthUser } from "../../domain/entities/auth.entity";

export class MockAuthRepository implements AuthRepository {
  async loginWithGoogle(): Promise<AuthUser> {
    // 테스트용 mock 데이터 반환
    return {
      id: 999,
      email: "mock@mock.com",
      name: "Mock User",
      picture: "",
      provider: "google",
    };
  }
  async logout(): Promise<void> {
    return;
  }
}
