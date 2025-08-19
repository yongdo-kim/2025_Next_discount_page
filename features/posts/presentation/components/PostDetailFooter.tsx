import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { toast } from "sonner";

export const PostDetailFooter = ({ post }: { post: PostEntity }) => {
  return (
    <div
      className="flex w-full justify-end border-t pt-4 pb-32"
      data-testid="post-detail-footer"
    >
      <SourceLink url={post.source?.scrapingSourceUrl} />
    </div>
  );
};

function SourceLink({ url }: { url?: string | null }) {
  if (!url) return null;

  const MAX_LENGTH = 40;
  let displayUrl = url;
  if (url.length > MAX_LENGTH) {
    displayUrl = url.slice(0, 30) + "..." + url.slice(-8);
  }

  // 클립보드 복사
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast("URL이 클립보드에 복사되었습니다.");
  };

  return (
    <div
      className="flex items-center rounded-lg bg-neutral-50 py-3 shadow-sm dark:bg-neutral-900"
      data-testid="post-detail-source-link"
    >
      {/* 아이콘 */}

      <span
        className="mr-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300"
        data-testid="post-detail-source-label"
      >
        자료출처
      </span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate text-sm font-medium text-gray-400 underline hover:text-emerald-600"
        title={url}
        data-testid="post-detail-source-url"
      >
        {displayUrl}
      </a>
      <button
        onClick={handleCopy}
        className="ml-2 rounded bg-gray-400 px-2 py-1 text-xs font-semibold text-neutral-600 hover:bg-blue-100 hover:text-blue-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-blue-900"
        title="복사"
        type="button"
        data-testid="post-detail-source-copy-button"
      >
        복사
      </button>
    </div>
  );
}
