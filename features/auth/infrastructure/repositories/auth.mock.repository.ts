import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";

export class MockAuthRepository implements AuthRepository {
  async logout(): Promise<void> {
    return;
  }

  async refreshToken(): Promise<string | null> {
    return null;
  }
}
