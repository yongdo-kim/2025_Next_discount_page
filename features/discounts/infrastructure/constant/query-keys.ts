export const discountKeys = {
  all: "discounts" as const,
  newest: () => [discountKeys.all, "newest"] as const,
};
