/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    dts({
      entryRoot: resolve(__dirname, './src'),
      outputDir: [resolve(__dirname, './dist/es'), resolve(__dirname, './dist/lib')],
      tsConfigFilePath: '../../tsconfig.json',
    }),
    {
      name: 'style',
      generateBundle(config, bundle) {
        const keys = Object.keys(bundle);
        for (const key of keys) {
          const bundler: any = bundle[key as any];
          this.emitFile({
            type: 'asset',
            fileName: key,
            source: bundler.code.replace(/\.less/g, '.css'),
          });
        }
      },
    },
  ],
  build: {
    target: 'modules',
    lib: {
      entry: './src/index.ts',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['vue', /\.less/, 'production', '@hb/utils'],
      input: ['./src/index.ts'],
      output: [
        {
          format: 'cjs',
          dir: resolve(__dirname, './dist/lib'),
          entryFileNames: '[name].js',
          preserveModules: true,
        },
        {
          format: 'es',
          dir: resolve(__dirname, './dist/es'),
          entryFileNames: '[name].js',
          preserveModules: true,
        },
      ],
    },
    sourcemap: true,
  },
  test: {
    environment: 'happy-dom',
  },
});
