<script lang="ts" setup name="pg-wiki">
import useData from './use-data';
import { Plus, Document, PriceTag, Refresh } from '@hb/icon';
import { HIcon } from '../../components/h-icon';
import { createEmptyWiki } from './service';
import WikiTitle from './components/wiki-title.vue';

const { list, wiki, updating, loadContent, updateTitle, updateContent } = useData();
</script>

<template>
  <div class="pg-wiki">
    <div class="side-bar">
      <div class="actions">
        <h-icon><plus></plus></h-icon>
        <h-icon @click="createEmptyWiki"><Document /></h-icon>
        <h-icon><PriceTag /></h-icon>
        <h-icon><Refresh /></h-icon>
      </div>
      <div class="search">
        <input type="text" placeholder="回车搜索" />
      </div>
      <div class="wiki-list">
        <wiki-title v-for="item in list" :key="item.path" :title="item.title" @update="updateTitle" @click="loadContent(item.path)"></wiki-title>
      </div>
    </div>
    <v-md-editor :text="wiki.content" @change="updateContent"></v-md-editor>
  </div>
</template>

<style lang="less" scoped>
.pg-wiki {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;

  & > .side-bar {
    flex: 0 0 200px;
    width: 200px;
    padding-right: 10px;

    & > .actions {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;

      & > .h-icon {
        cursor: pointer;
        background-color: #4193ff;
        padding: 5px;
        border-radius: 2px;
        color: #fff;

        transition: background-color 0.5s;

        &:hover {
          background-color: #0d76ff;
        }
      }

      & > .h-icon + .h-icon {
        margin-left: 5px;
      }
    }

    & > .search {
      margin-top: 10px;
    }

    & > .wiki-list {
      margin-top: 10px;
    }
  }
}
</style>
