import { ref, watch } from 'vue';
import { fsLoadChapter, fsLoadCatalogAndProgress, dbUpdateProgress, Catalog } from '../../core';

const hook = (id: number) => {
  const loading = ref<boolean>(false);
  const content = ref<string>(''); // current chapter content
  const progress = ref<number>(0);
  const catalog = ref<Catalog>([]);

  loading.value = true;
  fsLoadCatalogAndProgress(id)
    .then((response) => {
      catalog.value = response.catalog;
      progress.value = response.progress;
    })
    .finally(() => {
      loading.value = false;
    });

  watch(progress, handleChange);

  function preview(): void {
    progress.value = progress.value > 0 ? progress.value - 1 : 0;
  }

  function next(): void {
    progress.value = progress.value === catalog.value.length ? progress.value : progress.value + 1;
  }

  function jump(i: number): void {
    progress.value = i;
  }

  function handleChange(): void {
    loading.value = true;
    fsLoadChapter(catalog.value[progress.value].path)
      .then((response) => {
        content.value = response;
      })
      .finally(() => {
        loading.value = false;
      });
    dbUpdateProgress(id, progress.value);
  }

  return { loading, content, catalog, preview, next, jump };
};

export default hook;
