// TODO vue3暂时不支持组件之间泛型传递 使用shim类型
type ShimType = any;

// 选项数组类数据类型
interface IOption {
  label: string; // 标签
  value: string | number; // 值
}

// 当前支持的字段类型
enum FieldType {
  TEXT, // 文本
  TAG, // 标签
  INDEX, // 行号
  INPUT, // 普通文本输入框
  TEXTAREA, // 文本域
  SELECT, // 普通下拉框
  SELECT_DICT, // 数据字典下拉框
  RADIO, // 单选
  CHECKBOX, // 多选
  DATE_RANGE, // 日期范围选择
  BUTTON, // 按钮
}

// 文本配置字段
type IFieldText = { __type__: FieldType.TEXT };
// 标签配置字段
type IFieldTag = { __type__: FieldType.TAG };
// 序号配置字段
type IFieldIndex = { __type__: FieldType.INDEX };
// 输入框配置字段
type IFieldInput = { __type__: FieldType.INPUT };
// 文本域配置字段
type IFieldTextarea = { __type__: FieldType.TEXTAREA };
// 下拉框配置字段
type IFieldSelect = {
  __type__: FieldType.SELECT;
  // 待选项目
  options: IOption[];
};
// 数据字典下拉框
type IFieldSelectDict = { __type__: FieldType.SELECT_DICT; dict: string; all?: boolean };
// 单选配置字段
type IFieldRadio = {
  __type__: FieldType.RADIO;
  // 待选项目
  options: IOption[];
};
// 多选配置字段
type IFieldCheckbox = {
  __type__: FieldType.CHECKBOX;
  // 待选项目
  options: IOption[];
};
// 日期范围配置字段
type IFieldDateRange = { __type__: FieldType.DATE_RANGE };
// 按钮配置字段
type IFieldButton = {
  __type__: FieldType.BUTTON;
  type?: ThemeType;
  text?: string;
  icon?: string;
  handler?: HandlerFunction;
  direction?: 'left' | 'right';
  list?: { type?: ThemeType; text?: string; icon?: string; handler?: HandlerFunction }[];
};

type HandlerFunction = (...args: unknown[]) => void;
type ThemeType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

// 所有配置字段
type IFieldAll =
  | IFieldText
  | IFieldTag
  | IFieldIndex
  | IFieldInput
  | IFieldTextarea
  | IFieldSelect
  | IFieldSelectDict
  | IFieldRadio
  | IFieldCheckbox
  | IFieldDateRange
  | IFieldButton;

export { FieldType };
export type {
  IFieldText,
  IFieldTag,
  IFieldIndex,
  IFieldInput,
  IFieldTextarea,
  IFieldSelect,
  IFieldSelectDict,
  IFieldRadio,
  IFieldCheckbox,
  IFieldDateRange,
  IFieldButton,
  IFieldAll,
};
export type { ShimType, IOption, ThemeType, HandlerFunction };
