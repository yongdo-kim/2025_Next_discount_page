
export interface AuthRepository {
  logout(): Promise<void>;
  refreshToken(refreshToken?: string): Promise<string | null>;
}
