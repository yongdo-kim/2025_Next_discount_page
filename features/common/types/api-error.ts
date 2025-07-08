/**
 * 서버에서 내려주는 표준 에러 포맷
 * 예시: { code: "NOT_FOUND_ACCESS_TOKEN", title: "로그인", desc: "로그인이 필요해요." }
 */
export interface ApiError {
  code: string; // 에러 코드 (예: "NOT_FOUND_ACCESS_TOKEN")
  title: string; // 에러 타이틀 (예: "로그인")
  desc: string; // 상세 메시지 (예: "로그인이 필요해요.")
}
