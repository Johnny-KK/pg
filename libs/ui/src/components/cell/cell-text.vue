<template>
  <div :class="cc" :style="cs">{{ value }}</div>
</template>

<script lang="ts" setup name="h-cell-text">
import './styles/index.less';
import './styles/text.less';
import { isNonEmptyString } from '@hb/utils';
import type { FieldTextHandled, FormatterFunction, ShimType } from './utils/types';
import { DEFAULT_FIELD_TEXT } from './utils/constants';
import { computed, CSSProperties } from 'vue';
import { useDict } from './hooks';

const props = withDefaults(defineProps<{ field: FieldTextHandled<ShimType>; model: ShimType }>(), { field: () => DEFAULT_FIELD_TEXT });
const formatter = computed<FormatterFunction | null>(() => props.field.formatter);
const style = computed<FormatterFunction | null>(() => props.field.style);

const dict = computed(() => props.field.dict);
const { options } = useDict(dict);

const value = computed(() => {
  const v = props.model[props.field.prop];
  if (typeof formatter.value === 'function') {
    return formatter.value(v, props.model, props.field);
  }
  if (isNonEmptyString(dict.value)) {
    return options.value.toLabel(v);
  }
  return v;
});
const cs = computed<CSSProperties>(() => {
  const result = { textAlign: props.field.align };
  let other = typeof style.value === 'function' ? style.value(props.model[props.field.prop], props.model, props.field) : {};
  if (typeof other !== 'object') {
    other = {};
  }
  return { ...result, ...other };
});

const cc = computed<Record<string, boolean>>(() => {
  return {
    'h-cell': true,
    'h-cell__text': true,
    dot: props.field.dot,
  };
});
</script>
