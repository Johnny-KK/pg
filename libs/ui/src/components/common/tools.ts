import { type Component } from 'vue';
import { FieldType } from './types';
import { CellButton, CellCheckbox, CellDateRange, CellInput, CellRadio, CellSelect, CellSelectDict, CellTag, CellText, CellTextarea } from '../cell';

function fieldType2Component(type: FieldType): Component {
  const mapping: Record<FieldType, Component> = {
    [FieldType.TEXT]: CellText,
    [FieldType.TEXTAREA]: CellTextarea,
    [FieldType.TAG]: CellTag,
    [FieldType.INDEX]: CellText,
    [FieldType.INPUT]: CellInput,
    [FieldType.SELECT]: CellSelect,
    [FieldType.SELECT_DICT]: CellSelectDict,
    [FieldType.RADIO]: CellRadio,
    [FieldType.CHECKBOX]: CellCheckbox,
    [FieldType.DATE_RANGE]: CellDateRange,
    [FieldType.BUTTON]: CellButton,
  };
  return mapping[type] || CellText;
}

export { fieldType2Component };
