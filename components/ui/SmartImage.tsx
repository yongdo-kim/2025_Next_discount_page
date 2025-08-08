import Image, { ImageProps } from "next/image";
import React from "react";

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
  // 모든 도메인을 허용하므로 항상 Next.js Image 최적화 사용
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
};

export default SmartImage;
