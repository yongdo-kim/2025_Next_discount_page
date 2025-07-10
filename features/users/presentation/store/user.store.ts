import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { create } from "zustand";

interface UserState {
  user: UserEntity | null;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  setUser: (user: UserEntity | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  userId: null,
  setUser: (user) => set({ user }),
  setUserId: (userId) => set({ userId }),
  clearUser: () => set({ user: null, userId: null }),
}));
