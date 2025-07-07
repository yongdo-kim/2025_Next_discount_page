import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  loginWithGoogle() {
    return this.authRepository.loginWithGoogle();
  }

  logout() {
    return this.authRepository.logout();
  }
}
