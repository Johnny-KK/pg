import UseField from './use-field';
import { Component, computed, Ref } from 'vue';
import { CellButton, CellInput, CellRadio, CellSelect, CellSlider, CellTag, CellText, GridSpan, mergeBoolean, mergeNumber } from '../../cell';
import { Field, FormCell, FormConfig, FormLayout } from '../utils/types';
import { FieldHook } from './use-field';

const DEFAULT_AUTO_PLACEHOLDER = false;
const DEFAULT_LABEL_WIDTH = 100;
const DEFAULT_SPAN = 6;

const hook = <T>(config: Ref<FormConfig<T>>, data: T): { cellList: Ref<FormCell<T>[]>; cc: Ref<Record<string, boolean>> } => {
  const { list } = UseField(computed(() => config2FieldHook(config.value)));

  const cellList = computed<FormCell<T>[]>(() => {
    const result: FormCell<T>[] = list.value.map((x) => {
      return {
        data: data,
        cell: {
          __component__: transComponent(x.__type__),
          span: mergeNumber(x.span, mergeNumber(config.value.span, DEFAULT_SPAN)) as GridSpan, // TODO redo
          label: x.label,
          labelWidth: x.labelWidth,
          labelAlign: x.labelAlign,
        },
        config: x,
      };
    });
    return result;
  });

  // form class
  const cc = computed<Record<string, boolean>>(() => {
    const layout: FormLayout = config.value.layout === 'INLINE' ? 'INLINE' : 'RC';
    return {
      'h-form--rc': layout === 'RC',
      'h-form--inline': layout === 'INLINE',
    };
  });

  return { cellList, cc };
};

export default hook;

function config2FieldHook<T>(config: FormConfig<T>): FieldHook<T> {
  return {
    fieldList: config.fieldList,
    placeholder: mergeBoolean(config.placeholder, DEFAULT_AUTO_PLACEHOLDER),
    labelWidth: mergeNumber(config.labelWidth, DEFAULT_LABEL_WIDTH),
    span: mergeNumber(config.span, DEFAULT_SPAN) as GridSpan,
  };
}

function transComponent<T>(type: Field<T>['__type__']) {
  const mappingT2C: Record<Field<T>['__type__'], Component> = {
    text: CellText,
    tag: CellTag,
    button: CellButton,
    input: CellInput,
    select: CellSelect,
    radio: CellRadio,
    slider: CellSlider,
  };
  return mappingT2C[type];
}
