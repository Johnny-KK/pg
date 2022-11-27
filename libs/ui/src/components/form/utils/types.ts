import { Component } from 'vue';
import {
  FieldButton,
  FieldInput,
  FieldTag,
  FieldText,
  GridSpan,
  FieldTextHandled,
  FieldTagHandled,
  FieldButtonHandled,
  FieldInputHandled,
  AlignDirection,
  FieldSelect,
  FieldSelectHandled,
  FieldRadio,
  FieldRadioHandled,
  FieldSliderHandled,
  FieldSlider,
} from '../../cell';

type FormLayout = 'RC' | 'INLINE';

type FieldForm = {
  label?: string;
  labelWidth?: number; // unit px
  labelAlign?: AlignDirection;
};
type Field<T> = (FieldText<T> | FieldTag<T> | FieldButton<T> | FieldInput<T> | FieldSelect<T> | FieldRadio<T> | FieldSlider<T>) & FieldForm;
type FieldHandled<T> = (
  | FieldTextHandled<T>
  | FieldTagHandled<T>
  | FieldButtonHandled<T>
  | FieldInputHandled<T>
  | FieldSelectHandled<T>
  | FieldRadioHandled<T>
  | FieldSliderHandled<T>
) &
  Required<FieldForm>;
type FormCell<T> = {
  data: T;
  cell: { __component__: Component; span: GridSpan; label: string; labelWidth: number; labelAlign: AlignDirection };
  config: FieldHandled<T>;
};

interface FormConfig<T> {
  layout?: FormLayout;
  labelWidth?: number;
  placeholder?: boolean;
  span?: GridSpan;
  fieldList: Field<T>[];
}

type FormConfigHandled<T> = Omit<Required<FormConfig<T>>, 'labelWidth' | 'placeholder' | 'span' | 'fieldList'> & {
  fieldList: FieldHandled<T>[];
};

export type { Field, FieldHandled, FormConfig, FormConfigHandled, FormLayout, FormCell };
