export default function MainTitle({
  title,
  coloredTitle,
  color,
}: {
  title: string;
  coloredTitle: string;
  color: string;
}) {
  return (
    <div className="flex pb-2 text-xl font-bold md:text-2xl lg:text-3xl">
      <div>{title}</div>
      <div className={`px-2 ${color}`}> {coloredTitle}</div>
    </div>
  );
}
