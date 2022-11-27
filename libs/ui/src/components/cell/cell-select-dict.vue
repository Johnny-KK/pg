<template>
  <div class="h-cell h-cell__select-dict">
    <el-select v-model="modelValue" style="width: 100%" :placeholder="placeholder">
      <el-option v-for="item in optionsResult" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script lang="ts" setup name="h-cell-select-dict">
import './styles/index.less';
import './styles/select-dict.less';
import { computed, toRefs } from 'vue';
import { IFieldSelectDict, IOption, ShimType } from '../common';
import { IFieldFormBase } from '../form/utils/types';
import UseModel from './hooks/use-model';
import UseFormCell from './hooks/use-form-cell';
import UseDict from '../table/hooks/use-dict';

const props = defineProps<{
  config: Required<IFieldSelectDict & IFieldFormBase<ShimType>>;
}>();
const { config } = toRefs(props);

// property
const { prop, placeholder, defaultValue } = UseFormCell<ShimType>(config);

const dict = computed<string>(() => config.value.dict);
// 数据字典
const { [dict.value]: options } = UseDict(dict.value);

const optionsResult = computed<IOption[]>(() => {
  const extra: IOption[] = props.config.all ? [{ label: '全部', value: '' }] : [];
  return [...extra, ...options.value.toList()];
});

// v-model
const { modelValue, binding } = UseModel<ShimType>(prop, defaultValue);
binding();
</script>
