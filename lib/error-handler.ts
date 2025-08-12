import type { ApiError } from "@/features/common/types/api-error";
import { API_ERROR_CODES } from "@/features/common/constants/api-error-codes";

export function isApiError(obj: unknown): obj is ApiError {
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

export function isServerError(error: unknown): boolean {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { status?: number } }).response;
    return response?.status !== undefined && response.status >= 500;
  }
  return false;
}

export function isClientError(error: unknown): boolean {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { status?: number } }).response;
    return (
      response?.status !== undefined &&
      response.status >= 400 &&
      response.status < 500
    );
  }
  return false;
}

export function shouldThrowError(error: unknown): boolean {
  if (isApiError(error)) {
    switch (error.code) {
      case API_ERROR_CODES.NOT_FOUND_ACCESS_TOKEN:
      case API_ERROR_CODES.EXPIRED_ACCESS_TOKEN:
      case API_ERROR_CODES.INVALID_REFRESH_TOKEN:
      case API_ERROR_CODES.NOT_FOUND_REFRESH_TOKEN:
        return false;
    }
  }
  return isServerError(error);
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.desc || error.title || "오류가 발생했습니다";
  }

  if (error && typeof error === "object" && "message" in error) {
    return (error as Error).message;
  }

  if (isServerError(error)) {
    return "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }

  if (isClientError(error)) {
    return "요청을 처리할 수 없습니다. 입력 내용을 확인해주세요.";
  }

  return "알 수 없는 오류가 발생했습니다.";
}

export function isRetryableError(error: unknown): boolean {
  if (isServerError(error)) return true;

  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code?: string }).code;
    return code === "NETWORK_ERROR" || code === "TIMEOUT";
  }

  return false;
}
