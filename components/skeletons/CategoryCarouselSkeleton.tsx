export default function CategoryCarouselSkeleton() {
  return (
    <div className="w-full bg-gradient-to-r px-4 py-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded bg-white/20" />
          <div className="h-6 w-32 animate-pulse rounded bg-white/20" />
        </div>
        
        {/* 카테고리 아이템들 */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="h-12 w-12 animate-pulse rounded-full bg-white/20" />
              <div className="h-4 w-16 animate-pulse rounded bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}