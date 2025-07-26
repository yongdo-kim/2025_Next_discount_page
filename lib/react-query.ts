// lib/react-query.ts
import { QueryCache, QueryClient } from "@tanstack/react-query";

// 전역 QueryClient 인스턴스 생성
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 특정 쿼리에서 전역 에러 핸들링을 건너뛰려면 meta.skipGlobalError 사용
      if (query.meta?.skipGlobalError) return;

      // 클라이언트에서만 toast 표시
      if (typeof window !== "undefined") {
        const { toast } = require("sonner");
        toast.error(error.message || "알 수 없는 오류가 발생했습니다.");
      }
    },
  }),

  defaultOptions: {
    queries: {
      // 글로벌 옵션 설정
      staleTime: 5 * 60 * 1000, // 5분 동안 신선한 데이터로 간주
      refetchOnWindowFocus: false, // 창 포커스 시 자동 리페치 비활성화
      retry: 1, // 실패 시 재시도 횟수
      retryDelay: 1000, // 재시도 간 지연 시간
    },
  },
});
