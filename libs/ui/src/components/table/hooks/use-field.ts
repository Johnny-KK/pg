import { randomString } from '@hb/utils';
import { computed, Ref } from 'vue';
import { AlignDirection, mergeBoolean, mergeNumber } from '../../cell';
import { Field, FieldHandled } from '../utils/types';

type FieldHook<T> = {
  fieldList: Field<T>[];
};

const hook = <T>(fh: Ref<FieldHook<T>>): { list: Ref<FieldHandled<T>[]> } => {
  const list = computed<FieldHandled<T>[]>(() => {
    const result: FieldHandled<T>[] = fh.value.fieldList.map((x) => field2Required(x));
    return result;
  });

  // grid container style
  // const style = computed<CSSProperties>(() => {
  //   const columns = list.value.map((x) => (typeof x.width === 'number' && x.width > 0 ? `${x.width}px` : 'auto'));
  //   return {
  //     'grid-template-columns': `${columns.join(' ')}`,
  //   };
  // });

  // function fc(field: FieldHandled<T>): Record<string, boolean> {
  //   return {
  //     'h-cell__last-row': field.lastRow,
  //   };
  // }
  // const hoveringId = ref<number | null>(null);

  //   // TODO reduce calculate times
  //   const hoverType: HoverType = config.value.hover;
  //   if (hoveringId.value !== null && hoverType !== 'none') {
  //     const idsRow = hoverType === 'row' || hoverType === 'row-column' ? calculateRow(hoveringId.value, fieldList.value.length) : [];
  //     const idsColumn =
  //       hoverType === 'column' || hoverType === 'row-column' ? calculateColumn(hoveringId.value, fieldList.value.length, result.length) : [];
  //     [...idsRow, ...idsColumn].forEach((i) => {
  //       if (result[i] !== undefined) {
  //         result[i].hovering = true;
  //       }
  //     });
  //   }

  //   result = calculateBodyCellStyles(result, fieldList.value.length, config.value.border, config.value.stripe);

  //   return result;
  // });

  // // 表头数据
  // const headCellList = computed<ITableCell<T>[]>(() =>
  //   fieldList.value.map((x, i) => ({
  //     _component: CellText,
  //     config: x,
  //     value: x.__type__ === FieldType.INDEX && x.label === '' ? '序号' : x.label,
  //     style: {},
  //     hovering: false,
  //     firstRow: true,
  //     firstColumn: i === 0,
  //   }))
  // );

  // // header cell style render
  // headCellList.value.forEach((x) => {
  //   // border
  //   if (config.value.border === true) {
  //     x.style['border-right'] = '1px solid var(--y-border-color)';
  //     x.style['border-left'] = x.firstColumn ? '1px solid var(--y-border-color)' : 'none';
  //   }
  //   // text align
  //   if (x.config.alignHeader === 'left' || x.config.alignHeader === 'right' || x.config.alignHeader === 'center') {
  //     x.style['text-align'] = x.config.alignHeader;
  //   }
  // });

  // const styleNoData = computed<CSSProperties>(() => ({ 'grid-column-start': `span ${fieldList.value.length}` }));

  // function move(i: number | null) {
  //   hoveringId.value = i;
  // }

  return { list };
};

// function calculateBodyCellStyles<T>(list: ITableCell<T>[], rowLength: number, border: boolean, stripe: boolean): ITableCell<T>[] {
//   return list.map((x, i) => {
//     const one = { ...x };
//     // border style
//     if (border === true) {
//       one.style['border-right'] = '1px solid var(--y-border-color)';
//       one.style['border-left'] = x.firstColumn ? '1px solid var(--y-border-color)' : 'none';
//     }
//     // stripe style
//     if (stripe === true && Math.floor(i / rowLength) % 2 === 1) {
//       one.style['background-color'] = 'var(--y-background)';
//     }
//     // hovering style
//     if (one.hovering === true) {
//       one.style['background-color'] = 'var(--y-hover-color)';
//     }
//     // text align
//     if (one.config.align === 'left' || one.config.align === 'right' || one.config.align === 'center') {
//       one.style['text-align'] = one.config.align;
//     }
//     return one;
//   });
// }

function calculateRow(current: number, rowLength: number): number[] {
  const result: number[] = [];
  const min = current > rowLength ? current - (current % rowLength) : 0;
  const max = min + rowLength;
  let i = min;
  while (i < max) {
    result.push(i);
    i++;
  }
  return result;
}

function calculateColumn(current: number, rowLength: number, total: number): number[] {
  const result: number[] = [];
  const mod = current % rowLength;
  let i = mod;
  while (i < total) {
    result.push(i);
    i += rowLength;
  }
  return result;
}

export default hook;

function field2Required<T>(f: Field<T>): FieldHandled<T> {
  const DEFAULT_SPAN = 6;
  const DEFAULT_WIDTH = 0;
  const DEFAULT_ALIGN_DIRECTION: AlignDirection = 'center';
  const mappingT2D: Record<Field<T>['__type__'], Required<Field<T>>> = {
    text: {
      __type__: 'text',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      head: '',
      headAlign: 'center',
      align: DEFAULT_ALIGN_DIRECTION,
      formatter: null,
      style: null,
      dot: false,
      dict: '',
    },
    tag: {
      __type__: 'tag',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      head: '',
      headAlign: 'center',
      align: 'center',
      dict: '',
    },
    index: {
      __type__: 'index',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      head: '',
      headAlign: 'center',
      align: 'center',
    },
    button: {
      __type__: 'button',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      head: '',
      headAlign: 'center',
      align: 'center',
      direction: 'center',
      tip: false,
      list: [],
    },
    input: {
      __type__: 'input',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      defaultValue: '' as T[keyof T],
      placeholder: '',
      clearable: true,
      head: '',
      headAlign: 'center',
    },
  };
  const mappingT2F: Record<Field<T>['__type__'], FieldHandled<T>> = {
    text: merge(f, mappingT2D.text),
    tag: merge(f, mappingT2D.tag),
    index: merge(f, mappingT2D.index),
    button: merge(f, mappingT2D.button),
    input: merge(f, mappingT2D.input),
  };
  const result = mappingT2F[f.__type__];
  // prop处理 prop为空时自动生成
  if (result.prop === '') {
    result.prop = randomString(32) as keyof T;
  }
  return result;
}

function merge<T>(f: Field<T>, m: Required<Field<T>>): FieldHandled<T> {
  const result: FieldHandled<T> = {} as FieldHandled<T>;
  for (const [k, v] of Object.entries(m)) {
    if (typeof v === 'boolean') {
      result[k] = mergeBoolean(f[k], v);
      continue;
    }
    if (typeof v === 'number') {
      result[k] = mergeNumber(f[k], v);
      continue;
    }
    result[k] = f[k] || v;
  }
  return result;
}
