<script lang="ts" setup name="novel-view">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useNovelView from './use-novel-view';

const router = useRouter();
const props = defineProps<{ id: string }>();

const { content, preview, next, jump } = useNovelView(parseInt(props.id));
const contentLines = computed(() => content.value.split(/\r\n/g));
const jumpNum = ref<number>(0);

const catalogVisisble = ref<boolean>(false);
const contentEl = ref<HTMLSelectElement | null>(null);

function catalog(): void {
  catalogVisisble.value = true;
}

function back(): void {
  router.back();
}

function scrollTop(): void {
  contentEl.value?.scrollIntoView();
}
</script>

<template>
  <div class="novel-view">
    <section class="actions">
      <span @click="preview">preview</span>
      <span @click="catalog">catalog</span>
      <span @click="next">next</span>
      <span @click="back">back</span>
    </section>

    <section ref="contentEl" class="content">
      <p v-for="(line, n) in contentLines" :key="n">{{ line }}</p>
    </section>

    <section class="actions">
      <span @click="preview">preview</span>
      <span @click="catalog">catalog</span>
      <span @click="next">next</span>
      <input v-model="jumpNum" type="number" />
      <span @click="() => jump(jumpNum)">jump</span>
      <span @click="back">back</span>
    </section>
  </div>
</template>

<style lang="less" scoped>
.novel-view {
  background-color: #cddfcd;
  margin: -20px;
  padding: 20px;
  min-height: 100%;
}

.actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  user-select: none;
  height: 25px;
  line-height: 25px;

  & > input {
    width: 50px;
    margin: 0 20px;
  }

  & > span {
    cursor: pointer;
  }
  & > span + span {
    margin-left: 20px;
  }
}

.content {
  & > p {
    line-height: 22px;
  }
}
</style>
