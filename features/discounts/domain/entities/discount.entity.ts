interface DiscountProps {
  id: number;
  title: string;
  description?: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  imageUrl?: string;
  storeUrl: string;
  storeName: string;
  categoryId?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class DiscountEntity {
  public readonly id: number;
  public readonly title: string;
  public readonly description?: string;
  public readonly originalPrice: number;
  public readonly discountedPrice: number;
  public readonly discountRate: number;
  public readonly imageUrl?: string;
  public readonly storeUrl: string;
  public readonly storeName: string;
  public readonly categoryId?: number;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor({
    id,
    title,
    description,
    originalPrice,
    discountedPrice,
    discountRate,
    imageUrl,
    storeUrl,
    storeName,
    categoryId,
    isActive,
    createdAt,
    updatedAt,
  }: DiscountProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.originalPrice = originalPrice;
    this.discountedPrice = discountedPrice;
    this.discountRate = discountRate;
    this.imageUrl = imageUrl;
    this.storeUrl = storeUrl;
    this.storeName = storeName;
    this.categoryId = categoryId;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get savings(): number {
    return this.originalPrice - this.discountedPrice;
  }
}
