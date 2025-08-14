import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // E2E 테스트 파일 위치
  testDir: "./e2e",

  // 각 테스트의 타임아웃 (30초)
  timeout: 30 * 1000,

  // expect() 함수의 타임아웃 (5초)
  expect: {
    timeout: 5000,
  },

  // 테스트 실행 설정
  fullyParallel: true, // 병렬 실행
  forbidOnly: !!process.env.CI, // CI에서는 test.only 금지
  retries: process.env.CI ? 2 : 0, // CI에서는 실패시 2번 재시도
  workers: process.env.CI ? 1 : undefined, // CI에서는 1개 워커만 사용

  // 리포터 설정
  reporter: [
    ["html"], // HTML 리포트 생성
    ["list"], // 콘솔에 리스트 형태로 출력
    ["json", { outputFile: "test-results.json" }], // JSON 리포트
  ],

  // 모든 프로젝트에 공통으로 적용될 설정
  use: {
    // 기본 URL (로컬 개발 서버)
    baseURL: "http://localhost:3000",

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
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    // 모바일 테스트
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },

    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },

    // 태블릿 테스트
    {
      name: "iPad",
      use: { ...devices["iPad Pro"] },
    },
  ],

  // 개발 서버 설정 (테스트 실행 전 자동으로 서버 시작)
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI, // 로컬에서는 기존 서버 재사용
    timeout: 120 * 1000, // 서버 시작 대기 시간 (2분)
  },

  // 테스트 결과 저장 위치
  outputDir: "test-results/",
});
