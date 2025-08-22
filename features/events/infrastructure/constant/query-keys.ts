export const eventKeys = {
  all: ["events"] as const,
  active: ["events", "active"] as const,
  detail: (id: number) => ["events", id] as const,
  list: (query?: string) => ["events", "list", query] as const,
  upcoming: (limit?: number) => ["events", "upcoming", limit] as const,
  latest: (limit?: number) => ["events", "latest", limit] as const,
  byCategory: (categoryId: string, limit?: number) =>
    ["events", "category", categoryId, limit] as const,
} as const;
