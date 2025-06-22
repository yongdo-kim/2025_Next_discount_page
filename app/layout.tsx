import "@/assets/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import {
  APP_DESCRIPTION,
  APP_NAME,
  IS_DEVMODE,
  SERVER_URL,
} from "@/lib/constants";
import { DIContext } from "@/lib/di/container";
import { dependencies } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <DIContext.Provider value={dependencies}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
            {IS_DEVMODE && <ReactQueryDevtools />}
          </QueryClientProvider>
        </DIContext.Provider>
      </body>
    </html>
  );
}
