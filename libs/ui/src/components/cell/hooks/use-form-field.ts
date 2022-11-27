import { computed, Ref } from 'vue';
import { FieldBase, FieldEnter } from '../utils/types';

const hook = <T>(field: Ref<Required<FieldEnter<T> & FieldBase<T>>>) => {
  const prop = computed<keyof T>(() => field.value.prop);
  const placeholder = computed<string>(() => field.value.placeholder);
  // TODO
  // const defaultValue = computed<T[keyof T]>(() => field.value.defaultValue);
  const clearable = computed<boolean>(() => field.value.clearable);
  const isError = computed<boolean>(() => field.value.isError);

  return { prop, placeholder, clearable, isError };
};

export default hook;
