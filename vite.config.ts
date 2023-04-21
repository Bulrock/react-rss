/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react(), eslint(), viteTsconfigPaths(), svgrPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/setupTests.ts', 'src/tests', 'src/data'],
    },
  },
});
