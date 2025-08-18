"use client";
import { ReactNode } from "react";
import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { isClientError } from "@/lib/error-handler";

interface ListSectionProps<T> {
  title: string;
  icon: ReactNode;
  data: T[] | undefined;
  error: unknown;
  isError: boolean;
  refetch: () => void;
  renderItem: (item: T) => ReactNode;
  getItemKey: (item: T) => string | number;
}

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

  return (
    <section className="pt-4 pb-2 md:pb-8">
      <div
        className={`flex justify-between px-4 ${hasData ? "pb-3" : "pb-4 md:pb-8"}`}
      >
        <MainTitle title={title} icon={icon} />
      </div>

      {isError && isClientError(error) && (
        <ErrorState error={error} onRetry={refetch} size="sm" />
      )}

      {hasData && (
        <ul className="px-4">
          {data.map((item) => {
            if (!item) return null;
            return (
              <li className="list-none" key={getItemKey(item)}>
                {renderItem(item)}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
