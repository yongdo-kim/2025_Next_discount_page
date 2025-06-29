"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { categoryKeys } from "../../infrastructure/contstant/query-keys";

export const useFetchCategories = () => {
  return useQuery<CategoryEntity[]>({
    queryKey: [categoryKeys.all],
    queryFn: () => container.categoryService.getCategories(),
    throwOnError: true, //에러바운더리에 연락
  });
};
