import { useQuery } from "@tanstack/react-query";
import { container } from "@/lib/di/dependencies";
import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";

export function useMe() {
  return useQuery({
    queryKey: usersKeys.me,
    queryFn: () => container.userService.getMe(),
  });
}
