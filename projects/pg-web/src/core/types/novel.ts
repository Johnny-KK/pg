type Novel = {
  id?: number;
  uid: string; // unique 64 length string
  name: string;
  author: string;
  path: string; // source path, relative path base on BaseDirectory.App
  sync: number | null; // last sync timestamp
  progress: number; // current read chapter index
};

type Catalog = {
  path: string; // relative path base on BaseDirectory.App
  name: string;
}[];

type LocalNovelMeta = {
  name: string;
  catalog: Catalog;
};

type RemoteNovelMeta = { uid: string; sync: number };

export type { Novel, Catalog, LocalNovelMeta, RemoteNovelMeta };
