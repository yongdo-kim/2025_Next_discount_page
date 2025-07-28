"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";

export const useFetchCategories = () => {
  return useQuery<CategoryEntity[]>({
    queryKey: [categoryKeys.all],
    queryFn: () => container.categoryService.getCategories(),
  });
};
