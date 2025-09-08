"use client";

import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Toaster } from "@/components/shadcn/sonner";
import { queryClient } from "@/lib/react-query";
import { captureException } from "@sentry/nextjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
const DynamicClarityScript = dynamic(
  () => import("@/components/analytics/ClarityScript"),
  {
    ssr: false,
    loading: () => null,
  },
);

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () =>
          import("@tanstack/react-query-devtools").then((mod) => ({
            default: mod.ReactQueryDevtools,
          })),
        { ssr: false },
      )
    : null;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <RefreshTokenEffect /> */}
      <ErrorBoundary onError={(error) => captureException(error)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <DynamicClarityScript />
          {ReactQueryDevtools && <ReactQueryDevtools />}
        </ThemeProvider>
      </ErrorBoundary>
      <Toaster />
    </QueryClientProvider>
  );
}
