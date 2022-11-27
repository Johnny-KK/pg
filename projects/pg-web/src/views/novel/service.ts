import { BaseDirectory, readDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { Directory } from '../../plugins/drop';
import CryptoJS from 'crypto-js';
import { db, Novel } from '../../db';

// list novel from db
async function dbListNovel(): Promise<Novel[]> {
  return db.novel.toArray();
}

// list novel from local device
async function scanNovelFromLocal(): Promise<Novel[]> {
  return readDir(Directory.NOVEL, { dir: BaseDirectory.App, recursive: true }).then((response) => {
    return response.map((x) => {
      return {
        name: x.name,
        author: '',
        path: x.path,
        progress: 0,
        chapter: x.children
          .map((y) => {
            return { name: y.name, path: y.path };
          })
          .sort((a, b) => a.name.localeCompare(b.name, 'kn', { numeric: true })),
      };
    });
  });
}

async function dbAddNovels(novels: Novel[]) {
  return db.novel.bulkAdd(novels);
}

async function dbUpdateProgress(id: number, progress: number): Promise<void> {
  await db.novel.update(id, { progress });
}

async function dbFetchNovelById(id: number): Promise<Novel> {
  return db.novel.get(id);
}

async function apiLoadMeta(novelName: string): Promise<Novel> {
  const metaPath = `${Directory.NOVEL}\\${novelName}\\meta`;
  const res: string = await readTextFile(metaPath, { dir: BaseDirectory.App });
  return JSON.parse(res);
}

async function apiLoadChapter(path: string) {
  return await readTextFile(path, { dir: BaseDirectory.App });
}

const key = '255ed2d8059b8bde90a8fd07b070a53554baa20aa4dc09bcfc4eb2cfab009093';
async function apiAddCryptoNovel(filename: string, content: string): Promise<void> {
  // filename = CryptoJS.AES.encrypt(filename, key).toString();
  content = CryptoJS.AES.encrypt(content, key).toString();
  const path = `${Directory.NOVEL_CRYPTO}\\${filename}`;
  await writeTextFile(path, content, { dir: BaseDirectory.App });
  return;
}

async function apiListCryptoNovel() {
  return readDir(Directory.NOVEL_CRYPTO, { dir: BaseDirectory.App, recursive: false }).then((response) => {
    return response.map((x) => {
      return {
        name: x.name,
        // name: CryptoJS.AES.decrypt(x.name, key).toString(CryptoJS.enc.Utf8),
      };
    });
  });
}

async function apiLoadCryptoNovel() {
  const path = `${Directory.NOVEL_CRYPTO}\\测试小说`;
  return readTextFile(path, { dir: BaseDirectory.App }).then((response) => {
    console.warn(response);
    return CryptoJS.AES.decrypt(response, key).toString(CryptoJS.enc.Utf8);
  });
}

export { type Novel };
export {
  dbListNovel,
  scanNovelFromLocal,
  dbAddNovels,
  dbFetchNovelById,
  dbUpdateProgress,
  apiLoadMeta,
  apiLoadChapter,
  apiAddCryptoNovel,
  apiListCryptoNovel,
  apiLoadCryptoNovel,
};
