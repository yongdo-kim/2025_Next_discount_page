import { AuthUser } from "../entities/auth.entity";

export interface AuthRepository {
  loginWithGoogle(): Promise<AuthUser>;
  logout(): Promise<void>;
}
