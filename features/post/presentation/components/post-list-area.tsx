import MainTitle from "@/components/main-title";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import PostListItem from "./post-list-item";

export default function PostListArea({
  previews,
}: {
  previews: PostPreviewEntity[];
}) {
  let name = "";
  if (previews?.length > 0) {
    name = previews?.[0].category.name;
  }

  return (
    <div>
      <MainTitle title={name} coloredTitle="" className="px-4 pb-4" />
      <div className="mx-6 flex flex-col space-y-4">
        {previews?.map((preview) => (
          <PostListItem key={preview.id} post={preview} />
        ))}
      </div>
    </div>
  );
}
