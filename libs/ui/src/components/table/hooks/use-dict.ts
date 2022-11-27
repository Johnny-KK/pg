import { computed, inject, Ref } from 'vue';
import { isNonEmptyString, useDict } from '@hb/utils';
import { GlobalConfig } from '../../../types';
import { FieldHandled } from '../utils/types';

// 全局配置

const hook = <T>(dataList: Ref<T[]>, fieldList: Ref<FieldHandled<T>[]>) => {
  const globalConfig = inject<GlobalConfig>('globalConfig');

  console.warn(globalConfig.dictApi);

  const dicts = fieldList.value.map((x) => x?.dict).filter((x) => isNonEmptyString(x));

  const result = useDict(globalConfig.dictApi, ...dicts);

  const label = computed(() => {
    dataList.value.map;
    return '';
  });
  return { label };
};

export default hook;
