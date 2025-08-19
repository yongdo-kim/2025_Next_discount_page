"use client";

import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useNewestDiscountPreviews = () => {
  return useQuery({
    queryKey: discountKeys.newest(),
    queryFn: () => container.discountService.getNewestDiscountPreview(8),
  });
};

export const useDiscountDetail = ({ discountId }: { discountId: number }) => {
  return useQuery({
    queryKey: discountKeys.detail(discountId),
    queryFn: () => container.discountService.getDiscountDetail(discountId),
  });
};
