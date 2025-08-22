type ImageOverlayProps = {
  title: string;
  subtitle: string;
  isLarge?: boolean;
};

export const ImageOverlay = ({
  title,
  subtitle,
  isLarge = false,
}: ImageOverlayProps) => {
  const overlayHeight = isLarge ? "h-16" : "h-8";
  const textSize = isLarge ? "text-3xl" : "text-md";
  const padding = isLarge ? "p-3" : "p-1";

  return (
    <>
      <div
        className={`absolute bottom-0 left-0 ${overlayHeight} w-full bg-black/40`}
      />
      <div
        className={`absolute bottom-0 left-0 w-full truncate ${padding} ${textSize} font-bold text-white`}
      >
        <span className="truncate">{title}</span>
        <span className={isLarge ? "pl-2" : "pl-1"}>{subtitle}</span>
      </div>
    </>
  );
};
