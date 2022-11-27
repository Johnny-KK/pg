import { describe, expect, it } from 'vitest';

describe('test cell-text', () => {
  it('plus', () => {
    const result = 1 + 1;
    expect(result).eq(2);
  });
  // it('should accept prop text', () => {
  //   const wrapper = mount(CellText, {
  //     props: { text: 'Hello world' },
  //   });

  //   expect(wrapper.text()).toContain('Hello world');
  // });

  // it('default prop text should be empty', () => {
  //   const wrapper = mount(CellText, {});

  //   expect(wrapper.text()).toContain('');
  // });

  // it('snapshot', () => {
  //   const wrapper = mount(CellText, {
  //     props: { text: 'Hello world  oo' },
  //   });

  //   expect(wrapper.element).toMatchSnapshot();
  // });
});
