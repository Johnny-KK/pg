<script lang="ts" setup name="h-popover">
import { createPopper } from '@popperjs/core';
import { onMounted, ref } from 'vue';

const tip = ref<HTMLElement>();
const content = ref<HTMLElement>();
const visible = ref<boolean>(false);

onMounted(() => {
  createPopper(content.value, tip.value, { placement: 'bottom-end', strategy: 'fixed' });
});

function showTip() {
  visible.value = true;
}

function hideTip() {
  visible.value = false;
}
</script>

<template>
  <div>
    <div ref="content" @click="showTip">
      <slot></slot>
    </div>

    <div v-show="visible" ref="tip" class="h-popover" @click="hideTip">
      <slot name="popover"></slot>
    </div>
    <!-- <Teleport to="body"><div class="popover-mask"></div></Teleport> -->
  </div>
</template>

<style lang="less" scoped>
.popover-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.h-popover {
  background-color: #fff;
  border: 1px solid #333;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 13px;
}
</style>
