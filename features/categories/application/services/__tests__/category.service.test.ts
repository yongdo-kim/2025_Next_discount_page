import { CategoryService } from "../category.service";
import { CategoryRepository } from "@/features/categories/domain/repositories/category.repository";
import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";

// CategoryRepository를 jest mock으로 생성
const mockCategoryRepository: jest.Mocked<CategoryRepository> = {
  getCategories: jest.fn(),
};

describe("CategoryService", () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    // 각 테스트 전에 CategoryService 새 인스턴스 생성
    categoryService = new CategoryService(mockCategoryRepository);
  });

  afterEach(() => {
    // 각 테스트 후 모든 mock 함수 호출 기록 초기화
    jest.clearAllMocks();
  });

  describe("getCategories", () => {
    const mockCategories = [
      new CategoryEntity({ id: 1, name: "전자제품" }),
      new CategoryEntity({ id: 2, name: "패션" }),
      new CategoryEntity({ id: 3, name: "생활용품" }),
      new CategoryEntity({ id: 4, name: "식품" }),
      new CategoryEntity({ id: 5, name: "도서" }),
    ];

    it("전체 카테고리 목록을 반환해야 한다", async () => {
      // Given - 전체 카테고리 목록 설정
      mockCategoryRepository.getCategories.mockResolvedValue(mockCategories);

      // When - getCategories 메서드 호출
      const result = await categoryService.getCategories();

      // Then - 전체 카테고리 목록 반환 확인
      expect(result).toEqual(mockCategories);
      expect(result).toHaveLength(5);
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledTimes(1);
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledWith();
    });

    it("반환된 카테고리들이 올바른 구조를 가져야 한다", async () => {
      // Given - 카테고리 목록 설정
      mockCategoryRepository.getCategories.mockResolvedValue(mockCategories);

      // When - 카테고리 조회
      const result = await categoryService.getCategories();

      // Then - 각 카테고리의 구조 검증
      expect(Array.isArray(result)).toBe(true);
      result.forEach((category) => {
        expect(category).toHaveProperty("id");
        expect(category).toHaveProperty("name");
        expect(typeof category.id).toBe("number");
        expect(typeof category.name).toBe("string");
        expect(category.id).toBeGreaterThan(0);
        expect(category.name.length).toBeGreaterThan(0);
      });
    });

    it("빈 카테고리 목록도 정상적으로 처리해야 한다", async () => {
      // Given - 빈 카테고리 목록 설정
      const emptyCategories: CategoryEntity[] = [];
      mockCategoryRepository.getCategories.mockResolvedValue(emptyCategories);

      // When - 카테고리 조회
      const result = await categoryService.getCategories();

      // Then - 빈 배열 반환 확인
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(Array.isArray(result)).toBe(true);
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledTimes(1);
    });

    it("단일 카테고리도 배열로 반환해야 한다", async () => {
      // Given - 단일 카테고리 설정
      const singleCategory = [new CategoryEntity({ id: 1, name: "전자제품" })];
      mockCategoryRepository.getCategories.mockResolvedValue(singleCategory);

      // When - 카테고리 조회
      const result = await categoryService.getCategories();

      // Then - 단일 항목 배열 반환 확인
      expect(result).toEqual(singleCategory);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0].name).toBe("전자제품");
    });

    it("카테고리 이름이 한국어로 된 경우도 정상 처리해야 한다", async () => {
      // Given - 한국어 카테고리명 설정
      const koreanCategories = [
        new CategoryEntity({ id: 1, name: "전자제품" }),
        new CategoryEntity({ id: 2, name: "뷰티/미용" }),
        new CategoryEntity({ id: 3, name: "스포츠/레저" }),
        new CategoryEntity({ id: 4, name: "반려동물용품" }),
      ];
      mockCategoryRepository.getCategories.mockResolvedValue(koreanCategories);

      // When - 카테고리 조회
      const result = await categoryService.getCategories();

      // Then - 한국어 카테고리명 정상 반환 확인
      expect(result).toEqual(koreanCategories);
      expect(result[0].name).toBe("전자제품");
      expect(result[1].name).toBe("뷰티/미용");
      expect(result[2].name).toBe("스포츠/레저");
      expect(result[3].name).toBe("반려동물용품");
    });

    it("특수문자가 포함된 카테고리명도 처리해야 한다", async () => {
      // Given - 특수문자 포함 카테고리명
      const specialCharCategories = [
        new CategoryEntity({ id: 1, name: "IT/전자" }),
        new CategoryEntity({ id: 2, name: "홈&리빙" }),
        new CategoryEntity({ id: 3, name: "스마트폰/태블릿" }),
        new CategoryEntity({ id: 4, name: "여행/숙박(쿠폰)" }),
      ];
      mockCategoryRepository.getCategories.mockResolvedValue(
        specialCharCategories,
      );

      // When - 카테고리 조회
      const result = await categoryService.getCategories();

      // Then - 특수문자 포함 카테고리명 정상 반환 확인
      expect(result).toEqual(specialCharCategories);
      expect(result[0].name).toBe("IT/전자");
      expect(result[1].name).toBe("홈&리빙");
      expect(result[2].name).toBe("스마트폰/태블릿");
      expect(result[3].name).toBe("여행/숙박(쿠폰)");
    });
  });

  describe("error handling", () => {
    it("네트워크 에러 시 에러를 전파해야 한다", async () => {
      // Given - 네트워크 에러 설정
      const error = new Error("Network error");
      mockCategoryRepository.getCategories.mockRejectedValue(error);

      // When & Then - 에러 전파 확인
      await expect(categoryService.getCategories()).rejects.toThrow(
        "Network error",
      );
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledTimes(1);
    });

    it("서버 에러(500) 시 에러를 전파해야 한다", async () => {
      // Given - 서버 에러 설정
      const error = new Error("Internal Server Error");
      mockCategoryRepository.getCategories.mockRejectedValue(error);

      // When & Then - 에러 전파 확인
      await expect(categoryService.getCategories()).rejects.toThrow(
        "Internal Server Error",
      );
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledTimes(1);
    });

    it("타임아웃 에러 시 에러를 전파해야 한다", async () => {
      // Given - 타임아웃 에러 설정
      const error = new Error("Request timeout");
      mockCategoryRepository.getCategories.mockRejectedValue(error);

      // When & Then - 에러 전파 확인
      await expect(categoryService.getCategories()).rejects.toThrow(
        "Request timeout",
      );
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledTimes(1);
    });

    it("데이터베이스 연결 에러 시 에러를 전파해야 한다", async () => {
      // Given - 데이터베이스 에러 설정
      const error = new Error("Database connection failed");
      mockCategoryRepository.getCategories.mockRejectedValue(error);

      // When & Then - 에러 전파 확인
      await expect(categoryService.getCategories()).rejects.toThrow(
        "Database connection failed",
      );
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledTimes(1);
    });
  });

  describe("performance and data integrity", () => {
    it("대량의 카테고리 데이터도 처리할 수 있어야 한다", async () => {
      // Given - 대량의 카테고리 데이터 생성
      const largeCategories: CategoryEntity[] = [];
      for (let i = 1; i <= 100; i++) {
        largeCategories.push(
          new CategoryEntity({
            id: i,
            name: `카테고리${i}`,
          }),
        );
      }
      mockCategoryRepository.getCategories.mockResolvedValue(largeCategories);

      // When - 대량 데이터 조회
      const result = await categoryService.getCategories();

      // Then - 대량 데이터 정상 반환 확인
      expect(result).toHaveLength(100);
      expect(result[0].name).toBe("카테고리1");
      expect(result[99].name).toBe("카테고리100");
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledTimes(1);
    });

    it("카테고리 ID가 중복되지 않아야 한다", async () => {
      // Given - 서로 다른 ID를 가진 카테고리들
      const categoriesWithUniqueIds = [
        new CategoryEntity({ id: 1, name: "카테고리1" }),
        new CategoryEntity({ id: 2, name: "카테고리2" }),
        new CategoryEntity({ id: 3, name: "카테고리3" }),
        new CategoryEntity({ id: 5, name: "카테고리5" }),
        new CategoryEntity({ id: 10, name: "카테고리10" }),
      ];
      mockCategoryRepository.getCategories.mockResolvedValue(
        categoriesWithUniqueIds,
      );

      // When - 카테고리 조회
      const result = await categoryService.getCategories();

      // Then - ID 중복 없음 확인
      const ids = result.map((category) => category.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids).toEqual(uniqueIds);
      expect(ids).toEqual([1, 2, 3, 5, 10]);
    });

    it("repository 호출은 한 번만 이루어져야 한다", async () => {
      // Given - 카테고리 목록 설정
      const categories = [new CategoryEntity({ id: 1, name: "테스트" })];
      mockCategoryRepository.getCategories.mockResolvedValue(categories);

      // When - getCategories 호출
      await categoryService.getCategories();

      // Then - repository 호출 횟수 확인
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledTimes(1);
      expect(mockCategoryRepository.getCategories).toHaveBeenCalledWith();
    });
  });

  describe("edge cases", () => {
    it("매우 긴 카테고리명도 처리할 수 있어야 한다", async () => {
      // Given - 긴 카테고리명
      const longName = "매우긴카테고리명입니다".repeat(10); // 110자 (11자 × 10)
      const longNameCategory = [new CategoryEntity({ id: 1, name: longName })];
      mockCategoryRepository.getCategories.mockResolvedValue(longNameCategory);

      // When - 긴 카테고리명 조회
      const result = await categoryService.getCategories();

      // Then - 긴 카테고리명 정상 처리 확인
      expect(result[0].name).toBe(longName);
      expect(result[0].name.length).toBe(110);
    });

    it("숫자로만 구성된 카테고리명도 처리해야 한다", async () => {
      // Given - 숫자 카테고리명
      const numericCategories = [
        new CategoryEntity({ id: 1, name: "2024" }),
        new CategoryEntity({ id: 2, name: "12345" }),
        new CategoryEntity({ id: 3, name: "0" }),
      ];
      mockCategoryRepository.getCategories.mockResolvedValue(numericCategories);

      // When - 숫자 카테고리명 조회
      const result = await categoryService.getCategories();

      // Then - 숫자 카테고리명 정상 처리 확인
      expect(result).toEqual(numericCategories);
      expect(result[0].name).toBe("2024");
      expect(result[1].name).toBe("12345");
      expect(result[2].name).toBe("0");
    });
  });
});
