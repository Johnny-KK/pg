import { AlignDirection, FieldButton, FieldButtonHandled, FieldIndex, FieldInput, FieldTag, FieldTextHandled, ShimType } from './types';

const DEFAULT_SPAN = 6;
const DEFAULT_WIDTH = 0;
const DEFAULT_ALIGN_DIRECTION: AlignDirection = 'center';
const DEFAULT_LABEL_WIDTH = 80;
const DEFAULT_LABEL_ALIGN_DIRECTION: AlignDirection = 'right';

const DEFAULT_FIELD_TEXT: Required<FieldTextHandled<ShimType>> = {
  __type__: 'text',
  __field__: 'view',
  width: DEFAULT_WIDTH,
  span: DEFAULT_SPAN,
  prop: '',
};

const DEFAULT_FIELD_TAG: Required<FieldTag<ShimType>> = {
  __type__: 'tag',
  width: DEFAULT_WIDTH,
  span: DEFAULT_SPAN,
  prop: '',
};

const DEFAULT_FIELD_INDEX: Required<FieldIndex<ShimType>> = {
  __type__: 'index',
  width: DEFAULT_WIDTH,
  span: DEFAULT_SPAN,
  prop: '',
};

const DEFAULT_FIELD_BUTTON: FieldButtonHandled<ShimType> = {
  __type__: 'button',
  __field__: 'view',
  width: DEFAULT_WIDTH,
  span: 12,
  prop: '',
  direction: DEFAULT_ALIGN_DIRECTION,
  list: [],
  align: 'center',
};

const DEFAULT_FIELD_INPUT: Required<FieldInput<ShimType>> = {
  __type__: 'input',
  width: DEFAULT_WIDTH,
  span: DEFAULT_SPAN,
  prop: '',
  defaultValue: '',
  placeholder: '',
  clearable: true,
};

export { DEFAULT_FIELD_TEXT, DEFAULT_FIELD_TAG, DEFAULT_FIELD_INDEX, DEFAULT_FIELD_BUTTON, DEFAULT_FIELD_INPUT };
