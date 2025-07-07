import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";
import { authApi } from "../api/auth.api";
import { AuthUser } from "../../domain/entities/auth.entity";

export class HttpAuthRepository implements AuthRepository {
  async loginWithGoogle(): Promise<AuthUser> {
    return await authApi.loginWithGoogle();
  }
  async logout(): Promise<void> {
    await authApi.logout();
  }
}
