"use client";
import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { isClientError } from "@/lib/error-handler";
import { ReactNode } from "react";

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
    <section className="py-6 lg:py-8">
      <div
        className={`flex justify-between px-4 ${hasData ? "pb-3" : "pb-4 md:pb-8"}`}
      >
        <MainTitle title={title} icon={icon} />
      </div>

      {isError && isClientError(error) && (
        <ErrorState error={error} onRetry={refetch} size="sm" />
      )}

      {hasData && (
        <ul className="lg:px-4">
          {data.map((item) => {
            if (!item) return null;
            return (
              <li className="list-none pl-4" key={getItemKey(item)}>
                {renderItem(item)}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
