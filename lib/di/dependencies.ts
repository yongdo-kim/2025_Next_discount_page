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
import { UsersService } from "@/features/users/application/services/users.service";
import { MockUsersRepository } from "@/features/users/infrastructure/repositories/users.mock.repository";
import { HttpUsersRepository } from "@/features/users/infrastructure/repositories/users.repository";
import { IS_TESTMODE } from "../constants";

type Services = {
  postService: PostService;
  tagService: TagService;
  categoryService: CategoryService;
  userService: UsersService;
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
  const userRepository = createRepository(
    MockUsersRepository,
    HttpUsersRepository,
  );

  return {
    postService: new PostService(postRepository),
    tagService: new TagService(tagRepository),
    categoryService: new CategoryService(categoryRepository),
    userService: new UsersService(userRepository),
  };
};

const services = createServices();
export const container = {
  ...services,
};
