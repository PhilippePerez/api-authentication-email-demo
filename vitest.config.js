import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // Use jsdom for testing Vue components
    globals: true,         // Enables global variables like describe, it, expect
  },
})
