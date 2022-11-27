import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;
const withInstall = <T>(comp: T, name: string) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    app.component(name, comp);
  };
  return comp as SFCWithInstall<T>;
};

export { withInstall };
