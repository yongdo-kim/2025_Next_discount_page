import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";

export const DiscountPreview = ({ discount }: { discount: DiscountEntity }) => {
  return <div>{discount.title}</div>;
};
