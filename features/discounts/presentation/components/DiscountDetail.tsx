"use client";

import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { PlatformTag } from "@/components/ui/PlatformTag";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import Image from "next/image";
import { Badge } from "@/components/shadcn/badge";

interface DiscountDetailProps {
  discountId: number;
  initialDiscount?: DiscountEntity;
}

function splitTitleByPlatform(title: string): {
  platform: string | null;
  content: string;
} {
  const platformMatch = title.match(/\[.*?\]/);
  if (platformMatch) {
    const platform = platformMatch[0];
    const content = title.replace(/\[.*?\]\s*/, "").trim();
    return { platform, content };
  }
  return { platform: null, content: title };
}

export function DiscountDetail({
  discountId,
  initialDiscount,
}: DiscountDetailProps) {
  const {
    data: discount,
    isLoading,
    error,
  } = useQuery({
    queryKey: discountKeys.detail(discountId),
    queryFn: () => container.discountService.getDiscountDetail(discountId),
    initialData: initialDiscount,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !discount) return <div>할인 정보를 찾을 수 없습니다.</div>;

  const { platform, content } = splitTitleByPlatform(discount.title);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="mb-2 flex items-center gap-2">
            {platform && <PlatformTag platform={platform} />}
            <Badge variant="secondary">{discount.discountRate}% 할인</Badge>
          </div>
          <CardTitle className="text-2xl">{content}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {discount.imageUrl && (
                <Image
                  src={discount.imageUrl}
                  alt={discount.title}
                  className="h-64 w-full rounded-lg object-cover"
                />
              )}
              {discount.description && (
                <p className="text-gray-600">{discount.description}</p>
              )}
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">정가</span>
                    <span className="text-gray-500 line-through">
                      {discount.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>할인가</span>
                    <span className="text-red-600">
                      {discount.discountedPrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>절약 금액</span>
                    <span>{discount.savings.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>판매처:</strong> {discount.storeName}
                </p>
                <p>
                  <strong>등록일:</strong>{" "}
                  {new Date(discount.createdAt).toLocaleDateString()}
                </p>
              </div>
              <a
                href={discount.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-blue-600 py-3 text-center text-white transition-colors hover:bg-blue-700"
              >
                상품 보러가기
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
