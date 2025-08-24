"use client";
import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { isClientError } from "@/lib/error-handler";
import { ReactNode } from "react";

// title을 케밥케이스로 변환하는 유틸 함수
const kebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // 공백을 대시로
    .replace(/[^a-z0-9가-힣-]/g, "") // 특수문자 제거 (한글 포함)
    .replace(/-+/g, "-") // 연속 대시 정리
    .replace(/^-|-$/g, ""); // 앞뒤 대시 제거
};

type ListSectionProps<T> = {
  title: string;
  icon: ReactNode;
  data: T[] | undefined;
  error: unknown;
  isError: boolean;
  refetch: () => void;
  renderItem: (item: T) => ReactNode;
  getItemKey: (item: T) => string | number;
};

export function MainListSection<T>({
  title,
  icon,
  data,
  error,
  isError,
  refetch,
  renderItem,
  getItemKey,
}: ListSectionProps<T>) {
  const hasData = data && data.length > 0;
  const titleKebab = kebabCase(title);

  return (
    <section
      className="py-6 lg:py-8"
      data-testid={`main-list-section-${titleKebab}`}
    >
      <div
        className={`flex justify-between px-4 ${hasData ? "pb-3" : "pb-4 md:pb-8"}`}
      >
        <MainTitle title={title} icon={icon} />
      </div>

      {isError && isClientError(error) && (
        <ErrorState error={error} onRetry={refetch} size="sm" />
      )}

      {hasData && (
        <ul
          className="lg:px-4"
          data-testid={`main-list-container-${titleKebab}`}
        >
          {data.map((item) => {
            if (!item) return null;
            return (
              <li
                className="list-none pl-4"
                key={getItemKey(item)}
                data-testid={`main-list-item-${titleKebab}`}
              >
                {renderItem(item)}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
