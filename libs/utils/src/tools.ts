/**
 * 生成随机指定长度字符串
 *
 * @param length 字符串长度 默认64 最大1024
 */
export function randomString(length = 64): string {
  if (typeof length !== 'number' || length < 0 || length > 1024) {
    return '';
  }
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
