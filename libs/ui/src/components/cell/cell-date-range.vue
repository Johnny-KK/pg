<template>
  <el-date-picker
    v-model="modelValue"
    class="h-cell h-cell__date-range"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :clearable="clearable"
    type="daterange"
  />
</template>

<script lang="ts" setup name="h-cell-date-range">
import './styles/index.less';
import './styles/date-range.less';
import { toRefs } from 'vue';
import { IFieldDateRange, ShimType } from '../common';
import { IFieldFormBase } from '../form/utils/types';
import UseModel from './hooks/use-model';
import UseFormCell from './hooks/use-form-cell';

const props = defineProps<{
  config: Required<IFieldDateRange & IFieldFormBase<ShimType>>;
}>();
const { config } = toRefs(props);

// property
const { prop, defaultValue, clearable } = UseFormCell<ShimType>(config);

// v-model
const { modelValue, binding } = UseModel<ShimType>(prop, defaultValue);
binding();
</script>
