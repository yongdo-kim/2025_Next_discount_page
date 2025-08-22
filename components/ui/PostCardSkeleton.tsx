type PostCardSkeletonProps = {
  variant?: "mobile" | "desktop";
};

export default function PostCardSkeleton({
  variant = "desktop",
}: PostCardSkeletonProps) {
  if (variant === "mobile") {
    return (
      <div className="w-full cursor-pointer rounded-2xl">
        <div className="animate-pulse">
          <div className="h-[180px] w-full rounded-2xl bg-gray-300" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-400" />
            <div className="h-3 w-1/2 rounded bg-gray-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full cursor-pointer rounded-2xl">
      <div className="animate-pulse">
        <div className="relative h-[280px] lg:h-[380px]">
          <div className="h-[280px] w-full rounded-2xl bg-gray-300 lg:h-[380px]" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-2">
            <div className="mb-2 h-5 w-3/4 rounded bg-gray-400 lg:h-6" />
            <div className="h-4 w-1/2 rounded bg-gray-500 lg:h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
