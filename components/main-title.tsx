export default function MainTitle({
    title,
    coloredTitle,
    color,
    className, // 추가
  }: {
    title: string;
    coloredTitle: string;
    color?: string;
    className?: string; // 추가
  }) {
    return (
      <div className={`flex pb-2 text-xl font-bold md:text-2xl lg:text-3xl ${className ?? ""}`}>
        <div>{title}</div>
        <div className={`px-2 ${color}`}> {coloredTitle}</div>
      </div>
    );
  }