export const usersKeys = {
  me: ["users", "me"] as const,
  likedPosts: (limit?: number) =>
    ["users", "me", "liked-posts", { limit }] as const,
};
