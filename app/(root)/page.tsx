import Footer from "@/components/footer/footer";
import NavBar from "@/components/navbar/nav-bar";
import Carousel from "@/components/ui/carousel";
import { postKeys } from "@/features/post/infrastructure/contstant/query-keys";
import PostDiscountArea from "@/features/post/presentation/components/post-discount-area";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import clsx from "clsx";
//메인 첫번째 화면이 보이는 곳,

export default async function Page() {
  await queryClient.prefetchQuery({
    queryKey: [postKeys.all],
    queryFn: async () => {
      const posts = await container.postService.getPostList();
      return JSON.parse(JSON.stringify(posts));
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavBar className={clsx("w-full border-b-1 dark:border-neutral-800")} />
      <div className="mt-8">
        <Carousel />
      </div>
      <div className="mx-auto max-w-screen-xl">
        <PostDiscountArea
          title="가장 인기있는 할인"
          category="popular"
          itemSize={"small"}
        />
        <PostDiscountArea
          title="마감임박 할인"
          category="popular"
          itemSize={"middle"}
        />
        <PostDiscountArea
          title="지금 할인 중"
          category="popular"
          itemSize={"large"}
        />
      </div>

      <Footer />
    </HydrationBoundary>
  );
}
