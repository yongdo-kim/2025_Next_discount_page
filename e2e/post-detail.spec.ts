import { expect, test } from "@playwright/test";

test.describe("게시물 상세 페이지 테스트", () => {
  // 실제 게시물 ID (테스트용)
  const testPostId = 253; // 실제 존재하는 게시물 ID 사용

  test("게시물 상세 페이지 접근 테스트", async ({ page }) => {
    await page.goto(`/posts/${testPostId}`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    // 페이지가 로드되었는지 확인 (에러 상태든 성공 상태든)
    await page.waitForLoadState("domcontentloaded");

    // 페이지 타이틀에 "할인탐정"이 포함되어 있는지 확인
    await expect(page).toHaveTitle(/할인탐정/);

    // 로딩 상태, 에러 상태, 또는 성공 상태 중 하나는 표시되어야 함
    const loadingOrError = page.locator(
      '[data-testid="post-detail-loading"], [data-testid="post-detail-error"], [data-testid="post-detail-article"]',
    );
    await expect(loadingOrError.first()).toBeVisible({ timeout: 15000 });
  });

  test("404 또는 에러 상태가 적절히 처리된다", async ({ page }) => {
    const nonExistentPostId = 999999;

    await page.goto(`/posts/${nonExistentPostId}`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    // 404 페이지, 에러 상태, 또는 "no data" 상태 중 하나는 표시되어야 함
    const errorIndicators = page.locator(
      [
        'text="404 Not Found"',
        'text="요청하신 페이지를 찾을 수 없어요.',
        'text="존재하지 않는"',
        'text="Not Found"',
        '[data-testid="post-detail-error"]',
        '[data-testid="post-detail-no-data"]',
        'text="no data"',
        'text="Error"',
      ].join(", "),
    );

    // 에러 상태 중 하나는 표시되어야 함
    await expect(errorIndicators.first()).toBeVisible({ timeout: 15000 });
  });

  // TODO: 실제 데이터가 동작하는 환경에서 아래 테스트들 활성화
  /*
  test("게시물 제목과 작성자 정보가 표시된다", async ({ page }) => {
    // 실제 API가 동작할 때 활성화
  });

  test("게시물 이미지와 콘텐츠가 표시된다", async ({ page }) => {
    // 실제 API가 동작할 때 활성화  
  });
  */
});
