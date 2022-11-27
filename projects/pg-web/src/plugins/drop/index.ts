import { listen } from '@tauri-apps/api/event';
import { musicHandler } from './musicHandler';
import { novelHandler } from './novelHandler';
import { Directory, handleFilePath, initDirectory } from './utils';

type MetaInfoNovel = {
  name: string;
  chapter: { name: string; path: string }[];
};

// handle drop file to app
function drop() {
  initDirectory();

  listen('tauri://file-drop', async (event) => {
    // for now only support one file import
    const path: string = Array.isArray(event.payload) ? event.payload[0] : '';
    if (path === '') {
      return;
    }
    const mapping: Record<string, (path: string) => Promise<boolean>> = {
      map3: musicHandler,
      txt: novelHandler,
    };
    const { suffix } = handleFilePath(path);
    return mapping[suffix.toLowerCase()]?.(path);
  });
}

export { type MetaInfoNovel, Directory, drop };
