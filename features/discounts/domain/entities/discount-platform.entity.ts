interface DiscountPlatformPreviewProps {
  id: number;
  title: string;
  createdAt: Date;
  views: number;
  postImages: string[];
}

export class DiscountPlatformPreviewEntity {
  public readonly id: number;
  public readonly title: string;
  public readonly createdAt: Date;
  public readonly views: number;
  public readonly postImages: string[];

  constructor({
    id,
    title,
    createdAt,
    views,
    postImages,
  }: DiscountPlatformPreviewProps) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.views = views;
    this.postImages = postImages;
  }

  get mainImage(): string | null {
    return this.postImages.length > 0 ? this.postImages[0] : null;
  }

  get hasMultipleImages(): boolean {
    return this.postImages.length > 1;
  }
}

export interface DiscountPlatformGroupProps {
  kakao: DiscountPlatformPreviewEntity[];
  coupang: DiscountPlatformPreviewEntity[];
  naver: DiscountPlatformPreviewEntity[];
  ohouse: DiscountPlatformPreviewEntity[];
  gmarket: DiscountPlatformPreviewEntity[];
}

export class DiscountPlatformGroup {
  public readonly kakao: DiscountPlatformPreviewEntity[];
  public readonly coupang: DiscountPlatformPreviewEntity[];
  public readonly naver: DiscountPlatformPreviewEntity[];
  public readonly ohouse: DiscountPlatformPreviewEntity[];
  public readonly gmarket: DiscountPlatformPreviewEntity[];

  constructor({
    kakao,
    coupang,
    naver,
    ohouse,
    gmarket,
  }: DiscountPlatformGroupProps) {
    this.kakao = kakao;
    this.coupang = coupang;
    this.naver = naver;
    this.ohouse = ohouse;
    this.gmarket = gmarket;
  }

  get allPosts(): DiscountPlatformPreviewEntity[] {
    return [
      ...this.kakao,
      ...this.coupang,
      ...this.naver,
      ...this.ohouse,
      ...this.gmarket,
    ];
  }

  get totalPostsCount(): number {
    return this.allPosts.length;
  }

  getPostsByPlatform(
    platform: keyof DiscountPlatformGroupProps,
  ): DiscountPlatformPreviewEntity[] {
    return this[platform];
  }
}
