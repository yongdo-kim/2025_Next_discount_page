export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-emerald-600"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400"></p>
      </div>
    </div>
  );
}
