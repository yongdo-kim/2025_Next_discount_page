import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  logout() {
    return this.authRepository.logout();
  }

  refreshToken(refreshToken?: string): Promise<string | null> {
    return this.authRepository.refreshToken(refreshToken);
  }
}
