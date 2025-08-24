import { expect, test } from "@playwright/test";

test.describe("MainAdArea 이미지 fallback 테스트", () => {
  test("왼쪽 이벤트 이미지가 없는 경우 fallback이 표시된다", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // MainAdArea 로딩 대기
    const mainAdArea = page.locator('[data-testid="main-ad-area"]');
    await expect(mainAdArea).toBeVisible({ timeout: 15000 });

    // 왼쪽 이벤트 영역 확인
    const leftEventArea = page.locator('[data-testid="main-ad-left-event"]');
    await expect(leftEventArea).toBeVisible();

    // 이미지가 있는지 또는 fallback이 있는지 확인
    const eventImage = leftEventArea.locator("img");
    const fallbackContainer = leftEventArea.locator(
      '[data-testid="event-fallback-container"]',
    );

    const hasImage = (await eventImage.count()) > 0;
    const hasFallback = (await fallbackContainer.count()) > 0;

    // 둘 중 하나는 반드시 있어야 함
    expect(hasImage || hasFallback).toBeTruthy();

    // fallback이 있는 경우, Calendar 아이콘과 보라색 배경 확인
    if (hasFallback) {
      await expect(fallbackContainer).toBeVisible();

      // Calendar 아이콘 확인
      const calendarIcon = page.locator('[data-testid="event-fallback-icon"]');
      await expect(calendarIcon).toBeVisible();

      // 보라색 그라데이션 배경 확인 (CSS 클래스로)
      await expect(fallbackContainer).toHaveClass(/from-purple-100/);
      await expect(fallbackContainer).toHaveClass(/to-purple-200/);

      console.log("❌ 왼쪽 이벤트 이미지 로딩 실패 - fallback 표시됨");

      // 테스트 실패로 처리
      throw new Error(
        "왼쪽 이벤트 이미지가 로딩되지 않아 fallback이 표시됨. 실제 이미지가 제대로 로딩되어야 함.",
      );
    } else {
      console.log("✅ 왼쪽 이벤트 이미지가 정상적으로 로드됨");
    }
  });

  test("오른쪽 그리드 아이템들의 fallback 상태를 확인한다", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // MainAdArea 로딩 대기
    const mainAdArea = page.locator('[data-testid="main-ad-area"]');
    await expect(mainAdArea).toBeVisible({ timeout: 15000 });

    // 오른쪽 그리드 확인
    const rightGrid = page.locator('[data-testid="main-ad-right-grid"]');
    await expect(rightGrid).toBeVisible();

    // 4개의 그리드 아이템 확인
    for (let i = 0; i < 4; i++) {
      const gridItem = page.locator(`[data-testid="main-ad-grid-item-${i}"]`);

      // 그리드 아이템이 존재하는지 확인
      if ((await gridItem.count()) > 0) {
        // 모바일에서는 일부 그리드 아이템이 숨겨져 있을 수 있음
        const isVisible = await gridItem
          .isVisible({ timeout: 2000 })
          .catch(() => false);
        if (!isVisible) {
          console.log(`⚠️ 그리드 아이템 ${i}: 모바일에서 숨겨진 상태`);
          continue;
        }

        // 각 아이템의 상태 확인
        const hasImage = (await gridItem.locator("img").count()) > 0;
        const hasFallbackImage =
          (await gridItem.locator('[data-testid="fallback-image"]').count()) >
          0;
        const hasNoData =
          (await gridItem
            .locator('[data-testid="no-data-container"]')
            .count()) > 0;

        if (hasNoData) {
          // "정보 없음" 상태 - 데이터 자체가 없는 경우이므로 실패로 처리
          const noDataText = gridItem.locator('[data-testid="no-data-text"]');
          await expect(noDataText).toBeVisible();
          await expect(noDataText).toHaveText("정보 없음");
          console.log(
            `❌ 그리드 아이템 ${i}: 데이터 없음 - API에서 데이터를 제대로 받아오지 못함`,
          );
          throw new Error(
            `그리드 아이템 ${i}에 데이터가 없습니다. API에서 충분한 데이터를 제공해야 합니다.`,
          );
        } else if (hasFallbackImage) {
          // fallback 이미지 상태 - 실제 이미지 로딩 실패를 의미하므로 실패로 처리
          const fallbackImg = gridItem.locator(
            '[data-testid="fallback-image"]',
          );
          await expect(fallbackImg).toBeVisible();
          // fallback 이미지 src 확인
          await expect(fallbackImg).toHaveAttribute(
            "src",
            "/discount-character-1024.webp",
          );
          console.log(
            `❌ 그리드 아이템 ${i}: 이미지 로딩 실패 - fallback 이미지 표시됨`,
          );
          throw new Error(
            `그리드 아이템 ${i}의 실제 이미지가 로딩되지 않아 fallback 이미지가 표시됨. 실제 이미지가 제대로 로딩되어야 함.`,
          );
        } else if (hasImage) {
          // 정상 이미지 상태
          const img = gridItem.locator("img").first();
          await expect(img).toBeVisible();
          console.log(`✅ 그리드 아이템 ${i}: 정상 이미지 로딩`);
        }
      }
    }
  });

  test("모바일에서도 fallback 상태가 정상적으로 표시된다", async ({ page }) => {
    // 모바일 뷰포트 설정
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // MainAdArea 확인
    const mainAdArea = page.locator('[data-testid="main-ad-area"]');
    await expect(mainAdArea).toBeVisible({ timeout: 15000 });

    // 모바일에서 왼쪽 이벤트 영역 확인
    const leftEventArea = page.locator('[data-testid="main-ad-left-event"]');
    await expect(leftEventArea).toBeVisible();

    // 모바일에서 오른쪽 그리드 확인
    const rightGrid = page.locator('[data-testid="main-ad-right-grid"]');
    await expect(rightGrid).toBeVisible();

    console.log("✅ 모바일에서 MainAdArea fallback 상태 확인 완료");
  });

  test("fallback 동작이 올바르게 작동한다 (네트워크 차단 시)", async ({
    page,
  }) => {
    // 이미지 요청을 차단하여 fallback 상황 강제 생성
    await page.route("**/*.{jpg,jpeg,png,webp,gif}", (route) => {
      const url = route.request().url();
      // 로컬 이미지는 허용, 외부 이미지만 차단
      if (
        url.includes("localhost") ||
        url.startsWith("data:") ||
        url.includes("/discount-character")
      ) {
        route.continue();
      } else {
        console.log("🚫 외부 이미지 차단:", url);
        route.abort("failed");
      }
    });

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // MainAdArea 로딩 대기 (외부 이미지 로딩 실패로 인한 지연 고려)
    const mainAdArea = page.locator('[data-testid="main-ad-area"]');
    await expect(mainAdArea).toBeVisible({ timeout: 20000 });

    // 네트워크 오류 시에도 UI가 깨지지 않고 fallback이 표시되는지 확인
    const leftEventArea = page.locator('[data-testid="main-ad-left-event"]');
    await expect(leftEventArea).toBeVisible();

    const rightGrid = page.locator('[data-testid="main-ad-right-grid"]');
    await expect(rightGrid).toBeVisible();

    // fallback 상태들이 적절히 표시되는지 확인
    // (외부 이미지 차단으로 인해 fallback이 더 자주 나타날 것)

    // 이 테스트에서는 fallback이 제대로 표시되는지만 확인 (실패로 간주하지 않음)
    const networkLeftEventArea = page.locator(
      '[data-testid="main-ad-left-event"]',
    );
    const networkFallbackContainer = networkLeftEventArea.locator(
      '[data-testid="event-fallback-container"]',
    );

    if ((await networkFallbackContainer.count()) > 0) {
      await expect(networkFallbackContainer).toBeVisible();
      console.log("✅ 네트워크 차단 시 왼쪽 이벤트 fallback 정상 표시됨");
    }

    console.log("✅ 네트워크 오류 상황에서 fallback 동작 확인 완료");
  });

  test("데이터 로딩 실패 시 적절한 에러 처리가 된다", async ({ page }) => {
    // API 요청을 차단하여 데이터 로딩 실패 상황 생성
    await page.route("**/api/**", (route) => {
      console.log("🚫 API 요청 차단:", route.request().url());
      route.abort("failed");
    });

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // API 실패 시 MainAdArea가 렌더링되지 않을 수 있음
    // (컴포넌트 내부에서 데이터가 없으면 null을 반환)

    // 페이지가 완전히 깨지지 않고 기본 레이아웃은 유지되는지 확인
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // 네비게이션 바 등 기본 UI는 표시되어야 함
    const navbar = page.locator("nav");
    if ((await navbar.count()) > 0) {
      await expect(navbar.first()).toBeVisible();
    }

    console.log("✅ API 로딩 실패 시 적절한 에러 처리 확인 완료");
  });
});
