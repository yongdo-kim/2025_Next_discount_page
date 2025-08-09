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
      assertions: {
        'categories:performance': ['warn', { minScore: 0.5 }],
        'categories:accessibility': ['warn', { minScore: 0.5 }],
        'categories:best-practices': ['warn', { minScore: 0.5 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
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