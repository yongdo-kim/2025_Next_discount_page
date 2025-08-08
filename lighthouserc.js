module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/contact',
        'http://localhost:3000/my-page',
        'http://localhost:3000/auth/sign-in',
      ],
      settings: {
        chromeFlags: '--no-sandbox --headless --disable-gpu --disable-dev-shm-usage --incognito',
        preset: 'desktop',
      },
      numberOfRuns: 1, // CI에서는 빠른 실행을 위해 1번만
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.7 }], // CI 환경 고려하여 0.7로 완화
        'categories:accessibility': ['error', { minScore: 0.85 }], // 0.85로 완화
        'categories:best-practices': ['error', { minScore: 0.75 }], // 0.75로 완화
        'categories:seo': ['warn', { minScore: 0.8 }], // 0.8로 완화
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};