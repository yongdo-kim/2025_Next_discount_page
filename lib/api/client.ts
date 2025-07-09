import type { ApiError } from "@/features/common/types/api-error";

import { API_ERROR_CODES } from "@/features/common/constants/api-error-codes";
import { API_BASE_URL } from "@/lib/constants";
import * as Sentry from "@sentry/nextjs";
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

async function tryRefreshToken(options?: RequestInit): Promise<void> {
  const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
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
  retry = true,
): Promise<T> {
  let fullUrl = `${API_BASE_URL}${url}`;
  if (query && query.trim() !== "") {
    fullUrl +=
      query.startsWith("?") || query.startsWith("&") ? query : `?${query}`;
  }

  const mergedOptions: RequestInit = {
    method,
    ...options,
    headers: getMergedHeaders(options),
    credentials: "include",
  };

  if (body !== undefined && method !== "GET") {
    mergedOptions.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, mergedOptions);

  const data = await response.json();

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
        Sentry.captureException(e);
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
  get: <T>(url: string, query?: string, options?: RequestInit) =>
    request<T>("GET", url, { query, options }),
  post: <T>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>("POST", url, { body, options }),
  put: <T>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>("PUT", url, { body, options }),
  delete: <T>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>("DELETE", url, { body, options }),
};
