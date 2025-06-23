import { container } from "@/lib/di/dependencies";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const post = await container.postService.getPostDetail(id);

  return <div>sayHello {post.title}</div>;
}
