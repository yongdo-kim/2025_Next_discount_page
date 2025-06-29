// lib/di/dependencies.ts
import { CategoryService } from "@/features/category/application/services/category.service";
import { MockCategoryRepository } from "@/features/category/infrastructure/repositories/category.mock.repository";
import { HttpCategoryRepository } from "@/features/category/infrastructure/repositories/category.repository";
import { PostService } from "@/features/post/application/services/post.service";
import { MockPostRepository } from "@/features/post/infrastructure/repositories/post.mock.repository";
import { HttpPostRepository } from "@/features/post/infrastructure/repositories/post.repository";
import { TagService } from "@/features/tag/application/services/tag.service";
import { MockTagRepository } from "@/features/tag/infrastructure/repositories/tag.mock.repository";
import { HttpTagRepository } from "@/features/tag/infrastructure/repositories/tag.repository";
import { IS_TESTMODE } from "../constants";

type Services = {
  postService: PostService;
  tagService: TagService;
  categoryService: CategoryService;
  // 향후 추가될 서비스들...
};

const createRepository = <T>(
  MockRepo: new () => T,
  HttpRepo: new () => T,
): T => {
  return IS_TESTMODE ? new MockRepo() : new HttpRepo();
};

const createServices = (): Services => {
  const postRepository = createRepository(
    MockPostRepository,
    HttpPostRepository,
  );
  const tagRepository = createRepository(MockTagRepository, HttpTagRepository);
  const categoryRepository = createRepository(
    MockCategoryRepository,
    HttpCategoryRepository,
  );

  return {
    postService: new PostService(postRepository),
    tagService: new TagService(tagRepository),
    categoryService: new CategoryService(categoryRepository),
    // 향후 추가될 서비스들...
  };
};
const services = createServices();
export const container = {
  ...services,
};
