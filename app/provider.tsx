"use client";

import { Toaster } from "@/components/ui/sonner";
import { RefreshTokenEffect } from "@/features/auth/presentation/hooks/useRefreshToken";
import { GOOGLE_CLIENT_ID } from "@/lib/constants";
import { queryClient } from "@/lib/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";


const ReactQueryDevtools = dynamic(
  () => import("@tanstack/react-query-devtools").then((mod) => ({
    default: mod.ReactQueryDevtools,
  })),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      <QueryClientProvider client={queryClient}>
        <RefreshTokenEffect />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        </ThemeProvider>
        <Toaster />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
