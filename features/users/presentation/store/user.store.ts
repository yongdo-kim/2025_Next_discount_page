import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { create } from "zustand";

interface UserState {
  user: UserEntity | null;
  setUser: (user: UserEntity | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
