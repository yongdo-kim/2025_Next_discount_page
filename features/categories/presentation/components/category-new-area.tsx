"use client";

import AdSenseBanner from "@/components/ad-sense-banner";
import MainTitle from "@/components/main-title";
import PostCardSmall from "@/features/posts/presentation/components/post-card-small";
import { usePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
// import dynamic from "next/dynamic";
// const AdSenseBanner = dynamic(() => import("@/components/AdSenseBanner"), {
//   ssr: false,
// });

export default function NewCategoryDiscountArea() {
  const { data: categories } = usePostPreviews({
    req: {
      limit: 8,
      categoryId: null,
    },
  });

  const PostCardSmallList = () => {
    return (
      <ul className="grid grid-cols-1 gap-4 gap-y-4 px-4 whitespace-nowrap md:grid-cols-3 lg:grid-cols-4">
        {categories?.map((post) => {
          if (!post) return null;
          return (
            <li key={post.id}>
              <PostCardSmall post={post} />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section className="pt-4 pb-2 md:pb-8">
      <div className="flex justify-between px-4 pb-4 md:pb-8">
        <MainTitle
          title="오늘의"
          coloredTitle=" 따끈한 할인"
          color="text-red-400"
        />
      </div>
      <PostCardSmallList />
      <AdSenseBanner />
    </section>
  );
}
