import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import Path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/main.js'],
            refresh: true,
        }),
        react()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'resources/js'),
        },
    },
});
