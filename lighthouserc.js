module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/contact",
        "http://localhost:3000/my-page",
        "http://localhost:3000/auth/sign-in",
      ],
      settings: {
        chromeFlags:
          "--no-sandbox --headless --disable-gpu --disable-dev-shm-usage --incognito",
        preset: "desktop",
      },
      numberOfRuns: 1, // CI에서는 빠른 실행을 위해 1번만
    },
    assert: {
      assertions: {
        "categories:performance": [
          "error",
          { minScore: 0.7, aggregationMethod: "median-run" },
        ],
        "categories:accessibility": [
          "error",
          { minScore: 0.9, aggregationMethod: "median-run" },
        ],
        "categories:best-practices": [
          "error",
          { minScore: 0.8, aggregationMethod: "median-run" },
        ],
        "categories:seo": [
          "error",
          { minScore: 0.9, aggregationMethod: "median-run" },
        ],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    server: {
      port: 3000,
      storage: {
        storageMethod: "sql",
        sqlDialect: "sqlite",
        sqlDatabasePath: "./lhci.db",
      },
    },
  },
};
