<script lang="ts" setup name="h-icon">
import { CSSProperties, computed } from 'vue';

const style = computed<CSSProperties>(() => {
  return {};
});
</script>

<template>
  <i :style="style" class="h-icon">
    <slot></slot>
  </i>
</template>

<style lang="less" scoped>
.h-icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: inherit;
  font-size: inherit;

  & > svg {
    height: 1em;
    width: 1em;
  }
}
</style>
