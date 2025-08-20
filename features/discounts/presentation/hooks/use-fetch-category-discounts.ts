"use client";

import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useFetchPlatformsDiscounts = () => {
  return useQuery({
    queryKey: discountKeys.platforms(),
    queryFn: async () => {
      const discounts =
        await container.discountService.getDiscountsByPlatforms();
      return JSON.parse(JSON.stringify(discounts));
    },
  });
};
