import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  shouldThrowError,
  getErrorMessage,
  isRetryableError,
} from "@/lib/error-handler";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 특정 쿼리에서 전역 에러 핸들링을 건너뛰려면 meta.skipGlobalError 사용
      if (query.meta?.skipGlobalError) return;

      // 클라이언트에서만 toast 표시
      if (typeof window !== "undefined") {
        const message = getErrorMessage(error);
        const isRetryable =
          isRetryableError(error) &&
          query.state.fetchFailureCount !== undefined &&
          query.state.fetchFailureCount < 3;

        toast.error(message, {
          action: isRetryable
            ? {
                label: "재시도",
                onClick: () =>
                  queryClient.refetchQueries({ queryKey: query.queryKey }),
              }
            : undefined,
        });
      }
    },
  }),

  defaultOptions: {
    queries: {
      // 글로벌 옵션 설정
      staleTime: 5 * 60 * 1000, // 5분 동안 신선한 데이터로 간주
      refetchOnWindowFocus: false, // 창 포커스 시 자동 리페치 비활성화
      retry: (failureCount, error) => {
        // 재시도 가능한 에러만 재시도
        if (isRetryableError(error) && failureCount < 3) {
          return true;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
      throwOnError: shouldThrowError, // 서버 에러는 Error Boundary로, 클라이언트 에러는 로컬 처리
    },
  },
});
