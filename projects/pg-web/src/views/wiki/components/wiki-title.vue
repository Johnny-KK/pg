<script lang="ts" setup name="wiki-title">
import { onLongPress } from '@vueuse/core';
import { ref } from 'vue';
const props = defineProps<{ title: string }>();
const emits = defineEmits<{ (e: 'update', value: string): void }>();
const contenteditable = ref<boolean>(false);
const titleComponent = ref<HTMLInputElement | null>(null);

onLongPress(
  titleComponent,
  () => {
    contenteditable.value = true;
    titleComponent.value.setSelectionRange(0, 0);
    titleComponent.value.focus();
  },
  { delay: 1000 }
);

function change(event: InputEvent) {
  emits('update', (event.target as HTMLElement).innerText);
}
</script>

<template>
  <div ref="titleComponent" class="wiki-title" :contenteditable="contenteditable" @input="change" @blur="contenteditable = false">
    {{ props.title }}
  </div>
</template>

<style lang="less" scoped>
.wiki-title {
  cursor: pointer;
  background-color: #dbdbdb;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;

  &:hover {
    background-color: #bde0ff;
  }

  &:focus {
    outline: none;
  }
}

.wiki-title + .wiki-title {
  margin-top: 5px;
}
</style>
