import { computed, ref } from 'vue';
import { dbCheckWikiTitleExsit, dbListWiki, loadWikiContent, updateWikiContent, Wiki, WikiInfo } from './service';
import { throttle, from, throttleTime, debounceTime, Observable, Subject } from 'rxjs';
import { useDebounceFn } from '@vueuse/core';
import { isNonEmptyString } from '@hb/utils';

type WikiComplete = Wiki & { content: string };

const hook = () => {
  // wiki list
  const list = ref<Wiki[]>([]);
  // active wiki id
  const id = ref<number>();
  // active wiki with content
  const wiki = computed<WikiComplete>(() => {
    if (id.value === undefined) {
      // TODO auto create a empty wiki
      return { title: '', path: '', content: '' };
    }
    return list.value.find((x) => x.id === id.value);
  });

  const updating = ref<boolean>(false);
  let editTime = 0;
  let updateTime = 0;
  // TODO destroy timer
  setInterval(() => {
    if (editTime === updateTime) {
      return;
    }
    if (updating.value === true) {
      return;
    }
    updateTime = Date.now();
    updating.value = true;
    updateWikiContent(wiki.value.path, wiki.value.content).finally(() => {
      updating.value = false;
      editTime = updateTime;
    });
  }, 1500);

  loadList();

  // load all wiki file info
  async function loadList(): Promise<void> {
    list.value = await dbListWiki();
  }

  // load wiki content by filepath
  function loadContent(path: string): void {
    if (path === '') {
      return;
    }
    avtiveWikiPath.value = path;
    loadWikiContent(path).then((response) => {
      one.content = response;
    });
  }

  const UPDATE_INTERVAL = 1000;

  const updateContent = useDebounceFn((content: string) => {
    updateWikiContent(wiki.value.path, content);
  }, UPDATE_INTERVAL);

  const titleUpdateSource = new Subject();
  titleUpdateSource
    .pipe(debounceTime(UPDATE_INTERVAL))
    .pipe()
    .subscribe((content: string) => {
      console.warn(content);
    });
  // async function updateTitle(title: string): Promise<void> {
  //   titleUpdateSource.next(title);
  //   // check title exsit
  //   // const exsit: boolean = await checkWikiTitleExsit(title);
  // }

  const updateTitle = useDebounceFn(() => {
    // check tile
  }, UPDATE_INTERVAL);

  function checkTitle(title: string) {
    if (!isNonEmptyString(title)) {
      return false;
    }
    dbCheckWikiTitleExsit(title);
  }

  function createWiki() {}

  return { list, wiki, updating, loadContent, updateTitle, updateContent, createWiki };
};

export default hook;
