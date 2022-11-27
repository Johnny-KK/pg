import { FieldTag, FieldTagHandled, FieldText, FieldTextHandled, GridSpan } from '../../cell';
import { Component } from 'vue';

type FieldDescription = { label?: string; labelWidth?: number };
type Field<T> = (FieldText<T> | FieldTag<T>) & FieldDescription;
type FieldHandled<T> = (FieldTextHandled<T> | FieldTagHandled<T>) & Required<FieldDescription>;
type DescriptionCell<T> = {
  data: T;
  cell: { __component__: Component; span: GridSpan; label: string; labelWidth: number; firstRow: boolean; firstColumn: boolean };
  config: FieldHandled<T>;
};

interface DescriptionConfig<T> {
  data: T;
  span?: GridSpan;
  fieldList: Field<T>[];
}

export { Field, FieldHandled, DescriptionConfig, DescriptionCell };
