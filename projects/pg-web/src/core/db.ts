import Dexie, { Table } from 'dexie';
import { Novel } from './types/novel';

type Todo = {
  id?: number;
  cid: number; // collection id
  title: string;
  done: boolean;
};

type Collection = {
  id?: number;
  name: string;
  color: string;
};

type Music = {
  id?: number;
  name: string;
  md5: string;
  path: string; // relative path base on BaseDirectory.App
};

type Wiki = {
  id?: number;
  title: string; // wiki title name, equals file name without suffix
  path: string; // relative path base on BaseDirectory.App
};

type AppConfig = {
  id?: number;
  novel: {
    background: string;
    fontsize: string;
  };
};

class Db extends Dexie {
  todo!: Table<Todo>;
  collection!: Table<Collection>;
  music!: Table<Music>;
  wiki!: Table<Wiki>;
  novel!: Table<Novel>;
  config!: Table<AppConfig>;

  constructor() {
    super('pg');
    this.version(7).stores({
      todo: '++id, title, done',
      collection: '++id, name',
      music: '++id, name, md5',
      wiki: '++id, title',
      novel: '++id, name',
      config: '++id',
    });
  }
}

export const db = new Db();
