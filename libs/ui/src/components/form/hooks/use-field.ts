import { isNonEmptyString } from '@hb/utils';
import { computed, Ref } from 'vue';
import { AlignDirection, GridSpan, mergeBoolean, mergeNumber } from '../../cell';
import { Field, FieldHandled } from '../utils/types';

type FieldHook<T> = { fieldList: Field<T>[]; placeholder: boolean; labelWidth: number; span: GridSpan };

const hook = <T>(fh: Ref<FieldHook<T>>): { list: Ref<FieldHandled<T>[]> } => {
  const list = computed<FieldHandled<T>[]>(() => {
    const result: FieldHandled<T>[] = fh.value.fieldList.map((x) => field2Required(x));
    // TODO 特殊字段处理 labelWidth span
    for (const field of result) {
      if (fh.value.placeholder === true && field.__field__ === 'enter') {
        field.placeholder = isNonEmptyString(field.placeholder) ? field.placeholder : `请输入${field.label}`;
      }
    }
    return result;
  });

  return { list };
};

export default hook;
export type { FieldHook };

function field2Required<T>(f: Field<T>): FieldHandled<T> {
  const DEFAULT_SPAN = 6;
  const DEFAULT_WIDTH = 0;
  const DEFAULT_LABEL_WIDTH = 100;
  const DEFAULT_LABEL_ALIGN_DIRECTION: AlignDirection = 'right';
  const mappingT2D: Record<Field<T>['__type__'], Required<Field<T>>> = {
    text: {
      __type__: 'text',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      align: 'center',
      dot: false,
      formatter: null,
      style: null,
      label: '',
      labelWidth: DEFAULT_LABEL_WIDTH,
      labelAlign: DEFAULT_LABEL_ALIGN_DIRECTION,
      dict: '',
    },
    tag: {
      __type__: 'tag',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      align: 'center',
      label: '',
      labelWidth: DEFAULT_LABEL_WIDTH,
      labelAlign: DEFAULT_LABEL_ALIGN_DIRECTION,
      dict: '',
    },
    button: {
      __type__: 'button',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      align: 'center',
      direction: 'center',
      tip: false,
      list: [],
      label: '',
      labelWidth: DEFAULT_LABEL_WIDTH,
      labelAlign: DEFAULT_LABEL_ALIGN_DIRECTION,
    },
    input: {
      __type__: 'input',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      defaultValue: '' as T[keyof T],
      placeholder: '',
      clearable: true,
      label: '',
      labelWidth: DEFAULT_LABEL_WIDTH,
      labelAlign: DEFAULT_LABEL_ALIGN_DIRECTION,
    },
    select: {
      __type__: 'select',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      defaultValue: '' as T[keyof T],
      placeholder: '',
      clearable: true,
      label: '',
      labelWidth: DEFAULT_LABEL_WIDTH,
      labelAlign: DEFAULT_LABEL_ALIGN_DIRECTION,
      options: [],
      dict: '',
    },
    radio: {
      __type__: 'radio',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      defaultValue: '' as T[keyof T],
      placeholder: '',
      clearable: true,
      label: '',
      labelWidth: DEFAULT_LABEL_WIDTH,
      labelAlign: DEFAULT_LABEL_ALIGN_DIRECTION,
      options: [],
      dict: '',
    },
    slider: {
      __type__: 'slider',
      width: DEFAULT_WIDTH,
      span: DEFAULT_SPAN,
      prop: '' as keyof T,
      defaultValue: '' as T[keyof T],
      placeholder: '',
      clearable: true,
      label: '',
      labelWidth: DEFAULT_LABEL_WIDTH,
      labelAlign: DEFAULT_LABEL_ALIGN_DIRECTION,
    },
  };
  const mappingT2F: Record<Field<T>['__type__'], FieldHandled<T>> = {
    text: merge(f, mappingT2D.text),
    tag: merge(f, mappingT2D.tag),
    button: merge(f, mappingT2D.button),
    input: merge(f, mappingT2D.input),
    select: merge(f, mappingT2D.select),
    radio: merge(f, mappingT2D.radio),
    slider: merge(f, mappingT2D.slider),
  };
  const result = mappingT2F[f.__type__];
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
