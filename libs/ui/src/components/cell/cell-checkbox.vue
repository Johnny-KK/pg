<template>
  <label
    class="h-cell h-cell__checkbox"
    v-for="item in options"
    :key="item.value"
  >
    <span>{{ item.label }}</span>
    <input v-model="modelValue" type="checkbox" :true-value="item.value" />
  </label>
</template>

<script lang="ts" setup name="h-cell-checkbox">
import "./styles/index.less";
import { computed, toRefs } from "vue";
import { IFieldCheckbox, IOption, ShimType } from "../common";
import { IFieldFormBase } from "../form/types";
import UseModel from "./hooks/use-model";
import UseFormCell from "./hooks/use-form-cell";

const props = defineProps<{
  config: Required<IFieldCheckbox & IFieldFormBase<ShimType>>;
}>();
const { config } = toRefs(props);

// property
const { prop, defaultValue } = UseFormCell<ShimType>(config);
const options = computed<IOption[]>(() => props.config.options);

// v-model
const { modelValue, binding } = UseModel<ShimType>(prop, defaultValue);
binding();
</script>
