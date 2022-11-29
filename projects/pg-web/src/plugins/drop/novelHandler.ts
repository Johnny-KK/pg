import { confirm } from '@tauri-apps/api/dialog';
import { BaseDirectory, createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { dbAddNovel, NovelMeta } from '../../core';
import { checkDir, Directory, handleFilePath } from './utils';

/**
 * @param path source absolute path
 */
async function novelHandler(path: string): Promise<boolean> {
  return confirm('是否导入小说?', { title: '文件', type: 'info' })
    .then((response: boolean) => {
      return response === true ? checkDir(Directory.NOVEL) : Promise.reject();
    })
    .then((response) => {
      return response === true ? handleNovel(path) : Promise.reject('创建小说目录失败');
    })
    .then(() => {
      return true;
    });
}

/**
 * @param path source absolute path
 */
async function handleNovel(path: string): Promise<boolean> {
  const { name } = handleFilePath(path);
  const basePath = `${Directory.NOVEL}\\${name}`;
  try {
    console.warn('start to save');
    // create dir
    await createDir(basePath, { dir: BaseDirectory.App });
    // load file
    const lines = (await readTextFile(path)).split(/\r\n/g);
    // iterate to create chapter & meta
    let content = '';
    let index = 0;
    const meta: NovelMeta = { name: name, catalog: [] };
    for await (let line of lines) {
      line = line.trim();
      // TODO
      // const patten = /^第[一二三四五六七八九十百千]+幕\s.*$/g;
      // const patten = /^第[一二三四五六七八九十百千]+节\s.*$/g;
      const patten = /^第[0123456789]+章\s.*$/g;
      if (patten.test(line)) {
        await writeTextFile(`${basePath}\\${index}.txt`, content, { dir: BaseDirectory.App });
        meta.catalog.push({ name: line, path: `${basePath}\\${index}.txt` });
        content = line;
        index++;
      } else {
        content = content + '\r\n' + line;
      }
    }
    await writeTextFile(`${basePath}\\${index}.txt`, content, { dir: BaseDirectory.App });
    await writeTextFile(`${basePath}\\meta`, JSON.stringify(meta), { dir: BaseDirectory.App });
    await dbAddNovel(meta);
    console.warn('save success');
    return Promise.resolve(true);
  } catch (error) {
    // delete cache
    console.warn('save faild');
    return Promise.resolve(false);
  }
}

export { novelHandler };
