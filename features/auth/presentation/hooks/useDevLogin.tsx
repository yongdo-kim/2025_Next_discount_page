import { authApi } from "@/features/auth/infrastructure/api/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useDevLogin = () => {
  const mutation = useMutation({
    mutationFn: authApi.generateDevTokens,
    onSuccess: () => {
      window.location.replace("/");
    },
    onError: (error) => {
      console.error("Dev login failed:", error);
    },
  });

  return mutation;
};
