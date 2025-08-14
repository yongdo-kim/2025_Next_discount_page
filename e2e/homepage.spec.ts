import { test, expect } from "@playwright/test";

test.describe("홈페이지 기본 테스트", () => {
  test("홈페이지가 정상적으로 로드된다", async ({ page }) => {
    // 홈페이지 접속
    await page.goto("/");

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/할인탐정/);

    // 페이지 로딩 대기
    await page.waitForLoadState("networkidle");

    // "오늘의 따끈한 할인" 섹션이 표시되는지 확인
    const mainSection = page.locator('text="오늘의"');
    await expect(mainSection).toBeVisible({ timeout: 10000 });

    // 네비게이션 바가 표시되는지 확인
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();
  });

  test("홈페이지에 할인 콘텐츠가 표시된다", async ({ page }) => {
    await page.goto("/");

    // 페이지 로딩 대기
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000); // 데이터 로딩 대기

    // "오늘의 따끈한 할인" 섹션이 있는지 확인
    const hotDealsSection = page.locator('text="따끈한 할인"');
    await expect(hotDealsSection).toBeVisible({ timeout: 10000 });

    // 그리드나 리스트 형태의 컨테이너가 있는지 확인
    const contentGrid = page.locator("ul.grid, .grid");
    await expect(contentGrid.first()).toBeVisible({ timeout: 10000 });
  });

  test("반응형 디자인이 모바일에서 작동한다", async ({ page }) => {
    // 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/");

    // 페이지 로딩 대기
    await page.waitForLoadState("networkidle");

    // 모바일 전용 게시물 카드가 표시되는지 확인
    const mobilePostCard = page.locator(
      '[data-testid="post-card-small-mobile-container"]',
    );
    await expect(mobilePostCard.first()).toBeVisible({ timeout: 15000 });

    // 네비게이션이 적절히 표시되는지 확인
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();
  });
});
