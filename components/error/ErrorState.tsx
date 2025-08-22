"use client";

import { Button } from "@/components/shadcn/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { getErrorMessage, isRetryableError } from "@/lib/error-handler";

type ErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
};

export function ErrorState({
  error,
  onRetry,
  size = "md",
  showIcon = true,
}: ErrorStateProps) {
  const message = getErrorMessage(error);
  const canRetry = isRetryableError(error) && onRetry;

  const sizeClasses = {
    sm: "py-4 text-sm",
    md: "py-8 text-base",
    lg: "py-12 text-lg",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${sizeClasses[size]}`}
    >
      {showIcon && <AlertTriangle className="mb-4 h-8 w-8 text-orange-500" />}

      <p className="mb-4 max-w-md text-gray-600 dark:text-gray-400">
        {message}
      </p>

      {canRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </Button>
      )}
    </div>
  );
}

export function ErrorStateInline({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry?: () => void;
}) {
  const message = getErrorMessage(error);
  const canRetry = isRetryableError(error) && onRetry;

  return (
    <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 text-sm dark:border-red-800 dark:bg-red-900/20">
      <span className="text-red-700 dark:text-red-300">{message}</span>
      {canRetry && (
        <Button
          onClick={onRetry}
          variant="ghost"
          size="sm"
          className="h-auto p-1 text-red-600 hover:text-red-700 dark:text-red-400"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
