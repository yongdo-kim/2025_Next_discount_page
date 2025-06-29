"use client";

import Carousel from "@/components/ui/carousel";
import { categoryKeys } from "@/features/category/infrastructure/contstant/query-keys";
import { useFetchCategories } from "@/features/category/presentation/hooks/use-fetch-categories";
import { container } from "@/lib/di/dependencies";
import { useQueries } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/pagination";

export default function CategoryCarousel() {
  const { data: categories } = useFetchCategories();

  //map 돌면서 병렬로 실행
  const postQueries = useQueries({
    queries:
      categories?.map((category) => ({
        queryKey: [categoryKeys.all, category.id],
        queryFn: () =>
          container.postService.getPostPreviews({
            req: { categoryId: category.id, limit: 5 },
          }),
      })) ?? [],
  });
  const results = postQueries.map((postQuery) => {
    if (!postQuery.data) return null;
    return {
      title: postQuery.data?.[0].title,
      thumbnailUrl: postQuery.data?.[0].thumbnailUrl,
      // link:postQuery.data?.[0].source,
    };
  });

  return <Carousel data={results.filter((result) => result !== null)} />;
}
