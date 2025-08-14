import { test, expect } from "@playwright/test";

test.describe("디버그 테스트", () => {
  test("홈페이지 DOM 구조 확인", async ({ page }) => {
    await page.goto("/");

    // 페이지 로딩 완료 대기
    await page.waitForLoadState("networkidle");

    // 페이지 제목 출력
    const title = await page.title();
    console.log("페이지 제목:", title);

    // body 내용 확인
    const bodyText = await page.locator("body").textContent();
    console.log("Body 텍스트 일부:", bodyText?.substring(0, 500));

    // 주요 요소들 확인
    const h1Elements = await page.locator("h1").count();
    console.log("h1 태그 개수:", h1Elements);

    const h2Elements = await page.locator("h2").count();
    console.log("h2 태그 개수:", h2Elements);

    const navElements = await page.locator("nav").count();
    console.log("nav 태그 개수:", navElements);

    // 할인탐정 로고나 텍스트 찾기
    const logoText = page.locator("text=할인탐정");
    console.log("할인탐정 텍스트 존재:", (await logoText.count()) > 0);

    // article이나 div 요소들 확인
    const articles = await page.locator("article").count();
    console.log("article 태그 개수:", articles);

    // 스크린샷 저장
    await page.screenshot({ path: "debug-screenshot.png", fullPage: true });

    // 테스트는 항상 통과 (디버깅 목적)
    expect(true).toBe(true);
  });
});
