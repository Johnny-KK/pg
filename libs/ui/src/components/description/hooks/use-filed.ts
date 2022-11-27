import { Field, FieldHandled } from '../utils/types';
import { computed } from 'vue';

const hook = <T>(list: Field<T>[]) => {
  const result = computed<FieldHandled<T>[]>(() => list.map((x) => field2Handled(x)));
  return { list: result };
};

export default hook;

function field2Handled<T>(field: Field<T>): FieldHandled<T> {
  const result: FieldHandled<T> = { ...field } as FieldHandled<T>;
  return result;
}
