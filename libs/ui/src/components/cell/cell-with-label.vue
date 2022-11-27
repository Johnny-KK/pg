<template>
  <div class="h-cell__with-label">
    <cell-text class="h-cell__with-label__label" :style="styles" :text="label"></cell-text>
    <slot class="h-cell__with-label__content"></slot>
  </div>
</template>

<script lang="ts" setup name="h-cell-with-label">
import './styles/cell-with-label.less';
import { computed, CSSProperties, toRefs } from 'vue';
import CellText from './cell-text.vue';

const props = defineProps<{ label: string; width: number }>();
const { label, width } = toRefs(props);
const styles = computed<CSSProperties>(() => {
  // labelWidth=0 或 label为空时隐藏
  const hideLabel: boolean = width.value === 0 || label.value === '' || label.value === undefined || label.value === null;
  return { display: hideLabel ? 'none' : 'block', flex: `0 0 ${width.value}px`, width: `${width.value}px` };
});
</script>
