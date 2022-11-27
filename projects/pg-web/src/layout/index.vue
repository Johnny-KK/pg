<script lang="ts" setup name="layout">
import LayoutHeader from './components/layout-header.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div class="layout">
    <layout-header class="layout-header"></layout-header>
    <section class="page-contain">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </section>
  </div>
</template>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  & > .layout-header {
    background-color: antiquewhite;
    line-height: 40px;
    flex: 0 0 40px;
  }

  & > .page-contain {
    flex: 0 0 calc(100% - 40px - 40px);
    max-height: calc(100% - 40px - 40px);
    padding: 20px;
    overflow-y: auto;
  }
}
</style>
