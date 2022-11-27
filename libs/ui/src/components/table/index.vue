<template>
  <div class="h-table" :style="ts">
    <template v-for="(item, i) in cellList" :key="i">
      <component :is="item.cell.__component__" :field="item.config" :model="item.data" :class="cc(item.cell)"></component>
    </template>

    <!-- no data -->
    <template v-if="noData">
      <div class="table-cell__no-data">暂无数据</div>
    </template>
  </div>
</template>

<script lang="ts" setup name="h-table">
import './styles/index.less';
import { computed, withDefaults } from 'vue';
import { ShimType } from '../common';
import { TableConfig } from './utils/types';
import useTable from './hooks/use-table';

const props = withDefaults(defineProps<{ config: TableConfig<ShimType> }>(), { config: () => ({ data: [], fieldList: [] }) });

const { cellList, noData, ts } = useTable(computed(() => props.config));

function cc({ firstRow, firstColumn, isHeader }: { firstRow: boolean; firstColumn: boolean; isHeader: boolean }): Record<string, boolean> {
  return {
    'h-cell--first-row': firstRow,
    'h-cell--first-column': firstColumn,
    'h-cell__header': isHeader,
  };
}
</script>
