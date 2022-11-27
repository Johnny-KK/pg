<template>
  <select v-model="modelValue" class="h-cell h-cell__select" style="width: 100%" :placeholder="placeholder" :clearable="clearable">
    <option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</option>
  </select>
</template>

<script lang="ts" setup name="h-cell-select">
import './styles/index.less';
import { toRefs } from 'vue';
import { ShimType } from '../common';
import { FieldSelectHandled } from './utils/types';
import { UseFormField, UseModel, useDict } from './hooks';
import { computed } from 'vue';
import { isNonEmptyString } from '@hb/utils';

const props = defineProps<{ field: FieldSelectHandled<ShimType>; model: ShimType }>();
const { field, model } = toRefs(props);

const { prop, placeholder, clearable } = UseFormField<ShimType>(field);

const dict = computed(() => props.field.dict);
const { options: dictOptions } = useDict(dict);

const options = computed(() => {
  let op = field.value.options;
  if (isNonEmptyString(dict.value)) {
    op = dictOptions.value.toList();
  }
  return op;
});

// v-model
const { modelValue, binding } = UseModel<ShimType>(model, prop, '' as any);

binding();
</script>
