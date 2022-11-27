import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { Directory } from '../../plugins/drop';
import { db, Wiki } from '../../db';
import { Observable, from } from 'rxjs';

type WikiInfo = {
  title: string;
  path: string; // relative path base on BaseDirectory.App
  content: string;
};

const DEFAULT_TITLE = 'untitled';

// list wiki info from db
async function dbListWiki(): Promise<Wiki[]> {
  return db.wiki.toArray();
}

/**
 * @param {string} path relative path base on BaseDirectory.App
 */
async function loadWikiContent(path: string): Promise<string> {
  return await readTextFile(path, { dir: BaseDirectory.App });
}

async function createEmptyWiki(): Promise<Wiki> {
  let title = '';

  // to find unused title
  const list: Wiki[] = await db.wiki.where('title').startsWith(DEFAULT_TITLE).toArray();
  if (list.length === 0) {
    title = DEFAULT_TITLE;
  } else {
    let index = 0;
    let done = false;
    do {
      title = DEFAULT_TITLE + index;
      done = !list.some((x) => x.title === title);
      index++;
    } while (done);
  }
  // create empty wiki file
  const wiki: Wiki = { title: title, path: `${Directory.WIKI}\\${title}.md` };
  await writeTextFile(wiki.path, '', { dir: BaseDirectory.App });
  // insert info to db
  await db.wiki.add(wiki);
  return wiki;
}

async function updateWikiContent(path: string, content: string): Promise<void> {
  await writeTextFile(path, content, { dir: BaseDirectory.App });
}

function dbCheckWikiTitleExsit(title: string): Promise<boolean> {
  return db.wiki
    .where('title')
    .equals(title)
    .toArray()
    .then((list) => list.length > 0);
}

// Rx.Observable

export { type WikiInfo, type Wiki, dbListWiki, loadWikiContent, createEmptyWiki, updateWikiContent, dbCheckWikiTitleExsit };
