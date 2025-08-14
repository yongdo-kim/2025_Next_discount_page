import { test, expect } from "@playwright/test";

test.describe("기본 E2E 테스트", () => {
  test("사이트가 정상적으로 로드된다", async ({ page }) => {
    // 홈페이지 접속
    await page.goto("/");

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/할인탐정/);

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState("networkidle");

    // 기본 요소 확인
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("네비게이션이 표시된다", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 네비게이션 바 확인
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();
  });

  test("할인탐정 브랜드명이 표시된다", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // "할인탐정" 텍스트가 페이지에 있는지 확인
    const brandText = page.locator("text=할인탐정");
    await expect(brandText.first()).toBeVisible();
  });

  test("페이지에 콘텐츠 섹션이 존재한다", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // section 태그가 최소 1개는 존재하는지 확인
    const sections = page.locator("section");
    await expect(sections.first()).toBeVisible();
  });
});
