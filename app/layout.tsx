import "@/assets/styles/globals.css";
import ClarityScript from "@/components/analytics/ClarityScript";
import Footer from "@/components/footer/Footer";
import GoogleAdsenseScript from "@/components/analytics/GoogleAdsenseScript";
import NavBar from "@/components/navbar/NavBar";
import { getUserFromCookies } from "@/lib/auth/getUserFromCookies";
import { createBaseMetadata } from "@/lib/metadata/base-metadata";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata = createBaseMetadata();
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        <GoogleAdsenseScript />
      </head>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-white antialiased dark:bg-neutral-900`}
      >
        {/* 기능적인 측면 */}
        <ClarityScript />
        {/* UI 측면 */}
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
