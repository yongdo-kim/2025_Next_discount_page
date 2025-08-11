"use client";

import { GOOGLE_CLIENT_ID } from "@/lib/constants";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RefreshTokenEffect } from "@/features/auth/presentation/hooks/useRefreshToken";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      <RefreshTokenEffect />
      {children}
    </GoogleOAuthProvider>
  );
}