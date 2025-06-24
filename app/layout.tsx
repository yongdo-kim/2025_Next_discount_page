import "@/assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white antialiased dark:bg-neutral-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
