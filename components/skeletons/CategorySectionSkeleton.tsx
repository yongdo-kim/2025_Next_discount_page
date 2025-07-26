export default function CategorySectionSkeleton() {
  return (
    <section className="mx-auto max-w-screen-lg flex-1">
      {/* 메인 타이틀 */}
      <div className="flex justify-between px-4 pb-4 pt-4">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      </div>

      {/* 새로운 할인 섹션 */}
      <div className="space-y-4 px-4">
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            
            {/* 포스트 그리드 */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, postIndex) => (
                <div key={postIndex} className="space-y-2">
                  <div className="aspect-video animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
            
            {/* 구분선 */}
            <div className="h-px w-full animate-pulse bg-gray-200" />
          </div>
        ))}
      </div>
    </section>
  );
}