import {
  DiscountPlatformGroup,
  DiscountPlatformPreviewEntity,
} from "@/features/discounts/domain/entities/discount-platform.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";

export class MockDiscountRepository implements DiscountRepository {
  private mockKakaoPlatformPosts = [
    new DiscountPlatformPreviewEntity({
      id: 271,
      title: "[카카오]국내산 미숫가루 500g x 3팩 (11,900원 / 무배)",
      createdAt: new Date("2025-08-16T11:40:28.322Z"),
      views: 11,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNzNkYyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+S2FrYW8gSW1hZ2U8L3RleHQ+PC9zdmc+",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 266,
      title:
        "[카카오]부드러운 광양 돼지 왕구이(목전지) 600g 2팩+2팩(총2.4kg) (18,900원/무배)",
      createdAt: new Date("2025-08-16T11:40:28.311Z"),
      views: 17,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNzNkYyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+S2FrYW8gSW1hZ2UgMjwvdGV4dD48L3N2Zz4=",
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
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRmNDZlNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q291cGFuZyBJbWFnZTwvdGV4dD48L3N2Zz4=",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 560,
      title: "[쿠팡]다용도 이어폰 케이블 보관 파우치 (6,430원/무배)",
      createdAt: new Date("2025-08-19T04:14:00.236Z"),
      views: 0,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRmNDZlNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q291cGFuZyBJbWFnZSAyPC90ZXh0Pjwvc3ZnPg==",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 272,
      title: "[쿠팡]오뚜기 참깨라면 컵 110g, 1개 (980원/와우무료)",
      createdAt: new Date("2025-08-16T11:40:28.325Z"),
      views: 14,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRmNDZlNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q291cGFuZyBJbWFnZSAzPC90ZXh0Pjwvc3ZnPg==",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 265,
      title: "[쿠팡]스포츠패스 우리카드 결제시 5천원 캐시백[9900원/무료]",
      createdAt: new Date("2025-08-16T11:40:28.309Z"),
      views: 0,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRmNDZlNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q291cGFuZyBJbWFnZSA0PC90ZXh0Pjwvc3ZnPg==",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 258,
      title: "[쿠팡]부착형 아크릴거울 (6,500원/와우무료)",
      createdAt: new Date("2025-08-16T11:40:28.286Z"),
      views: 0,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRmNDZlNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q291cGFuZyBJbWFnZSA1PC90ZXh0Pjwvc3ZnPg==",
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
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFkYzY1MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TmF2ZXIgSW1hZ2U8L3RleHQ+PC9zdmc+",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 574,
      title:
        "[네이버]오늘끝딜 규조토 발매트 빨아쓰는 욕실 화장실 주방 매트 1+1 (5,900원/무료)",
      createdAt: new Date("2025-08-19T04:14:00.330Z"),
      views: 24,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFkYzY1MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TmF2ZXIgSW1hZ2UgMjwvdGV4dD48L3N2Zz4=",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 573,
      title:
        "[네이버]올챌린지 천연펄프 두루마리화장지 3겹 30m 30롤 (9,900원/무배)",
      createdAt: new Date("2025-08-19T04:14:00.328Z"),
      views: 24,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFkYzY1MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TmF2ZXIgSW1hZ2UgMzwvdGV4dD48L3N2Zz4=",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 563,
      title: "[네이버]전자담배 액상 (2,900/2,500)",
      createdAt: new Date("2025-08-19T04:14:00.254Z"),
      views: 0,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFkYzY1MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TmF2ZXIgSW1hZ2UgNDwvdGV4dD48L3N2Zz4=",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 269,
      title:
        "[네이버]다이롱 커피콩캔디 100g 3개+망고젤리 50g 1봉 (8,900원/무료)",
      createdAt: new Date("2025-08-16T11:40:28.318Z"),
      views: 36,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFkYzY1MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TmF2ZXIgSW1hZ2UgNTwvdGV4dD48L3N2Zz4=",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 264,
      title:
        "[네이버]에디션 여름 로고 반팔/반바지 10종 택1 (13,490원/3만이상무료)",
      createdAt: new Date("2025-08-16T11:40:28.303Z"),
      views: 0,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFkYzY1MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TmF2ZXIgSW1hZ2UgNjwvdGV4dD48L3N2Zz4=",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 263,
      title: "[네이버]푸마 소프트폼 쿠셔닝 인솔 스니커즈 (19,840원/무료)",
      createdAt: new Date("2025-08-16T11:40:28.301Z"),
      views: 0,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFkYzY1MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TmF2ZXIgSW1hZ2UgNzwvdGV4dD48L3N2Zz4=",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 256,
      title: "[네이버]서울고량주 레드35도 375ml 2병 + 잔2개 (16,900원/무배)",
      createdAt: new Date("2025-08-16T11:40:28.212Z"),
      views: 0,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFkYzY1MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TmF2ZXIgSW1hZ2UgODwvdGV4dD48L3N2Zz4=",
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
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2ZmNjkwMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+T2hvdXNlIEltYWdlPC90ZXh0Pjwvc3ZnPg==",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 268,
      title:
        "[오늘의집]헨켈 퍼실 딥클린 파워젤 1.8L / 디스크 캡슐세제 38개입 등 (32,389원~/무배)",
      createdAt: new Date("2025-08-16T11:40:28.316Z"),
      views: 14,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2ZmNjkwMCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+T2hvdXNlIEltYWdlIDI8L3RleHQ+PC9zdmc+",
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
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2RjMjYyNiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R21hcmtldCBJbWFnZTwvdGV4dD48L3N2Zz4=",
      ],
    }),
    new DiscountPlatformPreviewEntity({
      id: 255,
      title: "[G마켓]아이더 기능성 반팔티 2장 (유클 23,870원/무료)",
      createdAt: new Date("2025-08-16T11:40:28.203Z"),
      views: 0,
      postImages: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2RjMjYyNiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R21hcmtldCBJbWFnZSAyPC90ZXh0Pjwvc3ZnPg==",
      ],
    }),
  ];

  private mockDiscountPreviews = [
    new PostPreviewEntity({
      id: 68,
      title: "[네이버페이] 일일적립, 클릭 53원",
      author: new UserEntity({
        id: 1,
        nickname: "할인탐정",
        picture:
          "https://nari-s3.s3.us-east-1.amazonaws.com/discount/discount-character.png",
        name: "할인탐정",
        email: "discount@detective.com",
        provider: "local",
        role: "admin",
      }),
      createdAt: "2025-08-22T04:21:31.037Z",
      viewsCount: 0,
      likesCount: 0,
      isLikedByMe: false,
      isReportedByMe: false,
      commentsCount: 0,
      thumbnailUrl: "https://img.ruliweb.com/img/2016/ruli_400x210.png",
      tags: [
        {
          id: 31,
          name: "#네이버페이",
        },
      ],
      category: {
        name: "상품권",
        id: 5,
      },
      updatedAt: "2025-08-22T04:21:31.037Z",
      deletedAt: null,
      isMine: false,
      isBlurredByAI: false,
      isBlockedByMe: false,
    }),
    new PostPreviewEntity({
      id: 67,
      title: "[mobapad] 모바패드 스위치2 조이콘 어댑터 $20/무료배송",
      author: new UserEntity({
        id: 1,
        nickname: "할인탐정",
        picture:
          "https://nari-s3.s3.us-east-1.amazonaws.com/discount/discount-character.png",
        name: "할인탐정",
        email: "discount@detective.com",
        provider: "local",
        role: "admin",
      }),
      createdAt: "2025-08-22T04:21:31.033Z",
      viewsCount: 1,
      likesCount: 0,
      isLikedByMe: false,
      isReportedByMe: false,
      commentsCount: 0,
      thumbnailUrl:
        "http://www.mobapad.com/cdn/shop/files/MobapadC70JoyConadapterwithMobapadM6HDblack2.webp?v=1755573909",
      tags: [
        {
          id: 298,
          name: "#mobapad",
        },
        {
          id: 299,
          name: "#스위치2",
        },
        {
          id: 300,
          name: "#조이콘",
        },
        {
          id: 301,
          name: "#어댑터",
        },
        {
          id: 302,
          name: "#모바패드",
        },
      ],
      category: {
        name: "게임H/W",
        id: 7,
      },
      updatedAt: "2025-08-22T04:21:31.033Z",
      deletedAt: null,
      isMine: false,
      isBlurredByAI: false,
      isBlockedByMe: false,
    }),
    new PostPreviewEntity({
      id: 66,
      title: "[롯데온] 찰떡 일품 팥빙수 아이스크림 240ml 12개",
      author: new UserEntity({
        id: 1,
        nickname: "할인탐정",
        picture:
          "https://nari-s3.s3.us-east-1.amazonaws.com/discount/discount-character.png",
        name: "할인탐정",
        email: "discount@detective.com",
        provider: "local",
        role: "admin",
      }),
      createdAt: "2025-08-22T04:21:31.030Z",
      viewsCount: 0,
      likesCount: 0,
      isLikedByMe: false,
      isReportedByMe: false,
      commentsCount: 0,
      thumbnailUrl:
        "https://contents.lotteon.com/itemimage/20250811151937/LO/21/49/17/81/98/_2/14/91/78/19/9/LO2149178198_2149178199_1.jpg",
      tags: [
        {
          id: 89,
          name: "#롯데온",
        },
      ],
      category: {
        name: "음식",
        id: 6,
      },
      updatedAt: "2025-08-22T04:21:31.030Z",
      deletedAt: null,
      isMine: false,
      isBlurredByAI: false,
      isBlockedByMe: false,
    }),
    new PostPreviewEntity({
      id: 65,
      title: "[롯데리아] 리아데이, 치킨버거+쥐포튀김 5500원 (8/21)",
      author: new UserEntity({
        id: 1,
        nickname: "할인탐정",
        picture:
          "https://nari-s3.s3.us-east-1.amazonaws.com/discount/discount-character.png",
        name: "할인탐정",
        email: "discount@detective.com",
        provider: "local",
        role: "admin",
      }),
      createdAt: "2025-08-22T04:21:31.026Z",
      viewsCount: 0,
      likesCount: 0,
      isLikedByMe: false,
      isReportedByMe: false,
      commentsCount: 0,
      thumbnailUrl:
        "https://img.lotteeatz.com/upload/event/CONTENT_IMG/2025/08/19/20250819093213664_5.jpg",
      tags: [
        {
          id: 115,
          name: "#롯데리아",
        },
      ],
      category: {
        name: "음식",
        id: 6,
      },
      updatedAt: "2025-08-22T04:21:31.030Z",
      deletedAt: null,
      isMine: false,
      isBlurredByAI: false,
      isBlockedByMe: false,
    }),
  ];

  async getNewestDiscountPreview(limit?: number): Promise<PostPreviewEntity[]> {
    return this.mockDiscountPreviews.slice(0, limit);
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
      imageUrl:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNzNkYyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UG9zdCBJbWFnZTwvdGV4dD48L3N2Zz4=",
      author: new UserEntity({
        id: 1,
        nickname: "test",
        picture:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNzNkYyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VXNlciBJbWFnZTwvdGV4dD48L3N2Zz4=",
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
