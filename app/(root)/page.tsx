import Footer from "@/components/footer/footer";
import MenuTab from "@/components/navbar/menu-tab";
import NavBar from "@/components/navbar/nav-bar";
import { CategoryEntity } from "@/features/category/domain/entities/category.entity";
import { categoryKeys } from "@/features/category/infrastructure/contstant/query-keys";
import CategoryCarousel from "@/features/category/presentation/components/category-carousel";
import CategorySection from "@/features/category/presentation/components/category-section";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import clsx from "clsx";
//메인 첫번째 화면이 보이는 곳,

export default async function Page() {
  //처음에 카테고리 리스트는 받아야함.
  const categories = await queryClient.fetchQuery({
    queryKey: [categoryKeys.all],
    queryFn: async () => {
      const categories = await container.categoryService.getCategories();
      return JSON.parse(JSON.stringify(categories));
    },
  });

  // 카테고리별 아이템
  await Promise.all([
    categories?.map((category: CategoryEntity) =>
      queryClient.prefetchQuery({
        queryKey: [categoryKeys.all, category.id],
        queryFn: async () => {
          const posts = await container.postService.getPostPreviews({
            req: { categoryId: category.id, limit: null },
          });
          return JSON.parse(JSON.stringify(posts));
        },
      }),
    ),
    // 배너 호출
    queryClient.prefetchQuery({
      queryKey: [categoryKeys.banners],
      queryFn: async () => {
        const posts = await container.postService.getCategoryPostPreviews();
        return JSON.parse(JSON.stringify(posts));
      },
    }),
    //오늘의 따끈한 할인 호출
    queryClient.prefetchQuery({
      queryKey: [categoryKeys.all, null, 8],
      queryFn: async () => {
        const posts = await container.postService.getPostPreviews({
          req: { limit: 8, categoryId: null },
        });
        return JSON.parse(JSON.stringify(posts));
      },
    }),
    //테마별 특구가 추천 
  ]);

  //여기 대기시간 5초 코드 : loading.tsx가 발동함을 확인함.
  //await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavBar className={clsx("w-full border-b-1 dark:border-neutral-800")} />
      {/* 캐러셀 */}
      <CategoryCarousel />
      {/* 메뉴탭 : 데스크탑인 경우 양옆, 모바일이라면 세로.  */}
      <div className="mx-auto max-w-screen-xl lg:flex">
        <MenuTab />
        <CategorySection />
      </div>

      <Footer />
    </HydrationBoundary>
  );
}
