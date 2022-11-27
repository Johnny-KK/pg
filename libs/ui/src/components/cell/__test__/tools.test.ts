import { describe, expect, it } from 'vitest';
import { mergeBoolean, mergeNumber } from '../utils/tools';

describe('src/components/cell/utils/tools.ts', () => {
  describe('mergeBoolean', () => {
    it('v is boolean, should return v', () => {
      const v1 = true;
      const v2 = false;
      const d1 = true;
      const d2 = false;

      expect(mergeBoolean(v1, d1)).toBe(v1);
      expect(mergeBoolean(v1, d2)).toBe(v1);
      expect(mergeBoolean(v2, d1)).toBe(v2);
      expect(mergeBoolean(v2, d2)).toBe(v2);
    });

    it('v is not boolean, should return d', () => {
      const v1 = 'true';
      const v2 = Symbol('true');
      const v3 = 10;
      const v4 = {};
      const v5 = undefined;
      const v6 = null;
      const v7 = 10n;
      const d1 = true;
      const d2 = false;

      expect(mergeBoolean(v1, d1)).toBe(d1);
      expect(mergeBoolean(v1, d2)).toBe(d2);
      expect(mergeBoolean(v2, d1)).toBe(d1);
      expect(mergeBoolean(v2, d2)).toBe(d2);
      expect(mergeBoolean(v3, d1)).toBe(d1);
      expect(mergeBoolean(v3, d2)).toBe(d2);
      expect(mergeBoolean(v4, d1)).toBe(d1);
      expect(mergeBoolean(v4, d2)).toBe(d2);
      expect(mergeBoolean(v5, d1)).toBe(d1);
      expect(mergeBoolean(v5, d2)).toBe(d2);
      expect(mergeBoolean(v6, d1)).toBe(d1);
      expect(mergeBoolean(v6, d2)).toBe(d2);
      expect(mergeBoolean(v7, d1)).toBe(d1);
      expect(mergeBoolean(v7, d2)).toBe(d2);
    });
  });

  describe('mergeNumber', () => {
    it('v is number except NaN Infinity, should return v', () => {
      const v1 = 9;
      const v2 = NaN;
      const v3 = Infinity;
      const v4 = -Infinity;
      const d = 50;

      expect(mergeNumber(v1, d)).toBe(v1);
      expect(mergeNumber(v2, d)).toBe(d);
      expect(mergeNumber(v3, d)).toBe(d);
      expect(mergeNumber(v4, d)).toBe(d);
    });

    it('v is string and can be parse to number, should return v', () => {
      const v1 = '55';
      const v2 = ' 55  ';
      const v3 = 'xx';
      const d = 50;

      expect(mergeNumber(v1, d)).toBe(55);
      expect(mergeNumber(v2, d)).toBe(55);
      expect(mergeNumber(v3, d)).toBe(d);
    });
  });
});
