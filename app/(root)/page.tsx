import { DIContainer } from "@/lib/di/dependencies";
import { PostList } from "./post/post-list";

export default async function Page() {
  const initialPosts = await DIContainer.postService.getPostList();

  return (
    <div>
      <h1>Page</h1>
      <PostList initialData={initialPosts} />
    </div>
  );
}
