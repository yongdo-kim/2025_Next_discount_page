export const discountKeys = {
  all: "discounts" as const,
  newest: () => [discountKeys.all, "newest"] as const,
  hotCategory: () => [discountKeys.all, "hot-category"] as const,
};
