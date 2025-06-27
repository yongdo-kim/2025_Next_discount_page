import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "encrypted-tbn3.gstatic.com",
      "images.unsplash.com",
      "randomuser.me",
      "nari-s3.s3.us-east-1.amazonaws.com",
      "localhost",
    ],
  },
};

export default nextConfig;
