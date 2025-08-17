export const categoryKeys = {
  all: ["categories"] as const,
  postPreviews: (id: number | null, limit: number | null) =>
    ["categories", id, limit] as const,
  banners: ["categories", "banners"] as const,
  infinite: ["categories", "infinite"] as const,
} as const;
