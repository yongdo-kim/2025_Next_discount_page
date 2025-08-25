import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { UsersRepository } from "@/features/users/domain/entities/repositories/user.repository";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";

export class MockUsersRepository implements UsersRepository {
  async getMe(): Promise<UserEntity> {
    // 실제 개발 환경에 맞게 더미 데이터 작성
    return {
      id: 1,
      email: "mock@user.com",
      name: "Mock User",
      nickname: "Mock User",
      picture: "",
      provider: "mock",
      role: "user",
      apple_user_identifier: "mock",
    };
  }
  async updateMe(data: UserUpdateReqDto): Promise<UserEntity> {
    return {
      id: 1,
      email: "mock@user.com",
      name: "Mock User",
      nickname: data.nickname || "Mock User",
      picture: "",
      provider: "mock",
      role: "user",
      apple_user_identifier: "mock",
    };
  }

  async getLikedPosts(limit?: number): Promise<PostPreviewEntity[]> {
    const mockPosts: PostPreviewEntity[] = [
      new PostPreviewEntity({
        id: 1,
        title: "Mock Liked Post 1",
        author: new UserEntity({
          id: 1,
          email: "mock@user.com",
          name: "Mock User",
          nickname: "Mock User",
          picture: "",
          provider: "mock",
          role: "user",
        }),
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: null,
        deletedAt: null,
        viewsCount: 100,
        likesCount: 10,
        isLikedByMe: true,
        isMine: false,
        isReportedByMe: false,
        isBlurredByAI: false,
        isBlockedByMe: false,
        commentsCount: 5,
        thumbnailUrl: "https://example.com/thumbnail1.jpg",
        tags: [new TagEntity({ id: 1, name: "할인" })],
        category: { id: 1, name: "디지털/가전" },
      }),
    ];

    return limit ? mockPosts.slice(0, limit) : mockPosts;
  }
}
