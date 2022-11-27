<script lang="ts" setup name="novel-shelf">
import { ref } from 'vue';
import { Novel, dbAddNovels, dbListNovel, scanNovelFromLocal } from './service';
import { useRouter } from 'vue-router';

const router = useRouter();
const list = ref<Novel[]>();

loadList();

function loadList() {
  dbListNovel().then((response) => {
    list.value = response;
  });
}

// long tap edit, short tap view
let timer: number;
function mousedown() {
  timer = window.setTimeout(() => {
    console.warn('edit');
    window.clearTimeout(timer);
    timer = -1;
  }, 1000);
}
function mouseup(id: number) {
  window.clearTimeout(timer);
  timer !== -1 && router.push(`/novel-view/${id}`);
}

function scan() {
  scanNovelFromLocal()
    .then((response) => {
      return dbAddNovels(response);
    })
    .then(() => {
      loadList();
    });
}
</script>

<template>
  <div>
    <div>
      <button @click="scan">scan local</button>
    </div>
    <div class="novel-list">
      <div v-for="item in list" :key="item.name" @mousedown="mousedown" @mouseup="mouseup(item.id)">{{ item.name }}</div>
      <div @click="router.replace('/novel-crypto')">OOPS</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.novel-list {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: repeat(auto-fill, 100px);
  justify-content: space-between;

  & > div {
    background-color: antiquewhite;
    cursor: pointer;
  }
}
</style>
