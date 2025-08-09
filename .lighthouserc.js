module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/contact',
        'http://localhost:3000/my-page',
        'http://localhost:3000/auth/sign-in'
      ],
      // startServerCommand: 'npm run build && npm run prod', //프로덕션 성능 측정.
      // startServerReadyPattern: 'Ready in',
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --headless --disable-gpu --disable-dev-shm-usage --disable-web-security --allow-running-insecure-content --ignore-certificate-errors'
      }
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // 이전 빌드 대비 성능 회귀 감지 (5% 이내 허용)
        'categories:performance': ['error', { aggregationMethod: 'optimistic', minScore: 0.95 }],
        'categories:accessibility': ['error', { aggregationMethod: 'optimistic', minScore: 0.95 }],
        'categories:best-practices': ['error', { aggregationMethod: 'optimistic', minScore: 0.95 }],
        'categories:seo': ['error', { aggregationMethod: 'optimistic', minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {
      port: 3000,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './lhci.db',
      },
    },
  },
};