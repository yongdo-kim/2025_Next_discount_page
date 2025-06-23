import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { PostEntity } from "../../domain/entities/post.entity";

export const PostPreviewItem = ({ post }: { post: PostEntity }) => {
  return (
    <Card className="px-4 py-4 cursor-pointer hover:bg-accent">
      <Badge variant="outline" className="text-xs my-0">
        Tag
      </Badge>
      <Image
        src={post.imageUrl || ""}
        className="rounded-xl aspect-video w-full"
        alt={post.title}
        width={400}
        height={200}
      />
      <CardHeader className="px-2">
        <CardTitle>{post.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {post.content}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
