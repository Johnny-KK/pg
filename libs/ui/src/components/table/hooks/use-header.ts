import { computed, Ref } from 'vue';
import { FieldHandled } from '../utils/types';

const hook = <T>(fieldList: Ref<FieldHandled<T>[]>): { head: Ref<T> } => {
  const head = computed<T>(() => Object.fromEntries(fieldList.value.map((x) => [x.prop, x.head])) as T);
  return { head };
};

export default hook;
