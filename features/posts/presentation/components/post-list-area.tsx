import MainTitle from "@/components/MainTitle";
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
    <>
      <MainTitle title={name} coloredTitle="" className="p-4" />
      <div className="mx-6 mt-4 flex flex-col space-y-4">
        {previews?.map((preview) => (
          <PostListItem key={preview.id} post={preview} />
        ))}
      </div>
    </>
  );
}
