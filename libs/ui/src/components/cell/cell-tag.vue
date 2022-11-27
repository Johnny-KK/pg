<template>
  <div class="h-cell h-cell__tag">
    <span>{{ value }}</span>
  </div>
</template>

<script lang="ts" setup name="h-cell-tag">
import './styles/index.less';
import './styles/tag.less';
import { computed } from 'vue';
import { isNonEmptyString } from '@hb/utils';
import { FieldTagHandled, ShimType } from './utils/types';
import { DEFAULT_FIELD_TAG } from './utils/constants';
import { useDict } from './hooks';

const props = withDefaults(defineProps<{ field: FieldTagHandled<ShimType>; model: ShimType }>(), { field: () => DEFAULT_FIELD_TAG });

const dict = computed(() => props.field.dict);
const { options } = useDict(dict);

const value = computed(() => {
  const v = props.model[props.field.prop];
  if (isNonEmptyString(dict.value)) {
    return options.value.toLabel(v);
  }
  return v;
});
</script>
