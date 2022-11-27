<script lang="ts" setup name="novel-view">
import { CSSProperties, ref } from 'vue';
import { apiLoadChapter, dbFetchNovelById, dbUpdateProgress, Novel } from './service';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const props = defineProps<{ id: string }>();
const novel = ref<Novel>();
const content = ref<string>('');
const catalogVisisble = ref<boolean>(false);
const contentEl = ref<HTMLSelectElement | null>(null);
const contentLines = computed(() => content.value.split(/\r\n/g));

const COLOR_LIST = ['red'] as const;

const background = ref<string>('#fff');

const contentStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: background.value,
  };
});

fetchNovel();

function fetchNovel() {
  dbFetchNovelById(parseInt(props.id))
    .then((response) => {
      novel.value = response;
    })
    .then(() => loadChapter());
}
function loadChapter(path?: string): Promise<void> {
  path = path || novel.value.chapter[novel.value.progress]?.path || '';
  if (path === '') {
    return;
  }
  return apiLoadChapter(path).then((res) => {
    content.value = res;
  });
}
async function preview() {
  if (novel.value.progress === 0) {
    return;
  }
  novel.value.progress--;
  dbUpdateProgress(novel.value.id, novel.value.progress);
  await loadChapter();
  scrollTop();
}
async function next() {
  novel.value.progress++;
  dbUpdateProgress(novel.value.id, novel.value.progress);
  await loadChapter();
  scrollTop();
}
function catalog() {
  catalogVisisble.value = true;
}
function back() {
  router.back();
}
function scrollTop() {
  contentEl.value.scrollIntoView();
}
</script>

<template>
  <div class="novel-view">
    <section class="actions">
      <span @click="preview">preview</span>
      <span @click="catalog">catalog</span>
      <span @click="back">back</span>
      <span @click="next">next</span>
    </section>

    <section ref="contentEl" class="content" :style="contentStyle">
      <p v-for="(line, n) in contentLines" :key="n">{{ line }}</p>
    </section>

    <section class="actions">
      <span @click="preview">preview</span>
      <span @click="catalog">catalog</span>
      <span @click="back">back</span>
      <span @click="next">next</span>
    </section>

    <!-- <div v-show="catalogVisisble">
      <div v-for="item in meta.chapter" :key="item.name" @click="loadChapter(item.path)">{{ item.name }}</div>
    </div> -->
  </div>
</template>

<style lang="less" scoped>
.actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  & > span {
    margin: 0 10px;
    cursor: pointer;
  }
}

.content {
  & > p {
    line-height: 22px;
  }
}
</style>
