import { inject, Ref } from 'vue';
import { useDict } from '@hb/utils';
import { GlobalConfig } from '../../../types';

const hook = (dict: Ref<string>) => {
  const globalConfig = inject<GlobalConfig>('globalConfig');
  const { [dict.value]: options } = useDict(globalConfig.dictApi, dict.value);
  return { options };
};

export default hook;
