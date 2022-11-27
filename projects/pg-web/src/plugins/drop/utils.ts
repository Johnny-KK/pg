import { BaseDirectory, readDir, createDir, exists } from '@tauri-apps/api/fs';

enum Directory {
  MUSIC = 'music',
  NOVEL = 'novel',
  NOVEL_CRYPTO = 'novel_crypto',
  WIKI = 'wiki',
}

// check dir if not exsit then create it
function checkDir(dir: Directory): Promise<boolean> {
  return readDir(dir, { dir: BaseDirectory.App, recursive: false })
    .then(() => {
      return true;
    })
    .catch(() => {
      return createDir(dir, { dir: BaseDirectory.App, recursive: true });
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

/**
 * @param path source absolute path
 */
function checkFileExist(path: string): Promise<boolean> {
  return exists(path)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

function handleFilePath(path: string): { name: string; suffix: string; nameWithSuffix: string } {
  const nameWithSuffix = path.split('\\').at(-1);
  const suffix = nameWithSuffix.split('.').at(-1);
  const name = nameWithSuffix.slice(0, nameWithSuffix.length - suffix.length - 1);
  return { name, suffix, nameWithSuffix };
}

async function initDirectory(): Promise<void> {
  Promise.all([checkDir(Directory.MUSIC), checkDir(Directory.NOVEL), checkDir(Directory.NOVEL_CRYPTO), checkDir(Directory.WIKI)]);
}

export { Directory, handleFilePath, checkDir, checkFileExist, initDirectory };
