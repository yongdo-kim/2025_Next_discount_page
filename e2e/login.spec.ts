import { expect, test } from "@playwright/test";

test.describe("개발자 로그인 플로우", () => {
  test("개발자 로그인 전체 플로우 테스트", async ({ page }) => {
    // 1. 홈페이지 진입
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/할인탐정/);

    // 2. 초기 상태 확인 (로그인/로그아웃 버튼 중 어떤 것이 보이는지)
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    const logoutButton = page.locator('[data-testid="navbar-logout-button"]');

    const isLoginButtonVisible = await loginButton.isVisible({ timeout: 3000 });
    const isLogoutButtonVisible = await logoutButton.isVisible({
      timeout: 3000,
    });

    console.log(
      `🔍 초기 상태: 로그인 버튼 ${isLoginButtonVisible ? "보임" : "안보임"}, 로그아웃 버튼 ${isLogoutButtonVisible ? "보임" : "안보임"}`,
    );

    // 3. 이미 로그인된 상태라면 먼저 로그아웃
    if (isLogoutButtonVisible) {
      console.log("🚪 이미 로그인된 상태 - 먼저 로그아웃 진행");
      await logoutButton.click();
      await page.waitForLoadState("networkidle");
      await expect(loginButton).toBeVisible({ timeout: 15000 });
      console.log("✅ 로그아웃 완료");
    }

    // 4. NavBar 로그인 버튼 확인 및 클릭
    await expect(loginButton).toBeVisible({ timeout: 10000 });

    console.log("🔑 NavBar 로그인 버튼 클릭");
    await loginButton.click();

    // 5. 로그인 페이지로 이동 확인
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/.*\/auth\/sign-in/);
    console.log("📄 로그인 페이지 이동 완료");

    // 6. 개발자 로그인 버튼 확인 및 클릭
    const devLoginButton = page.locator('[data-testid="dev-login-button"]');
    await expect(devLoginButton).toBeVisible({ timeout: 10000 });

    console.log("🔍 개발자 로그인 버튼 클릭");
    await devLoginButton.click();

    // 7. 로그인 후 홈페이지로 리다이렉트 대기
    await page.waitForURL("/", { timeout: 15000 });
    await page.waitForLoadState("networkidle");
    console.log("🏠 홈페이지로 리다이렉트 완료");

    // 8. 로그아웃 버튼이 나타나는지 확인 (로그인 성공 확인)
    await expect(logoutButton).toBeVisible({ timeout: 10000 });
    await expect(logoutButton).toHaveText("로그아웃");

    console.log("✅ 로그아웃 버튼 확인 - 로그인 상태 검증 완료");

    // 9. 사용자 정보가 정상적으로 로드되었는지 확인
    // useMe 훅이 성공적으로 데이터를 가져왔다면 로그아웃 버튼이 표시됨
    await expect(logoutButton).not.toBeDisabled();

    console.log("✅ 개발자 로그인 플로우 테스트 완료");
  });

  test("로그아웃 플로우 테스트", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    const logoutButton = page.locator('[data-testid="navbar-logout-button"]');

    // 초기 상태 확인
    const isLoginButtonVisible = await loginButton.isVisible({ timeout: 3000 });
    const isLogoutButtonVisible = await logoutButton.isVisible({
      timeout: 3000,
    });

    console.log(
      `🔍 초기 상태: 로그인 버튼 ${isLoginButtonVisible ? "보임" : "안보임"}, 로그아웃 버튼 ${isLogoutButtonVisible ? "보임" : "안보임"}`,
    );

    // 로그인이 안되어 있다면 먼저 로그인 수행
    if (isLoginButtonVisible && !isLogoutButtonVisible) {
      console.log("🔑 로그인되지 않은 상태 - 먼저 로그인 진행");
      await loginButton.click();
      await page.waitForLoadState("domcontentloaded");

      const devLoginButton = page.locator('[data-testid="dev-login-button"]');
      await expect(devLoginButton).toBeVisible({ timeout: 10000 });
      await devLoginButton.click();
      await page.waitForURL("/", { timeout: 15000 });
      await page.waitForLoadState("networkidle");
      console.log("✅ 로그인 완료");
    }

    // 로그아웃 버튼 확인 및 클릭
    await expect(logoutButton).toBeVisible({ timeout: 10000 });
    console.log("🚪 로그아웃 버튼 클릭");
    await logoutButton.click();

    // 로그아웃 후 로그인 버튼이 다시 나타나는지 확인
    await page.waitForLoadState("networkidle");
    await expect(loginButton).toBeVisible({ timeout: 15000 });
    console.log("✅ 로그아웃 완료 - 로그인 버튼 표시됨");
  });
});
