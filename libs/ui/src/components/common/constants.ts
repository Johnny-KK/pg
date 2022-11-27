import {
  FieldType,
  IFieldButton,
  IFieldCheckbox,
  IFieldDateRange,
  IFieldIndex,
  IFieldInput,
  IFieldRadio,
  IFieldSelect,
  IFieldSelectDict,
  IFieldTag,
  IFieldText,
  IFieldTextarea,
} from './types';

const DEFAULT_FIELD_TEXT: Required<IFieldText> = { __type__: FieldType.TEXT };
const DEFAULT_FIELD_TAG: Required<IFieldTag> = { __type__: FieldType.TAG };
const DEFAULT_FIELD_INDEX: Required<IFieldIndex> = {
  __type__: FieldType.INDEX,
};
const DEFAULT_FIELD_INPUT: Required<IFieldInput> = {
  __type__: FieldType.INPUT,
};
const DEFAULT_FIELD_TEXTAREA: Required<IFieldTextarea> = {
  __type__: FieldType.TEXTAREA,
};
const DEFAULT_FIELD_SELECT: Required<IFieldSelect> = {
  __type__: FieldType.SELECT,
  options: [],
};
const DEFAULT_FIELD_SELECT_DICT: Required<IFieldSelectDict> = {
  __type__: FieldType.SELECT_DICT,
  dict: '',
  all: true,
};
const DEFAULT_FIELD_RADIO: Required<IFieldRadio> = {
  __type__: FieldType.RADIO,
  options: [],
};
const DEFAULT_FIELD_CHECKBOX: Required<IFieldCheckbox> = {
  __type__: FieldType.CHECKBOX,
  options: [],
};
const DEFAULT_FIELD_DATE_RANGE: Required<IFieldDateRange> = {
  __type__: FieldType.DATE_RANGE,
};
const DEFAULT_FIELD_BUTTON: Required<IFieldButton> = {
  __type__: FieldType.BUTTON,
  text: '',
  type: 'default',
  icon: '',
  direction: 'left',
  list: [],
};

export {
  DEFAULT_FIELD_TEXT,
  DEFAULT_FIELD_TAG,
  DEFAULT_FIELD_INDEX,
  DEFAULT_FIELD_INPUT,
  DEFAULT_FIELD_TEXTAREA,
  DEFAULT_FIELD_SELECT,
  DEFAULT_FIELD_SELECT_DICT,
  DEFAULT_FIELD_RADIO,
  DEFAULT_FIELD_CHECKBOX,
  DEFAULT_FIELD_DATE_RANGE,
  DEFAULT_FIELD_BUTTON,
};
