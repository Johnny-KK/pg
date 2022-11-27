import { computed, inject, ref, Ref, watch } from 'vue';

export default function hook<T>(model: Ref<T>, prop: Ref<keyof T>, defaultValue: Ref<T[keyof T]>) {
  const updateModel = inject<(value: T[keyof T], prop: keyof T) => void>('updateModel');
  const value = computed<T[keyof T]>(() => model.value[prop.value]);
  const modelValue = ref<T[keyof T]>(defaultValue.value) as Ref<T[keyof T]>;

  // v-model
  function binding() {
    watch(value, () => (modelValue.value = value.value), { immediate: true });
    watch(modelValue, () => updateModel(modelValue.value, prop.value));
  }

  return { model, value, modelValue, binding };
}
