<template>
  <el-input v-model="modelValue" class="h-cell h-cell__textarea" :placeholder="placeholder" :rows="1" type="textarea" :clearable="clearable" />
</template>

<script lang="ts" setup name="h-cell-textarea">
import './styles/index.less';
import './styles/textarea.less';
import { toRefs } from 'vue';
import { IFieldTextarea, ShimType } from '../common';
import { IFieldFormBase } from '../form/utils/types';
import UseModel from './hooks/use-model';
import UseFormCell from './hooks/use-form-cell';

const props = defineProps<{
  config: Required<IFieldTextarea & IFieldFormBase<ShimType>>;
}>();
const { config } = toRefs(props);

// property
const { prop, placeholder, defaultValue, clearable } = UseFormCell<ShimType>(config);

// v-model
const { modelValue, binding } = UseModel<ShimType>(prop, defaultValue);
binding();
</script>
