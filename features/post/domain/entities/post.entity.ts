import { UserEntity } from "@/features/user/domain/entities/user.entity";

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
  imageUrls: string[];
  likesCount: number;
  isLikedByMe: boolean;
  isMine: boolean;
  isReportedByMe: boolean;
  isBlurredByAI: boolean;
  isBlockedByMe: boolean;
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
  public readonly imageUrls: string[];
  public readonly likesCount: number;
  public readonly isLikedByMe: boolean;
  public readonly isMine: boolean;
  public readonly isReportedByMe: boolean;
  public readonly isBlurredByAI: boolean;
  public readonly isBlockedByMe: boolean;

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
    this.imageUrls = props.imageUrls;
    this.likesCount = props.likesCount;
    this.isLikedByMe = props.isLikedByMe;
    this.isMine = props.isMine;
    this.isReportedByMe = props.isReportedByMe;
    this.isBlurredByAI = props.isBlurredByAI;
    this.isBlockedByMe = props.isBlockedByMe;
  }
}
