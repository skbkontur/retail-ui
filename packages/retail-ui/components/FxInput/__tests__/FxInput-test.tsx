import * as React from 'react';
import { mount } from 'enzyme';
import FxInput, { FxInputProps } from '../FxInput';

const render = (
  props: FxInputProps = {
    onChange: () => {
      /**/
    },
  },
) => mount<FxInput, FxInputProps>(<FxInput {...props} />);

describe('FxInput', () => {
  it('render without crash', () => {
    render();
  });

  it('programmatically set focus and blur', () => {
    const wrapper = render();
    const input = wrapper.find('input');

    wrapper.instance().focus();

    expect(document.activeElement).toBe(input.instance());

    wrapper.instance().blur();

    expect(document.activeElement).toBe(document.body);
  });
});
