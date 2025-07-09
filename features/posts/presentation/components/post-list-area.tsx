import MainTitle from "@/components/main-title";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import PostListItem from "@/features/posts/presentation/components/post-list-item";


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
    <div className="max-w-screen-xl mx-auto">
      <MainTitle title={name} coloredTitle="" className="p-4" />
      <div className="mx-6 flex flex-col space-y-4 mt-4">
        {previews?.map((preview) => (
          <PostListItem key={preview.id} post={preview} />
        ))}
      </div>
    </div>
  );
}
