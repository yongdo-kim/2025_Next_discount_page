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
        'categories:performance': ['warn', { aggregationMethod: 'median-run' }],
        'categories:accessibility': ['warn', { aggregationMethod: 'median-run' }], 
        'categories:best-practices': ['warn', { aggregationMethod: 'median-run' }],
        'categories:seo': ['warn', { aggregationMethod: 'median-run' }]
      }
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