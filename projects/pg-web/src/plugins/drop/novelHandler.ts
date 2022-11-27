import { confirm } from '@tauri-apps/api/dialog';
import { BaseDirectory, createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { checkDir, Directory, handleFilePath } from './utils';

type MetaInfoNovel = {
  name: string;
  path: string; // relative path base on BaseDirectory.App
  chapter: {
    name: string;
    path: string; // relative path base on BaseDirectory.App
  }[];
};

/**
 * @param path source absolute path
 */
async function novelHandler(path: string): Promise<boolean> {
  return confirm('是否导入小说?', { title: '文件', type: 'info' })
    .then((response: boolean) => {
      if (response !== true) {
        return Promise.reject();
      }
      return checkDir(Directory.NOVEL);
    })
    .then((response) => {
      if (response !== true) {
        return Promise.reject('创建小说目录失败');
      }
      return handleNovel(path);
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
    // create dir
    await createDir(basePath, { dir: BaseDirectory.App });
    // load file
    const lines = (await readTextFile(path)).split(/\r\n/g);
    // iterate to create chapter & meta
    let content = '';
    let index = 0;
    const meta: MetaInfoNovel = { name: name, path: basePath, chapter: [] };
    for await (let line of lines) {
      line = line.trim();
      // TODO
      // const patten = /^第[一二三四五六七八九十百千]+幕\s.*$/g;
      // const patten = /^第[一二三四五六七八九十百千]+节\s.*$/g;
      const patten = /^第[0123456789]+章\s.*$/g;
      if (patten.test(line)) {
        await writeTextFile(`${basePath}\\${index}.txt`, content, { dir: BaseDirectory.App });
        meta.chapter.push({ name: line, path: `${basePath}\\${index}.txt` });
        content = line;
        index++;
      } else {
        content = content + '\r\n' + line;
      }
    }
    await writeTextFile(`${basePath}\\${index}.txt`, content, { dir: BaseDirectory.App });
    await writeTextFile(`${basePath}\\meta`, JSON.stringify(meta), { dir: BaseDirectory.App });
    return Promise.resolve(true);
  } catch (error) {
    // delete cache
    return Promise.resolve(false);
  }
}

export { novelHandler };
