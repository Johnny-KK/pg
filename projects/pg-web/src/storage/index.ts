// import { AuthType, createClient } from 'webdav';
import { db } from './db';
import { createClient } from './webdav';

type DavInfo = { version: number };

const client = createClient();

function sync() {
  setInterval(doSync, 10_000);
}

async function doSync() {
  const SYNC_SESSION_FLAG = '__session__sync__';
  const flag = window.sessionStorage.getItem(SYNC_SESSION_FLAG);
  if (flag !== 'Y') {
    await syncTodo();
    console.warn('sync at', Date.now());
    window.sessionStorage.setItem(SYNC_SESSION_FLAG, 'Y');
  }
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
  const INFO_PATH = '/info.json';
  const TODO_DIR = '/todo';
  const exists = await client.exists(INFO_PATH);
  if (!exists) {
    const info: DavInfo = { version: 1 };
    await client.createDirectory(TODO_DIR);
    await client.putFileContents(INFO_PATH, JSON.stringify(info));
  }
}

export { sync };
