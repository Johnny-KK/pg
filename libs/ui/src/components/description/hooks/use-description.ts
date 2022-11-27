import { Component, computed, Ref } from 'vue';
import { CellTag, CellText, GridSpan, mergeNumber } from '../../cell';
import { DescriptionCell, DescriptionConfig, Field } from '../utils/types';
import UseField from './use-filed';

const DEFAULT_LABEL_WIDTH = 100;
const DEFAULT_SPAN = 4;
const TOTAL_SPAN = 12;

const hook = <T>(config: Ref<DescriptionConfig<T>>) => {
  const data = computed<T>(() => config.value.data);
  const { list } = UseField(config.value.fieldList);

  const mappingT2C: Record<Field<T>['__type__'], Component> = { text: CellText, tag: CellTag };
  const span = computed<GridSpan>(() => mergeNumber(config.value.span, DEFAULT_SPAN) as GridSpan);

  const cellList = computed<DescriptionCell<T>[]>(() => {
    const result: DescriptionCell<T>[] = list.value.map((x) => {
      return {
        data: data.value,
        cell: {
          __component__: mappingT2C[x.__type__],
          span: mergeNumber(x.span, span.value) as GridSpan,
          label: x.label,
          labelWidth: mergeNumber(x.labelWidth, DEFAULT_LABEL_WIDTH),
          firstRow: false,
          firstColumn: false,
        },
        config: x,
      };
    });
    // TODO 计算span单独设置的情况
    // TODO span补齐当前行
    let accumulative = 0;
    for (const item of result) {
      if (accumulative % 12 === 0) {
        item.cell.firstColumn = true;
      }
      accumulative += item.cell.span;
      if (accumulative <= TOTAL_SPAN) {
        item.cell.firstRow = true;
      }
    }
    return result;
  });

  return { cellList, data };
};

export default hook;
