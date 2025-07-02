"use client";

import MainTitle from "@/components/main-title";
import SeeAllButton from "@/components/see-all-button";
import PostCardSmall from "@/features/post/presentation/components/post-card-small";
import { usePostPreviews } from "@/features/post/presentation/hooks/use-posts";

export default function NewCategoryDiscountArea() {
  const { data: categories } = usePostPreviews({
    req: {
      limit: 5,
    },
  });

  const PostCardSmallList = () => {
    return (
      <ul className="grid grid-cols-1 gap-y-4 px-4 whitespace-nowrap md:grid-cols-4 lg:grid-cols-5">
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
    <section className="pt-4 pb-2">
      <div className="flex justify-between px-4 pb-4">
        <MainTitle
          title="오늘의"
          coloredTitle=" 따끈한 할인"
          color="text-red-400"
        />
        <SeeAllButton href="/" />
      </div>
      <PostCardSmallList />
    </section>
  );
}
