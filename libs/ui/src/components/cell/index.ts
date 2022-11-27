import Text from './cell-text.vue';
import Textarea from './cell-textarea.vue';
import Tag from './cell-tag.vue';
import Input from './cell-input.vue';
import Select from './cell-select.vue';
import SelectDict from './cell-select-dict.vue';
import Radio from './cell-radio.vue';
import Checkbox from './cell-checkbox.vue';
import DateRange from './cell-date-range.vue';
import Button from './cell-button.vue';
import Slider from './cell-slider.vue';
import CellWithLabel from './cell-with-label.vue';

// components
export {
  Text as CellText,
  Textarea as CellTextarea,
  Tag as CellTag,
  Input as CellInput,
  Select as CellSelect,
  SelectDict as CellSelectDict,
  Radio as CellRadio,
  Checkbox as CellCheckbox,
  DateRange as CellDateRange,
  Button as CellButton,
  Slider as CellSlider,
  CellWithLabel,
};

// types
import type {
  ShimType,
  FieldText,
  FieldTag,
  FieldIndex,
  FieldButtonItem,
  FieldButton,
  FieldInput,
  GridSpan,
  FormatterFunction,
  AlignDirection,
  FieldTextHandled,
  FieldTagHandled,
  FieldIndexHandled,
  FieldButtonHandled,
  FieldInputHandled,
  FieldSelect,
  FieldSelectHandled,
  FieldRadio,
  FieldRadioHandled,
  FieldSlider,
  FieldSliderHandled,
} from './utils/types';
export type { ShimType };
export type { GridSpan, AlignDirection, FormatterFunction };
export type { FieldText, FieldTag, FieldIndex, FieldButtonItem, FieldButton, FieldInput, FieldSelect, FieldRadio, FieldSlider };
export type {
  FieldTextHandled,
  FieldTagHandled,
  FieldIndexHandled,
  FieldButtonHandled,
  FieldInputHandled,
  FieldSelectHandled,
  FieldRadioHandled,
  FieldSliderHandled,
};

// constants
import { DEFAULT_FIELD_TEXT, DEFAULT_FIELD_TAG, DEFAULT_FIELD_INDEX, DEFAULT_FIELD_BUTTON, DEFAULT_FIELD_INPUT } from './utils/constants';
export { DEFAULT_FIELD_TEXT, DEFAULT_FIELD_TAG, DEFAULT_FIELD_INDEX, DEFAULT_FIELD_BUTTON, DEFAULT_FIELD_INPUT };

// tools
import { field2Required, mergeBoolean, mergeNumber } from './utils/tools';
export { field2Required, mergeBoolean, mergeNumber };
