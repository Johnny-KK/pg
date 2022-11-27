import { Component, computed, CSSProperties, Ref } from 'vue';
import { Field, TableCell, TableConfig } from '../utils/types';

import useData, { DataHook } from './use-data';
import useField from './use-field';
import useHeader from './use-header';
import { CellButton, CellInput, CellTag, CellText, mergeBoolean, mergeNumber } from '../../cell';

const hook = <T>(config: Ref<TableConfig<T>>): { cellList: Ref<TableCell<T>[]>; noData: Ref<boolean>; ts: Ref<CSSProperties> } => {
  // 表格项
  const { list: fieldList } = useField(computed(() => ({ fieldList: config.value.fieldList })));
  // 原始数据
  const { list: dataList } = useData(computed(() => config2DataHook<T>(config.value)));

  const { head } = useHeader(fieldList);

  const data = computed<T[]>(() => [head.value, ...dataList.value]);

  const cellList = computed<TableCell<T>[]>(() => {
    const result: TableCell<T>[] = data.value
      .map((x, i) => {
        return fieldList.value.map((y) => {
          const isHeader: boolean = i === 0;
          return {
            data: x,
            cell: {
              __component__: isHeader ? CellText : transComponent(y.__type__),
              isHeader: isHeader,
              firstRow: false,
              firstColumn: false,
            },
            config: y,
          };
        });
      })
      .flat();
    result.forEach((x, i) => {
      if (i < fieldList.value.length) {
        x.cell.firstRow = true;
      }
      if (i % fieldList.value.length === 0) {
        x.cell.firstColumn = true;
      }
    });
    return result;
  });

  const noData = computed<boolean>(() => dataList.value.length === 0);

  // table style
  const ts = computed<CSSProperties>(() => {
    const columns = fieldList.value.map((x) => (typeof x.width === 'number' && x.width > 0 ? `${x.width}px` : 'auto'));
    return {
      'grid-template-columns': `${columns.join(' ')}`,
    };
  });

  return { cellList, noData, ts };
};

export default hook;

function transComponent<T>(type: Field<T>['__type__']) {
  const mappingT2C: Record<Field<T>['__type__'], Component> = { text: CellText, tag: CellTag, index: CellText, button: CellButton, input: CellInput };
  return mappingT2C[type];
}

function config2DataHook<T>(config: TableConfig<T>): DataHook<T> {
  const DEFAULT_PAGE = false;
  const DEFAULT_PAGE_SIZE = 10;
  const DEFAULT_PAGE_HIDE_WHEN_ONE = true;
  return {
    page: mergeBoolean(config.page, DEFAULT_PAGE),
    pageSize: mergeNumber(config.pageSize, DEFAULT_PAGE_SIZE),
    pageHideWhenOne: mergeBoolean(config.pageHideWhenOne, DEFAULT_PAGE_HIDE_WHEN_ONE),
    data: config.data,
    api: typeof config.api === 'function' ? config.api : null,
  };
}
