interface PostProps {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PostEntity {
  public readonly id: string;
  public title: string;
  public content: string;
  public readonly authorId: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor({
    id,
    title,
    content,
    authorId,
    createdAt,
    updatedAt,
  }: PostProps) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // copyWith 메서드 수정
  copyWith(partial: Partial<PostProps>): PostEntity {
    return new PostEntity({
      id: this.id, // 변경 불가
      title: partial.title ?? this.title,
      content: partial.content ?? this.content,
      authorId: this.authorId, // 변경 불가
      createdAt: this.createdAt, // 변경 불가
      updatedAt: partial.updatedAt ?? this.updatedAt,
    });
  }
}
