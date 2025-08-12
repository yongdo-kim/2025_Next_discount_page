import { UsersService } from "../users.service";
import { UsersRepository } from "@/features/users/domain/entities/repositories/user.repository";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";

// UsersRepository를 jest mock으로 생성
const mockUsersRepository: jest.Mocked<UsersRepository> = {
  getMe: jest.fn(),
  updateMe: jest.fn(),
};

describe("UsersService", () => {
  let usersService: UsersService;

  beforeEach(() => {
    // 각 테스트 전에 UsersService 새 인스턴스 생성
    usersService = new UsersService(mockUsersRepository);
  });

  afterEach(() => {
    // 각 테스트 후 모든 mock 함수 호출 기록 초기화
    jest.clearAllMocks();
  });

  describe("getMe", () => {
    const mockUser: UserEntity = {
      id: 1,
      email: "test@example.com",
      nickname: "테스트유저",
      name: "테스트유저",
      picture: "https://example.com/profile.jpg",
      provider: "google",
      role: "user",
    };

    it("유효한 accessToken으로 사용자 정보를 반환해야 한다", async () => {
      // Given - 유효한 토큰과 사용자 정보 설정
      const accessToken = "valid-access-token";
      mockUsersRepository.getMe.mockResolvedValue(mockUser);

      // When - getMe 메서드 호출
      const result = await usersService.getMe(accessToken);

      // Then - 올바른 결과와 호출 확인
      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.getMe).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.getMe).toHaveBeenCalledWith(accessToken);
    });

    it("accessToken 없이도 사용자 정보를 조회할 수 있어야 한다", async () => {
      // Given - 토큰 없이 호출하는 경우
      mockUsersRepository.getMe.mockResolvedValue(mockUser);

      // When - accessToken 없이 호출
      const result = await usersService.getMe();

      // Then - undefined로 호출되고 사용자 정보 반환
      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.getMe).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.getMe).toHaveBeenCalledWith(undefined);
    });

    it("빈 문자열 accessToken으로도 정상 작동해야 한다", async () => {
      // Given - 빈 문자열 토큰
      const emptyToken = "";
      mockUsersRepository.getMe.mockResolvedValue(mockUser);

      // When - 빈 토큰으로 호출
      const result = await usersService.getMe(emptyToken);

      // Then - 정상적으로 처리
      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.getMe).toHaveBeenCalledWith(emptyToken);
    });

    it("만료된 토큰으로 인한 에러를 전파해야 한다", async () => {
      // Given - 토큰 만료 에러 설정
      const expiredToken = "expired-token";
      const error = new Error("Token expired");
      mockUsersRepository.getMe.mockRejectedValue(error);

      // When & Then - 에러가 전파되는지 확인
      await expect(usersService.getMe(expiredToken)).rejects.toThrow(
        "Token expired",
      );
      expect(mockUsersRepository.getMe).toHaveBeenCalledWith(expiredToken);
    });

    it("네트워크 에러를 전파해야 한다", async () => {
      // Given - 네트워크 에러 설정
      const token = "some-token";
      const error = new Error("Network error");
      mockUsersRepository.getMe.mockRejectedValue(error);

      // When & Then - 에러가 전파되는지 확인
      await expect(usersService.getMe(token)).rejects.toThrow("Network error");
      expect(mockUsersRepository.getMe).toHaveBeenCalledWith(token);
    });

    it("잘못된 토큰으로 인한 401 에러를 전파해야 한다", async () => {
      // Given - 인증 실패 에러 설정
      const invalidToken = "invalid-token";
      const error = new Error("Unauthorized");
      mockUsersRepository.getMe.mockRejectedValue(error);

      // When & Then - 에러가 전파되는지 확인
      await expect(usersService.getMe(invalidToken)).rejects.toThrow(
        "Unauthorized",
      );
      expect(mockUsersRepository.getMe).toHaveBeenCalledWith(invalidToken);
    });
  });

  describe("updateMe", () => {
    const originalUser: UserEntity = {
      id: 1,
      email: "test@example.com",
      nickname: "원래닉네임",
      name: "테스트유저",
      picture: "https://example.com/old-profile.jpg",
      provider: "google",
      role: "user",
    };

    it("닉네임만 업데이트할 수 있어야 한다", async () => {
      // Given - 닉네임 변경 요청과 업데이트된 사용자 정보
      const updateData: UserUpdateReqDto = {
        nickname: "새로운닉네임",
      };
      const updatedUser: UserEntity = {
        ...originalUser,
        nickname: "새로운닉네임",
      };
      mockUsersRepository.updateMe.mockResolvedValue(updatedUser);

      // When - updateMe 메서드 호출
      const result = await usersService.updateMe(updateData);

      // Then - 업데이트된 사용자 정보 반환 확인
      expect(result).toEqual(updatedUser);
      expect(result.nickname).toBe("새로운닉네임");
      expect(mockUsersRepository.updateMe).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });

    it("이미지만 업데이트할 수 있어야 한다", async () => {
      // Given - 이미지 변경 요청
      const mockFile = new File(["image content"], "profile.jpg", {
        type: "image/jpeg",
      });
      const updateData: UserUpdateReqDto = {
        image: mockFile,
      };
      const updatedUser: UserEntity = {
        ...originalUser,
        picture: "https://example.com/new-profile.jpg",
      };
      mockUsersRepository.updateMe.mockResolvedValue(updatedUser);

      // When - 이미지 업데이트
      const result = await usersService.updateMe(updateData);

      // Then - 업데이트된 이미지 URL 확인
      expect(result).toEqual(updatedUser);
      expect(result.picture).toBe("https://example.com/new-profile.jpg");
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });

    it("닉네임과 이미지를 동시에 업데이트할 수 있어야 한다", async () => {
      // Given - 닉네임과 이미지 모두 변경
      const mockFile = new File(["image content"], "profile.jpg", {
        type: "image/jpeg",
      });
      const updateData: UserUpdateReqDto = {
        nickname: "새닉네임",
        image: mockFile,
      };
      const updatedUser: UserEntity = {
        ...originalUser,
        nickname: "새닉네임",
        picture: "https://example.com/new-profile.jpg",
      };
      mockUsersRepository.updateMe.mockResolvedValue(updatedUser);

      // When - 전체 프로필 업데이트
      const result = await usersService.updateMe(updateData);

      // Then - 모든 변경사항 반영 확인
      expect(result).toEqual(updatedUser);
      expect(result.nickname).toBe("새닉네임");
      expect(result.picture).toBe("https://example.com/new-profile.jpg");
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });

    it("빈 업데이트 데이터도 처리할 수 있어야 한다", async () => {
      // Given - 빈 업데이트 데이터
      const updateData: UserUpdateReqDto = {};
      mockUsersRepository.updateMe.mockResolvedValue(originalUser);

      // When - 빈 데이터로 업데이트
      const result = await usersService.updateMe(updateData);

      // Then - 기존 데이터 그대로 반환
      expect(result).toEqual(originalUser);
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });

    it("인증 실패 시 에러를 전파해야 한다", async () => {
      // Given - 인증 실패 에러
      const updateData: UserUpdateReqDto = { nickname: "새닉네임" };
      const error = new Error("Unauthorized");
      mockUsersRepository.updateMe.mockRejectedValue(error);

      // When & Then - 에러 전파 확인
      await expect(usersService.updateMe(updateData)).rejects.toThrow(
        "Unauthorized",
      );
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });

    it("서버 에러 시 에러를 전파해야 한다", async () => {
      // Given - 서버 에러
      const updateData: UserUpdateReqDto = { nickname: "새닉네임" };
      const error = new Error("Internal Server Error");
      mockUsersRepository.updateMe.mockRejectedValue(error);

      // When & Then - 에러 전파 확인
      await expect(usersService.updateMe(updateData)).rejects.toThrow(
        "Internal Server Error",
      );
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });

    it("파일 업로드 실패 시 에러를 전파해야 한다", async () => {
      // Given - 파일 업로드 에러
      const mockFile = new File(["image content"], "profile.jpg", {
        type: "image/jpeg",
      });
      const updateData: UserUpdateReqDto = { image: mockFile };
      const error = new Error("File upload failed");
      mockUsersRepository.updateMe.mockRejectedValue(error);

      // When & Then - 파일 업로드 에러 전파 확인
      await expect(usersService.updateMe(updateData)).rejects.toThrow(
        "File upload failed",
      );
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });
  });

  describe("edge cases", () => {
    it("특수문자가 포함된 닉네임도 처리할 수 있어야 한다", async () => {
      // Given - 특수문자 닉네임
      const updateData: UserUpdateReqDto = {
        nickname: "테스트!@#$%^&*()",
      };
      const updatedUser: UserEntity = {
        id: 1,
        email: "test@example.com",
        nickname: "테스트!@#$%^&*()",
        name: "테스트유저",
        picture: "https://example.com/profile.jpg",
        provider: "google",
        role: "user",
      };
      mockUsersRepository.updateMe.mockResolvedValue(updatedUser);

      // When - 특수문자 닉네임으로 업데이트
      const result = await usersService.updateMe(updateData);

      // Then - 정상적으로 처리
      expect(result.nickname).toBe("테스트!@#$%^&*()");
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });

    it("매우 긴 닉네임도 repository로 전달해야 한다", async () => {
      // Given - 긴 닉네임 (실제 validation은 repository나 backend에서 처리)
      const longNickname = "a".repeat(1000);
      const updateData: UserUpdateReqDto = {
        nickname: longNickname,
      };
      const error = new Error("Nickname too long");
      mockUsersRepository.updateMe.mockRejectedValue(error);

      // When & Then - repository의 validation 에러 확인
      await expect(usersService.updateMe(updateData)).rejects.toThrow(
        "Nickname too long",
      );
      expect(mockUsersRepository.updateMe).toHaveBeenCalledWith(updateData);
    });
  });
});
