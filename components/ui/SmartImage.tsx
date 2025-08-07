/* eslint-disable @next/next/no-img-element */
import Image, { ImageProps } from "next/image";
import React from "react";

// next.config.ts의 images.domains와 반드시 일치해야 함
const allowedDomains = [
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
];

function isAllowedDomain(url: string) {
  try {
    const { hostname } = new URL(url);
    return allowedDomains.includes(hostname);
  } catch {
    return false;
  }
}

interface SmartImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "width" | "height" | "loading"
  > {
  src: string;
  width: number;
  height: number;
  alt: string; // alt는 필수로 강제
  priority?: boolean;
  imageProps?: Omit<ImageProps, "src" | "width" | "height" | "alt">;
}

const SmartImage: React.FC<SmartImageProps> = ({
  src,
  width,
  height,
  alt,
  priority = false,
  imageProps,
  ...rest
}) => {
  if (isAllowedDomain(src)) {
    return (
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        {...imageProps}
        {...rest}
      />
    );
  }
  return (
    <img 
      src={src} 
      width={width} 
      height={height} 
      alt={alt} 
      loading={priority ? "eager" : "lazy"}
      {...rest} 
    />
  );
};

export default SmartImage;
