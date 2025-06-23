"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { usePostDetail } from "../hooks/use-posts";
export const PostDetail = ({ postId }: { postId: string }) => {
  const { data: post, isLoading, error } = usePostDetail(postId);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!post) return <div>게시글이 존재하지 않습니다.</div>;

  return (
    <article className="max-w-screen-lg mx-auto px-4 py-6">
      {/* 태그 */}

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <Badge variant="outline" key={tag.id}>
            {tag.name}
          </Badge>
        ))}
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

      {/* 작성자, 작성일 */}
      <div className="flex items-center gap-3 mb-6">
        <Image
          src={post.user.profileImageUrl}
          alt={post.user.nickname}
          width={30}
          height={30}
          className="w-8 h-8 rounded-full object-cover border"
        />
        <div>
          <div className="font-semibold text-gray-800">
            {post.user.nickname}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* 대표 이미지 */}
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={600}
        height={400}
        className="rounded-xl object-cover"
        style={{ maxWidth: "100%", maxHeight: "250px" }}
      />

      {/* 본문 */}
      <div className="prose prose-lg max-w-none text-gray-900 whitespace-pre-line">
        {post.content}
      </div>
    </article>
  );
};
