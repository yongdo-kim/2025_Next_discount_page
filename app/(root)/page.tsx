import NavBar from "@/components/navbar/nav-bar";
import Carousel from "@/components/ui/carousel";
import { postKeys } from "@/features/post/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import clsx from "clsx";
import { PostList } from "./post/post-list";
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
      <Carousel />
      <PostList />
      <footer>FOOTER</footer>
    </HydrationBoundary>
  );
}
