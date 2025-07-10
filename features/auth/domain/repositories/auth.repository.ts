
export interface AuthRepository {
  logout(): Promise<void>;
  refreshToken(): Promise<string | null>;
}
