// components/error-boundary/ErrorBoundary.tsx
"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorFallback } from "./ErrorFallback";

interface Props {
  children: ReactNode;
  fallback?:
    | ReactNode
    | ((props: {
        error: Error | null;
        resetErrorBoundary: () => void;
      }) => ReactNode);
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      const fallback = this.props.fallback;
      return fallback ? (
        typeof fallback === "function" ? (
          (
            fallback as (props: {
              error: Error | null;
              resetErrorBoundary: () => void;
            }) => ReactNode
          )({
            error: this.state.error,
            resetErrorBoundary: this.resetErrorBoundary,
          })
        ) : (
          fallback
        )
      ) : (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}
