import { withSentryConfig } from "@sentry/nextjs";
import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.lotteeatz.com",
      "i.ytimg.com",
      "shared.fastly.steamstatic.com",
      "st.kakaocdn.net",
      "/common/image/masterpage/preview-thumbnail.png",
      "i2.ruliweb.com",
      "image3.compuzone.co.kr",
      "hpsimg.gsretail.com",
      "www.jp.square-enix.com",
      "res.kurly.com",
      "d2x8kymwjom7h7.cloudfront.net",
      "www.gamewoori.com",
      "daewonshop.cdn-nhncommerce.com",
      "campaign-cdn.pstatic.net",
      "images.ctfassets.net",
      "img.ruliweb.com",
      "shared.akamai.steamstatic.com",
      "financial.pstatic.net",
      "images.unsplash.com",
      "contents.lotteon.com",
      "i1.ruliweb.com",
      "cdn-ao.adison.co",
      "ae01.alicdn.com",
      "cdn.akamai.steamstatic.com",
      "store.nintendo.co.kr",
      "directg.net",
    ],
  },
};

// TypeScript 환경에서 export default 유지
export default withSentryConfig(bundleAnalyzer(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "nari-studio",
  project: "discount",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
