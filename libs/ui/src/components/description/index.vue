<template>
  <div class="h-description">
    <template v-for="(item, i) in cellList" :key="i">
      <description-item
        :span="item.cell.span"
        :label="item.cell.label"
        :label-width="item.cell.labelWidth"
        :first-row="item.cell.firstRow"
        :first-column="item.cell.firstColumn"
      >
        <component :is="item.cell.__component__" :field="item.config" :model="data"></component>
      </description-item>
    </template>
  </div>
</template>

<script lang="ts" setup name="h-description">
import './styles/index.less';
import { ShimType } from '../cell';
import { DescriptionConfig } from './utils/types';
import { computed } from 'vue';
import DescriptionItem from './components/description-item.vue';
import UseDescription from './hooks/use-description';

const props = withDefaults(defineProps<{ config: DescriptionConfig<ShimType> }>(), { config: () => ({ data: {}, fieldList: [] }) });

const { cellList, data } = UseDescription(computed(() => props.config));
</script>
