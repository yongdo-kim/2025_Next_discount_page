import { test, expect } from "@playwright/test";

test.describe("홈페이지 기본 테스트", () => {
  test("홈페이지가 정상적으로 로드된다", async ({ page }) => {
    // 홈페이지 접속
    await page.goto("/");

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/할인탐정/);

    // 메인 타이틀이 표시되는지 확인
    const mainTitle = page.locator('h1, [data-testid="main-title"]');
    await expect(mainTitle).toBeVisible();

    // 네비게이션 바가 표시되는지 확인
    const navbar = page.locator('nav, [data-testid="navbar"]');
    await expect(navbar).toBeVisible();
  });

  test("홈페이지에 게시물 목록이 표시된다", async ({ page }) => {
    await page.goto("/");

    // 페이지 로딩 대기
    await page.waitForLoadState("networkidle");

    // 게시물 카드들이 로드되는지 확인 (일부 할인 정보가 표시되어야 함)
    const postCards = page.locator(
      '[data-testid="post-card"], .post-card, article',
    );

    // 최소 1개 이상의 게시물이 있어야 함
    await expect(postCards.first()).toBeVisible();
  });

  test("반응형 디자인이 모바일에서 작동한다", async ({ page }) => {
    // 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/");

    // 모바일에서도 기본 요소들이 표시되는지 확인
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();

    // 모바일 네비게이션이 적절히 표시되는지 확인
    const navbar = page.locator('nav, [data-testid="navbar"]');
    await expect(navbar).toBeVisible();
  });
});
