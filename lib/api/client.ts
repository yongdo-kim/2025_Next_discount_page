import type { ApiError } from "@/features/common/types/api-error";
import { API_BASE_URL } from "../constants";

//헤더
const defaultHeaders = {
  "Content-Type": "application/json",
  "x-client-id": "web",
};

// fetch 공통 함수
function isApiError(obj: unknown): obj is ApiError {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "code" in obj &&
    "title" in obj &&
    "desc" in obj &&
    typeof (obj as Partial<ApiError>).code === "string" &&
    typeof (obj as Partial<ApiError>).title === "string" &&
    typeof (obj as Partial<ApiError>).desc === "string"
  );
}

async function request(
  method: string,
  url: string,
  {
    query,
    body,
    options,
  }: { query?: string; body?: unknown; options?: RequestInit } = {},
) {
  let fullUrl = `${API_BASE_URL}${url}`;
  if (query && query.trim() !== "") {
    fullUrl +=
      query.startsWith("?") || query.startsWith("&") ? query : `?${query}`;
  }

  const mergedOptions: RequestInit = {
    method,
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options && options.headers ? options.headers : {}),
    },
    credentials: "include",
  };

  if (body !== undefined && method !== "GET") {
    mergedOptions.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, mergedOptions);

  // DELETE 요청은 보통 응답이 empty일 수 있으니, 처리
  if (response.status === 204) return null;

  const data = await response.json();

  if (!response.ok) {
    // 서버 표준 에러 포맷이면 그대로 throw
    if (isApiError(data)) {
      throw data;
    }
    // 그 외는 일반 에러로 throw
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return data;
}

export const apiClient = {
  get: (url: string, query?: string, options?: RequestInit) =>
    request("GET", url, { query, options }),
  post: (url: string, body?: unknown, options?: RequestInit) =>
    request("POST", url, { body, options }),
  put: (url: string, body?: unknown, options?: RequestInit) =>
    request("PUT", url, { body, options }),
  delete: (url: string, body?: unknown, options?: RequestInit) =>
    request("DELETE", url, { body, options }),
};
