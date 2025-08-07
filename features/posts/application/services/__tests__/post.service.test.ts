import { PostService } from '../post.service';
import { MockPostRepository } from '@/features/posts/infrastructure/repositories/post.mock.repository';
import { PostPreviewsReqDto } from '@/features/posts/infrastructure/dto/requests/post-preview.req.dto';

describe('PostService', () => {
  let postService: PostService;
  let mockPostRepository: MockPostRepository;

  beforeEach(() => { 
    mockPostRepository = new MockPostRepository();
    postService = new PostService(mockPostRepository);
  });

  describe('getPostPreviews', () => {
    it('요청된 파라미터로 게시글 미리보기 목록을 반환해야 한다', async () => {
      const req: PostPreviewsReqDto = {
        limit: 10,
        categoryId: 1
      };

      const result = await postService.getPostPreviews({ req });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(10);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('content');
      expect(result[0]).toHaveProperty('author');
    });

    it('카테고리 필터링이 올바르게 작동해야 한다', async () => {
      const req: PostPreviewsReqDto = {
        categoryId: 1,
        limit: 5
      };

      const result = await postService.getPostPreviews({ req });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      result.forEach(post => {
        expect(post.category.id).toBe(1);
      });
    });

    it('커서 기반 페이지네이션이 올바르게 작동해야 한다', async () => {
      const firstPageReq: PostPreviewsReqDto = {
        limit: 3,
        categoryId: 1
      };

      const firstPage = await postService.getPostPreviews({ req: firstPageReq });
      expect(firstPage.length).toBe(3);

      const lastPostId = firstPage[firstPage.length - 1].id;
      const secondPageReq: PostPreviewsReqDto = {
        cursor: lastPostId,
        categoryId: 1,
        limit: 3
      };

      const secondPage = await postService.getPostPreviews({ req: secondPageReq });
      expect(secondPage.length).toBe(3);
      
      secondPage.forEach(post => {
        expect(post.id).toBeLessThan(lastPostId);
      });
    });

    it('빈 결과도 올바르게 처리해야 한다', async () => {
      const req: PostPreviewsReqDto = {
        categoryId: 999,   // 존재하지 않는 카테고리
        limit: 10
      };

      const result = await postService.getPostPreviews({ req });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('getPostDetail', () => {
    it('유효한 ID로 게시글 상세 정보를 반환해야 한다', async () => {
      const postId = 3; // MockPostRepository에서 생성되는 첫 번째 게시글 ID

      const result = await postService.getPostDetail(postId);

      expect(result).toBeDefined();
      expect(result.id).toBe(postId);
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('author');
      expect(result).toHaveProperty('tags');
      expect(result).toHaveProperty('source');
    });

    it('존재하지 않는 ID로 요청 시 에러를 발생시켜야 한다', async () => {
      const invalidPostId = 999999;

      await expect(postService.getPostDetail(invalidPostId))
        .rejects
        .toThrow('Post not found');
    });
  });

  describe('getCategoryPostPreviews', () => {
    it('카테고리별 특별 게시글 목록을 반환해야 한다', async () => {
      const result = await postService.getCategoryPostPreviews();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      result.forEach(post => {
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('category');
        expect(post.id).toBeGreaterThanOrEqual(10000); // 카테고리 포스트는 10000번대 ID
      });
    });

    it('반환되는 게시글들이 올바른 구조를 가져야 한다', async () => {
      const result = await postService.getCategoryPostPreviews();

      expect(result.length).toBeGreaterThan(0);
      
      const firstPost = result[0];
      expect(firstPost.author).toBeDefined();
      expect(firstPost.author.nickname).toBe('할인탐정');
      expect(firstPost.category).toBeDefined();
      expect(firstPost.category.name).toBeDefined();
      expect(firstPost.commentsCount).toBeGreaterThanOrEqual(0);
      expect(firstPost.viewsCount).toBeGreaterThanOrEqual(0);
      expect(firstPost.likesCount).toBeGreaterThanOrEqual(0);
    });
  });
});