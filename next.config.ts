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
export default bundleAnalyzer(nextConfig);
