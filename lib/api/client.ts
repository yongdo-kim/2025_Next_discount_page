import { API_BASE_URL } from "../constants";

export const apiClient = {
  get: async (url: string, query?: string, options?: RequestInit) => {
    let fullUrl = `${API_BASE_URL}${url}`;
    if (query && query.trim() !== "") {
      // query가 이미 ?로 시작하는지 확인 (ex: '?a=1')
      fullUrl +=
        query.startsWith("?") || query.startsWith("&") ? query : `?${query}`;
    }
    const defaultHeaders = {
      "Content-Type": "application/json",
      "x-client-id": "web",
    };
    const mergedOptions: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options && options.headers ? options.headers : {}),
      },
      credentials: "include",
    };
    const response = await fetch(fullUrl, mergedOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
