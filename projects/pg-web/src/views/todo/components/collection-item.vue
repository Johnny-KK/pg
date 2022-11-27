<script lang="ts" setup name="collection-item">
import { computed } from 'vue';
import { CSSProperties } from 'vue';
import HPopover from '../../../components/h-popover.vue';
import { Collection } from '../service';

const emits = defineEmits<{ (e: 'change', value: string): void }>();
const props = defineProps<{ collection: Collection }>();

const style = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.collection.color,
  };
});

const colorList: string[] = ['#2aa6c1', '#3876e4', '#3bb780', '#6cbe5e', '#a0bb31', '#f1c231', '#e69138'];
</script>

<template>
  <div class="collection-item" :style="style">
    <span>{{ props.collection.name }}</span>
    <h-popover>
      <span class="dot"></span>
      <template #popover>
        <div class="color-list">
          <span v-for="item in colorList" :key="item" class="dot" :style="{ 'background-color': item }" @click.stop="emits('change', item)"></span>
        </div>
      </template>
    </h-popover>
  </div>
</template>

<style lang="less" scoped>
.collection-item {
  cursor: pointer;
  height: var(--base-height);
  line-height: var(--base-height);
  padding: 0 10px;
  margin: 5px 0;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;

  &.active {
    border: 1px solid bisque;
  }
}

.dot {
  display: block;
  height: 15px;
  width: 15px;
  border-radius: 10px;
  background-color: red;
}

.color-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  & > span:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
