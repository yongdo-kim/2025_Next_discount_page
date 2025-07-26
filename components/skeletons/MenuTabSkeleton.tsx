export default function MenuTabSkeleton() {
  return (
    <>
      {/* 데스크탑 */}
      <div className="hidden lg:flex">
        <aside className="mx-auto flex w-[200px] flex-col items-center space-y-6 px-4 py-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-12 w-[150px] animate-pulse rounded-sm bg-gray-200"
            />
          ))}
        </aside>
      </div>
      
      {/* 모바일 */}
      <div className="block lg:hidden">
        <div className="flex flex-wrap gap-3 px-4 pt-4 pb-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-16 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>
    </>
  );
}