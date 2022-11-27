<template>
  <div :class="ic" :style="is">
    <div class="h-description-item__label" :style="ls">{{ label }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="description-item">
import { computed } from 'vue';
import { CSSProperties, toRefs } from 'vue';
import { GridSpan } from '../../cell';

const props = defineProps<{ span: GridSpan; label: string; labelWidth: number; firstRow: boolean; firstColumn: boolean }>();
const { span, label, labelWidth, firstRow, firstColumn } = toRefs(props);

const ic = computed<Record<string, boolean>>(() => {
  return {
    'h-description-item': true,
    'h-description-item--first-row': firstRow.value,
    'h-description-item--first-column': firstColumn.value,
  };
});

const is = computed<CSSProperties>(() => {
  return {
    gridColumnStart: `span ${span.value}`,
  };
});

const ls = computed<CSSProperties>(() => {
  return {
    flex: `0 0 ${labelWidth.value}px`,
  };
});
</script>
