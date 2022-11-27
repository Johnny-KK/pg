import { computed, ref } from 'vue';
import { dbListCollection, Cid, Collection, dbAddCollection, dbChangeCollectionColor } from './service';

// TODO handle promise error

const hook = () => {
  // TODO 新增今日、本周
  const buildInCollections: Collection[] = [{ id: 'all', name: '全部', color: '#e0fbff' }];
  const isAdding = ref<boolean>(false);
  const collectionName = ref<string>('');
  const list = ref<Collection[]>([]);
  const result = computed<Collection[]>(() => {
    return buildInCollections.concat(list.value);
  });
  const cid = ref<Cid>('all');

  loadList();

  // load collection list from db
  function loadList(): Promise<void> {
    return dbListCollection().then((response) => {
      list.value = response;
    });
  }

  // add collection to db
  function addCollection(): Promise<void> {
    if (collectionName.value.trim() === '') {
      isAdding.value = false;
      return;
    }
    return dbAddCollection(collectionName.value).then(() => {
      collectionName.value = '';
      isAdding.value = false;
      return loadList();
    });
  }

  function changeColor(id: number, color: string): Promise<void> {
    return dbChangeCollectionColor(id, color);
  }

  function setCid(c: Cid): void {
    cid.value = c;
  }

  return { list: result, cid, isAdding, collectionName, loadList, setCid, addCollection, changeColor };
};

export default hook;
