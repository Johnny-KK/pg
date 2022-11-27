import { Component } from 'vue';
import {
  CellButton,
  CellInput,
  CellTag,
  CellText,
  DEFAULT_FIELD_BUTTON,
  DEFAULT_FIELD_INPUT,
  DEFAULT_FIELD_TAG,
  DEFAULT_FIELD_TEXT,
  DEFAULT_FIELD_INDEX,
} from '../index';
import { Field, FieldButton, FieldIndex, FieldInput, FieldTag, FieldText } from './types';

function field2Required<T>(f: Field<T>): Required<Field<T> & { __component__: Component }> {
  const mappingT2C: Record<Field<T>['__type__'], Component> = {
    text: CellText,
    tag: CellTag,
    index: CellText,
    button: CellButton,
    input: CellInput,
  };
  const mappingT2F: Record<Field<T>['__type__'], Required<Field<T>>> = {
    text: merge(f, DEFAULT_FIELD_TEXT as Required<FieldText<T>>),
    tag: merge(f, DEFAULT_FIELD_TAG as Required<FieldTag<T>>),
    index: merge(f, DEFAULT_FIELD_INDEX as Required<FieldIndex<T>>),
    button: merge(f, DEFAULT_FIELD_BUTTON as Required<FieldButton<T>>),
    input: merge(f, DEFAULT_FIELD_INPUT as Required<FieldInput<T>>),
  };
  const result = mappingT2F[f.__type__];
  return { ...result, __component__: mappingT2C[f.__type__] || CellText };
}

function merge<T>(f: Field<T>, m: Required<Field<T>>): Required<Field<T>> {
  const result: Required<Field<T>> = {} as Required<Field<T>>;
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

// merge boolean
function mergeBoolean(v: unknown, d: boolean): boolean {
  return typeof v === 'boolean' ? v : d;
}

// merge number
function mergeNumber(v: unknown, d: number): number {
  if (typeof v === 'string') {
    v = parseInt(v);
  }
  return typeof v === 'number' && !isNaN(v) && v !== Infinity && v !== -Infinity ? v : d;
}

export { field2Required, mergeBoolean, mergeNumber };
