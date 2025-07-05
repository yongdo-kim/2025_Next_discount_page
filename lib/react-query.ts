// lib/react-query.ts
import { QueryCache, QueryClient } from "@tanstack/react-query";

// 전역 QueryClient 인스턴스 생성
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 특정 쿼리에서 전역 에러 핸들링을 건너뛰려면 meta.skipGlobalError 사용
      if (query.meta?.skipGlobalError) return;
      console.log(error);

      //const err = error as CustomError;

      //   // 401 Unauthorized 처리 예시
      //   if (err.status === 401) {
      //     // 로그인 페이지로 리다이렉트
      //     window.location.href = "/login";
      //     return;
      //   }

      // 기타 에러 처리
      //toast.error(err.message || "알 수 없는 오류가 발생했습니다.");
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
