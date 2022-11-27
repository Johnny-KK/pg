<template>
  <el-input v-model="modelValue" :class="{ 'h-cell': true, 'h-cell__input': true }" :placeholder="placeholder" :clearable="clearable"></el-input>
</template>

<script lang="ts" setup name="h-cell-input">
import './styles/index.less';
import './styles/input.less';
import { FieldInputHandled, ShimType } from './utils/types';
import { UseFormField, UseModel } from './hooks';
import { toRefs } from 'vue';

const props = defineProps<{ field: FieldInputHandled<ShimType>; model: ShimType }>();
const { field, model } = toRefs(props);

const { prop, placeholder, clearable } = UseFormField<ShimType>(field);

// v-model
const { modelValue, binding } = UseModel<ShimType>(model, prop, '' as any);

binding();
</script>
