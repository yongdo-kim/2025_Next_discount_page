import { PostCategory } from "@/features/post/domain/types";

export interface GetPostPreviewsReqDto {
  category: PostCategory;
  limit?: number;
}
