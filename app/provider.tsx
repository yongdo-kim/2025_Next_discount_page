"use client";

import { Toaster } from "@/components/ui/sonner";
import { GOOGLE_CLIENT_ID } from "@/lib/constants";
import { queryClient } from "@/lib/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      <QueryClientProvider client={queryClient}>
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
