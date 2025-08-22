"use client";

type PostsByCategoryClientProps = {
  categoryId: string;
  limit?: number;
};

export default function PostsByCategoryClient({
  categoryId,
  limit = 10,
}: PostsByCategoryClientProps) {
  // TODO: 카테고리별 포스트 UI 구현
  console.log("PostsByCategoryClient", { categoryId, limit });

  return <div>PostsByCategoryClient for category {categoryId}</div>;
}
