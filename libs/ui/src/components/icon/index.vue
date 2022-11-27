<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script lang="ts" setup name="h-icon">
import { computed } from 'vue';
const props = withDefaults(defineProps<{ iconClass: string; className?: string; color?: string }>(), {
  color: '#fff',
  className: '',
});
const iconName = computed<string>(() => `#icon-${props.iconClass}`);
const svgClass = computed<string>(() => (props.className ? `h-icon ${props.className}` : 'h-icon'));
</script>

<style scope lang="less">
.h-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
