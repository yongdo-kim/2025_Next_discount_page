export const categoryKeys = {
  all: ["categories", null, null] as const,
  detail: (id: number | null, limit: number | null) =>
    ["categories", id, limit] as const,
  banners: ["categories", "banners"] as const,
};
