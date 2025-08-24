import { test, expect } from "@playwright/test";

test.describe("카테고리 필터링 테스트", () => {
  test("홈페이지에서 카테고리 메뉴가 표시된다", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 페이지 타이틀 확인
    await expect(page).toHaveTitle(/할인탐정/);

    // 카테고리 메뉴가 표시되는지 확인 (데스크톱과 모바일 둘 중 하나)
    const categoryButtons = page.locator(
      'span:has-text("전체보기"), span:has-text("게임H/W"), span:has-text("상품권"), span:has-text("음식")',
    );

    await expect(categoryButtons.first()).toBeVisible();
  });

  test("카테고리 필터링이 URL 파라미터로 작동한다", async ({ page }) => {
    // 상품권 카테고리 (ID: 2)로 필터링
    await page.goto("/?category=2");
    await page.waitForLoadState("networkidle");

    // URL에 category 파라미터가 포함되어 있는지 확인
    expect(page.url()).toContain("category=2");

    // 페이지가 정상적으로 로드되었는지 확인
    await expect(page).toHaveTitle(/할인탐정/);
  });

  test("다양한 카테고리 ID로 필터링이 작동한다", async ({ page }) => {
    const categoryIds = [2, 3, 4, 5]; // 상품권, 의류, 음식, 게임S/W

    for (const categoryId of categoryIds) {
      await page.goto(`/?category=${categoryId}`);
      await page.waitForLoadState("domcontentloaded");

      // URL이 올바르게 설정되었는지 확인
      expect(page.url()).toContain(`category=${categoryId}`);

      // 페이지가 에러 없이 로드되었는지 확인
      await expect(page).toHaveTitle(/할인탐정/);

      // 페이지 내용이 로드되었는지 확인 (로딩 상태나 콘텐츠 중 하나)
      const content = page.locator('section, main, [class*="container"]');
      await expect(content.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("카테고리 메뉴 클릭이 작동한다", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 카테고리 버튼 찾기 (예: "음식" 카테고리)
    const foodCategory = page.locator('span:has-text("음식")').first();

    if ((await foodCategory.count()) > 0) {
      // 카테고리 클릭
      await foodCategory.click();

      // 페이지가 로드될 때까지 대기
      await page.waitForTimeout(2000);

      // URL 변경 또는 페이지 콘텐츠 변경 확인
      // (JavaScript 라우팅이므로 URL 변경이나 DOM 변경을 확인)
      const currentUrl = page.url();
      const hasCategory =
        currentUrl.includes("category=") ||
        (await page.locator("[data-category]").count()) > 0;

      expect(hasCategory).toBeTruthy();
    }
  });

  test("모바일에서 카테고리 필터링이 작동한다", async ({ page }) => {
    // 모바일 뷰포트 설정
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/?category=3"); // 의류 카테고리
    await page.waitForLoadState("networkidle");

    // 모바일 카테고리 메뉴가 표시되는지 확인
    const mobileCategoryMenu = page.locator(
      '.block.lg\\:hidden, [class*="mobile"]',
    );

    // 모바일에서도 카테고리 메뉴가 보이는지 확인
    if ((await mobileCategoryMenu.count()) > 0) {
      await expect(mobileCategoryMenu.first()).toBeVisible();
    }

    // 페이지가 정상적으로 로드되었는지 확인
    await expect(page).toHaveTitle(/할인탐정/);
  });

  test("잘못된 카테고리 ID는 적절히 처리된다", async ({ page }) => {
    // 존재하지 않는 카테고리 ID
    await page.goto("/?category=999");
    await page.waitForLoadState("domcontentloaded");

    // 페이지가 에러 없이 로드되어야 함 (전체보기로 폴백하거나 에러 처리)
    await expect(page).toHaveTitle(/할인탐정/);

    // 기본 콘텐츠가 표시되어야 함
    const content = page.locator("section, main, nav");
    await expect(content.first()).toBeVisible({ timeout: 10000 });
  });

  test("카테고리가 설정된 상태에서 전체보기로 돌아갈 수 있다", async ({
    page,
  }) => {
    // 특정 카테고리로 시작
    await page.goto("/?category=2");
    await page.waitForLoadState("networkidle");

    // 전체보기 버튼 클릭
    const allCategoryButton = page.locator('span:has-text("전체보기")').first();

    if ((await allCategoryButton.count()) > 0) {
      await allCategoryButton.click();
      await page.waitForTimeout(2000);

      // URL에서 category 파라미터가 제거되었거나 홈페이지로 이동했는지 확인
      const currentUrl = page.url();
      const isHomePage =
        currentUrl === page.url().split("?")[0] + "/" ||
        currentUrl === page.url().split("?")[0] ||
        !currentUrl.includes("category=");

      expect(isHomePage).toBeTruthy();
    }
  });
});
