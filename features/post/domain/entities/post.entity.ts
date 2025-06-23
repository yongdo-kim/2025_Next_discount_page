import { TagEntity } from "@/features/tag/domain/entities/post.entity";
import { UserEntity } from "@/features/user/domain/entities/user.entity";

//태그도
interface PostProps {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  user: UserEntity;
  tags: TagEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export class PostEntity {
  public readonly id: string;
  public title: string;
  public content: string;
  public readonly imageUrl: string;
  public readonly user: UserEntity;
  public readonly tags: TagEntity[];
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({
    id,
    title,
    content,
    createdAt,
    updatedAt,
    imageUrl,
    user,
    tags,
  }: PostProps) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.imageUrl = imageUrl;
    this.user = user;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.tags = tags;
  }
}
