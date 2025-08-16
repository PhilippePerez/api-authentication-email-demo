import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    plugins: [vue(), vueDevTools()],
    server: {
        proxy: {
            '/api': {
                // target: 'http://172.17.0.2:5001',
                target: 'https://otp-authentication-api-email.p.rapidapi.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'vue-component-toolkit/src': fileURLToPath(new URL('./node_modules/vue-component-toolkit/src', import.meta.url)),
            'vue-component-toolkit/dist': fileURLToPath(new URL('./node_modules/vue-component-toolkit/dist', import.meta.url)),
        },
    },
});
