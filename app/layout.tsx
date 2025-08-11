import "@/assets/styles/globals.css";
import GoogleAdsenseScript from "@/components/analytics/GoogleAdsenseScript";
import NavBar from "@/components/navbar/NavBar";
import { getUserFromCookies } from "@/lib/auth/getUserFromCookies";
import { createBaseMetadata } from "@/lib/metadata/base-metadata";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./provider";
import LazyFooterBox from "@/components/footer/LazyFooterBox";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true, // 폰트 크기 조정으로 레이아웃 시프트 방지
});
export const metadata = createBaseMetadata();
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 서버에서 미리 인증 유저 정보 가져오기
  const user = await getUserFromCookies();

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <GoogleAdsenseScript />
      </head>
      <body
        className={cn(inter.className, "flex min-h-screen flex-col bg-white antialiased dark:bg-neutral-900")}
      >
        <Providers>
          <NavBar ssrUser={user} />
          <main className="flex flex-1 flex-col">{children}</main>
          <LazyFooterBox />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
