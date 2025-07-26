import "@/assets/styles/globals.css";
import NavBar from "@/components/navbar/NavBar";
import { getUserFromCookies } from "@/lib/auth/getUserFromCookies";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./provider";
import Footer from "@/components/footer/footer";
import { createBaseMetadata } from "@/lib/metadata/base-metadata";
import ClarityScript from "@/components/analytics/ClarityScript";
import GoogleAdsenseScript from "@/components/analytics/GoogleAdsenseScript";

// 폰트 설정
const inter = Inter({ subsets: ["latin"] });

// 메타데이터 설정
export const metadata = createBaseMetadata();

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
        <GoogleAdsenseScript />
      </head>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-white antialiased dark:bg-neutral-900`}
      >
        {/* Analytics Scripts */}
        <ClarityScript />

        {/* App Layout */}
        <Providers>
          <NavBar ssrUser={user} />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
