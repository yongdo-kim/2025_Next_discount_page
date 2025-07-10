"use client";

import { Toaster } from "@/components/ui/sonner";
import { useRefreshToken } from "@/features/auth/presentation/hooks/useRefreshToken";
import { GOOGLE_CLIENT_ID } from "@/lib/constants";
import { queryClient } from "@/lib/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

// 반드시 훅을 컴포넌트로 래핑해서 사용해야 React 규칙 위반이 발생하지 않습니다.
function UserInitializer() {
  //useInitializeUser();
  console.log("UserInitializer");
  useRefreshToken();
  return null;
}

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
          <UserInitializer />
          {children}

          {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        </ThemeProvider>
        <Toaster />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
