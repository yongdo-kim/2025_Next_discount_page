import { API_BASE_URL } from "../constants";

//헤더
const defaultHeaders = {
  "Content-Type": "application/json",
  "x-client-id": "web",
};

// fetch 공통 함수
async function request(
  method: string,
  url: string,
  {
    query,
    body,
    options,
  }: { query?: string; body?: unknown; options?: RequestInit } = {},
) {
  let fullUrl = `${API_BASE_URL}${url}`;
  if (query && query.trim() !== "") {
    fullUrl +=
      query.startsWith("?") || query.startsWith("&") ? query : `?${query}`;
  }

  const mergedOptions: RequestInit = {
    method,
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options && options.headers ? options.headers : {}),
    },
    credentials: "include",
  };

  if (body !== undefined && method !== "GET") {
    mergedOptions.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, mergedOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // DELETE 요청은 보통 응답이 empty일 수 있으니, 처리
  if (response.status === 204) return null;
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export const apiClient = {
  get: (url: string, query?: string, options?: RequestInit) =>
    request("GET", url, { query, options }),
  post: (url: string, body?: unknown, options?: RequestInit) =>
    request("POST", url, { body, options }),
  put: (url: string, body?: unknown, options?: RequestInit) =>
    request("PUT", url, { body, options }),
  delete: (url: string, body?: unknown, options?: RequestInit) =>
    request("DELETE", url, { body, options }),
};
