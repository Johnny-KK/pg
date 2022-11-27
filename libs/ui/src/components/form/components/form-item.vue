<template>
  <div :style="is" class="h-form-item">
    <label class="h-form-item__label" :style="ls" :class="lc">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="form-item">
import { computed, CSSProperties, toRefs } from 'vue';
import { AlignDirection, GridSpan } from '../../cell';

const props = defineProps<{ span: GridSpan; label: string; labelWidth: number; labelAlign: AlignDirection }>();

const { span, label, labelWidth, labelAlign } = toRefs(props);

// form item style
const is = computed<CSSProperties>(() => {
  return { gridColumn: `span ${span.value}` };
});

// label style
const ls = computed<CSSProperties>(() => {
  return { flex: `0 0 ${labelWidth.value}px`, textAlign: labelAlign.value };
});

// label class
const lc = computed<Record<string, boolean>>(() => {
  return {
    'is-required': false,
  };
});
</script>
