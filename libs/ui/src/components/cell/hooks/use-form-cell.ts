import { computed, Ref } from 'vue';
import { IFieldForm } from '../../form/utils/types';

const hook = <T>(config: Ref<Required<IFieldForm<T>>>) => {
  const prop = computed<keyof T>(() => config.value.prop);
  const label = computed<string>(() => config.value.label);
  const labelWidth = computed<number>(() => config.value.labelWidth);
  const placeholder = computed<string>(() => config.value.placeholder);
  const defaultValue = computed<T[keyof T]>(() => config.value.defaultValue);
  const clearable = computed<boolean>(() => config.value.clearable);
  return { prop, label, placeholder, labelWidth, defaultValue, clearable };
};

export default hook;
