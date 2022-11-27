import { computed, Ref, ref } from 'vue';
import { dbAddTodo, dbChangeTodoStatus, dbDeleteTodo, dbListTodo, Cid, Todo } from './service';

const hook = (cid: Ref<Cid>) => {
  // search todo list or add todo
  const fuzzy = ref<string>('');
  // todo list
  const list = ref<Todo[]>([]);
  //
  const result = computed<Todo[]>(() => {
    const li = list.value.filter((x) => x.title.includes(fuzzy.value)).sort((a, b) => (a.done === b.done ? 0 : a.done === false ? -1 : 1));
    if (cid.value === 'all') {
      return li;
    }
    if (typeof cid.value === 'number') {
      return li.filter((x) => x.cid === cid.value);
    }
    return li;
  });

  loadList();

  // load todo list from db
  function loadList(): Promise<void> {
    return dbListTodo().then((response) => {
      list.value = response;
    });
  }

  // add todo to db
  function addTodo(): Promise<void> {
    if (fuzzy.value.trim() === '') {
      return;
    }
    if (typeof cid.value !== 'number') {
      return;
    }
    return dbAddTodo(fuzzy.value, cid.value).then(() => {
      fuzzy.value = '';
      loadList();
    });
  }

  // delete todo from db
  function delTodo(id: number): Promise<void> {
    if (typeof id !== 'number') {
      return;
    }
    return dbDeleteTodo(id).then(() => {
      loadList();
    });
  }

  // change todo status
  function change(id: number, done: boolean): Promise<void> {
    return dbChangeTodoStatus(id, !done).then(() => {
      loadList();
    });
  }

  return { fuzzy, list: result, loadList, addTodo, delTodo, change };
};

export default hook;
