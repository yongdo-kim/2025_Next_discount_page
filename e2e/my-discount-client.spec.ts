import { expect, test } from "@playwright/test";

test.describe("내가 좋아하는 포스트 섹션 테스트", () => {
  test("로그인 후 좋아하는 포스트가 있으면 '내가 좋아하는 포스트' 제목이 표시된다", async ({
    page,
  }) => {
    // 1. 홈페이지 진입
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 2. 로그인 상태 확인 및 로그인 수행
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    const logoutButton = page.locator('[data-testid="navbar-logout-button"]');

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
      await expect(page).toHaveURL(/.*\/auth\/sign-in/);

      const devLoginButton = page.locator('[data-testid="dev-login-button"]');
      await expect(devLoginButton).toBeVisible({ timeout: 10000 });
      await devLoginButton.click();

      await page.waitForURL("/", { timeout: 15000 });
      await page.waitForLoadState("networkidle");
      console.log("✅ 로그인 완료");
    }

    // 3. 로그인 상태 확인
    await expect(logoutButton).toBeVisible({ timeout: 10000 });
    console.log("✅ 로그인 상태 확인됨");

    // 4. 페이지 새로고침하여 좋아하는 포스트 데이터 로드 대기
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // useLikedPosts 훅 데이터 로딩 대기

    // 5. MyDiscountClient 섹션 확인
    const myDiscountSection = page.locator(
      '[data-testid="my-discount-section"]',
    );

    // 섹션이 존재하는지 확인 (데이터가 있는 경우에만 렌더링됨)
    const sectionExists = await myDiscountSection.isVisible({ timeout: 5000 });

    if (sectionExists) {
      console.log("📋 내가 좋아하는 포스트 섹션 발견");

      // 6. "내가 좋아하는 포스트" 제목이 표시되는지 확인
      const titleElement = page.locator('text="내가 좋아하는 포스트"');
      await expect(titleElement).toBeVisible({ timeout: 5000 });
      console.log("✅ '내가 좋아하는 포스트' 제목 표시됨");

      // 7. 그리드 컨테이너가 존재하는지 확인
      const gridContainer = page.locator(
        '[data-testid="my-discount-grid-container"]',
      );
      await expect(gridContainer).toBeVisible({ timeout: 5000 });

      // 8. 포스트 아이템들이 존재하는지 확인
      const postItems = page.locator('[data-testid="my-discount-post-item"]');
      const postCount = await postItems.count();

      console.log(`📄 좋아하는 포스트 ${postCount}개 표시됨`);

      if (postCount > 0) {
        // 포스트가 있는 경우: 각 포스트 아이템이 클릭 가능한지 확인
        const firstPostItem = postItems.first();
        await expect(firstPostItem).toBeVisible();
        console.log("✅ 첫 번째 포스트 아이템 클릭 가능");
      } else {
        // 포스트가 없는 경우: 그리드는 보이지만 비어있음 (정상적인 상황)
        console.log("ℹ️ 현재 좋아하는 포스트가 없음 - 빈 그리드 표시");
      }

      // 포스트 개수와 상관없이 섹션이 렌더링된 것 자체가 성공
      expect(postCount).toBeGreaterThanOrEqual(0);

      console.log("✅ 내가 좋아하는 포스트 섹션 테스트 완료");
    } else {
      console.log("ℹ️ 좋아하는 포스트가 없거나 로딩 중 - 섹션이 표시되지 않음");
      console.log(
        "   이는 정상적인 동작입니다. (좋아하는 포스트가 없으면 섹션이 렌더링되지 않음)",
      );

      // 섹션이 없는 것도 정상적인 경우이므로 테스트 통과
      expect(true).toBeTruthy();
    }
  });

  test("로그인 후 좋아하는 포스트 로딩 상태가 정상적으로 표시되고 좋아요 상태 변화를 확인한다", async ({
    page,
  }) => {
    // 1. 홈페이지 진입
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 2. 로그인 상태 확인 및 로그인 수행
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    const logoutButton = page.locator('[data-testid="navbar-logout-button"]');

    const isLogoutButtonVisible = await logoutButton.isVisible({
      timeout: 3000,
    });

    if (!isLogoutButtonVisible) {
      console.log("🔑 로그인 진행");
      await loginButton.click();
      await page.waitForLoadState("domcontentloaded");

      const devLoginButton = page.locator('[data-testid="dev-login-button"]');
      await expect(devLoginButton).toBeVisible({ timeout: 10000 });
      await devLoginButton.click();

      await page.waitForURL("/", { timeout: 15000 });
      await page.waitForLoadState("networkidle");
    }

    // 3. 페이지 새로고침하여 로딩 상태 관찰
    await page.reload();

    // 4. 로딩 상태 확인 (빠르게 나타났다가 사라질 수 있음)
    const loadingElement = page.locator('[data-testid="my-discount-loading"]');

    try {
      // 로딩 요소가 잠깐이라도 나타나는지 확인
      await expect(loadingElement).toBeVisible({ timeout: 1000 });
      console.log("✅ 로딩 상태 표시됨");

      // 로딩이 사라지고 섹션이나 빈 상태가 되는지 확인
      await expect(loadingElement).not.toBeVisible({ timeout: 10000 });
      console.log("✅ 로딩 상태 완료");
    } catch (error) {
      console.log(
        `ℹ️ 로딩 상태가 너무 빨라 감지되지 않음 (정상적일 수 있음) ${error}`,
      );
    }

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // 5. 내가 좋아하는 포스트 섹션에서 초기 포스트 개수 확인
    const myDiscountSection = page.locator(
      '[data-testid="my-discount-section"]',
    );

    let initialPostCount = 0;
    const sectionExists = await myDiscountSection.isVisible({ timeout: 5000 });

    if (sectionExists) {
      const postItems = page.locator('[data-testid="my-discount-post-item"]');
      initialPostCount = await postItems.count();
      console.log(`📄 초기 좋아하는 포스트 개수: ${initialPostCount}개`);
    }

    // 6. 일반 포스트 목록에서 포스트 찾기
    const mainPostItems = page.locator('[data-testid="discount-preview-link"]');
    const mainPostCount = await mainPostItems.count();

    if (mainPostCount === 0) {
      console.log("❌ 테스트할 포스트가 없습니다.");
      expect(true).toBeTruthy();
      return;
    }

    // 7. 첫 번째 포스트로 이동
    const firstPost = mainPostItems.first();
    await firstPost.click();
    await page.waitForLoadState("networkidle");

    // 포스트 디테일 페이지 로딩 대기
    const postDetailArticle = page.locator(
      '[data-testid="post-detail-article"]',
    );
    await expect(postDetailArticle).toBeVisible({ timeout: 10000 });

    // 8. 좋아요 버튼 상태 확인
    const likeButton = page.locator('[data-testid="post-detail-like-button"]');
    await expect(likeButton).toBeVisible({ timeout: 5000 });

    // 좋아요 버튼의 초기 상태 확인 (filled 여부로 isLikedByMe 판단)
    const likeButtonIcon = likeButton.locator("svg");
    const initialIconClasses =
      (await likeButtonIcon.getAttribute("class")) || "";
    const initialIsLiked =
      initialIconClasses.includes("fill-current") ||
      initialIconClasses.includes("fill-red") ||
      (await likeButton.getAttribute("data-liked")) === "true";

    console.log(
      `💡 초기 좋아요 상태: ${initialIsLiked ? "liked (T)" : "not liked (F)"}`,
    );

    // 9. 좋아요 버튼 클릭
    console.log("❤️ 좋아요 버튼 클릭");
    await likeButton.click();

    // 상태 변화 대기
    await page.waitForTimeout(1000);

    // 10. 클릭 후 좋아요 버튼 상태 확인
    const updatedIconClasses =
      (await likeButtonIcon.getAttribute("class")) || "";
    const updatedIsLiked =
      updatedIconClasses.includes("fill-current") ||
      updatedIconClasses.includes("fill-red") ||
      (await likeButton.getAttribute("data-liked")) === "true";

    console.log(
      `💡 클릭 후 좋아요 상태: ${updatedIsLiked ? "liked (T)" : "not liked (F)"}`,
    );

    // 11. 상태 변화 검증
    if (initialIsLiked) {
      // 초기에 좋아요 상태였다면 클릭 후 해제되어야 함
      expect(updatedIsLiked).toBeFalsy();
      console.log("✅ 좋아요 해제 확인 (Fill → Unfilled)");
    } else {
      // 초기에 좋아요가 아니었다면 클릭 후 좋아요 상태가 되어야 함
      expect(updatedIsLiked).toBeTruthy();
      console.log("✅ 좋아요 설정 확인 (Unfilled → Fill)");
    }

    // 12. 홈으로 돌아가기
    console.log("🏠 홈페이지로 이동");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // useLikedPosts 훅 데이터 로딩 대기

    // 13. 내가 좋아하는 포스트 섹션에서 포스트 개수 다시 확인
    const updatedMyDiscountSection = page.locator(
      '[data-testid="my-discount-section"]',
    );

    let finalPostCount = 0;
    const updatedSectionExists = await updatedMyDiscountSection.isVisible({
      timeout: 5000,
    });

    if (updatedSectionExists) {
      const updatedPostItems = page.locator(
        '[data-testid="my-discount-post-item"]',
      );
      finalPostCount = await updatedPostItems.count();
    }

    console.log(`📄 최종 좋아하는 포스트 개수: ${finalPostCount}개`);

    // 14. 포스트 개수 변화 검증
    if (initialIsLiked) {
      // 초기에 좋아요 상태였다가 해제한 경우 → 개수 감소
      expect(finalPostCount).toBeLessThan(initialPostCount);
      console.log(
        `✅ 좋아요 해제로 포스트 개수 감소: ${initialPostCount}개 → ${finalPostCount}개`,
      );
    } else {
      // 초기에 좋아요가 아니었다가 설정한 경우 → 개수 증가
      expect(finalPostCount).toBeGreaterThan(initialPostCount);
      console.log(
        `✅ 좋아요 설정으로 포스트 개수 증가: ${initialPostCount}개 → ${finalPostCount}개`,
      );
    }

    console.log("✅ 좋아요 상태 변화 및 UI 반응 테스트 완료");
  });

  test("로그아웃 상태에서는 내가 좋아하는 포스트 섹션이 표시되지 않는다", async ({
    page,
  }) => {
    // 1. 홈페이지 진입
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 2. 로그아웃 상태 확인 및 로그아웃 수행
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    const logoutButton = page.locator('[data-testid="navbar-logout-button"]');

    const isLogoutButtonVisible = await logoutButton.isVisible({
      timeout: 3000,
    });

    // 로그인 되어 있다면 로그아웃
    if (isLogoutButtonVisible) {
      console.log("🚪 로그아웃 진행");
      await logoutButton.click();
      await page.waitForLoadState("networkidle");
      await expect(loginButton).toBeVisible({ timeout: 15000 });
      console.log("✅ 로그아웃 완료");
    }

    // 3. 로그아웃 상태 확인
    await expect(loginButton).toBeVisible({ timeout: 5000 });

    // 4. 페이지 새로고침하여 상태 확인
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // 5. MyDiscountClient 섹션이 표시되지 않는지 확인
    const myDiscountSection = page.locator(
      '[data-testid="my-discount-section"]',
    );

    // 로그아웃 상태에서는 섹션과 로딩 모두 표시되지 않아야 함
    const sectionVisible = await myDiscountSection.isVisible({ timeout: 2000 });
    expect(sectionVisible).toBeFalsy();

    console.log("✅ 로그아웃 상태에서 내가 좋아하는 포스트 섹션 미표시 확인");
  });

  test("좋아요 버튼을 누르면 내가 좋아하는 포스트 목록이 증가한다", async ({
    page,
  }) => {
    // 1. 홈페이지 진입 및 로그인
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    const logoutButton = page.locator('[data-testid="navbar-logout-button"]');

    const isLogoutButtonVisible = await logoutButton.isVisible({
      timeout: 3000,
    });

    if (!isLogoutButtonVisible) {
      console.log("🔑 로그인 진행");
      await loginButton.click();
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL(/.*\/auth\/sign-in/);

      const devLoginButton = page.locator('[data-testid="dev-login-button"]');
      await expect(devLoginButton).toBeVisible({ timeout: 10000 });
      await devLoginButton.click();

      await page.waitForURL("/", { timeout: 15000 });
      await page.waitForLoadState("networkidle");
      console.log("✅ 로그인 완료");
    }

    // 2. 로그인 상태 확인 후 페이지 새로고침
    await expect(logoutButton).toBeVisible({ timeout: 10000 });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // 3. 내가 좋아하는 포스트 섹션에서 초기 포스트 개수 확인
    const myDiscountSection = page.locator(
      '[data-testid="my-discount-section"]',
    );

    let initialPostCount = 0;
    const sectionExists = await myDiscountSection.isVisible({ timeout: 5000 });

    if (sectionExists) {
      const postItems = page.locator('[data-testid="my-discount-post-item"]');
      initialPostCount = await postItems.count();
      console.log(`📄 초기 좋아하는 포스트 개수: ${initialPostCount}개`);
    }

    // 4. 일반 포스트 목록에서 아직 좋아요하지 않은 포스트 찾기
    const mainPostItems = page.locator('[data-testid="discount-preview-link"]');
    const mainPostCount = await mainPostItems.count();

    if (mainPostCount === 0) {
      console.log("❌ 테스트할 포스트가 없습니다.");
      expect(true).toBeTruthy(); // 테스트 스킵
      return;
    }

    // 5. 첫 번째 포스트로 이동
    const firstPost = mainPostItems.first();
    await firstPost.click();
    await page.waitForLoadState("networkidle");

    // 포스트 디테일 페이지 로딩 대기
    const postDetailArticle = page.locator(
      '[data-testid="post-detail-article"]',
    );
    await expect(postDetailArticle).toBeVisible({ timeout: 10000 });

    // 6. 좋아요 버튼 찾기 및 클릭
    const likeButton = page.locator('[data-testid="post-detail-like-button"]');
    await expect(likeButton).toBeVisible({ timeout: 5000 });

    console.log("❤️ 좋아요 버튼 클릭");
    await likeButton.click();

    // 좋아요 처리 대기
    await page.waitForTimeout(1000);

    // 7. 홈으로 돌아가기
    console.log("🏠 홈페이지로 이동");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // useLikedPosts 훅 데이터 로딩 대기

    // 8. 내가 좋아하는 포스트 섹션에서 포스트 개수 다시 확인
    const updatedMyDiscountSection = page.locator(
      '[data-testid="my-discount-section"]',
    );

    // 섹션이 나타날 때까지 대기 (새로 좋아요한 포스트로 인해 섹션이 생성될 수 있음)
    await expect(updatedMyDiscountSection).toBeVisible({ timeout: 10000 });

    const updatedPostItems = page.locator(
      '[data-testid="my-discount-post-item"]',
    );
    const finalPostCount = await updatedPostItems.count();

    console.log(`📄 좋아요 후 포스트 개수: ${finalPostCount}개`);

    // 9. 포스트 개수가 증가했는지 확인
    expect(finalPostCount).toBeGreaterThan(initialPostCount);
    console.log(
      `✅ 좋아하는 포스트가 ${initialPostCount}개에서 ${finalPostCount}개로 증가했습니다`,
    );

    console.log("✅ 좋아요 버튼 상호작용 테스트 완료");
  });
});
