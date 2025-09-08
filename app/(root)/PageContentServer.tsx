import DividerLine from "@/components/ui/DividerLine";
import { MainAdBanners } from "@/features/banners/presentation/components/MainAdBanners";
import MenuTabServer from "@/components/navbar/menuTab/MenuTabServer";
import MainAdAreaServer from "@/features/discounts/presentation/components/MainAdAreaServer";
import NewestDiscountServer from "@/features/discounts/presentation/components/NewestDiscountServer";
import EventsLatestServer from "@/features/events/presentation/components/EventsLatestServer";
import EventsUpComingServer from "@/features/events/presentation/components/EventsUpComingServer";
import PostsByCategoryServer from "@/features/posts/presentation/components/PostsByCategoryServer";
import MyDiscountClient from "@/features/users/presentation/components/MyDiscountClient";
import dynamic from "next/dynamic";

const DynamicDiscountPlatformServer = dynamic(
  () =>
    import(
      "@/features/discounts/presentation/components/DiscountPlatformServer"
    ),
  {
    loading: () => null,
  },
);

interface PageContentServerProps {
  category?: string;
}

export default async function PageContentServer({
  category,
}: PageContentServerProps) {
  return (
    <div className="container mx-auto">
      <MenuTabServer />
      <DividerLine className="my-4" />

      {category ? (
        <PostsByCategoryServer categoryId={category} />
      ) : (
        <>
          <MainAdAreaServer />
          <section className="grid grid-cols-1 md:grid-cols-2">
            <NewestDiscountServer />
            <EventsUpComingServer />
          </section>
          <DividerLine />
          <div className="px-4">
            <MyDiscountClient />
            <MainAdBanners />
          </div>
          <EventsLatestServer data-testid="lcp-boundary-section" />
          <DividerLine />
          <DynamicDiscountPlatformServer />
        </>
      )}
    </div>
  );
}
