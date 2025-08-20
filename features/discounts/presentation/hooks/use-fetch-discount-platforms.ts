import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";

export const useFetchDiscountPlatforms = () => {
  return useQuery({
    queryKey: discountKeys.platforms(),
    queryFn: async () => {
      return await container.discountService.getDiscountPlatforms();
    },
  });
};
