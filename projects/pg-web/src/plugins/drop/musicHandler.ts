import { confirm } from '@tauri-apps/api/dialog';
import { BaseDirectory, copyFile } from '@tauri-apps/api/fs';
import { checkDir, checkFileExist, Directory, handleFilePath } from './utils';

/**
 * @param path source absolute path
 */
async function musicHandler(path: string): Promise<boolean> {
  return confirm('是否导入到本地曲库?', { title: '文件', type: 'info' })
    .then((response: boolean) => {
      if (response !== true) {
        return Promise.reject();
      }
      return checkDir(Directory.MUSIC);
    })
    .then((response: boolean) => {
      if (response !== true) {
        return Promise.reject('创建音乐目录失败');
      }
      return checkFileExist(path);
    })
    .then((response: boolean) => {
      if (response === true) {
        return confirm('已存在同名歌曲是否替换?', { title: '文件', type: 'info' });
      }
      return true;
    })
    .then((response: boolean) => {
      if (response !== true) {
        return;
      }
      const { nameWithSuffix } = handleFilePath(path);
      return copyFile(path, `${Directory.MUSIC}\\${nameWithSuffix}`, { dir: BaseDirectory.App });
    })
    .then(() => {
      return true;
    });
}

export { musicHandler };
