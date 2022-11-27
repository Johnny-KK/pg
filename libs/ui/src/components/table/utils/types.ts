import { type Component } from 'vue';
import {
  AlignDirection,
  FieldButton,
  FieldButtonHandled,
  FieldIndex,
  FieldIndexHandled,
  FieldInput,
  FieldInputHandled,
  FieldTag,
  FieldTagHandled,
  FieldText,
  FieldTextHandled,
} from '../../cell';
import { IFieldAll } from '../../common';

type FieldTable = { head?: string; headAlign?: AlignDirection };
type Field<T> = (FieldText<T> | FieldTag<T> | FieldIndex<T> | FieldButton<T> | FieldInput<T>) & FieldTable;
type FieldHandled<T> = (FieldTextHandled<T> | FieldTagHandled<T> | FieldIndexHandled<T> | FieldButtonHandled<T> | FieldInputHandled<T>) &
  Required<FieldTable>;
type TableCell<T> = {
  data: T;
  cell: { __component__: Component; isHeader: boolean; firstRow: boolean; firstColumn: boolean };
  config: FieldHandled<T>;
};

type ApiPage<T> = { list: T[]; pageSize: number; pages: number; total: number };
type ApiFunction<T> = (...args) => Promise<T[] | ApiPage<T>>;

// 表格配置
interface TableConfig<T> {
  // 表格数据
  data?: T[];
  // 表格数据源
  api?: ApiFunction<T>;
  // 表格数据源参数
  sourceParams?: DataSourceParams;
  // 是否分页 默认不分页
  page?: boolean;
  // 分页每页数据条数 默认为10
  pageSize?: number;
  // 分页时当页面数仅有1页时隐藏分页 默认是
  pageHideWhenOne?: boolean;
  // 表格边框 默认false
  border?: boolean;
  // 表格斑马线样式 默认true
  stripe?: boolean;
  // 鼠标悬停背景
  hover?: HoverType;
  // 表格列配置
  fieldList: Field<T>[];
}

type TableConfigHandled<T> = Omit<Required<TableConfig<T>>, 'fieldList'> & { fieldList: FieldHandled<T>[] };

type HoverType = 'row' | 'column' | 'row-column' | 'none';
type DataSourceParams = Record<string, unknown>;

// 表格对象配置字段
type IAcceptTableField = IFieldAll;

export type { FieldTable, Field, TableCell, FieldHandled, TableConfig, TableConfigHandled, IAcceptTableField, HoverType, ApiFunction, ApiPage };
