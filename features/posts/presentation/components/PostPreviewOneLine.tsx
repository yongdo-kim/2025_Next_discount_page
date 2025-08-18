import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";

export function PostPreviewOneLine({ post }: { post: PostPreviewEntity }) {
  return (
    <div className="flex">
      <div>{post.title}</div>
    </div>
  );
}
