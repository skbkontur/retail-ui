import React from 'react';
import { mount } from 'enzyme';

import { FxInput, FxInputProps } from '../FxInput';

const render = (
  props: FxInputProps = {
    onValueChange: () => {
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

    expect(input.instance()).toHaveFocus();

    wrapper.instance().blur();

    expect(document.body).toHaveFocus();
  });
});
