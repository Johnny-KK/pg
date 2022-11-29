type Novel = {
  id?: number;
  uid: string; // unique 64 length string
  name: string;
  author: string;
  path: string; // source path, relative path base on BaseDirectory.App
  update: string; // update mark
  progress: number; // current read chapter index
};

type Catalog = {
  path: string; // relative path base on BaseDirectory.App
  name: string;
}[];

type NovelMeta = {
  name: string;
  catalog: Catalog;
};

export type { Novel, Catalog, NovelMeta };
