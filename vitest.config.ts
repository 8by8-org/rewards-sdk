import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      enabled: true,
      extension: '.ts',
      exclude: [
        'coverage/**',
        'dist/**',
        '**/node_modules/**',
        '**/__tests__/**',
        '**/index.ts',
        '**/[.]**',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        'vitest.config.ts',
      ],
      thresholds: {
        100: true,
      },
    },
  },
});
