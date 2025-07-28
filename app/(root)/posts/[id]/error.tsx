'use client';

import { useEffect } from 'react';
import { captureException } from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            게시글을 불러올 수 없습니다
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            게시글을 불러오는 중 문제가 발생했습니다.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            다시 시도
          </button>
          
          <div className="flex space-x-4 text-sm">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              이전 페이지로
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => window.location.href = '/'}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}