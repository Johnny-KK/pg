/**
 * 是否是非空字符串
 *
 * @param {unknown} value 值
 */
export function isNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value !== '' && value.trim() !== '';
}
