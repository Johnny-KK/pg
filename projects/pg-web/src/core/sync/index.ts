import { SYNC_INTERVAL } from '../constants';
import { db } from '../db';
import { dbListNovel } from '../novel';
import { Novel } from '../types/novel';
import { createClient } from './webdav';

type DavInfo = { version: number };

type RemoteNovelMeta = { uid: string; sync: number };

const DAV_INFO_PATH = '/info.json';
const TODO_DIR = '/todo';
const NOVEL_DIR = '/novel';

const client = createClient();

function sync() {
  setInterval(doSync, SYNC_INTERVAL);
}

async function doSync() {
  await checkAndInitRemoteDir();
  await syncNovel();
  // const SYNC_SESSION_FLAG = '__session__sync__';
  // const flag = window.sessionStorage.getItem(SYNC_SESSION_FLAG);
  // if (flag !== 'Y') {
  //   await syncTodo();
  //   console.warn('sync at', Date.now());
  //   window.sessionStorage.setItem(SYNC_SESSION_FLAG, 'Y');
  // }
}

async function syncNovel(): Promise<void> {
  const metaPath = `${NOVEL_DIR}/meta.json`;
  const metaString: string = await client.getFileContentsString(metaPath);

  console.warn(metaString);
  const meta: RemoteNovelMeta[] = JSON.parse(metaString);
  const list: Novel[] = await dbListNovel();

  const { localUploadRemote, localUpdateFromRemote, remoteRemove } = compareLocalAndRemote(list, meta);

  for await (const uid of localUploadRemote) {
    const one = list.find((x) => x.uid === uid);
    await client.putFileContentsString(`${NOVEL_DIR}/${one.name}/${}`);
  }
}

function compareLocalAndRemote(
  local: Novel[],
  remote: RemoteNovelMeta[]
): { localUploadRemote: string[]; remoteRemove: string[]; localUpdateFromRemote: string[] } {
  const localUploadRemote: string[] = [];
  const remoteRemove: string[] = [];
  const localUpdateFromRemote: string[] = [];
  for (const item of local) {
    if (item.sync === null) {
      localUploadRemote.push(item.uid);
      continue;
    }
    const one = remote.find((x) => x.uid === item.uid);
    if (one === undefined) {
      remoteRemove.push(item.uid);
      continue;
    }
    if (item.sync === one.sync) {
      continue;
    }
    if (item.sync < one.sync) {
      localUpdateFromRemote.push(item.uid);
      continue;
    }
    if (item.sync > one.sync) {
      // TODO ERROR happend
      continue;
    }
  }
  for (const item of remote) {
    const one = local.find((x) => x.uid === item.uid);
    if (one !== undefined) {
      continue;
    }
    // TODO
  }
  return { localUploadRemote, remoteRemove, localUpdateFromRemote };
}

// sync todo
async function syncTodo() {
  const todoDbFile = '/todo/db.json';
  await checkAndInitRemoteDir();
  const list = await db.todo.toArray();
  // let remote = await client.getFileContents(todoDbFile);
  // remote = remote === undefined ? [] : remote;

  // compare & put
  await client.putFileContents(todoDbFile, JSON.stringify(list));
}

async function checkAndInitRemoteDir(): Promise<void> {
  const exists = await client.exists(DAV_INFO_PATH);
  if (!exists) {
    const info: DavInfo = { version: 1 };
    await client.createDirectory(TODO_DIR);
    await client.createDirectory(NOVEL_DIR);
    await client.putFileContents(DAV_INFO_PATH, JSON.stringify(info));
  }
}

export { sync };
