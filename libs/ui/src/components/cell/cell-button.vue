<template>
  <div class="h-cell h-cell__button" :style="style">
    <template v-for="(item, i) in list" :key="i">
      <template v-if="tip && typeof item.icon === 'string'">
        <el-tooltip effect="dark" :content="item.text" placement="top">
          <h-icon :icon-class="item.icon" color="#409eff" @click="handle(item.handler)"></h-icon>
        </el-tooltip>
      </template>

      <template v-else>
        <h-icon v-if="typeof item.icon === 'string'" :icon-class="item.icon" color="#409eff"></h-icon>
        <el-button :type="item.theme" :link="item.isLinkButton" @click="handle(item.handler)">
          {{ item.text }}
        </el-button>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup name="h-cell-button">
import './styles/index.less';
import './styles/button.less';
import { computed, CSSProperties } from 'vue';
import { FieldButtonHandled, FieldButtonItem, ShimType } from './utils/types';
import { DEFAULT_FIELD_BUTTON } from './utils/constants';
import { HIcon } from '../icon';

const props = withDefaults(defineProps<{ field: FieldButtonHandled<ShimType>; model: ShimType }>(), { field: () => DEFAULT_FIELD_BUTTON });

const tip = computed<boolean>(() => props.field.tip);

const list = computed<Required<(FieldButtonItem & { isLinkButton: boolean })[]>>(() =>
  props.field.list
    .map((x) => {
      const visible = x.visible;
      let isVisible = true;
      if (typeof visible === 'function') {
        isVisible = visible();
      } else if (typeof visible === 'boolean') {
        isVisible = visible;
      }
      const isLinkButton = x.type === 'link';
      return isVisible ? { ...x, isLinkButton } : undefined;
    })
    .filter((x) => x !== undefined)
);

const style = computed<CSSProperties>(() => {
  return { textAlign: props.field.direction };
});

function handle(h: unknown) {
  typeof h === 'function' && h(props.model);
}
</script>
