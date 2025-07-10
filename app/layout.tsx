import "@/assets/styles/globals.css";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/navbar/nav-bar";
import { APP_DESCRIPTION, APP_NAME, ENV, SERVER_URL } from "@/lib/constants";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { Providers } from "./provider";
// 개발 환경에서만 why-did-you-render 활성화
if (typeof window !== "undefined" && ENV === "development") {
  import("../why-did-you-render");
  import("react-render-visualizer").then((module) => {
    module.default();
  });
}

//폰트
const inter = Inter({ subsets: ["latin"] });

//브라우져 탭 이름 변경
export const metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
  icons: {
    icon: "/favicon.ico",
  },
};

function ClarityAnalyticsScript() {
  if (ENV !== "production") return null;
  return (
    <Script id="clarity-analytics" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "sa0b71ttyt");
      `}
    </Script>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-white antialiased dark:bg-neutral-900`}
      >
        {/* Clarity Analytics 스크립트 */}
        <ClarityAnalyticsScript />
        {/* Google AdSense 스크립트 */}
        {/* <Script
          id="adsbygoogle"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2398130378795170"
          crossOrigin="anonymous"
        /> */}
        <Providers>
          <NavBar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
