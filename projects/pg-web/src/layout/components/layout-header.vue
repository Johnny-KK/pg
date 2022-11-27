<script lang="ts" setup name="layout-header">
import { useRouter } from 'vue-router';
import useAudio, { Music } from './use-radio';
import { ref } from 'vue';
import { BaseDirectory, readDir } from '@tauri-apps/api/fs';

import { Menu as MenuIcon, DArrowRight, DArrowLeft, VideoPlay, VideoPause } from '@hb/icon';
import { HIcon } from '../../components/h-icon';
import useMenu from './use-menu';

const router = useRouter();
const list = ref<Music[]>([]);
const { status, play, random, pause, next, preview } = useAudio(list);

const { menuList, isExpend, expend, collapse } = useMenu();

loadList();

async function loadList() {
  readDir('music', { dir: BaseDirectory.App, recursive: false }).then((res) => {
    list.value = res.map((x) => ({ name: x.name, path: x.path }));
  });
}

function jump(path: string) {
  router.replace(path);
}
</script>

<template>
  <section class="header">
    <h-icon class="music"><video-play @click="preview"></video-play></h-icon>
    <!-- <h-icon><d-arrow-left @click="random"></d-arrow-left></h-icon>
    <h-icon><video-pause @click="pause"></video-pause></h-icon>
    <h-icon><d-arrow-right @click="next"></d-arrow-right></h-icon> -->
    <div class="separate"></div>

    <div class="menu-list" @mouseenter="expend" @mouseleave="collapse">
      <TransitionGroup name="fade">
        <template v-if="isExpend">
          <div v-for="item in menuList" :key="item.path" @click="jump(item.path)">{{ item.meta?.title }}</div>
        </template>
      </TransitionGroup>
      <h-icon class="menu-icon"><menu-icon /></h-icon>
    </div>
  </section>
</template>

<style lang="less" scoped>
.header {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  & > .music {
    font-size: 24px;
    cursor: pointer;
    animation: rotate 5s linear infinite;
  }

  & > .separate {
    flex: 1;
  }

  & > .menu-list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s;

    & > div {
      margin-right: 10px;
    }

    & > .menu-icon {
      transition: color 0.5s;

      &:hover {
        color: #0d76ff;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
