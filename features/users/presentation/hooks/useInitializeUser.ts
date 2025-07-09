"use client";
import { container } from "@/lib/di/dependencies";
import { useEffect } from "react";
import { useUserStore } from "@/features/users/presentation/store/user.store";
import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";

export function useInitializeUser() {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    container.userService.getMe()
      .then(setUser)
      .catch(()=>{
        console.log("user not found");
        return setUser(null)
      });
  }, [setUser]);
}

export function useMe() {
  return useQuery({
    queryKey: usersKeys.me,
    queryFn: () => container.userService.getMe(),
  });
}