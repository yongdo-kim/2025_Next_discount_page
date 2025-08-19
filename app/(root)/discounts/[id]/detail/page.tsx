import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { DiscountDetail } from "@/features/discounts/presentation/components/DiscountDetail";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  try {
    const discount = await container.discountService.getDiscountDetail(numId);
    return {
      title: discount.title ? `${discount.title} | 할인탐정` : "할인탐정",
      description: discount.title || "할인 정보 상세",
      openGraph: {
        title: discount.title,
        description: discount.title,
        images: discount.imageUrl ? [{ url: discount.imageUrl }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: discount.title,
        description: discount.title,
        images: discount.imageUrl ? [{ url: discount.imageUrl }] : [],
      },
    };
  } catch {
    return {
      title: "할인 정보를 찾을 수 없습니다 | 할인탐정",
      description: "존재하지 않는 할인 정보입니다.",
    };
  }
}

export default async function DiscountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  try {
    await queryClient.prefetchQuery({
      queryKey: discountKeys.detail(numId),
      queryFn: async () => {
        const discount =
          await container.discountService.getDiscountDetail(numId);
        return JSON.parse(JSON.stringify(discount));
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "404") {
      return notFound();
    }
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DiscountDetail discountId={numId} />
    </HydrationBoundary>
  );
}
