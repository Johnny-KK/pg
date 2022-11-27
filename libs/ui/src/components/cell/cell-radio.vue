<template>
  <el-radio-group v-model="modelValue" class="h-cell h-cell__radio">
    <el-radio v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup name="h-cell-radio">
import './styles/index.less';
import { computed, toRefs } from 'vue';
import { ShimType } from '../common';
import { UseFormField, UseModel, useDict } from './hooks';
import { FieldRadioHandled } from './utils/types';
import { isNonEmptyString } from '@hb/utils';

const props = defineProps<{ field: FieldRadioHandled<ShimType>; model: ShimType }>();
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
