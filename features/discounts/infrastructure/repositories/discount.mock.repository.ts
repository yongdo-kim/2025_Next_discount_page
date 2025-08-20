import {
  DiscountPlatformGroup,
  DiscountPlatformPreviewEntity,
} from "@/features/discounts/domain/entities/discount-platform.entity";
import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";

export class MockDiscountRepository implements DiscountRepository {
  //더미데이터
  private mockDiscounts = [
    new DiscountEntity({
      id: 1,
      title: "[쿠팡] 스마트폰 할인 특가",
      description: "최신 스마트폰 특가 할인",
      originalPrice: 500000,
      discountedPrice: 400000,
      discountRate: 20,
      imageUrl: "https://example.com/phone.jpg",
      storeUrl: "https://coupang.com",
      storeName: "쿠팡",
      categoryId: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new DiscountEntity({
      id: 2,
      title: "[11번가] 노트북 특가",
      description: "게이밍 노트북 할인",
      originalPrice: 1000000,
      discountedPrice: 800000,
      discountRate: 20,
      imageUrl: "https://example.com/laptop.jpg",
      storeUrl: "https://11st.co.kr",
      storeName: "11번가",
      categoryId: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  private mockKakaoPlatformPosts = [
    new DiscountPlatformPreviewEntity({
      id: 271,
      title: "[카카오]국내산 미숫가루 500g x 3팩 (11,900원 / 무배)",
      createdAt: new Date("2025-08-16T11:40:28.322Z"),
      views: 11,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816180107_rt7g7O8MXb.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 266,
      title:
        "[카카오]부드러운 광양 돼지 왕구이(목전지) 600g 2팩+2팩(총2.4kg) (18,900원/무배)",
      createdAt: new Date("2025-08-16T11:40:28.311Z"),
      views: 17,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816184323_GxNu4Nx2kw.jpg",
      ],
    }),
  ];

  private mockCoupangPlatformPosts = [
    new DiscountPlatformPreviewEntity({
      id: 568,
      title: "[쿠팡]불닭 소스, 200g, 2개 (4,880/와우무료)",
      createdAt: new Date("2025-08-19T04:14:00.273Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0819/20250819114739_iV95yfCuEc.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 560,
      title: "[쿠팡]다용도 이어폰 케이블 보관 파우치 (6,430원/무배)",
      createdAt: new Date("2025-08-19T04:14:00.236Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0819/20250819125818_wUO5dMq0Mh.jpeg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 272,
      title: "[쿠팡]오뚜기 참깨라면 컵 110g, 1개 (980원/와우무료)",
      createdAt: new Date("2025-08-16T11:40:28.325Z"),
      views: 14,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816175339_wlSqUdjbD1.png",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 265,
      title: "[쿠팡]스포츠패스 우리카드 결제시 5천원 캐시백[9900원/무료]",
      createdAt: new Date("2025-08-16T11:40:28.309Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816185116_Zb0lhK6gs5.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 258,
      title: "[쿠팡]부착형 아크릴거울 (6,500원/와우무료)",
      createdAt: new Date("2025-08-16T11:40:28.286Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816195759_K09xwOND3W.jpeg",
      ],
    }),
  ];

  private mockNaverPlatformPosts = [
    new DiscountPlatformPreviewEntity({
      id: 576,
      title: "[네이버]참프레 순살킥 3종 340g 3팩 (15,940원/무료)",
      createdAt: new Date("2025-08-19T04:14:00.336Z"),
      views: 21,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0819/20250819110627_YqQ1NmhLSl.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 574,
      title:
        "[네이버]오늘끝딜 규조토 발매트 빨아쓰는 욕실 화장실 주방 매트 1+1 (5,900원/무료)",
      createdAt: new Date("2025-08-19T04:14:00.330Z"),
      views: 24,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0819/20250819110854_5Zou5bOyZO.png",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 573,
      title:
        "[네이버]올챌린지 천연펄프 두루마리화장지 3겹 30m 30롤 (9,900원/무배)",
      createdAt: new Date("2025-08-19T04:14:00.328Z"),
      views: 24,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0819/20250819110938_NwAHbwpu69.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 563,
      title: "[네이버]전자담배 액상 (2,900/2,500)",
      createdAt: new Date("2025-08-19T04:14:00.254Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0819/20250819124627_E2pFXD9zCv.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 269,
      title:
        "[네이버]다이롱 커피콩캔디 100g 3개+망고젤리 50g 1봉 (8,900원/무료)",
      createdAt: new Date("2025-08-16T11:40:28.318Z"),
      views: 36,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816180731_H58ewQUmvP.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 264,
      title:
        "[네이버]에디션 여름 로고 반팔/반바지 10종 택1 (13,490원/3만이상무료)",
      createdAt: new Date("2025-08-16T11:40:28.303Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816190413_LssiE5NX.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 263,
      title: "[네이버]푸마 소프트폼 쿠셔닝 인솔 스니커즈 (19,840원/무료)",
      createdAt: new Date("2025-08-16T11:40:28.301Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816191409_lcOKnLs5.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 256,
      title: "[네이버]서울고량주 레드35도 375ml 2병 + 잔2개 (16,900원/무배)",
      createdAt: new Date("2025-08-16T11:40:28.212Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816200811_IDUvmoIx7w.jpg",
      ],
    }),
  ];

  private mockOhousePlatformPosts = [
    new DiscountPlatformPreviewEntity({
      id: 270,
      title: "[오늘의집]대성쎌틱 이지클린 음식물 처리기 3L (264,100원/무배)",
      createdAt: new Date("2025-08-16T11:40:28.320Z"),
      views: 10,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816180349_uDjFF3CUnY.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 268,
      title:
        "[오늘의집]헨켈 퍼실 딥클린 파워젤 1.8L / 디스크 캡슐세제 38개입 등 (32,389원~/무배)",
      createdAt: new Date("2025-08-16T11:40:28.316Z"),
      views: 14,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816180930_AvrQPCC6Tf.jpg",
      ],
    }),
  ];

  private mockGmarketPlatformPosts = [
    new DiscountPlatformPreviewEntity({
      id: 575,
      title: "[G마켓]바세린 폼클렌징 220ml 4개 (9960원/무료)",
      createdAt: new Date("2025-08-19T04:14:00.333Z"),
      views: 23,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0819/20250819110750_bMpluXnI.jpg",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 255,
      title: "[G마켓]아이더 기능성 반팔티 2장 (유클 23,870원/무료)",
      createdAt: new Date("2025-08-16T11:40:28.203Z"),
      views: 0,
      postImages: [
        "https://cdn2.ppomppu.co.kr/zboard/data3/2025/0816/20250816201234_6sfCEZtc.jpg",
      ],
    }),
  ];

  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    return this.mockDiscounts.slice(0, limit);
  }

  async getDiscountPlatforms(): Promise<DiscountPlatformGroup> {
    return new DiscountPlatformGroup({
      kakao: this.mockKakaoPlatformPosts,
      coupang: this.mockCoupangPlatformPosts,
      naver: this.mockNaverPlatformPosts,
      ohouse: this.mockOhousePlatformPosts,
      gmarket: this.mockGmarketPlatformPosts,
    });
  }

  async getDiscountDetail(id: number): Promise<PostEntity> {
    return new PostEntity({
      id: id + 3,
      title: "할인 정보",
      content: "할인 정보",
      imageUrl: "https://example.com/laptop.jpg",
      author: new UserEntity({
        id: 1,
        nickname: "test",
        picture: "https://example.com/laptop.jpg",
        name: "test",
        provider: "local",
        role: "user",
        email: "",
      }),
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      viewsCount: 0,
      likesCount: 0,
      isLikedByMe: false,
      isReportedByMe: false,
      isBlurredByAI: false,
      isBlockedByMe: false,
      isMine: false,
      tags: [],
      source: {
        scrapingSourceUrl: "https://naver.com",
        originSourceUrl: "https://naver.com",
      },
      event: {
        organizer: "서울특별시",
        entryMethod: "단순응모",
        winners: "30명",
        prize: "기프티콘",
        period: "2025-09-07T00:00:00.000Z",
      },
    });
  }
}
