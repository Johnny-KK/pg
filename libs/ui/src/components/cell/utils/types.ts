import { type Component } from 'vue';

// vue3暂时不支持组件之间泛型传递 使用shim类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ShimType = any;

type AlignDirection = 'left' | 'right' | 'center';
type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type FieldType = 'text' | 'tag' | 'index' | 'button' | 'input' | 'select' | 'radio' | 'slider';
type ComponentTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type FieldButtonType = 'default' | 'link';
type OptionItem = { label: string; value: string | boolean };
type HandlerFunction = (...args: unknown[]) => void;
type FormatterFunction = (...args: unknown[]) => void;
type VisibleFunction = (...args: unknown[]) => boolean;

type FieldBase<T> = {
  __type__: FieldType;
  prop?: keyof T;
  width?: number; // unit px
  span?: GridSpan;
};

type FieldView = { align?: AlignDirection };
type FieldViewHandled = Required<FieldView> & { __field__: 'view' };

type FieldEnter<T> = { defaultValue?: T[keyof T]; placeholder?: string; clearable?: boolean };
type FieldEnterHandled<T> = Required<FieldEnter<T>> & { __field__: 'enter' };

// etc
type FieldText<T> = { __type__: 'text'; dot?: boolean; style?: FormatterFunction; formatter?: FormatterFunction; dict?: string } & FieldBase<T> &
  FieldView;
type FieldTextHandled<T> = Omit<Required<FieldText<T>>, 'formatter' | 'style'> & {
  formatter: FormatterFunction | null;
  style: FormatterFunction | null;
} & FieldViewHandled;

type FieldTag<T> = { __type__: 'tag'; dict?: string } & FieldBase<T> & FieldView;
type FieldTagHandled<T> = Required<FieldTag<T>> & FieldViewHandled;

type FieldIndex<T> = { __type__: 'index' } & FieldBase<T> & FieldView;
type FieldIndexHandled<T> = Required<FieldIndex<T>> & FieldViewHandled;

type FieldButtonItem = {
  text?: string;
  theme?: ComponentTheme;
  icon?: string | Component;
  type?: FieldButtonType;
  handler?: HandlerFunction;
  visible?: VisibleFunction | boolean | null;
};
type FieldButton<T> = { __type__: 'button'; direction?: AlignDirection; tip?: boolean; list: FieldButtonItem[] } & FieldBase<T> & FieldView;
type FieldButtonHandled<T> = Required<FieldButton<T>> & FieldViewHandled;

type FieldInput<T> = { __type__: 'input' } & FieldBase<T> & FieldEnter<T>;
type FieldInputHandled<T> = Required<FieldInput<T>> & FieldEnterHandled<T>;

type FieldSelect<T> = { __type__: 'select'; options?: OptionItem[]; dict?: string } & FieldBase<T> & FieldEnter<T>;
type FieldSelectHandled<T> = Required<FieldSelect<T>> & FieldEnterHandled<T>;

type FieldRadio<T> = { __type__: 'radio'; options?: OptionItem[]; dict?: string } & FieldBase<T> & FieldEnter<T>;
type FieldRadioHandled<T> = Required<FieldRadio<T>> & FieldEnterHandled<T>;

type FieldSlider<T> = { __type__: 'slider' } & FieldBase<T> & FieldEnter<T>;
type FieldSliderHandled<T> = Required<FieldSlider<T>> & FieldEnterHandled<T>;

export type { ShimType };
export type { GridSpan, AlignDirection, OptionItem, FormatterFunction };
export type { FieldBase, FieldView, FieldEnter };
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
