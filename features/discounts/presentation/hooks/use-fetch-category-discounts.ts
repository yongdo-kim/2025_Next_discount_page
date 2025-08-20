"use client";

import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useFetchHotCategoryDiscounts = () => {
  return useQuery({
    queryKey: discountKeys.hotCategory(),
    queryFn: async () => {
      const discounts =
        await container.discountService.getDiscountsByHotCategory();
      return JSON.parse(JSON.stringify(discounts));
    },
  });
};
