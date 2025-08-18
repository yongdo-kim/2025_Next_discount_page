export const discountKeys = {
  all: "discounts" as const,
  newest: () => [discountKeys.all, "newest"] as const,
  detail: (id: number) => [discountKeys.all, "detail", id] as const,
};
