import { expect, test } from "@playwright/test";

test.describe("오늘의 할인 상품 탐색 여정", () => {
  test("오늘의 할인 리스트 클릭 > 디테일 페이지 이동 > 이미지 링크 클릭", async ({
    page,
  }) => {
    // 1. 홈페이지 진입
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/할인탐정/);

    // 오늘의 할인이 보이나요?
    const discountContainer = page.locator(
      '[data-testid="main-list-container-오늘의-할인"]',
    );
    await expect(discountContainer).toBeVisible({ timeout: 10000 });

    // 리스트가 있나요?
    const discountLinks = page.locator('[data-testid="discount-preview-link"]');
    await expect(discountLinks.first()).toBeVisible({ timeout: 15000 });

    // 4. 첫 번째 할인 상품에 호버하여 프리페칭 동작 확인 (데스크톱에서만)
    const firstDiscountLink = discountLinks.first();

    // 첫 번째 할인 링크 정보 확인
    const linkText = await firstDiscountLink.textContent();
    const linkHref = await firstDiscountLink.getAttribute("href");
    console.log(`🔗 첫 번째 할인 링크 정보:`, {
      text: linkText,
      href: linkHref,
    });

    // 모바일 디바이스인지 확인
    const isMobile = await page.evaluate(() => {
      return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    });

    if (!isMobile) {
      // 데스크톱에서만 프리페칭 테스트 실행
      // 4-2. 호버하여 프리페칭 트리거 (just hover to test interaction)
      await firstDiscountLink.hover();

      // Wait for any hover effects to complete
      await page.waitForTimeout(500);

      // 호버 상태에서 요소가 여전히 표시되는지 확인
      await expect(firstDiscountLink).toBeVisible();
    } else {
      console.log(`📱 모바일 디바이스 감지: 프리페칭 테스트 건너뜀`);
    }

    // 5. 할인 상품 클릭하여 상세페이지로 이동
    // Wait for everything to stabilize before clicking
    await page.waitForTimeout(500);
    await firstDiscountLink.click();

    // 페이지 이동 대기
    await page.waitForLoadState("domcontentloaded");
    console.log(page.url());
    // URL이 상세페이지로 변경되었는지 확인 (posts/숫자 패턴)
    await expect(page).toHaveURL(/.*\/posts\/\d+/);

    // 상세페이지가 로드되었는지 확인
    await page.waitForLoadState("networkidle");

    // 상세페이지 데이터
    const errorElement = page.locator('[data-testid="post-detail-error"]');
    const noDataElement = page.locator('[data-testid="post-detail-no-data"]');

    // 데이터가 정상적으로 로드되었는지 확인 (에러나 no data가 아닌 상태)
    await expect(errorElement).not.toBeVisible();
    await expect(noDataElement).not.toBeVisible();

    // Wait for loading to complete and content to render
    const loadingElement = page.locator('[data-testid="post-detail-loading"]');

    // Wait for loading to disappear if it exists
    try {
      await expect(loadingElement).not.toBeVisible({ timeout: 5000 });
    } catch {
      // Loading element might not exist, that's okay
    }

    // 실제 포스트 콘텐츠가 표시되었는지 확인 (PostDetailWithEvent 또는 PostDetailWithoutEvent)
    const postArticle = page.locator('[data-testid="post-detail-article"]');
    await expect(postArticle).toBeVisible({ timeout: 15000 });

    // 6. 상세페이지에서 바로가기 이미지 확인 (data-testid 사용)
    const shortcutElement = page.locator(
      '[data-testid="post-detail-image-section"]',
    );
    await expect(shortcutElement).toBeVisible({ timeout: 10000 });

    // 7. 바로가기 클릭하여 홈페이지로 복귀
    await shortcutElement.click();

    console.log(
      "✅ 사용자 여정 테스트 완료: 홈 → 상품 호버 → 상세보기 → 홈페이지",
    );
  });

  test("모바일에서도 동일한 사용자 여정이 작동한다", async ({ page }) => {
    // 모바일 뷰포트 설정
    await page.setViewportSize({ width: 375, height: 667 });

    // 1. 홈페이지 진입
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 2. "오늘의 할인" 섹션 확인 (모바일용 - 자동 생성된 data-testid)
    const todayDiscountSection = page.locator(
      '[data-testid="main-list-section-오늘의-할인"]',
    );
    await expect(todayDiscountSection).toBeVisible({ timeout: 10000 });

    // 3. 모바일 할인 링크 확인 (data-testid 사용)
    const mobileDiscountLinks = page.locator(
      '[data-testid="discount-preview-link"]',
    );
    await expect(mobileDiscountLinks.first()).toBeVisible({ timeout: 15000 });

    // 4. 모바일에서는 터치 이벤트이므로 호버 생략하고 바로 클릭
    // (모바일에서는 프리페칭 대신 클릭 시 빠른 로딩에 의존)
    const mobileFirstLink = mobileDiscountLinks.first();

    // 클릭할 링크의 post ID 추출 (로깅용)
    const mobileLinkHref = await mobileFirstLink.getAttribute("href");
    let mobilePostId: string | null = null;
    if (mobileLinkHref) {
      const match = mobileLinkHref.match(/\/posts\/(\d+)/);
      if (match) {
        mobilePostId = match[1];
        console.log(`📱 모바일에서 Post ID ${mobilePostId} 클릭 예정`);
      }
    }

    await mobileFirstLink.click();

    // 상세페이지 이동 확인
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/.*\/posts\/\d+/);

    // 5. 모바일 상세페이지에서 바로가기 확인 및 클릭 (data-testid 사용)
    const mobileShortcut = page.locator(
      '[data-testid="post-detail-image-section"]',
    );
    await expect(mobileShortcut).toBeVisible({ timeout: 10000 });
    await mobileShortcut.click();

    console.log("✅ 모바일 사용자 여정 테스트 완료");
  });

  test("네트워크 오류 상황에서 적절한 에러 처리가 된다", async ({ page }) => {
    // 1. 네트워크를 먼저 차단
    await page.route("**/api/**", (route) => {
      console.log("🚫 네트워크 요청 차단:", route.request().url());
      route.abort("failed");
    });

    // 2. 존재하지 않는 포스트로 직접 접근 (SSR 캐시 우회)
    const nonExistentPostId = 999999;
    await page.goto(`/posts/${nonExistentPostId}`, {
      waitUntil: "domcontentloaded",
    });
    // 에러 페이지 또는 에러 상태 확인
    const errorIndicators = page.locator(
      ['[data-testid="error-page-container"]'].join(", "),
    );

    await expect(errorIndicators.first()).toBeVisible({ timeout: 15000 });
  });

  test("존재하지 않는 게시물 접근 시 에러 페이지로 이동한다.", async ({
    page,
  }) => {
    const nonExistentPostId = 999999;

    // 존재하지 않는 게시물 URL로 직접 접근
    await page.goto(`/posts/${nonExistentPostId}`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    // 에러 페이지 또는 에러 상태 확인
    const errorIndicators = page.locator(
      ['[data-testid="error-page-container"]'].join(", "),
    );

    await expect(errorIndicators.first()).toBeVisible({ timeout: 15000 });

    console.log("✅ 에러페이지 이동 완료");
  });
});
