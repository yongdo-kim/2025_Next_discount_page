'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          문제가 발생했습니다
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            다시 시도
          </button>
          <div>
            <button
              onClick={() => window.location.href = '/'}
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}