import { db, Todo, Collection } from '../../db';

type TodoHandled = Todo & { color: string };

type Cid = number | 'all';

async function dbListTodo(): Promise<TodoHandled[]> {
  const collections = await dbListCollection();
  const list: Todo[] = await db.todo.toArray();
  const result: TodoHandled[] = list.map((x) => {
    return { ...x, color: collections.find((c) => c.id === x.cid)?.color || '#e0fbff' };
  });
  return result;
}

async function dbAddTodo(title: string, cid: number): Promise<void> {
  await db.todo.add({ title, cid, done: false });
  return;
}

async function dbChangeTodoStatus(id: number, done: boolean): Promise<void> {
  await db.todo.update(id, { done });
  return;
}

async function dbDeleteTodo(id: number): Promise<void> {
  await db.todo.delete(id);
  return;
}

async function dbListCollection(): Promise<Collection[]> {
  return db.collection.toArray();
}

async function dbAddCollection(name: string): Promise<void> {
  await db.collection.add({ name, color: '' });
  return;
}

async function dbChangeCollectionColor(id: number, color: string): Promise<void> {
  await db.collection.update(id, { color });
  return;
}

export type { TodoHandled as Todo, Cid, Collection };
export { dbListTodo, dbAddTodo, dbChangeTodoStatus, dbDeleteTodo, dbListCollection, dbAddCollection, dbChangeCollectionColor };
