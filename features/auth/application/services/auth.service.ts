import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  logout() {
    return this.authRepository.logout();
  }

  refreshToken() {
    return this.authRepository.refreshToken();
  }
}
