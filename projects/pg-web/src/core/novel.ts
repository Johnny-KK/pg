import { randomString } from '@hb/utils';
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { db } from './db';
import { Catalog, Novel, NovelMeta } from './type';

async function fsLoadCatalogAndProgress(id: number): Promise<{ catalog: Catalog; progress: number }> {
  const novel: Novel | undefined = await db.novel.get(id);
  if (novel === undefined) {
    throw new Error('未查询到小说');
  }
  const metaString: string = await readTextFile(`${novel.path}\\meta`, { dir: BaseDirectory.App });
  // TODO parse error
  const meta: NovelMeta = JSON.parse(metaString);
  return { catalog: meta.catalog, progress: novel.progress };
}

async function fsLoadChapter(path: string): Promise<string> {
  return await readTextFile(path, { dir: BaseDirectory.App });
}

async function dbUpdateProgress(id: number, progress: number): Promise<void> {
  await db.novel.update(id, { progress });
}

async function dbAddNovel(meta: NovelMeta): Promise<void> {
  await db.novel.add({ name: meta.name, author: '', path: `novel\\${meta.name}`, update: randomString(), progress: 0 });
}

export type { Catalog };
export { fsLoadCatalogAndProgress, fsLoadChapter, dbUpdateProgress, dbAddNovel };