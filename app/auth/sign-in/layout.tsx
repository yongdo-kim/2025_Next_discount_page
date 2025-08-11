"use client";

import dynamic from "next/dynamic";

const DynamicAuthProvider = dynamic(
  () => import("@/components/providers/AuthProvider").then(mod => ({
    default: mod.AuthProvider
  })),
  { 
    ssr: false,
    loading: () => null,
  }
);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicAuthProvider>
      {children}
    </DynamicAuthProvider>
  );
}