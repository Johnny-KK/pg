declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
