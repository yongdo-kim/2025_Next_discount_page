import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */

// npx playwright show-report e2e-output/report
// npx playwright test e2e/google-login.spec.ts --headed
export default defineConfig({
  // E2E 테스트 파일 위치
  testDir: "./e2e",

  // 각 테스트의 타임아웃 (60초)
  timeout: 60 * 1000,

  // expect() 함수의 타임아웃 (10초)
  expect: {
    timeout: 10000,
  },

  // 테스트 실행 설정
  fullyParallel: true, // 병렬 실행
  forbidOnly: !!process.env.CI, // CI에서는 test.only 금지
  retries: process.env.CI ? 2 : 0, // CI에서는 실패시 2번 재시도
  workers: process.env.CI ? 1 : undefined, // CI에서는 1개 워커만 사용

  // 리포터 설정
  reporter: [
    [
      "html",
      {
        outputFolder: "e2e-output/report",
        open: "never",
        showTrace: true,
      },
    ], // HTML 리포트 생성
    ["list"], // 콘솔에 리스트 형태로 출력
    ["json", { outputFile: "e2e-output/test-results.json" }], // JSON 리포트
  ],

  // 모든 프로젝트에 공통으로 적용될 설정
  use: {
    // 기본 URL (로컬 개발 서버)
    baseURL: "http://localhost:3001",

    // 실패한 테스트의 스크린샷 저장
    screenshot: "only-on-failure",

    // 실패한 테스트의 비디오 저장
    video: "retain-on-failure",

    // 테스트 추적 설정 (디버깅용)
    trace: "on-first-retry",

    // 브라우저 컨텍스트 설정
    ignoreHTTPSErrors: true,

    // 뷰포트 크기 (데스크톱)
    viewport: { width: 1280, height: 720 },
  },

  // 다양한 브라우저와 디바이스에서 테스트
  projects: [
    // my-discount-client.spec.ts용 단일 워커 프로젝트
    {
      name: "my-discount-client-chromium",
      testMatch: "**/my-discount-client.spec.ts",
      use: { ...devices["Desktop Chrome"] },
      fullyParallel: false,
      workers: 1,
    },

    // 나머지 테스트용 일반 프로젝트들
    {
      name: "chromium",
      testIgnore: "**/my-discount-client.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      testIgnore: "**/my-discount-client.spec.ts",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      testIgnore: "**/my-discount-client.spec.ts",
      use: { ...devices["Desktop Safari"] },
    },

    // 모바일 테스트
    {
      name: "Mobile Chrome",
      testIgnore: "**/my-discount-client.spec.ts",
      use: { ...devices["Pixel 5"] },
    },

    {
      name: "Mobile Safari",
      testIgnore: "**/my-discount-client.spec.ts",
      use: { ...devices["iPhone 12"] },
    },

    // 태블릿 테스트
    {
      name: "iPad",
      testIgnore: "**/my-discount-client.spec.ts",
      use: { ...devices["iPad Pro 11"] },
    },
  ],

  // 개발 서버 설정 (테스트 실행 전 자동으로 서버 시작)
  webServer: {
    command: "npm run dev -- --port 3001",
    port: 3001,
    reuseExistingServer: !process.env.CI, // 로컬에서는 기존 서버 재사용
    timeout: 120 * 1000, // 서버 시작 대기 시간 (2분)
  },

  // 테스트 결과 저장 위치
  outputDir: "e2e-output/test-results/",
});
