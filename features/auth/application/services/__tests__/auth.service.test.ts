import { AuthService } from "../auth.service";
import { AuthRepository } from "@/features/auth/domain/repositories/auth.repository";

// AuthRepository를 jest mock으로 생성
// jest.fn()으로 각 메서드를 개별적으로 mock 함수로 만들기
const mockAuthRepository: jest.Mocked<AuthRepository> = {
  logout: jest.fn(),
  refreshToken: jest.fn(),
};

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    // 각 테스트 전에 AuthService 새 인스턴스 생성
    authService = new AuthService(mockAuthRepository);
  });

  afterEach(() => {
    // 각 테스트 후 모든 mock 함수 호출 기록 초기화
    jest.clearAllMocks();
  });

  describe("logout", () => {
    it("authRepository.logout()을 호출해야 한다", async () => {
      // Given - logout이 성공적으로 완료된다고 설정
      mockAuthRepository.logout.mockResolvedValue();

      // When - AuthService의 logout 메서드 호출
      await authService.logout();

      // Then - authRepository.logout이 호출되었는지 확인
      expect(mockAuthRepository.logout).toHaveBeenCalledTimes(1);
      expect(mockAuthRepository.logout).toHaveBeenCalledWith();
    });

    it("authRepository에서 에러가 발생하면 에러를 전파해야 한다", async () => {
      // Given - logout이 에러를 던진다고 설정
      const error = new Error("Logout failed");
      mockAuthRepository.logout.mockRejectedValue(error);

      // When & Then - 에러가 전파되는지 확인
      await expect(authService.logout()).rejects.toThrow("Logout failed");
      expect(mockAuthRepository.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe("refreshToken", () => {
    it("유효한 refreshToken으로 새 accessToken을 반환해야 한다", async () => {
      // Given - 새 access token을 반환한다고 설정
      const refreshToken = "valid-refresh-token";
      const newAccessToken = "new-access-token";
      mockAuthRepository.refreshToken.mockResolvedValue(newAccessToken);

      // When - refreshToken 메서드 호출
      const result = await authService.refreshToken(refreshToken);

      // Then - 올바른 결과와 호출 확인
      expect(result).toBe(newAccessToken);
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledTimes(1);
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledWith(
        refreshToken,
      );
    });

    it("refreshToken이 없으면 undefined로 호출해야 한다", async () => {
      // Given - refreshToken 없이 호출
      mockAuthRepository.refreshToken.mockResolvedValue(null);

      // When - refreshToken 매개변수 없이 호출
      const result = await authService.refreshToken();

      // Then - undefined로 호출되고 null 반환 확인
      expect(result).toBeNull();
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledTimes(1);
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledWith(undefined);
    });

    it("잘못된 refreshToken으로 null을 반환해야 한다", async () => {
      // Given - 잘못된 토큰으로 null 반환 설정
      const invalidRefreshToken = "invalid-refresh-token";
      mockAuthRepository.refreshToken.mockResolvedValue(null);

      // When - 잘못된 refreshToken으로 호출
      const result = await authService.refreshToken(invalidRefreshToken);

      // Then - null 반환 확인
      expect(result).toBeNull();
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledTimes(1);
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledWith(
        invalidRefreshToken,
      );
    });

    it("네트워크 에러 시 에러를 전파해야 한다", async () => {
      // Given - 네트워크 에러 설정
      const refreshToken = "some-token";
      const error = new Error("Network error");
      mockAuthRepository.refreshToken.mockRejectedValue(error);

      // When & Then - 에러가 전파되는지 확인
      await expect(authService.refreshToken(refreshToken)).rejects.toThrow(
        "Network error",
      );
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledTimes(1);
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledWith(
        refreshToken,
      );
    });

    it("서버에서 401 에러 시 null을 반환해야 한다", async () => {
      // Given - 토큰 만료/무효화로 인한 에러 상황 시뮬레이션
      const expiredRefreshToken = "expired-refresh-token";
      mockAuthRepository.refreshToken.mockResolvedValue(null);

      // When - 만료된 refreshToken으로 호출
      const result = await authService.refreshToken(expiredRefreshToken);

      // Then - null 반환 (정상적인 실패 처리)
      expect(result).toBeNull();
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledWith(
        expiredRefreshToken,
      );
    });
  });

  describe("edge cases", () => {
    it("빈 문자열 refreshToken으로 호출해도 정상 작동해야 한다", async () => {
      // Given - 빈 문자열로 호출
      const emptyToken = "";
      mockAuthRepository.refreshToken.mockResolvedValue(null);

      // When - 빈 문자열로 호출
      const result = await authService.refreshToken(emptyToken);

      // Then - 정상적으로 처리
      expect(result).toBeNull();
      expect(mockAuthRepository.refreshToken).toHaveBeenCalledWith(emptyToken);
    });
  });
});
