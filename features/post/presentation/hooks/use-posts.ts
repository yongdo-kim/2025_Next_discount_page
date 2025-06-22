import { useDIContainer } from "@/lib/di/container";
import { useQuery } from "@tanstack/react-query";
import { PostEntity } from "../../domain/entities/post.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export const usePosts = () => {
  const {
    post: { postService },
  } = useDIContainer();

  return useQuery<PostEntity[]>({
    queryKey: [postKeys.all],
    queryFn: postService.getPostList,
    throwOnError: true, //에러바운더리에 연락
  });
};
