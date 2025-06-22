// lib/di/dependencies.ts
import { PostService } from "@/features/post/application/services/post.service";
import { MockPostRepository } from "@/features/post/infrastructure/repositories/post.mock.repository";
import { HttpPostRepository } from "@/features/post/infrastructure/repositories/post.repository";
import { IS_DEVMODE } from "../constants";
import { DIContainer } from "./container";

// 여기서 어떤걸 생성할지 작업.
const postRepository = () => {
  return IS_DEVMODE ? new MockPostRepository() : new HttpPostRepository();
};

const postService = new PostService(postRepository());

export const dependencies = {
  post: {
    postService,
  },
  // 다른 의존성들...
} as DIContainer;
