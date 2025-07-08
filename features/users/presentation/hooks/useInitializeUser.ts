"use client";
import { container } from "@/lib/di/dependencies";
import { useEffect } from "react";
import { useUserStore } from "../store/user.store";

export function useInitializeUser() {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    container.userService.getMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, [setUser]);
}
