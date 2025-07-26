import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";

export async function prefetchCategoryPostPreviews() {
  return queryClient
    .fetchQuery({
      queryKey: [categoryKeys.banners],
      queryFn: async () => {
        const posts = await container.postService.getCategoryPostPreviews();
        return JSON.parse(JSON.stringify(posts));
      },
    })
    .catch(() => []);
}