import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/pg': 'http://tiankk.iask.in:5005/home',
      },
    },
    resolve: {
      alias: {
        '@hb/utils': path.resolve('', '../../libs/utils/src'),
        '@hb/ui': path.resolve('', '../../libs/ui/src'),
        '@hb/icon': path.resolve('', '../../libs/icon/src'),
      },
    },
  };
});
