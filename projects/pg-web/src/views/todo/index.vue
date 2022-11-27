<script lang="ts" setup name="pg-todo">
import TodoItem from './components/todo-item.vue';
import CollectionItem from './components/collection-item.vue';

import useCollection from './use-collection';
import useTodo from './use-todo';

const { list: collections, cid, isAdding, collectionName, loadList: reloadCollection, setCid, addCollection, changeColor } = useCollection();
const { fuzzy, list: todos, loadList: reloadTodo, addTodo, delTodo, change } = useTodo(cid);

function changeCollectionColor(id: number, color: string) {
  changeColor(id, color).then(() => {
    reloadCollection();
    reloadTodo();
  });
}
</script>

<template>
  <div class="pg-todo">
    <div class="todo-area">
      <input v-model="fuzzy" type="text" placeholder="输入搜索 回车保存" @keyup.enter="addTodo" />
      <div class="todo-list">
        <TransitionGroup name="fade">
          <todo-item v-for="item in todos" :key="item.id" :todo="item" @change="change(item.id, item.done)" @delete="delTodo(item.id)"></todo-item>
        </TransitionGroup>
      </div>
    </div>

    <div class="collection-area">
      <TransitionGroup name="fade">
        <collection-item
          v-for="item in collections"
          :key="item.id"
          :collection="item"
          :class="{ active: cid === item.id }"
          @click="setCid(item.id)"
          @change="(color: string) => changeCollectionColor(item.id, color)"
        ></collection-item>
      </TransitionGroup>
      <button v-if="!isAdding" class="collection-add" @click="isAdding = true">新增</button>
      <input v-else v-model="collectionName" type="text" placeholder="回车结束" @keyup.enter="addCollection" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.pg-todo {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  & > .todo-area {
    flex: 1;
    padding-right: 20px;

    & > .todo-list {
      margin-top: 10px;
    }
  }

  & > .collection-area {
    flex: 0 0 200px;

    & > .collection-item:first-child {
      margin-top: 0;
    }

    & > .collection-add {
      width: 100%;
      border-radius: 0;
    }
  }
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
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
