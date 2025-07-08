import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";
import { authApi } from "../api/auth.api";

export class HttpAuthRepository implements AuthRepository {
  async logout(): Promise<void> {
    await authApi.logout();
  }
}
