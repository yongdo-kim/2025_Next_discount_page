export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010/api";
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "할인탐정";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "할인은 우리가 수사합니다. 할인탐정은 진짜 혜택만을 추적해 보여주는 스마트 쇼핑 도우미입니다";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3010";
export const IS_TESTMODE = process.env.NEXT_PUBLIC_IS_TESTMODE == "test";
