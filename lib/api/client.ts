import { API_BASE_URL } from "../constants";

export const apiClient = {
  get: async (url: string, query?: string, options?: RequestInit) => {
    const response = await fetch(`${API_BASE_URL}${url}${query}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
