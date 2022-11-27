import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outputDir: [resolve(__dirname, './dist/lib'), resolve(__dirname, './dist/es')],
      tsConfigFilePath: '../../tsconfig.json',
    }),
  ],
  build: {
    target: 'modules',
    lib: {
      entry: './src/index.ts',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
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
});
