// lib/di/dependencies.ts
import { PostService } from "@/features/post/application/services/post.service";
import { MockPostRepository } from "@/features/post/infrastructure/repositories/post.mock.repository";
import { HttpPostRepository } from "@/features/post/infrastructure/repositories/post.repository";
import { IS_TESTMODE } from "../constants";

// 여기서 어떤걸 생성할지 작업.
const postRepository = () => {
  return IS_TESTMODE ? new MockPostRepository() : new HttpPostRepository();
};

const postService = new PostService(postRepository());

export const container = {
  postService,
  // 다른 의존성들...
};
