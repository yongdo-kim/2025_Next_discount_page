import PageContentServer from "./PageContentServer";
import { Suspense } from "react";

export const revalidate = 3600; // 1시간마다 ISR

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  return (
    <Suspense fallback={null}>
      <PageContentServer category={category} />
    </Suspense>
  );
}
