import { PostSourceEntity } from "@/features/posts/domain/entities/post-source.entity";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";


export interface PostProps {
  id: number;
  title: string;
  content: string;
  author: UserEntity;
  commentsCount: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  viewsCount: number;
  imageUrl: string;
  likesCount: number;
  isLikedByMe: boolean;
  isMine: boolean;
  isReportedByMe: boolean;
  isBlurredByAI: boolean;
  isBlockedByMe: boolean;
  tags: TagEntity[];
  source: PostSourceEntity;
}

export class PostEntity {
  public readonly id: number;
  public title: string;
  public content: string;
  public readonly author: UserEntity;
  public readonly commentsCount: number;
  public readonly createdAt: string;
  public readonly updatedAt: string | null;
  public readonly deletedAt: string | null;
  public readonly viewsCount: number;
  public readonly imageUrl: string;
  public readonly likesCount: number;
  public readonly isLikedByMe: boolean;
  public readonly isMine: boolean;
  public readonly isReportedByMe: boolean;
  public readonly isBlurredByAI: boolean;
  public readonly isBlockedByMe: boolean;
  public readonly tags: TagEntity[];
  public readonly source: PostSourceEntity;

  constructor(props: PostProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.author = props.author;
    this.commentsCount = props.commentsCount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.viewsCount = props.viewsCount;
    this.imageUrl = props.imageUrl;
    this.likesCount = props.likesCount;
    this.isLikedByMe = props.isLikedByMe;
    this.isMine = props.isMine;
    this.isReportedByMe = props.isReportedByMe;
    this.isBlurredByAI = props.isBlurredByAI;
    this.isBlockedByMe = props.isBlockedByMe;
    this.tags = props.tags;
    this.source = props.source;
  }
}
