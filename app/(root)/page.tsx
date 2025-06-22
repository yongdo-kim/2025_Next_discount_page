import { ErrorBoundary } from "@/components/error/error-boundary";
import { usePosts } from "@/features/post/presentation/hooks/use-posts";

export default function Page() {
  const { data: posts, isLoading, error } = usePosts();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>Page</h1>
      <ErrorBoundary>
        {posts?.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </ErrorBoundary>
    </div>
  );
}
