import { authApi } from "@/features/auth/infrastructure/api/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useDevLogin = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      // In test environment, mock the login success
      if (process.env.NEXT_PUBLIC_ENV === "test") {
        // Simulate successful login with mock tokens
        document.cookie = "accessToken=mock-access-token; path=/";
        document.cookie = "refreshToken=mock-refresh-token; path=/";
        return Promise.resolve({ success: true });
      }

      // In non-test environments, use real API
      return authApi.generateDevTokens();
    },
    onSuccess: () => {
      window.location.replace("/");
    },
    onError: (error) => {
      console.error("Dev login failed:", error);
    },
  });

  return mutation;
};
