// 서버 표준 에러 코드 상수 모음
// 유지보수 및 오타 방지를 위해 as const 사용

export const API_ERROR_CODES = {
  NOT_FOUND_ACCESS_TOKEN: "NOT_FOUND_ACCESS_TOKEN",
  EXPIRED_ACCESS_TOKEN: "EXPIRED_ACCESS_TOKEN",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  NOT_FOUND_REFRESH_TOKEN: "NOT_FOUND_REFRESH_TOKEN"
  // 필요한 에러 코드 계속 추가
} as const;

export type ApiErrorCode =
  (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
