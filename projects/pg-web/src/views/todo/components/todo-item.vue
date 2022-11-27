<script lang="ts" setup name="todo-item">
import { computed, CSSProperties, toRefs } from 'vue';
import { Todo } from '../service';

const emits = defineEmits<{ (e: 'change'): void; (e: 'delete'): void }>();
const props = defineProps<{ todo: Todo }>();
const { todo } = toRefs(props);

const ts = computed<CSSProperties>(() => {
  const DONE_COLOR = '#e4e6eb';
  return {
    backgroundColor: todo.value.done === true ? DONE_COLOR : todo.value.color,
  };
});
</script>

<template>
  <div :class="{ 'todo-item': true, done: todo.done }" :style="ts">
    <span class="checkbox" @click="emits('change')"></span>
    <span class="title">{{ todo.title }}</span>
    <span class="delete" @click="emits('delete')">x</span>
  </div>
</template>

<style lang="less" scoped>
.todo-item {
  --done-color: #afafaf;
}

.todo-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: var(--base-height);
  line-height: var(--base-height);
  margin: 5px 0;
  padding: 0 10px;

  & > .checkbox {
    width: 10px;
    height: 10px;
    display: inline-block;
    border: 1px solid forestgreen;
    margin-right: 15px;

    &:hover {
      cursor: pointer;
    }
  }
  &.done > .checkbox {
    background-color: var(--done-color);
    border: 1px solid var(--done-color);
  }

  & > .title {
    flex: 1;
  }
  &.done > .title {
    text-decoration: line-through;
    color: var(--done-color);
  }

  & > .delete {
    padding: 0 0 0 10px;

    &:hover {
      cursor: pointer;
    }
  }
  &.done > .delete {
    color: var(--done-color);
  }
}
</style>
