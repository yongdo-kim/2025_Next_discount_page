// lib/di/container.ts
import { PostService } from "@/features/post/application/services/post.service";
import { createContext, useContext } from "react";

// 1. 컨텍스트 타입 정의
export type DIContainer = {
  // 여기에 피처별 의존성들이 추가됩니다.
  post: {
    postService: PostService;
  };
  // 다른 피처들...
};

// 2. 기본 컨텍스트 생성
export const DIContext = createContext<DIContainer | null>(null);

// 5. 훅
export function useDIContainer() {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error("DIContainerProvider를 상위에서 감싸주세요");
  }
  return container;
}
