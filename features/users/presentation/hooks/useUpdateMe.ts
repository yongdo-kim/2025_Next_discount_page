import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { UserUpdateReqDto } from "@/features/users/infrastructure/dto/user-update.req.dto";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export function useUpdateMe() {
  return useMutation({
    mutationKey: [usersKeys.me],
    mutationFn: (data: UserUpdateReqDto) =>
      container.userService.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.me });
    },
  });
}
