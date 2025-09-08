"use client";

import dynamic from "next/dynamic";

const DynamicDiscountPlatformClient = dynamic(
  () =>
    import(
      "@/features/discounts/presentation/components/DiscountPlatformClient"
    ),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function DynamicDiscountPlatformWrapper() {
  return <DynamicDiscountPlatformClient />;
}
