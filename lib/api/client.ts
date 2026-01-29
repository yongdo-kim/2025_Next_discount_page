import type { ApiError } from "@/features/common/types/api-error";

import { API_ERROR_CODES } from "@/features/common/constants/api-error-codes";
import { API_BASE_URL } from "@/lib/constants";
import { captureException } from "@sentry/nextjs";

function isServerSide(): boolean {
  return typeof window === "undefined";
}

async function getServerSideCookies(): Promise<{
  accessToken?: string;
  refreshToken?: string;
}> {
  if (isServerSide()) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return {
      accessToken: cookieStore.get("accessToken")?.value,
      refreshToken: cookieStore.get("refreshToken")?.value,
    };
  }
  return {};
}
//헤더
const defaultHeaders = {
  "Content-Type": "application/json",
  "x-client-id": "web",
};

function getMergedHeaders(options?: RequestInit) {
  return {
    ...defaultHeaders,
    ...(options && options.headers ? options.headers : {}),
  };
}

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

/**
 * API 호출 URL 생성 헬퍼 함수
 * 클라이언트: 상대 경로 그대로 사용 (/aws-api/discount/...) -> next.config.ts rewrites를 통해 프록시됨
 * 서버: 절대 경로로 변환 (http://13.209.40.142/api/discount/...) -> 직접 호출
 */
function constructApiUrl(path: string): string {
  // 1. 기본적으로는 환경변수 설정값 + path
  let fullUrl = `${API_BASE_URL}${path}`;

  // 2. 서버 사이드이면서 API_BASE_URL이 /aws-api 로 시작하는 상대 경로인 경우 변환
  if (isServerSide() && API_BASE_URL?.startsWith("/aws-api")) {
    const backendUrl = "http://13.209.40.142/api"; // 실제 AWS 백엔드 주소
    // /aws-api 를 제거하고 나머지 경로 (/discount 등)를 유지
    const relativePath = API_BASE_URL.replace("/aws-api", "");
    fullUrl = `${backendUrl}${relativePath}${path}`;
  }

  return fullUrl;
}

async function tryRefreshToken(options?: RequestInit): Promise<void> {
  // 수정: API_BASE_URL 직접 사용 대신 constructApiUrl 사용으로 서버 사이드 크래시 방지
  const fullUrl = constructApiUrl("/auth/refresh-token");

  const refreshResponse = await fetch(fullUrl, {
    method: "POST",
    credentials: "include",
    headers: getMergedHeaders(options),
  });
  const refreshData = await refreshResponse.json();
  if (!refreshResponse.ok) {
    if (
      isApiError(refreshData) &&
      (refreshData.code === API_ERROR_CODES.INVALID_REFRESH_TOKEN ||
        refreshData.code === API_ERROR_CODES.NOT_FOUND_REFRESH_TOKEN)
    ) {
      throw refreshData;
    }
    throw new Error("refresh-token failed");
  }
}

async function request<T>(
  method: string,
  url: string,
  {
    query,
    body,
    options,
  }: { query?: string; body?: unknown; options?: RequestInit } = {},
  retry = true, // 기본값 false? 원본 코드엔 true라고 되어있었으므로 유지, 재귀 호출 방지 로직 확인 필요
): Promise<T> {
  // 수정: 공통 URL 생성 함수 사용
  let fullUrl = constructApiUrl(url);

  let data;
  if (query && query.trim() !== "") {
    fullUrl +=
      query.startsWith("?") || query.startsWith("&") ? query : `?${query}`;
  }

  // 서버 사이드에서 자동으로 쿠키 추가
  let serverSideHeaders: Record<string, string> = {};
  if (isServerSide()) {
    const { accessToken, refreshToken } = await getServerSideCookies();
    const existingHeaders = options?.headers as Record<string, string>;
    if ((accessToken || refreshToken) && !existingHeaders?.cookie) {
      const cookieParts = [];
      if (accessToken) cookieParts.push(`accessToken=${accessToken}`);
      if (refreshToken) cookieParts.push(`refreshToken=${refreshToken}`);
      serverSideHeaders = { cookie: cookieParts.join("; ") };
    }
  }

  const mergedOptions: RequestInit = {
    method,
    ...options,
    headers: {
      ...getMergedHeaders(options),
      ...serverSideHeaders,
    },
    credentials: "include",
  };

  if (body !== undefined && method !== "GET") {
    if (body instanceof FormData) {
      // FormData: 파일 업로드(혹은 멀티파트)
      mergedOptions.body = body;
      if (mergedOptions.headers && typeof mergedOptions.headers === "object") {
        delete (mergedOptions.headers as Record<string, string>)[
          "Content-Type"
        ];
      }
    } else {
      // 일반 JSON
      mergedOptions.body = JSON.stringify(body);
      if (mergedOptions.headers && typeof mergedOptions.headers === "object") {
        mergedOptions.headers = {
          ...mergedOptions.headers,
          "Content-Type": "application/json",
        };
      }
    }
  }

  const response = await fetch(fullUrl, mergedOptions);

  if (response.status !== 204) {
    data = await response.json();
  }

  // 401 + NOT_FOUND_ACCESS_TOKEN 인터셉터 처리
  if (
    !response.ok &&
    response.status === 401 &&
    isApiError(data) &&
    (data.code === API_ERROR_CODES.NOT_FOUND_ACCESS_TOKEN ||
      data.code === API_ERROR_CODES.EXPIRED_ACCESS_TOKEN)
  ) {
    if (retry) {
      try {
        await tryRefreshToken(options);
        // 토큰 갱신 성공 시 원래 요청을 한 번만 재시도
        return request(method, url, { query, body, options }, false);
      } catch (e) {
        captureException(e);
        throw e;
      }
    }
  }

  if (!response.ok) {
    if (isApiError(data)) {
      throw data;
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return data as T;
}

export const apiClient = {
  get: <T>({
    url,
    query,
    headers,
    options,
  }: {
    url: string;
    query?: string;
    headers?: Record<string, string>;
    options?: RequestInit;
  }) =>
    request<T>("GET", url, {
      query,
      options: {
        ...(options || {}),
        headers: {
          ...(headers || {}),
          ...((options && options.headers) || {}),
        },
      },
    }),
  post: <T>({
    url,
    body,
    options,
  }: {
    url: string;
    body?: unknown;
    options?: RequestInit;
  }) => request<T>("POST", url, { body, options }),
  put: <T>({
    url,
    body,
    options,
  }: {
    url: string;
    body?: unknown;
    options?: RequestInit;
  }) => request<T>("PUT", url, { body, options }),
  delete: <T>({ url, options }: { url: string; options?: RequestInit }) =>
    request<T>("DELETE", url, { options }),
};
