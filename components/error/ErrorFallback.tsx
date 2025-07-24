// components/error-boundary/ErrorFallback.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorFallbackProps {
  error: Error | null;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Alert className="max-w-md" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>문제가 발생했습니다</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>{error?.message || "알 수 없는 오류가 발생했습니다."}</p>
          <Button
            variant="outline"
            onClick={resetErrorBoundary}
            className="mt-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            다시 시도
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
