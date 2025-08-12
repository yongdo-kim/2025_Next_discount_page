import { getUserFromCookies } from "../getUserFromCookies";
import { cookies } from "next/headers";
import { container } from "@/lib/di/dependencies";

//getUserFromCookies.ts를 테스트 하기 위해 필요한 import를 mock으로 변경
jest.mock("next/headers");
jest.mock("@/lib/di/dependencies");

//각 함수,모듈의 타입 추론을 jest로 변경하기 위해 사용. (js였다면 안써도 ok)
const mockCookies = cookies as jest.MockedFunction<typeof cookies>;
const mockContainer = container as jest.Mocked<typeof container>;

describe("getUserFromCookies", () => {
  //mockCookieStore는 cookieStore를 따서 만든 것.
  //get을 쓴것도, cookieStore.get()을 사용하기 때문임.
  let mockCookieStore: {
    get: jest.MockedFunction<(name: string) => { value: string } | undefined>;
  };

  beforeEach(() => {
    mockCookieStore = {
      //타입은 위에서 지정하고, 여기서 빈 함수를 추가.
      get: jest.fn(),
    };
    //const cookieStore = await cookies();를 했다고 하는 것.
    //“mockCookies()를 호출하면 이 mockCookieStore을 Promise로 감싸서 반환할 거야”라는 약속
    mockCookies.mockResolvedValue(mockCookieStore as never);

    // 컨테이너 서비스 모킹
    mockContainer.userService = {
      getMe: jest.fn(),
      updateMe: jest.fn(),
    } as never;

    mockContainer.authService = {
      refreshToken: jest.fn(),
      logout: jest.fn(),
    } as never;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("accessToken이 있는 경우", () => {
    it("유효한 accessToken으로 사용자 정보를 반환해야 한다", async () => {
      // 더미데이터
      const mockUser = {
        id: 1,
        nickname: "테스트유저",
        email: "test@test.com",
        name: "테스트유저",
        picture: "https://example.com/profile.jpg",
        provider: "google",
        role: "user",
      };
      //mockImplementation으로 jest.fn()를 어떻게 동작할지 구체적으로 지정.
      //cookieStore.get("accessToken")에서 오는걸 여기서 처리하겠다 라는 의미임.
      mockCookieStore.get.mockImplementation((name: string) => {
        if (name === "accessToken") return { value: "valid-access-token" };
        return undefined;
      });
      //이렇게 설정하면 mockContainer.userService.getMe()을 호출하면 mockUser를 반환하도록 설정.
      (
        mockContainer.userService.getMe as jest.MockedFunction<
          typeof mockContainer.userService.getMe
        >
      ).mockResolvedValue(mockUser);

      //getUserFromCookies를 호출해도 내부 함수가 이미 내부 테스트 함수로 변경됨.
      const result = await getUserFromCookies();

      //비교하기 그럴 것이다.
      expect(result).toEqual(mockUser);
      expect(mockContainer.userService.getMe).toHaveBeenCalledWith(
        "valid-access-token",
      );
      expect(mockContainer.authService.refreshToken).not.toHaveBeenCalled();
    });

    //beforeEach 블록은 각 it가 실행되기 전에 매번 다시 실행돼.
    it("accessToken이 만료된 경우 refreshToken으로 재시도해야 한다", async () => {
      // Given
      const mockUser = {
        id: 1,
        nickname: "테스트유저",
        email: "test@test.com",
        name: "테스트유저",
        picture: "https://example.com/profile.jpg",
        provider: "google",
        role: "user",
      };
      //한쪽은 일부러 만료를, 한쪽은 유효한 데이터를 반환하도록 결정.
      mockCookieStore.get.mockImplementation((name: string) => {
        if (name === "accessToken") return { value: "expired-access-token" }; //실패 시킴
        if (name === "refreshToken") return { value: "valid-refresh-token" }; //성공 시킴
        return undefined;
      });

      //getMe 함수가 처음 호출될 땐 토큰 만료 에러를 내고, 두 번째 호출될 땐 정상적인 사용자 정보를 반환하도록 시뮬레이션
      (
        mockContainer.userService.getMe as jest.MockedFunction<
          typeof mockContainer.userService.getMe
        >
      )
        .mockRejectedValueOnce(new Error("Token expired"))
        .mockResolvedValueOnce(mockUser);

      (
        mockContainer.authService.refreshToken as jest.MockedFunction<
          typeof mockContainer.authService.refreshToken
        >
      ).mockResolvedValue("new-access-token");

      // When
      const result = await getUserFromCookies();

      // Then
      expect(result).toEqual(mockUser);
      expect(mockContainer.userService.getMe).toHaveBeenCalledTimes(2);
      expect(mockContainer.userService.getMe).toHaveBeenNthCalledWith(
        1,
        "expired-access-token",
      );
      expect(mockContainer.authService.refreshToken).toHaveBeenCalledWith(
        "valid-refresh-token",
      );
      expect(mockContainer.userService.getMe).toHaveBeenNthCalledWith(
        2,
        "new-access-token",
      );
    });
  });

  describe("accessToken이 없는 경우", () => {
    it("refreshToken만 있을 때 토큰 갱신 후 사용자 정보를 반환해야 한다", async () => {
      // Given
      const mockUser = {
        id: 1,
        nickname: "테스트유저",
        email: "test@test.com",
        name: "테스트유저",
        picture: "https://example.com/profile.jpg",
        provider: "google",
        role: "user",
      };
      mockCookieStore.get.mockImplementation((name: string) => {
        if (name === "refreshToken") return { value: "valid-refresh-token" };
        return undefined;
      });

      (
        mockContainer.authService.refreshToken as jest.MockedFunction<
          typeof mockContainer.authService.refreshToken
        >
      ).mockResolvedValue("new-access-token");
      (
        mockContainer.userService.getMe as jest.MockedFunction<
          typeof mockContainer.userService.getMe
        >
      ).mockResolvedValue(mockUser);

      // When
      const result = await getUserFromCookies();

      // Then
      expect(result).toEqual(mockUser);
      expect(mockContainer.authService.refreshToken).toHaveBeenCalledWith(
        "valid-refresh-token",
      );
      expect(mockContainer.userService.getMe).toHaveBeenCalledWith(
        "new-access-token",
      );
    });

    it("refreshToken 갱신이 실패하면 null을 반환해야 한다", async () => {
      // Given
      mockCookieStore.get.mockImplementation((name: string) => {
        if (name === "refreshToken") return { value: "invalid-refresh-token" };
        return undefined;
      });

      (
        mockContainer.authService.refreshToken as jest.MockedFunction<
          typeof mockContainer.authService.refreshToken
        >
      ).mockResolvedValue(null);

      // When
      const result = await getUserFromCookies();

      // Then
      expect(result).toBeNull();
      expect(mockContainer.userService.getMe).not.toHaveBeenCalled();
    });
  });

  describe("토큰이 모두 없는 경우", () => {
    it("accessToken과 refreshToken이 모두 없으면 null을 반환해야 한다", async () => {
      // Given
      mockCookieStore.get.mockReturnValue(undefined);

      // When
      const result = await getUserFromCookies();

      // Then
      expect(result).toBeNull();
      expect(mockContainer.userService.getMe).not.toHaveBeenCalled();
      expect(mockContainer.authService.refreshToken).not.toHaveBeenCalled();
    });
  });

  describe("에러 처리", () => {
    it("refreshToken 호출 중 에러가 발생하면 null을 반환해야 한다", async () => {
      // Given
      mockCookieStore.get.mockImplementation((name: string) => {
        if (name === "refreshToken") return { value: "refresh-token" };
        return undefined;
      });

      (
        mockContainer.authService.refreshToken as jest.MockedFunction<
          typeof mockContainer.authService.refreshToken
        >
      ).mockRejectedValue(new Error("Network error"));

      // When
      const result = await getUserFromCookies();

      // Then
      expect(result).toBeNull();
    });

    it("갱신된 토큰으로 사용자 정보 조회 실패 시 null을 반환해야 한다", async () => {
      // Given
      mockCookieStore.get.mockImplementation((name: string) => {
        if (name === "refreshToken") return { value: "refresh-token" };
        return undefined;
      });

      (
        mockContainer.authService.refreshToken as jest.MockedFunction<
          typeof mockContainer.authService.refreshToken
        >
      ).mockResolvedValue("new-access-token");
      (
        mockContainer.userService.getMe as jest.MockedFunction<
          typeof mockContainer.userService.getMe
        >
      ).mockRejectedValue(new Error("User not found"));

      // When
      const result = await getUserFromCookies();

      // Then
      expect(result).toBeNull();
    });
  });
});
