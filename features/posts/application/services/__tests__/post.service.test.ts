import { container } from '@/lib/di/dependencies';

describe('PostService', () => {
  describe('getPostDetail', () => {
    it('should return a post when given a valid id', async () => {
      const post = await container.postService.getPostDetail(3);
      
      expect(post).toBeDefined();
      expect(post.id).toBe(3);
      expect(post.title).toContain('#1');
      expect(post.author).toBeDefined();
      expect(post.author.nickname).toBeDefined();
      expect(post.tags).toBeDefined();
      expect(Array.isArray(post.tags)).toBe(true);
    });

    it('should throw error when post not found', async () => {
      await expect(container.postService.getPostDetail(999)).rejects.toThrow('Post not found');
    });
  });

  describe('getPostPreviews', () => {
    it('should return an array of post previews', async () => {
      const previews = await container.postService.getPostPreviews({
        req: { categoryId: null, limit: 10 }
      });
      
      expect(Array.isArray(previews)).toBe(true);
    });
  });

  describe('getCategoryPostPreviews', () => {
    it('should return an array of category post previews', async () => {
      const previews = await container.postService.getCategoryPostPreviews();
      
      expect(Array.isArray(previews)).toBe(true);
    });
  });
});