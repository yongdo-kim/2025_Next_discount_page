"use client";
import { container } from "@/lib/di/dependencies";
import { useEffect } from "react";
import { useUserStore } from "@/features/users/presentation/store/user.store";

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
