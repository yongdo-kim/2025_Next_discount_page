interface DiscountPostProps {
  id: number;
  title: string;
  createdAt: Date;
  views: number;
  postImages: string[];
}

export class DiscountPostEntity {
  public readonly id: number;
  public readonly title: string;
  public readonly createdAt: Date;
  public readonly views: number;
  public readonly postImages: string[];

  constructor({ id, title, createdAt, views, postImages }: DiscountPostProps) {
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

export interface DiscountByPlatformProps {
  kakao: DiscountPostEntity[];
  coupang: DiscountPostEntity[];
  naver: DiscountPostEntity[];
  ohouse: DiscountPostEntity[];
  gmarket: DiscountPostEntity[];
}

export class DiscountByPlatformEntity {
  public readonly kakao: DiscountPostEntity[];
  public readonly coupang: DiscountPostEntity[];
  public readonly naver: DiscountPostEntity[];
  public readonly ohouse: DiscountPostEntity[];
  public readonly gmarket: DiscountPostEntity[];

  constructor({
    kakao,
    coupang,
    naver,
    ohouse,
    gmarket,
  }: DiscountByPlatformProps) {
    this.kakao = kakao;
    this.coupang = coupang;
    this.naver = naver;
    this.ohouse = ohouse;
    this.gmarket = gmarket;
  }

  get allPosts(): DiscountPostEntity[] {
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
    platform: keyof DiscountByPlatformProps,
  ): DiscountPostEntity[] {
    return this[platform];
  }
}
