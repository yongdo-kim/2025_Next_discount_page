// lib/di/dependencies.ts
import { AuthService } from "@/features/auth/application/services/auth.service";
import { MockAuthRepository } from "@/features/auth/infrastructure/repositories/auth.mock.repository";
import { HttpAuthRepository } from "@/features/auth/infrastructure/repositories/auth.repository";
import { CategoryService } from "@/features/categories/application/services/category.service";
import { MockCategoryRepository } from "@/features/categories/infrastructure/repositories/category.mock.repository";
import { HttpCategoryRepository } from "@/features/categories/infrastructure/repositories/category.repository";
import { PostService } from "@/features/posts/application/services/post.service";
import { MockPostRepository } from "@/features/posts/infrastructure/repositories/post.mock.repository";
import { HttpPostRepository } from "@/features/posts/infrastructure/repositories/post.repository";
import { TagService } from "@/features/tags/application/services/tag.service";
import { MockTagRepository } from "@/features/tags/infrastructure/repositories/tag.mock.repository";
import { HttpTagRepository } from "@/features/tags/infrastructure/repositories/tag.repository";
import { UsersService } from "@/features/users/application/services/users.service";
import { MockUsersRepository } from "@/features/users/infrastructure/repositories/users.mock.repository";
import { HttpUsersRepository } from "@/features/users/infrastructure/repositories/users.repository";
import { ENV } from "@/lib/constants";

type Services = {
  postService: PostService;
  tagService: TagService;
  categoryService: CategoryService;
  userService: UsersService;
  authService: AuthService;
  // 향후 추가될 서비스들...
};

const createRepository = <T extends object>(
  MockRepo: new () => T,
  HttpRepo: new () => T,
): T => {
  return ENV === "test" ? new MockRepo() : new HttpRepo();
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
  const authService = createRepository(MockAuthRepository, HttpAuthRepository);

  return {
    postService: new PostService(postRepository),
    tagService: new TagService(tagRepository),
    categoryService: new CategoryService(categoryRepository),
    userService: new UsersService(userRepository),
    authService: new AuthService(authService),
  };
};

const services = createServices();
export const container = {
  ...services,
};
