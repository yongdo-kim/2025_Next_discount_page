import Image from "next/image";
import { PostEntity } from "../../domain/entities/post.entity";

export const PostPreviewItem = ({ post }: { post: PostEntity }) => {
  return (
    <>
      <Image
        src={post.imageUrl || ""}
        alt={post.title}
        width={200}
        height={200}
      />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </>
  );
};
