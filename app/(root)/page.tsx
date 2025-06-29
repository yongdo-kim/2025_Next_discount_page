import Footer from "@/components/footer/footer";
import NavBar from "@/components/navbar/nav-bar";
import { categoryKeys } from "@/features/category/infrastructure/contstant/query-keys";
import CategoryCarousel from "@/features/category/presentation/components/category-carousel";
import DiscountByCategoryArea from "@/features/category/presentation/components/category-discount-area";
import NewCategoryDiscountArea from "@/features/category/presentation/components/category-new-area";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import clsx from "clsx";
//메인 첫번째 화면이 보이는 곳,

export default async function Page() {
  const categories = await container.categoryService.getCategories();

  // 카테고리별로 prefetchQuery 실행 (병렬 처리)
  await Promise.all(
    categories.map((category) =>
      queryClient.prefetchQuery({
        queryKey: [categoryKeys.all, category.id],
        queryFn: async () => {
          const posts = await container.postService.getPostPreviews({
            req: { categoryId: category.id },
          });
          return JSON.parse(JSON.stringify(posts));
        },
      }),
    ),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavBar className={clsx("w-full border-b-1 dark:border-neutral-800")} />
      <div className="">{/* <PostCarousel /> */}</div>
      <div className="mx-auto max-w-screen-xl">
        <CategoryCarousel/>
        <NewCategoryDiscountArea />
        <DiscountByCategoryArea />
      </div>

      <Footer />
    </HydrationBoundary>
  );
}
