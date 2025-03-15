import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        workspace: [
            {
                extends: true,
                test: {
                    name: 'browser',
                    // browser: {
                    //     enabled: false,
                    //     instances: [{ browser: 'chromium' }],
                    //     provider: 'playwright'
                    // },
                    environment: 'jsdom',
                    exclude: ['_old', 'node_modules'],
                    include: ['**/*.browser.test.ts'],
                    setupFiles: ['./test/browser-setup.ts']
                }
            },
            {
                extends: true,

                test: {
                    setupFiles: ['./test/setup.ts'],
                    name: 'node',
                    environment: 'node',
                    exclude: ['_old', 'node_modules'],
                    include: ['**/*.integration.test.ts']
                }
            }
        ]
    }
});
