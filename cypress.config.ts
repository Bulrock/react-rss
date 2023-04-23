import { defineConfig } from 'cypress';
import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:8000',
    setupNodeEvents(on, config) {
      coverage(on, config);
      return config;
    },
  },
});
