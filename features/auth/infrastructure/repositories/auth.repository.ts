import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";
import { authApi } from "@/features/auth/infrastructure/api/auth.api";

export class HttpAuthRepository implements AuthRepository {
  async logout(): Promise<void> {
    await authApi.logout();
  }

  async refreshToken(): Promise<string | null> {
    const response = await authApi.refreshToken();
    return response;
  }
}
